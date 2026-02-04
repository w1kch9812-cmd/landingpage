'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

interface CustomCursorProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export default function CustomCursor({ containerRef }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }

      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsDragging(true);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
    };
  }, [containerRef, isVisible]);

  const cursorClasses = [
    styles.cursor,
    isVisible ? styles.visible : '',
    isVisible ? styles.hovering : '',
    isDragging ? styles.dragging : '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={cursorRef} className={cursorClasses}>
      <div className={styles.cursorInner}>
        <span className={styles.cursorText}>
          {isDragging ? 'Dragging' : 'Drag'}
        </span>
      </div>
    </div>
  );
}
