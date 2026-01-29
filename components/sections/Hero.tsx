'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { StaggerText } from '@/components/ui/animations';
import styles from './Hero.module.css';

interface HeroProps {
  isPreloaderDone?: boolean;
}

export default function Hero({ isPreloaderDone = true }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { transitionToColor } = useTheme();

  useEffect(() => {
    transitionToColor('#ffffff', 400);
  }, [transitionToColor]);

  return (
    <section id="section-hero" ref={sectionRef} className={styles.hero}>
      <div className={styles.heroContent}>
        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0 }}
          animate={isPreloaderDone ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {isPreloaderDone && (
            <>
              <StaggerText by="character" staggerDelay={0.03} initialDelay={0.2} y={15}>
                제조업을 위한
              </StaggerText>
              <br />
              <StaggerText by="character" staggerDelay={0.03} initialDelay={0.7} y={15}>
                단 하나의 부동산 솔루션
              </StaggerText>
            </>
          )}
        </motion.h1>
        <motion.p
          className={styles.heroDescription}
          initial={{ opacity: 0, y: 20 }}
          animate={isPreloaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          매물, 경매, 실거래가, 분양정보의 통합 분석부터 현장 맞춤형 데이터까지 한번에
        </motion.p>
      </div>
    </section>
  );
}
