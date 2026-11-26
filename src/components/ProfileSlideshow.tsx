import { useCallback, useEffect, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import styles from './ProfileSlideshow.module.css';

interface SlideItem {
  image: string;
  caption: string;
  date: string;
  /** Kept for later, but not shown on the site. */
  hidden?: boolean;
  /** CSS object-position for photos whose subject isn't centred. */
  focus?: string;
}

const IMAGE_BASE =
  "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events";

// Shown in this order. Captions stay short and plain: what it is, and where.
const allSlides: SlideItem[] = [
  {
    image: `${IMAGE_BASE}/open-source-summit-kubevela-tech-talk-2025-4.jpeg`,
    caption: "Talking KubeVela at Open Source Summit India",
    date: "2025",
  },
  {
    image: `${IMAGE_BASE}/open-source-summit-kubevela-tech-talk-2025-2.jpeg`,
    caption: "Open Source Summit India, Hyderabad",
    date: "2025",
  },
  {
    image: `${IMAGE_BASE}/open-source-summit-kubevela-tech-talk-2025-3.jpeg`,
    caption: "Wrapping up the KubeVela talk",
    date: "2025",
  },
  {
    image: `${IMAGE_BASE}/open-source-summit-kubevela-booth.jpeg`,
    caption: "KubeVela booth at Open Source Summit India",
    date: "2025",
  },
  {
    image: `${IMAGE_BASE}/kubecon-2025-team.jpeg`,
    caption: "KubeCon + CloudNativeCon India",
    date: "2025",
  },
  {
    image: `${IMAGE_BASE}/kcd-bangalore-2025.jpeg`,
    caption: "Kubernetes Community Days Bengaluru",
    date: "2025",
  },
  {
    image: `${IMAGE_BASE}/guidewire-open-circlemixer-2025.jpeg`,
    caption: "Guidewire Open Circle mixer",
    date: "2025",
  },
  {
    image: `${IMAGE_BASE}/guidewire-mixer-ram-iyengar-2025.jpeg`,
    caption: "With Ram Iyengar of the Cloud Foundry Foundation",
    date: "2025",
  },
  {
    image: `${IMAGE_BASE}/sayim-pathak-guidewire-mixer-2025.jpeg`,
    caption: "With Saiyam Pathak of vCluster",
    date: "2025",
  },
  {
    image: `${IMAGE_BASE}/guidewire-ceo-2025.jpeg`,
    caption: "With Mike Rosenbaum, CEO of Guidewire",
    date: "2025",
  },
  {
    image: `${IMAGE_BASE}/software-supply-chain-security-tech-talk-2024-2.jpeg`,
    caption: "Tech talk on software supply chain security",
    date: "2024",
  },
  {
    image: `${IMAGE_BASE}/software-supply-chain-security-tech-talk-2024.jpeg`,
    caption: "Supply chain security workshop",
    date: "2024",
  },
  {
    image: `${IMAGE_BASE}/individual-award-2025.jpeg`,
    caption: "Employee of the Year, Guidewire",
    date: "2025",
  },
  {
    image: `${IMAGE_BASE}/undergrad-graduation-2023.jpeg`,
    caption: "Graduation, Amrita Vishwa Vidyapeetham",
    date: "2023",
  },

  // === HIDDEN: kept for later, not shown publicly ===
  {
    image: `${IMAGE_BASE}/open-source-summit-kubevela-tech-talk-2025.jpeg`,
    caption: "Delivering Technical Deep-Dive on KubeVela at Open Source Summit - Hyderabad",
    date: "2025",
    hidden: true,
  },
  {
    image: `${IMAGE_BASE}/amrita-2024-placement-talk-1.jpeg`,
    caption: "Leading Guidewire Basecamp Program at Amrita University",
    date: "2024",
    hidden: true,
  },
  {
    image: `${IMAGE_BASE}/amrita-2024-placement-talk-2.jpeg`,
    caption: "Mentoring Engineering Students as Guidewire Campus Ambassador",
    date: "2024",
    hidden: true,
  },
  {
    image: `${IMAGE_BASE}/guidewire-onam-celebration-2024.jpeg`,
    caption: "Celebrating Onam Festival with Guidewire Engineering Team",
    date: "2024",
    hidden: true,
  },
  {
    image: `${IMAGE_BASE}/diwali-celebration-2024.jpeg`,
    caption: "Participating in Diwali Festivities at Guidewire Bangalore Office",
    date: "2024",
    hidden: true,
  },
  {
    image: `${IMAGE_BASE}/office-diwali-kite-making.jpeg`,
    caption: "Engaging in Traditional Kite-Making Team Building Activity",
    date: "2024",
    hidden: true,
  },
  {
    image: `${IMAGE_BASE}/office-diwali-team-competition.jpeg`,
    caption: "Leading Cross-Functional Team in Diwali Celebration Competition",
    date: "2024",
    hidden: true,
  },
  {
    image: `${IMAGE_BASE}/guidewire-opne-circle-mixer-2025.jpeg`,
    caption: "Networking with Industry Leaders at Guidewire Open Circle Event",
    date: "2025",
    hidden: true,
  },
  {
    image: `${IMAGE_BASE}/awards-gallore-2025.jpeg`,
    caption: "Collection of Awards and Recognition from Guidewire Software",
    date: "2025",
    hidden: true,
  },
  {
    image: `${IMAGE_BASE}/tech-talk-awards-2024.jpeg`,
    caption: "Receiving Excellence Award for Outstanding Technical Presentations",
    date: "2024",
    hidden: true,
  },
];

const slideData = allSlides.filter((slide) => !slide.hidden);

const SLIDE_DURATION_MS = 5000;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Where a card sits relative to the current one. */
function positionClass(rel: number, total: number) {
  if (rel === 0) return styles.cardFront;
  if (rel === 1) return styles.cardBack1;
  if (rel === 2) return styles.cardBack2;
  if (rel === total - 1) return styles.cardExit;
  return styles.cardHidden;
}

export function ProfileSlideshow() {
  const total = slideData.length;
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(() => !prefersReducedMotion());
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total]);

  // Preload the next photo so it never appears blank.
  useEffect(() => {
    const img = new Image();
    img.src = slideData[(current + 1) % total].image;
  }, [current, total]);

  const goTo = (index: number) => {
    setCurrent(index);
    setIsPlaying(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
      setIsPlaying(false);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
      setIsPlaying(false);
    }
  };

  const slide = slideData[current];
  const rootClass = [
    styles.root,
    !isPlaying && styles.stopped,
    isPlaying && isHovered && styles.paused,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <figure
      className={rootClass}
      aria-roledescription="carousel"
      aria-label="Photos from talks and events"
      onKeyDown={onKeyDown}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      style={{ '--slide-duration': `${SLIDE_DURATION_MS}ms` } as CSSProperties}
    >
      <div className={styles.stage}>
        {slideData.map((item, index) => {
          const rel = (index - current + total) % total;
          const isNear = rel <= 2 || rel === total - 1;
          return (
            <div
              key={item.image}
              className={`${styles.card} ${positionClass(rel, total)}`}
              aria-hidden={rel !== 0}
            >
              {isNear && (
                <img
                  src={item.image}
                  alt={rel === 0 ? item.caption : ''}
                  className={styles.image}
                  style={item.focus ? { objectPosition: item.focus } : undefined}
                  decoding="async"
                  draggable={false}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.progress} role="group" aria-label="Choose a photo">
        {slideData.map((item, index) => (
          <button
            key={item.image}
            type="button"
            className={`${styles.segment} ${
              index === current ? styles.segmentActive : index < current ? styles.segmentDone : ''
            }`}
            onClick={() => goTo(index)}
            aria-label={`Photo ${index + 1}: ${item.caption}`}
            aria-current={index === current}
          >
            <span
              className={styles.segmentFill}
              onAnimationEnd={index === current ? next : undefined}
            />
          </button>
        ))}
      </div>

      <figcaption className={styles.footer}>
        <div className={styles.captionBlock} aria-live={isPlaying ? 'off' : 'polite'}>
          <span className={styles.meta}>
            {slide.date}
            <span aria-hidden="true"> · </span>
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <p className={styles.caption}>{slide.caption}</p>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            onClick={() => {
              prev();
              setIsPlaying(false);
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft className={styles.controlIcon} />
          </button>
          <button
            type="button"
            className={styles.control}
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? (
              <Pause className={styles.controlIcon} />
            ) : (
              <Play className={styles.controlIcon} />
            )}
          </button>
          <button
            type="button"
            className={styles.control}
            onClick={() => {
              next();
              setIsPlaying(false);
            }}
            aria-label="Next photo"
          >
            <ChevronRight className={styles.controlIcon} />
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
