'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TypeWriterProps {
  children: string;
  speed?: number; // ms per character
  delay?: number; // initial delay
  cursor?: boolean;
  cursorChar?: string;
  className?: string;
  onComplete?: () => void;
  triggerOnView?: boolean; // 화면에 보일 때 시작
}

export default function TypeWriter({
  children,
  speed = 50,
  delay = 0,
  cursor = true,
  cursorChar = '|',
  className = '',
  onComplete,
  triggerOnView = true,
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    // triggerOnView가 true면 화면에 보일 때 시작, 아니면 바로 시작
    if (triggerOnView && !isInView) return;
    if (hasStarted) return;

    setHasStarted(true);

    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const text = children;

      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [children, speed, delay, onComplete, isInView, triggerOnView, hasStarted]);

  return (
    <span ref={ref} className={className}>
      {displayedText}
      {cursor && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          style={{ marginLeft: '2px' }}
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  );
}
