'use client';

import React, { ReactNode, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number; // 시작 y 오프셋
  once?: boolean; // 한 번만 애니메이션
  className?: string;
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'section';
}

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  once = true,
  className = '',
  as = 'div',
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier
      },
    },
  };

  const MotionComponent = motion[as] as typeof motion.div;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </MotionComponent>
  );
}
