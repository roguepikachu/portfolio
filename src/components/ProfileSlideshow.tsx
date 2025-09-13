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
    image: 'https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/amrita-2024-placement-talk-1.jpeg',
    caption: 'Placement Talk at Amrita',
    date: '2024'
  },
  {
    image: 'https://xrcjirnfklgxmamutbpz.supabase.co/storage/v1/object/public/ayush-portfolio/events/amrita-2024-placement-talk-2.jpeg',
    caption: 'Engaging with Students',
    date: '2024'
  },
  {
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
    caption: 'Building the future',
    date: '2024'
  },
  {
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
    caption: 'Deep in code',
    date: '2023'
  },
  {
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
    caption: 'Innovation mindset',
    date: '2023'
  }
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
      {/* Navigation Buttons - Curved rectangles with transparency */}
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

      {/* Slideshow Container */}
      <div className={styles.slideshowContainer}>
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

        {/* Play/Pause Indicator - Always visible and prominent */}
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