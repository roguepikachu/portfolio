import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ProfileSlideshow.module.css';

interface SlideItem {
  image: string;
  caption: string;
  date: string;
}

// Just add new images to this array - no need to manage IDs!
const slideData: SlideItem[] = [
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/guidewire-ceo-2025.jpeg",
    caption: "With Guidewire CEO Mike Rosenbaum",
    date: "2025",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/amrita-2024-placement-talk-1.jpeg",
    caption: "Guidewire Basecamp Programme at Amrita University",
    date: "2024",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/amrita-2024-placement-talk-2.jpeg",
    caption: "Guidewire Campus Ambassador at Amrita University",
    date: "2024",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/diwali-celebration-2024.jpeg",
    caption: "Office Diwali Celebrations",
    date: "2024",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/guidewire-mixer-ram-iyengar-2025.jpeg",
    caption: "With Ram Iyengar",
    date: "2025",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/guidewire-onam-celebration-2024.jpeg",
    caption: "Office Onam Celebrations",
    date: "2024",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/guidewire-open-circlemixer-2025.jpeg",
    caption: "Guidewire Open Circle Mixer",
    date: "2025",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/guidewire-opne-circle-mixer-2025.jpeg",
    caption: "Guidewire Open Circle Networking",
    date: "2025",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/kcd-bangalore-2025.jpeg",
    caption: "Kubernetes Community Days (KCD) Bangalore",
    date: "2025",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/kubecon-2025-team.jpeg",
    caption: "KubeCon Team",
    date: "2025",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/office-diwali-kite-making.jpeg",
    caption: "Office Diwali Kite Making",
    date: "2024",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/office-diwali-team-competition.jpeg",
    caption: "Office Diwali Team Competition",
    date: "2024",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/open-source-summit-kubevela-booth.jpeg",
    caption: "KubeVela Booth at OSS",
    date: "2025",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/open-source-summit-kubevela-tech-talk-2025-2.jpeg",
    caption: "KubeVela Tech Talk",
    date: "2025",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/open-source-summit-kubevela-tech-talk-2025-3.jpeg",
    caption: "Open Source Summit Talk",
    date: "2025",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/open-source-summit-kubevela-tech-talk-2025-4.jpeg",
    caption: "OSS Presentation",
    date: "2025",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/open-source-summit-kubevela-tech-talk-2025.jpeg",
    caption: "KubeVela at OSS",
    date: "2025",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/sayim-pathak-guidewire-mixer-2025.jpeg",
    caption: "With Sayim Pathak",
    date: "2025",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/software-supply-chain-security-tech-talk-2024-2.jpeg",
    caption: "Software Supply Chain Security Talk - 1",
    date: "2024",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/software-supply-chain-security-tech-talk-2024.jpeg",
    caption: "Software Supply Chain Security Tech Talk - 2",
    date: "2024",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/tech-talk-awards-2024.jpeg",
    caption: "Tech Talk Awards",
    date: "2024",
  },
  {
    image:
      "https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/undergrad-graduation-2023.jpeg",
    caption: "Amrita University - Graduation Day",
    date: "2023",
  },
];

export function ProfileSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slideData.length) % slideData.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slideData.length);
  };

  const currentSlide = slideData[currentIndex];

  return (
    <div className={styles.container}>
      {/* Slideshow Container */}
      <div className={styles.slideshowContainer}>
        {/* Play/Pause Indicator - Move outside of slideshowInner for better positioning */}
        <div className={styles.playPauseContainer}>
          <Badge
            variant="outline"
            className={`${styles.playPauseButton} ${
              isPlaying
                ? styles.playPauseButtonPlaying
                : styles.playPauseButtonPaused
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? '▶ Playing' : '⏸ Paused'}
          </Badge>
        </div>

        {/* Navigation Buttons - Position relative to slideshowInner boundaries */}
        <button
          className={`${styles.navButton} ${styles.navButtonLeft}`}
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
            setIsPlaying(false);
          }}
        >
          <ChevronLeft className={styles.navIcon} />
        </button>

        <button
          className={`${styles.navButton} ${styles.navButtonRight}`}
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
            setIsPlaying(false);
          }}
        >
          <ChevronRight className={styles.navIcon} />
        </button>

        <div className={styles.slideshowInner} onClick={() => setIsPlaying(!isPlaying)}>
        {/* Stacked Cards - Simplified transforms for better performance */}
        {slideData.map((slide, index) => {
          const offset = (index - currentIndex + slideData.length) % slideData.length;
          const isVisible = offset <= 2; // Show background cards
          
          let transform = '';
          let opacity = 0;
          let zIndex = 0;
          
          if (offset === 0) {
            // Current image - front and center - full priority
            transform = 'translateX(0px) translateY(0px) translateZ(50px) scale(1) rotateY(0deg) rotateZ(0deg)';
            opacity = 1;
            zIndex = 100;
          } else if (offset === 1) {
            // Next image - more visible behind and to the right
            transform = 'translateX(35px) translateY(20px) translateZ(0px) scale(0.92) rotateY(-6deg) rotateZ(2deg)';
            opacity = 0.85;
            zIndex = 50;
          } else if (offset === 2) {
            // Third image - visible further back
            transform = 'translateX(65px) translateY(35px) translateZ(-30px) scale(0.84) rotateY(-12deg) rotateZ(4deg)';
            opacity = 0.7;
            zIndex = 25;
          }
          
          let cardClass = styles.slideCard;
          if (offset === 0) {
            cardClass += ' ' + styles.slideCardCurrent;
          } else if (offset === 1) {
            cardClass += ' ' + styles.slideCardNext;
          } else if (offset === 2) {
            cardClass += ' ' + styles.slideCardThird;
          }
          
          return (
            <div
              key={index}
              className={`${cardClass} ${isVisible ? styles.slideVisible : styles.slideHidden}`}
              style={{
                transform,
                opacity,
                zIndex,
              }}
            >
              <div className={styles.slideContent}>
                <img
                  src={slide.image}
                  alt={slide.caption}
                  className={styles.slideImage}
                  loading="lazy"
                />
                {/* Overlay */}
                <div className={styles.slideOverlay} />
                
                {/* Caption and Date - only show for current image */}
                {offset === 0 && (
                  <div className={styles.captionContainer}>
                    <Badge variant="secondary" className={styles.dateBadge}>
                      {slide.date}
                    </Badge>
                    <p className={styles.caption}>{slide.caption}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Dots Indicator - Below slideshow with mobile-friendly spacing */}
        <div className={styles.dotsContainer}>
          {slideData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                goToSlide(index);
                setIsPlaying(false);
              }}
              className={`${styles.dot} ${
                index === currentIndex
                  ? styles.dotActive
                  : styles.dotInactive
              }`}
            />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}