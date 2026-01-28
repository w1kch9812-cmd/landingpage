'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

// Spline 임시 비활성화
// import dynamic from 'next/dynamic';
// const SplineScene = dynamic(() => import('@/components/3d/SplineScene'), {
//   ssr: false,
//   loading: () => <div className={styles.splineFallback} />,
// });

interface HeroProps {
  isPreloaderDone?: boolean;
}

export default function Hero({ isPreloaderDone = true }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Spline preload 임시 비활성화
  // useEffect(() => {
  //   const link = document.createElement('link');
  //   link.rel = 'preload';
  //   link.href = '/spline/scene.splinecode';
  //   link.as = 'fetch';
  //   link.crossOrigin = 'anonymous';
  //   document.head.appendChild(link);
  //   return () => {
  //     document.head.removeChild(link);
  //   };
  // }, []);

  // Body background color
  useEffect(() => {
    document.body.style.transition = 'background-color 0.4s ease';
    document.body.style.backgroundColor = '#ffffff';
  }, []);

  return (
    <section id="section-hero" ref={sectionRef} className={styles.hero}>
      {/* Spline 임시 비활성화 */}
      {/* <div className={styles.splineWrapper}>
        <SplineScene
          sceneUrl="/spline/scene.splinecode"
          interactive={false}
        />
      </div> */}

      <div className={styles.heroContent}>
        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 40 }}
          animate={isPreloaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          제조업을 위한<br />단 하나의 부동산 솔루션
        </motion.h1>
        <motion.p
          className={styles.heroDescription}
          initial={{ opacity: 0, y: 30 }}
          animate={isPreloaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          매물, 경매, 실거래가, 분양정보의 통합 분석부터 현장 맞춤형 데이터까지 한번에
        </motion.p>
      </div>
    </section>
  );
}
