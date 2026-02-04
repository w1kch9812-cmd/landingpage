'use client';

import React, { useState, useEffect } from 'react';
import styles from './ProgressiveBlur.module.css';

interface ProgressiveBlurProps {
  position?: 'top' | 'bottom';
  height?: number;
  className?: string;
  hideInHero?: boolean;
}

export default function ProgressiveBlur({
  position = 'bottom',
  height = 100,
  className = '',
  hideInHero = true,
}: ProgressiveBlurProps) {
  const [isVisible, setIsVisible] = useState(!hideInHero);

  useEffect(() => {
    if (!hideInHero) return;

    const handleScroll = () => {
      const heroHeight = window.innerHeight - 40;
      const scrollY = window.scrollY;
      setIsVisible(scrollY > heroHeight * 0.5);
    };

    handleScroll(); // 초기 상태 확인
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideInHero]);

  const layers = [
    { blur: 0.0625, start: 0, mid1: 12.5, mid2: 25, end: 37.5 },
    { blur: 0.125, start: 12.5, mid1: 25, mid2: 37.5, end: 50 },
    { blur: 0.25, start: 25, mid1: 37.5, mid2: 50, end: 62.5 },
    { blur: 0.5, start: 37.5, mid1: 50, mid2: 62.5, end: 75 },
    { blur: 1, start: 50, mid1: 62.5, mid2: 75, end: 87.5 },
    { blur: 2, start: 62.5, mid1: 75, mid2: 87.5, end: 100 },
    { blur: 4, start: 75, mid1: 87.5, mid2: 100, end: 100 },
    { blur: 8, start: 87.5, mid1: 100, mid2: 100, end: 100 },
  ];

  const isTop = position === 'top';

  return (
    <div
      className={`${styles.container} ${isTop ? styles.top : styles.bottom} ${className}`}
      style={{
        height,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {layers.map((layer, index) => {
        const gradient = isTop
          ? `linear-gradient(to bottom, rgba(0,0,0,0) ${100 - layer.end}%, rgb(0,0,0) ${100 - layer.mid2}%, rgb(0,0,0) ${100 - layer.mid1}%, rgba(0,0,0,0) ${100 - layer.start}%)`
          : `linear-gradient(to bottom, rgba(0,0,0,0) ${layer.start}%, rgb(0,0,0) ${layer.mid1}%, rgb(0,0,0) ${layer.mid2}%, rgba(0,0,0,0) ${layer.end}%)`;

        return (
          <div
            key={index}
            className={styles.layer}
            style={{
              zIndex: index + 1,
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${layer.blur}px)`,
              WebkitBackdropFilter: `blur(${layer.blur}px)`,
            }}
          />
        );
      })}
    </div>
  );
}
