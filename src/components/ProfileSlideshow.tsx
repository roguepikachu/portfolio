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
    <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
      <Card 
        className="relative w-full h-full rounded-full overflow-hidden border-8 border-background shadow-xl group cursor-pointer"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {/* Main Image */}
        <div className="relative w-full h-full">
          {slideData.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.caption}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* Caption and Date */}
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <Badge variant="secondary" className="mb-2 bg-white/10 text-white border-white/20">
            {currentSlide.date}
          </Badge>
          <p className="text-white font-medium text-sm">{currentSlide.caption}</p>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 text-white border-white/20"
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 text-white border-white/20"
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Play/Pause Indicator */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs">
            {isPlaying ? 'Playing' : 'Paused'}
          </Badge>
        </div>
      </Card>

      {/* Dots Indicator */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slideData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-125' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}