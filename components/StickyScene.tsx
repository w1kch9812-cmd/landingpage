'use client';

import React, { useState, useEffect, useRef, Suspense, lazy, useCallback } from 'react';
import styles from './StickyScene.module.css';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface StickySceneProps {
  children: React.ReactNode;
  splineScene?: string;
  position?: 'left' | 'right';
  sceneWidth?: string;
  minHeight?: string;
}

export default function StickyScene({
  children,
  splineScene = '/spline/scene.splinecode',
  position = 'left',
  sceneWidth = '50%',
  minHeight = '300vh',
}: StickySceneProps) {
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<any>(null);

  const onSplineLoad = useCallback((splineApp: any) => {
    splineRef.current = splineApp;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.stickySceneContainer} ${position === 'right' ? styles.reverse : ''}`}
      style={{ minHeight }}
    >
      {/* 3D Scene (Sticky) */}
      <div className={styles.sceneWrapper} style={{ width: sceneWidth }}>
        <div className={styles.sceneSticky}>
          {isInView && !hasError ? (
            <Suspense fallback={<div className={styles.sceneFallback} />}>
              <Spline
                scene={splineScene}
                onLoad={onSplineLoad}
                onError={() => setHasError(true)}
              />
            </Suspense>
          ) : (
            <div className={styles.sceneFallback}>
              <div className={styles.fallbackContent}>
                <div className={styles.cube3D}>
                  <div className={styles.cubeFace} />
                  <div className={styles.cubeFace} />
                  <div className={styles.cubeFace} />
                </div>
                <p>3D 씬</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content (Scrollable) */}
      <div
        className={styles.contentWrapper}
        style={{ width: `calc(100% - ${sceneWidth})` }}
      >
        {children}
      </div>
    </div>
  );
}
