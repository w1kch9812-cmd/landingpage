'use client';

import React, { ReactNode, useRef, Children, cloneElement, isValidElement } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  className?: string;
}

export default function StaggerChildren({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  duration = 0.5,
  y = 30,
  once = true,
  className = '',
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

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
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
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
      variants={containerVariants}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return (
            <motion.div variants={itemVariants}>
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
}
