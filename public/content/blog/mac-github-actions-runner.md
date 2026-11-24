---
id: mac-github-actions-runner
title: Turning My Mac into a GitHub Actions Runner
excerpt: A small experiment - run GitHub Actions jobs on an Apple silicon Mac inside a sealed Lima VM, scale it from 1 to N runners, and switch CI back to GitHub with one variable.
date: 2026-11-25
tags: [GitHub Actions, CI/CD, Lima, macOS, DevOps]
pinned: true
release: true
image: '/portfolio/images/blog/mac-github-actions-runner/cover.svg'
---

![Your Mac as a GitHub Actions runner](/portfolio/images/blog/mac-github-actions-runner/cover.svg)

My side project's CI had grown to lint, type checks, tests with a Postgres service, CodeQL and a few custom gates. Every push burned GitHub-hosted minutes, while an Apple silicon Mac sat on my desk doing nothing.

So I ran a small experiment: **can that Mac run the CI safely, run several jobs at once, and hand CI back to GitHub whenever it's off?**

The working example is at **[roguepikachu/mac-gha-runner](https://github.com/roguepikachu/mac-gha-runner)**. This post is about the ideas behind it.

## The problem

There are three obvious ways to do this, and each one breaks something:

| Obvious approach | What goes wrong |
|---|---|
| Install the runner directly on macOS | Jobs run as you, next to your SSH keys and credentials. And workflows written for `ubuntu-latest` expect Linux, not macOS |
| Run it inside Colima or Docker Desktop | Both share your home directory into their VM by default, so a job can still read `~/.ssh` |
| Hard-code `runs-on: self-hosted` | All or nothing. When the Mac sleeps, every job in every PR is stuck |

A runner executes **pull request code**, including code from people or agents you don't fully trust. So the real requirements are:

1. **Linux**, close to GitHub's `ubuntu-latest`.
2. **Isolated** from everything on the Mac.
3. **Reversible**, per repository and per pull request.
4. **Parallel**: more than one job at a time.

## The solution in one picture

![Architecture: a runs-on switch sends jobs either to GitHub-hosted runners or to runners inside a Lima VM on the Mac](/portfolio/images/blog/mac-github-actions-runner/architecture.drawio.svg)

A sealed Linux VM on the Mac runs the runners. A switch in every workflow decides, job by job, whether to use the Mac or GitHub.

The runners **pull** jobs from GitHub over outbound HTTPS. There are no inbound ports, tunnels or public IP.

## 1. A sealed VM

[Lima](https://lima-vm.io) is the layer underneath Colima. Instead of a dev setup that mounts your home directory by default, I write the whole VM in one YAML file and start from **no mounts at all**:

```yaml
vmType: vz              # Apple's Virtualization framework
vmOpts:
  vz:
    rosetta:
      enabled: true     # run linux-amd64 binaries too
      binfmt: true

cpus: 4                 # a hard cap: CI can't starve the Mac
memory: 8GiB

mounts: []              # the VM sees nothing on the Mac
```

The VM gets the network and nothing from the Mac's disk. The rest of the template installs what jobs expect: Docker, the packages GitHub's image preinstalls, amd64 libraries for Rosetta, and the Actions runner, pinned by version and checksum.

## 2. A switch in every workflow

Every job gets the same `runs-on`:

```yaml
runs-on: >-
  ${{
    (contains(github.event.pull_request.labels.*.name, 'ci:github-hosted')
     || contains(github.event.issue.labels.*.name, 'ci:github-hosted'))
    && 'ubuntu-latest'
    || fromJSON(vars.CI_RUNNER || '"ubuntu-latest"')
  }}
```

| Situation | Job runs on |
|---|---|
| PR has the label `ci:github-hosted` | GitHub |
| Repository variable `CI_RUNNER` = `["self-hosted","linux","mac-ci"]` | the Mac |
| `CI_RUNNER` not set | GitHub |

Moving all of CI to the Mac is one variable:

```bash
gh variable set CI_RUNNER --body '["self-hosted","linux","mac-ci"]'
```

Deleting it moves everything back. `fromJSON` is the trick: one variable can hold a plain runner name or a list of labels. The PR label is the escape hatch for a single pull request.

## 3. Scaling from 1 to N runners in one VM

A runner process handles **one job at a time**. To run jobs in parallel you need more runners, and there are two ways to get them:

- **More VMs.** Each VM reserves its own CPU and memory, so the Mac gives up 4 CPUs for every extra runner.
- **More runners in the same VM.** They share the one cap you already set aside.

I went with the second option:

![Scaling: one pinned runner install is copied into N runner directories, each registered under its own name and run as its own systemd service, all sharing the VM's cap](/portfolio/images/blog/mac-github-actions-runner/scaling.drawio.svg)

The template installs the runner once, at `/opt/actions-runner`, and **never registers it**. That copy is the master. Each runner `n` gets three things of its own:

```bash
for ((n = 1; n <= RUNNERS; n++)); do
  dir=/opt/actions-runner-$n

  # 1. Its own copy of the pinned runner
  vm "test -d $dir || sudo cp -a /opt/actions-runner $dir"

  # 2. Its own registration, unless it already has one
  vm "test -f $dir/.runner" || register "$dir" "mac-gha-$n"

  # 3. Its own systemd service
  vm "cd $dir && sudo ./svc.sh install && sudo ./svc.sh start"
done
```

*Simplified from the repo's script; `vm` runs a command inside the VM with `limactl shell`.*

Registration uses a fresh, short-lived token, piped straight into the VM so it never lands on disk:

```bash
register() {   # $1 = runner dir, $2 = runner name
  gh api -X POST "repos/$REPO/actions/runners/registration-token" \
      --jq .token |
    vm "read -r token && cd $1 && ./config.sh --unattended \
        --url https://github.com/$REPO --token \"\$token\" \
        --name $2 --labels mac-ci"
}
```

Because each step checks before it acts, scaling up is just running it again with a bigger number. Existing runners are skipped and only the new ones are added:

```bash
RUNNERS=4 scripts/ci/mac-runner.sh up   # adds mac-gha-3 and mac-gha-4

scripts/ci/mac-runner.sh pause          # scale down: deregister all...
RUNNERS=1 scripts/ci/mac-runner.sh up   # ...then register just mac-gha-1
```

Here are my two runners, both busy with CI jobs at the same time:

```text
$ scripts/ci/mac-runner.sh status
vm:     gha-runner Running
runner: mac-gha-1 online busy=true
runner: mac-gha-2 online busy=true
```

### How many runners?

- **CPU is shared, not multiplied.** With 4 CPUs and N runners, each busy job gets roughly 4/N. I use 2. For more, raise `cpus` and `memory` in the template and rebuild the VM.
- **One Docker daemon serves every runner.** Two parallel jobs that both publish a `services:` container on a fixed host port (`5432:5432`) will collide. Publish the container port only (`5432/tcp`), and read the assigned host port from `job.services.<name>.ports['5432']`.

## Caveats, honestly

- **Private repositories only.** On a public repo, anyone can open a PR that runs code on your machine. GitHub advises against self-hosted runners for public repositories.
- **The runners aren't ephemeral.** GitHub's runners start clean for every job. These keep their work directory and Docker cache, which is faster but means one job can leave state behind for the next.
- **arm64, not x64.** Pinned amd64 tools run through Rosetta, but workflows that build amd64 images belong on GitHub's runners.
- **The Mac has to be awake.** Otherwise jobs wait in the queue, which is why the PR label exists.

## Try it

The template, the scripts and an example workflow are in **[github.com/roguepikachu/mac-gha-runner](https://github.com/roguepikachu/mac-gha-runner)**. The README covers setup and troubleshooting.

The experiment stuck. Day-to-day CI now runs on hardware I already own, two jobs at a time, inside a VM that can't see my files. Deleting one variable sends it all back to GitHub before a trip.
