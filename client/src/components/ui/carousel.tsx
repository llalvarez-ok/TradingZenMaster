import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode[];
  autoScroll?: boolean;
  autoScrollInterval?: number;
  className?: string;
}

export function Carousel({ 
  children, 
  autoScroll = false, 
  autoScrollInterval = 5000,
  className = ''
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      const calculateMaxScroll = () => {
        const containerWidth = carouselRef.current?.scrollWidth || 0;
        const viewportWidth = carouselRef.current?.clientWidth || 0;
        setMaxScroll(containerWidth - viewportWidth);
      };

      // Calculate initial max scroll
      calculateMaxScroll();

      // Recalculate on window resize
      window.addEventListener('resize', calculateMaxScroll);
      return () => window.removeEventListener('resize', calculateMaxScroll);
    }
  }, [children]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoScroll && maxScroll > 0) {
      interval = setInterval(() => {
        if (carouselRef.current) {
          // If we've reached the end, go back to start
          if (scrollPosition >= maxScroll) {
            carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            setScrollPosition(0);
          } else {
            // Scroll to next item
            const newScrollPosition = Math.min(scrollPosition + 400, maxScroll);
            carouselRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
            setScrollPosition(newScrollPosition);
          }
        }
      }, autoScrollInterval);
    }
    return () => clearInterval(interval);
  }, [autoScroll, autoScrollInterval, scrollPosition, maxScroll]);

  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const newScrollPosition = Math.max(scrollPosition - 400, 0);
      carouselRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
      setScrollPosition(newScrollPosition);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const newScrollPosition = Math.min(scrollPosition + 400, maxScroll);
      carouselRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
      setScrollPosition(newScrollPosition);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={carouselRef}
        className="overflow-x-auto hide-scrollbar pb-8 scroll-smooth"
        onScroll={handleScroll}
      >
        <div className="flex space-x-6 min-w-max px-4">
          {children}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      {scrollPosition > 0 && (
        <button 
          onClick={scrollLeft}
          className="absolute top-1/2 left-0 -translate-y-1/2 bg-white/80 hover:bg-white text-primary w-10 h-10 rounded-full flex items-center justify-center shadow-md focus:outline-none"
          aria-label="Previous item"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      
      {scrollPosition < maxScroll && (
        <button 
          onClick={scrollRight}
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-white/80 hover:bg-white text-primary w-10 h-10 rounded-full flex items-center justify-center shadow-md focus:outline-none"
          aria-label="Next item"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
