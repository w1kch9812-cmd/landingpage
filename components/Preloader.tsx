'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './Preloader.module.css';

interface PreloaderProps {
  onComplete: () => void;
  isAssetsReady?: boolean;
  onRevealProgress?: (progress: number) => void; // 0~1 reveal 진행도
}

type Phase = 'filling' | 'waiting' | 'revealing' | 'done';

export default function Preloader({ onComplete, isAssetsReady = false, onRevealProgress }: PreloaderProps) {
  const [fillProgress, setFillProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>('filling');
  const [revealProgress, setRevealProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const phaseStartRef = useRef<number>(0);
  const circleRef = useRef<SVGCircleElement>(null);

  const FILL_DURATION = 1800;
  const REVEAL_DURATION = 600;

  const getMaxRadius = () => {
    if (typeof window === 'undefined') return 2000;
    return Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 0.6;
  };

  useEffect(() => {
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      if (phase === 'filling') {
        if (elapsed < FILL_DURATION) {
          const t = elapsed / FILL_DURATION;
          const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
          setFillProgress(eased);
          animationId = requestAnimationFrame(animate);
        } else {
          setFillProgress(1);
          if (isAssetsReady) {
            setPhase('revealing');
            phaseStartRef.current = timestamp;
          } else {
            setPhase('waiting');
          }
          animationId = requestAnimationFrame(animate);
        }
      } else if (phase === 'waiting') {
        animationId = requestAnimationFrame(animate);
      } else if (phase === 'revealing') {
        const revealElapsed = timestamp - phaseStartRef.current;
        if (revealElapsed < REVEAL_DURATION) {
          const t = revealElapsed / REVEAL_DURATION;
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

          if (circleRef.current) {
            const startRadius = 60;
            const maxRadius = getMaxRadius();
            const currentRadius = startRadius + (maxRadius - startRadius) * eased;
            circleRef.current.setAttribute('r', String(currentRadius));
          }

          setRevealProgress(eased);
          onRevealProgress?.(eased);
          animationId = requestAnimationFrame(animate);
        } else {
          setRevealProgress(1);
          onRevealProgress?.(1);
          requestAnimationFrame(() => {
            setPhase('done');
            onComplete();
          });
        }
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [phase, isAssetsReady, onComplete, onRevealProgress]);

  useEffect(() => {
    if (phase === 'waiting' && isAssetsReady) {
      setPhase('revealing');
      phaseStartRef.current = performance.now();
    }
  }, [phase, isAssetsReady]);

  if (phase === 'done') return null;

  return (
    <div className={styles.preloader}>
      {phase !== 'revealing' && (
        <div className={styles.darkOverlay} style={{ background: '#001530' }} />
      )}

      {phase === 'revealing' && (
        <svg className={styles.revealSvg}>
          <defs>
            <mask id="revealMask">
              <rect width="100%" height="100%" fill="white" />
              <circle
                ref={circleRef}
                cx="50%"
                cy="50%"
                r="60"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="#001530"
            mask="url(#revealMask)"
          />
        </svg>
      )}

      {(phase === 'filling' || phase === 'waiting') && (
        <div className={styles.circleContainer}>
          <svg viewBox="0 0 120 120" className={styles.circleSvg}>
            <defs>
              <linearGradient id="circleFillGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="white" />
                <stop offset={`${fillProgress * 100}%`} stopColor="white" />
                <stop offset={`${fillProgress * 100}%`} stopColor="black" />
                <stop offset="100%" stopColor="black" />
              </linearGradient>
              <mask id="circleFillMask">
                <rect x="0" y="0" width="120" height="120" fill="url(#circleFillGradient)" />
              </mask>
            </defs>
            <circle cx="60" cy="60" r="55" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            <circle cx="60" cy="60" r="55" fill="white" mask="url(#circleFillMask)" />
          </svg>
        </div>
      )}
    </div>
  );
}
