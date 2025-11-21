---
id: bonsai
title: Bonsai
description: A self-hosted RESTful API for managing code snippets with Redis caching, PostgreSQL storage, and automatic expiration. Built with Go, designed for team collaboration.
tags: [Microservices, Go, PostgreSQL, Cache, Redis, REST API, Docker, Kubernetes, Atlas]
githubUrl: https://github.com/roguepikachu/bonsai
featured: true
---

# A Light Weight Snippet Sharing for Service


## The Problem with Sharing Formatted Text/Code

Ever tried sharing code in Slack or Discord? The formatting gets destroyed, indentation is lost, and your carefully crafted code turns into an unreadable mess. Or maybe you needed to share a configuration file temporarily but didn't want it sitting around forever in someone's DMs.

Bonsai solves this a self-hosted code snippet manager that makes team collaboration frictionless. It's my answer to services like Pastebin or GitHub Gists, but with complete control over where the data lives and how long it stays around.

Think of it as a smart clipboard for your team. Share debug logs that expire after an hour. Keep a searchable library of SQL queries. Post CI/CD outputs that everyone can access. Store temporary credentials that self-destruct after 5 minutes. All organized with tags, all accessible through a simple REST API.

This project was also a playground for exploring production-ready Go patterns clean architecture, intelligent caching strategies, declarative schema management, and comprehensive testing. It's the kind of backend service I'd actually want to deploy and maintain.

## Architecture at a Glance

```mermaid
graph TB
    Client[HTTP Client]

    subgraph "Bonsai API Server"
        Handler[Gin HTTP Handlers]
        Middleware[Middleware Layer<br/>RequestID, Logging, Recovery]
        Service[Service Layer<br/>Business Logic & Validation]
        Repo[Repository Interface]

        Handler --> Middleware
        Middleware --> Service
        Service --> Repo
    end

    subgraph "Data Layer"
        CachedRepo[Cached Repository<br/>Decorator Pattern]
        PostgresRepo[PostgreSQL Repository]
        Redis[(Redis Cache)]
        Postgres[(PostgreSQL<br/>JSONB + GIN Indexes)]

        Repo --> CachedRepo
        CachedRepo --> PostgresRepo
        CachedRepo <--> Redis
        PostgresRepo <--> Postgres
    end

    Client --> Handler

    style Service fill:#e1f5ff
    style CachedRepo fill:#fff4e1
    style Redis fill:#ffe1e1
    style Postgres fill:#e1ffe1
```

## What Makes This Different

Bonsai isn't just another CRUD API. It's designed around how teams actually share information.

**Self-Hosted:** Your data stays on your infrastructure. No third-party services, no privacy concerns, complete control over deployment and access.

**Smart Expiration:** Everything can have a lifetime from 5 minutes for temporary secrets to 30 days for bug reports, or permanent for documentation. Old snippets clean themselves up automatically.

**Tag-Based Organization:** Multiple tags per snippet let you organize by team, environment, priority, or whatever makes sense for your workflow. Filter by tag to find what you need.

**Intelligent Redis Caching:** This is where it gets interesting from an engineering perspective. I implemented a cache-aside pattern with smart TTL management. Read operations hit Redis first, falling back to PostgreSQL only on cache misses. Write operations invalidate the cache immediately. The result? Fast reads with strong consistency guarantees.

**PostgreSQL JSONB Magic:** Tags are stored as JSONB arrays with GIN indexes, making tag-based queries blazingly fast without the overhead of junction tables. It's a perfect example of using PostgreSQL's advanced features for the right use case.

**Zero-Friction Access:** No authentication required. Controversial, but intentional. Bonsai prioritizes speed over permissions designed for internal team use where simplicity matters. If you know the UUID, you can access the snippet.

## The Tech Stack

Built with technologies I wanted to master, especially around backend performance and infrastructure:

**Backend:** Go 1.23 with Gin web framework. Clean architecture with clear separation between HTTP handlers, business logic, and data access. Dependency injection throughout, interface-based design for testability.

**Database:** PostgreSQL 16 as the primary data store. JSONB columns for flexible tag arrays, GIN indexes for efficient querying, and composite indexes for time-based sorting. Schema management through Atlas CLI with declarative HCL definitions way better than maintaining migration files by hand.

**Caching:** Redis 7 implementing a cache-aside pattern with write-through invalidation. Every cached snippet has a TTL based on its expiration time. The \`X-Cache\` response header tells you whether it was a hit or miss, which is great for monitoring cache effectiveness.

**Infrastructure:** Docker Compose for local development. Kubernetes manifests for production deployment. GitHub Actions for CI/CD with comprehensive testing including unit tests, integration tests with real databases via testcontainers, and bash-based acceptance tests.

**Development Tools:** Makefile with 25+ commands for everything from setup to testing. Atlas for schema migrations. Structured logging with Logrus. Graceful shutdown handling with proper signal management.

## Getting Started

Want to run it locally or deploy it for your team? Here's the fastest path:

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/bonsai.git
cd bonsai

# One command setup: installs dependencies, starts services
make setup

# Apply database schema
make migrate-apply

# Start the API server
make run
```

Open [http://localhost:8080](http://localhost:8080) and you're running Bonsai locally.

### What Just Happened?

The \`make setup\` command:
1. Installed Go dependencies
2. Started PostgreSQL 16 and Redis 7 via Docker Compose
3. Created the \`bonsai\` database and initialized it
4. Set up the test database for integration tests

The \`make migrate-apply\` command ran Atlas migrations to create the snippets table with proper indexes.

### Environment Configuration

Bonsai uses environment variables for configuration. Create a \`.env\` file:

```env
# PostgreSQL connection (application)
POSTGRES_URL=postgres://bonsai:bonsai@localhost:5432/bonsai?sslmode=disable

# PostgreSQL connection (Atlas migrations)
DATABASE_URL=postgres://bonsai:bonsai@localhost:5432/bonsai?sslmode=disable

# Redis connection
REDIS_URL=redis://localhost:6379/0

# API server port
BONSAI_PORT=8080

# Framework mode (debug or release)
GIN_MODE=debug
```

For production, you'd set \`GIN_MODE=release\` and use SSL for PostgreSQL (\`sslmode=require\`).

### API Usage Examples

Once running, interact with Bonsai through its REST API:

**Create a snippet:**
```bash
curl -X POST http://localhost:8080/v1/snippets \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "SELECT * FROM users WHERE active = true;",
    "tags": ["sql", "users", "production"],
    "expiresInSeconds": 86400
  }'
```

**Get a snippet:**
```bash
curl http://localhost:8080/v1/snippets/{id}
# Check the X-Cache header to see if it was cached
```

**List snippets with filters:**
```bash
curl "http://localhost:8080/v1/snippets?tag=sql&page=1&limit=20"
```

**Update a snippet:**
```bash
curl -X PUT http://localhost:8080/v1/snippets/{id} \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Updated content here",
    "tags": ["updated", "sql"],
    "expiresInSeconds": 3600
  }'
```

**Delete a snippet:**
```bash
curl -X DELETE http://localhost:8080/v1/snippets/{id}
```

### Health Checks

Bonsai includes Kubernetes-style health probes:

```bash
# Liveness probe - is the service running?
curl http://localhost:8080/v1/livez

# Readiness probe - can it serve traffic?
curl http://localhost:8080/v1/readyz
```

The readiness check validates connectivity to both PostgreSQL and Redis, returning 503 if either is unavailable.

## How the Caching Strategy Works

The caching implementation is one of the most interesting parts of this project. Here's how it flows:

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Cache as Redis Cache
    participant DB as PostgreSQL

    Note over Client,DB: Read Operation (Cache-Aside)
    Client->>API: GET /v1/snippets/:id
    API->>Cache: Check for snippet
    alt Cache Hit
        Cache-->>API: Return cached data
        API-->>Client: 200 OK (X-Cache: HIT)
    else Cache Miss
        Cache-->>API: Not found
        API->>DB: Query snippet
        DB-->>API: Return data
        API->>Cache: Store with TTL
        API-->>Client: 200 OK (X-Cache: MISS)
    end

    Note over Client,DB: Write Operation (Write-Through Invalidation)
    Client->>API: PUT /v1/snippets/:id
    API->>DB: Update snippet
    DB-->>API: Success
    API->>Cache: Invalidate cache
    Cache-->>API: Deleted
    API-->>Client: 200 OK
```

### Caching Behavior Details

**On Read:**
1. Check Redis for the snippet by ID
2. If found (cache hit), return immediately with \`X-Cache: HIT\`
3. If not found (cache miss), query PostgreSQL
4. Store result in Redis with appropriate TTL
5. Return to client with \`X-Cache: MISS\`

**On Write (create/update):**
1. Write to PostgreSQL first (source of truth)
2. Invalidate any existing cache entry
3. Don't pre-populate the cache—let the next read handle it

**On Delete:**
1. Remove from PostgreSQL
2. Remove from Redis
3. Scan for list caches that might contain this snippet and invalidate them

**TTL Strategy:**
Each cached snippet gets a TTL that's the minimum of:
- The configured default cache TTL (e.g., 1 hour)
- The snippet's expiration time (if it expires in 10 minutes, cache it for 10 minutes)

This prevents serving expired snippets from the cache and automatically cleans up expired entries.

## Clean Architecture in Practice

The codebase follows clean architecture principles with clear separation of concerns:

```mermaid
graph LR
    subgraph "HTTP Layer"
        Routes[Router & Routes]
        Handlers[HTTP Handlers]
        MW[Middleware]
    end

    subgraph "Business Layer"
        Service[Service Logic]
        Clock[Clock Abstraction]
    end

    subgraph "Data Layer"
        RepoInterface[Repository Interface]
        CachedImpl[Cached Repository]
        PostgresImpl[PostgreSQL Repository]
        FakeImpl[Fake Repository<br/>for Testing]
    end

    subgraph "External Systems"
        Redis[(Redis)]
        PG[(PostgreSQL)]
    end

    Routes --> Handlers
    Handlers --> MW
    MW --> Service
    Service --> Clock
    Service --> RepoInterface

    RepoInterface -.implements.-> CachedImpl
    RepoInterface -.implements.-> PostgresImpl
    RepoInterface -.implements.-> FakeImpl

    CachedImpl --> PostgresImpl
    CachedImpl --> Redis
    PostgresImpl --> PG

    style Service fill:#e1f5ff
    style RepoInterface fill:#ffe1e1
    style CachedImpl fill:#fff4e1
```

### Key Design Patterns

**Repository Pattern:** The \`SnippetRepository\` interface defines the contract. Multiple implementations satisfy it, enabling testing without databases and adding caching as a transparent decorator.

**Decorator Pattern:** \`CachedSnippetRepository\` wraps the PostgreSQL repository, adding caching behavior without modifying the underlying implementation. Composition over inheritance.

**Dependency Injection:** Everything is injected through constructors. No global state, no singletons. Makes testing trivial and dependencies explicit.

**Clock Abstraction:** Time-dependent code is hard to test. I created a \`Clock\` interface with \`RealClock\` for production and \`FakeClock\` for tests. Now expiration logic has deterministic tests.

## Database Schema Strategy

I chose Atlas for schema management instead of traditional migrations. The schema is defined declaratively in HCL:

```hcl
table "snippets" {
  schema = schema.public
  column "id" { type = uuid }
  column "content" { type = text }
  column "tags" { type = jsonb }
  column "expires_at" { type = timestamptz }
  column "created_at" { type = timestamptz }
  column "updated_at" { type = timestamptz }

  primary_key { columns = [column.id] }

  index "idx_tags" {
    columns = [column.tags]
    type = GIN
  }

  index "idx_expires_at" {
    columns = [column.expires_at]
  }
}
```

When you modify the schema, Atlas generates the migration SQL automatically by diffing the desired state against the current database. No more writing migration files by hand.

**The Workflow:**
1. Edit \`schema/snippets.hcl\`
2. Run \`atlas migrate diff --env local\`
3. Review generated SQL in \`atlas-migrations/\`
4. Apply with \`make migrate-apply\`
5. Commit both schema and migration files

Atlas also validates migrations for production safety (checking for blocking operations, data loss risks, etc.) and supports concurrent index creation for zero-downtime schema changes.

## Testing Strategy

Testing was a priority from day one. The project has three test layers:

```mermaid
graph TD
    subgraph "Test Pyramid"
        A[Acceptance Tests<br/>Full HTTP API]
        B[Integration Tests<br/>Real PostgreSQL & Redis]
        C[Unit Tests<br/>Fast, Isolated, Mocked]
    end

    A --> B
    B --> C

    style A fill:#ffe1e1
    style B fill:#fff4e1
    style C fill:#e1ffe1
```

**Unit Tests** (fast, isolated):
```bash
make test-unit
```
Uses the fake repository implementation. Tests business logic, error handling, and edge cases without touching databases. Runs in milliseconds.

**Integration Tests** (real databases):
```bash
make test-integration
```
Spins up real PostgreSQL and Redis containers using testcontainers. Tests the actual repository implementations, caching behavior, and database queries. Validates that the code works with real infrastructure.

**Acceptance Tests** (end-to-end):
```bash
make test-acceptance
```
Starts the full API server and hits it with HTTP requests. Validates the complete flow from HTTP request to database and back. Written in bash for simplicity.

**Full Test Suite:**
```bash
make test-all
```
Runs all three test types and generates a merged coverage report. CI runs this on every push.

There's also a comprehensive API sanity check script:
```bash
make sanity-check
```
Creates, reads, updates, deletes, and validates edge cases. Perfect for smoke testing after deployment.

## Real-World Use Cases

I designed Bonsai around actual team workflows:

**Code Sharing in Chat:** Paste a snippet link in Slack instead of formatting code inline. Everyone gets syntax highlighting, proper indentation, and a direct link they can revisit.

**Debug Log Sharing:** When something breaks in production, save the stack trace as a snippet with tags like \`error\`, \`production\`, \`urgent\`. Share the link with your team, set it to expire in 24 hours.

**Temporary Credentials:** Need to share AWS credentials for a demo? Create a snippet that expires in 5 minutes. After that, it's gone the API returns 410 Gone.

**CI/CD Output Storage:** Your build pipeline can POST build logs to Bonsai, tagged with the commit hash and job name. Now your whole team can see what happened without SSHing into the build server.

**SQL Query Library:** Keep commonly-used queries as permanent snippets, tagged by database, table, or purpose. Much easier than digging through Slack history or documentation.

**Configuration Templates:** Store environment config templates with placeholders. Team members can grab them, fill in their values, and spin up new environments.

**Meeting Notes:** Quick technical notes from meetings, tagged by team and date. Set them to expire in a week if they're only relevant short-term.

## Deployment Options

**Local Development:**
```bash
make dev  # One command: services + migrations + server with hot reload
```

**Docker:**
```bash
docker build -t bonsai:latest .
docker run -p 8080:8080 \\
  -e POSTGRES_URL="postgresql://..." \\
  -e REDIS_URL="redis://..." \\
  bonsai:latest
```

The Dockerfile uses multi-stage builds: Go builder stage for compilation, Alpine runtime stage for a tiny final image.

**Kubernetes:**
Manifests are in the \`k8s/\` directory. Deploy PostgreSQL and Redis as StatefulSets, Bonsai API as a Deployment with health probes configured. Use ConfigMaps for Atlas configuration, Secrets for database credentials.

**GitHub Actions:**
The CI pipeline runs on every push:
1. Lint check with golangci-lint
2. Unit tests with coverage
3. Integration tests with service containers
4. Acceptance tests against a running instance
5. Coverage report upload
6. Atlas drift detection to catch schema changes

## What I Learned Building This

**Caching is Harder Than It Looks:** Implementing cache invalidation correctly took several iterations. List caches are especially tricky when you create a new snippet, which list queries should be invalidated? I ended up using Redis SCAN with pattern matching, but there's still room for improvement with stampede protection.

**Atlas is a Game Changer:** Moving from traditional migrations to declarative schema management was liberating. No more "migration 0023 depends on 0022" headaches. Just describe the desired state and let Atlas figure out how to get there.

**Interface-Based Design Pays Off:** Being able to swap the repository implementation in tests made development so much faster. I could write and test business logic without waiting for Docker containers to spin up.

**Testcontainers is Magic:** Integration tests that spin up real databases in containers give you confidence that your code actually works with the real thing, not just mocked behavior.

**Graceful Shutdown Matters:** Handling SIGTERM properly isn't just theoretical. In Kubernetes, pods get terminated regularly. Draining in-flight requests prevents partial operations and confusing errors.

**Observability from Day One:** Adding request IDs, structured logging, and the X-Cache header early made debugging so much easier. Production-ready patterns don't have to wait until "later."

## Future Roadmap

Some features I'm planning to add:

**Rate Limiting:** Per-IP rate limiting with sliding windows to prevent abuse. Probably using Redis for distributed rate limit tracking.

**Metrics Endpoint:** Prometheus metrics for request counts, latency percentiles, cache hit rates, and database query times. Essential for production monitoring.

**View Analytics:** Track snippet views using Redis Streams. Worker pool for processing view events in the background. HyperLogLog for unique visitor counting without storing individual IPs.

**WebSocket Realtime Updates:** Live view counts via WebSocket using Redis Pub/Sub. Watch a snippet's popularity in real-time.

**Stampede Protection:** When the cache expires for a popular snippet, multiple requests hit PostgreSQL simultaneously. Implement singleflight groups to coordinate cache refills.

**Load Testing:** Use k6 or Vegeta to establish performance baselines and find bottlenecks. Target: <50ms p95 latency, >90% cache hit rate.

## Why This Project Matters

Bonsai represents the kind of backend service I want to build professionally production ready from the start, well tested, thoughtfully architected, and actually useful.

It's not a toy example with shortcuts and TODOs. It has graceful shutdown, health checks, structured logging, comprehensive testing, declarative infrastructure, and intelligent caching. The patterns here repository interfaces, decorator based caching, clock abstraction, clean architecture are ones I'd use in any serious backend system.

And it solves a real problem. Every team needs to share code, logs, and configurations. Bonsai makes that seamless.

---

**Built by Ayush Kumar** | [GitHub](https://github.com/roguepikachu)

A small tool with big ambitions. Fork it, deploy it, make it yours.
