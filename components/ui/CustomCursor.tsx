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
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        setIsVisible(true);
        positionRef.current = { x: e.clientX, y: e.clientY };
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

    // 애니메이션 루프
    let animationId: number;
    const animate = () => {
      const lerp = 0.15;
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * lerp;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px) translate(-50%, -50%)`;
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);

      cancelAnimationFrame(animationId);
    };
  }, [containerRef, isVisible]);

  // 마퀴 영역에 들어오면 바로 hovering 상태 (isVisible = hovering)
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
