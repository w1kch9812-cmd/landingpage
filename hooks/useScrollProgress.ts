'use client';

import { useEffect, useState } from 'react';

export function useScrollProgress(elementId?: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Calculate progress based on element visibility
        const elementTop = rect.top;
        const elementBottom = rect.bottom;

        if (elementTop > windowHeight) {
          setProgress(0);
        } else if (elementBottom < 0) {
          setProgress(1);
        } else {
          const visibleHeight = Math.min(elementBottom, windowHeight) - Math.max(elementTop, 0);
          const scrollProgress = visibleHeight / (elementHeight + windowHeight);
          setProgress(Math.max(0, Math.min(1, scrollProgress)));
        }
      } else {
        // Global scroll progress
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        setProgress(currentScroll / totalScroll);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [elementId]);

  return progress;
}
