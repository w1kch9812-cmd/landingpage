'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number; // 초 단위
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string; // 천 단위 구분자
  className?: string;
  once?: boolean;
}

// 숫자 포맷팅 함수
function formatNumber(num: number, decimals: number, separator: string): string {
  const fixed = num.toFixed(decimals);
  const parts = fixed.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return parts.join('.');
}

// easeOutExpo 이징 함수
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function CountUp({
  end,
  start = 0,
  duration = 2,
  delay = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  className = '',
  once = true,
}: CountUpProps) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  useEffect(() => {
    if (!isInView || hasStarted) return;

    const timeout = setTimeout(() => {
      setHasStarted(true);
      const startTime = performance.now();
      const durationMs = duration * 1000;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const easedProgress = easeOutExpo(progress);
        const currentCount = start + (end - start) * easedProgress;

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, hasStarted, start, end, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(count, decimals, separator)}
      {suffix}
    </span>
  );
}
