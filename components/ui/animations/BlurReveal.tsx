'use client';

import React, { ReactNode, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface BlurRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  blur?: number; // 시작 blur 값 (px)
  scale?: number; // 시작 scale 값
  once?: boolean;
  className?: string;
}

export default function BlurReveal({
  children,
  delay = 0,
  duration = 0.8,
  blur = 10,
  scale = 0.95,
  once = true,
  className = '',
}: BlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      filter: `blur(${blur}px)`,
      scale,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
