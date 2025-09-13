import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SlideItem {
  id: string;
  image: string;
  caption: string;
  date: string;
}

const slideData: SlideItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
    caption: 'Building the future',
    date: '2024'
  },
  {
    id: '2', 
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
    caption: 'Deep in code',
    date: '2023'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
    caption: 'Innovation mindset',
    date: '2023'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop',
    caption: 'Crafting solutions',
    date: '2024'
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
    <div className="relative flex items-center justify-center w-full max-w-[520px] mx-auto px-8 sm:px-4 lg:px-0">
      {/* Slideshow Container */}
      <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[440px] xl:max-w-[480px]">
        <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)} style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
        {/* Stacked Cards - Simplified transforms for better performance */}
        {slideData.map((slide, index) => {
          const offset = (index - currentIndex + slideData.length) % slideData.length;
          const isVisible = offset <= 2; // Show background cards
          
          let transform = '';
          let opacity = 0;
          let zIndex = 0;
          let borderColor = 'border-background';
          let shadowClass = 'shadow-lg';
          
          if (offset === 0) {
            // Current image - front and center - full priority
            transform = 'translateX(0px) translateY(0px) translateZ(50px) scale(1) rotateY(0deg) rotateZ(0deg)';
            opacity = 1;
            zIndex = 100;
            borderColor = 'border-primary/40';
            shadowClass = 'shadow-2xl shadow-primary/30';
          } else if (offset === 1) {
            // Next image - more visible behind and to the right
            transform = 'translateX(35px) translateY(20px) translateZ(0px) scale(0.92) rotateY(-6deg) rotateZ(2deg)';
            opacity = 0.85;
            zIndex = 50;
            borderColor = 'border-primary/25';
            shadowClass = 'shadow-xl shadow-primary/20';
          } else if (offset === 2) {
            // Third image - visible further back
            transform = 'translateX(65px) translateY(35px) translateZ(-30px) scale(0.84) rotateY(-12deg) rotateZ(4deg)';
            opacity = 0.7;
            zIndex = 25;
            borderColor = 'border-primary/15';
            shadowClass = 'shadow-lg shadow-primary/15';
          }
          
          return (
            <Card
              key={slide.id}
              className={`absolute inset-0 rounded-[2rem] overflow-hidden border-2 ${borderColor} ${shadowClass} will-change-transform ${
                isVisible ? 'visible' : 'invisible'
              }`}
              style={{
                transform,
                opacity,
                zIndex,
                transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden', // Prevent flickering
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Caption and Date - only show for current image */}
                {offset === 0 && (
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <Badge variant="secondary" className="mb-2 bg-white/10 text-white border-white/20">
                      {slide.date}
                    </Badge>
                    <p className="text-white font-medium text-sm">{slide.caption}</p>
                  </div>
                )}
              </div>
            </Card>
          );
        })}


        {/* Navigation Buttons - Inside slideshow for mobile compatibility */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-primary hover:text-primary-foreground border-2 border-primary/40 hover:border-primary shadow-lg hover:shadow-xl transition-all dark:bg-card/80 dark:hover:bg-primary dark:border-primary/50 z-50"
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
            setIsPlaying(false);
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-primary hover:text-primary-foreground border-2 border-primary/40 hover:border-primary shadow-lg hover:shadow-xl transition-all dark:bg-card/80 dark:hover:bg-primary dark:border-primary/50 z-50"
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
            setIsPlaying(false);
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Play/Pause Indicator - Always visible and prominent */}
        <div className="absolute top-4 left-4 transition-all" style={{ zIndex: 9999 }}>
          <Badge 
            variant="outline"
            className={`text-xs cursor-pointer border-2 shadow-lg font-semibold ${
              isPlaying 
                ? 'bg-primary/90 text-primary-foreground border-primary hover:bg-primary' 
                : 'bg-secondary/90 text-secondary-foreground border-secondary hover:bg-secondary'
            } hover:shadow-xl transition-all`}
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? '▶ Playing' : '⏸ Paused'}
          </Badge>
        </div>

        {/* Dots Indicator - Below slideshow with mobile-friendly spacing */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex space-x-2" style={{ zIndex: 9999 }}>
          {slideData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                goToSlide(index);
                setIsPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                index === currentIndex 
                  ? 'bg-primary border-primary scale-125 shadow-lg shadow-primary/40' 
                  : 'bg-background border-primary/60 hover:border-primary hover:bg-primary/20 hover:scale-110'
              }`}
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}