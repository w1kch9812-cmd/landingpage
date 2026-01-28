'use client';

import React, { useEffect, useState, useRef, memo } from 'react';
import styles from './SplineScene.module.css';

// Direct import instead of lazy for faster loading
import Spline from '@splinetool/react-spline';

interface SplineSceneProps {
  sceneUrl: string;
  className?: string;
  onLoad?: () => void;
  interactive?: boolean;
}

function SplineSceneInner({
  sceneUrl,
  className = '',
  onLoad,
  interactive = true
}: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const splineRef = useRef<any>(null);

  const handleLoad = (spline: any) => {
    splineRef.current = spline;
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    console.warn(`Failed to load Spline scene: ${sceneUrl}`);
    setHasError(true);
    setIsLoaded(true);
  };

  // 컴포넌트 언마운트 시 Spline 리소스 정리
  useEffect(() => {
    return () => {
      if (splineRef.current) {
        // Spline dispose 메서드가 있으면 호출
        if (typeof splineRef.current.dispose === 'function') {
          splineRef.current.dispose();
        }
        splineRef.current = null;
      }
    };
  }, []);

  if (hasError) {
    return <div className={`${styles.fallback} ${className}`}></div>;
  }

  return (
    <div className={`${styles.splineContainer} ${className}`}>
      {!isLoaded && (
        <div className={styles.loader}>
          <div className={styles.loaderSpinner}></div>
        </div>
      )}
      <Spline
        scene={sceneUrl}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: interactive ? 'auto' : 'none',
        }}
      />
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(SplineSceneInner);
