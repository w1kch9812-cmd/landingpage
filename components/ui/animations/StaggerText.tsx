'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface StaggerTextProps {
  children: string;
  staggerDelay?: number; // 각 단어/글자 간 딜레이
  initialDelay?: number; // 전체 시작 딜레이
  duration?: number;
  by?: 'word' | 'character'; // 단어별 또는 글자별
  className?: string;
  once?: boolean;
  y?: number;
}

export default function StaggerText({
  children,
  staggerDelay = 0.05,
  initialDelay = 0,
  duration = 0.4,
  by = 'word',
  className = '',
  once = true,
  y = 20,
}: StaggerTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const items = by === 'word' ? children.split(' ') : children.split('');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: 'inline-flex', flexWrap: 'wrap' }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          style={{
            display: 'inline-block',
            marginRight: by === 'word' ? '0.3em' : '0',
            whiteSpace: 'pre',
          }}
        >
          {item}
        </motion.span>
      ))}
    </motion.span>
  );
}
