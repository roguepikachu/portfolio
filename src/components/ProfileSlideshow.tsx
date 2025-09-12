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
    <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] lg:w-[520px] lg:h-[520px]">
      <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
        {/* Stacked Cards */}
        {slideData.map((slide, index) => {
          const offset = (index - currentIndex + slideData.length) % slideData.length;
          const isVisible = offset <= 3;
          
          let transform = '';
          let opacity = 0;
          let zIndex = 0;
          let borderColor = 'border-background';
          let shadowClass = 'shadow-xl';
          
          if (offset === 0) {
            // Current image - front and center with enhanced styling
            transform = 'translateX(0px) translateY(0px) scale(1) rotate(0deg)';
            opacity = 1;
            zIndex = 40;
            borderColor = 'border-primary/20';
            shadowClass = 'shadow-2xl shadow-primary/20';
          } else if (offset === 1) {
            // Next image - more visible with gentle offset
            transform = 'translateX(20px) translateY(15px) scale(0.92) rotate(4deg)';
            opacity = 0.9;
            zIndex = 30;
            borderColor = 'border-muted/40';
            shadowClass = 'shadow-xl shadow-primary/10';
          } else if (offset === 2) {
            // Third image - clearly visible in background
            transform = 'translateX(40px) translateY(30px) scale(0.84) rotate(8deg)';
            opacity = 0.8;
            zIndex = 20;
            borderColor = 'border-muted/30';
            shadowClass = 'shadow-lg shadow-primary/5';
          } else if (offset === 3) {
            // Fourth image - still partially visible
            transform = 'translateX(60px) translateY(45px) scale(0.76) rotate(12deg)';
            opacity = 0.7;
            zIndex = 10;
            borderColor = 'border-muted/20';
            shadowClass = 'shadow-md shadow-black/5';
          }
          
          return (
            <Card
              key={slide.id}
              className={`absolute inset-0 rounded-[2rem] overflow-hidden border-2 ${borderColor} ${shadowClass} transition-all duration-700 ease-out backdrop-blur-sm ${
                isVisible ? 'visible' : 'invisible'
              }`}
              style={{
                transform,
                opacity,
                zIndex,
                background: offset === 0 
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                  : 'rgba(255,255,255,0.02)',
              }}
            >
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.caption}
                  className="w-full h-full object-cover"
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

        {/* Navigation Arrows - Always visible and more prominent */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 transition-all bg-background/90 hover:bg-background border-2 border-primary/20 hover:border-primary/40 z-50 hover:scale-110 shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
        >
          <ChevronLeft className="h-5 w-5 text-primary" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 transition-all bg-background/90 hover:bg-background border-2 border-primary/20 hover:border-primary/40 z-50 hover:scale-110 shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
        >
          <ChevronRight className="h-5 w-5 text-primary" />
        </Button>

        {/* Play/Pause Indicator */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-40">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs">
            {isPlaying ? 'Playing' : 'Paused'}
          </Badge>
        </div>
      </div>

      {/* Dots Indicator - Larger and more prominent */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex space-x-3">
        {slideData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentIndex 
                ? 'bg-primary scale-125 shadow-lg shadow-primary/30' 
                : 'bg-muted-foreground/40 hover:bg-muted-foreground/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}