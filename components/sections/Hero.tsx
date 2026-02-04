'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './Hero.module.css';
import HeroScene from '@/components/3d/HeroScene';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ANIMATION_CONFIG = {
  THEME_TRANSITION_DURATION: 400,
  ANIMATION_READY_DELAY: 1500,
  WORD_ROTATION_INTERVAL: 3000,
  CHAR_EXIT_DURATION: 0.25,
  WIDTH_TRANSITION_DURATION: 0.4,
  CHAR_ENTER_DURATION: 0.35,
  CHAR_STAGGER_DELAY: 0.03,
} as const;

type ShapeType = 'grid' | 'hexagon' | 'ring' | 'wave' | 'gear' | 'molecule' | 'cube';

interface IndustryConfig {
  name: string;
  code: string;
  color: string;
  accentColor: string;
  shape: ShapeType;       // 파티클 형태
}

const industryConfigs: IndustryConfig[] = [
  { name: '식료품제조업',   code: 'C10', color: '#0071ff', accentColor: '#3b82f6', shape: 'wave' },
  { name: '음료제조업',     code: 'C11', color: '#3b82f6', accentColor: '#0071ff', shape: 'wave' },
  { name: '의약품제조업',   code: 'C21', color: '#2563eb', accentColor: '#3b82f6', shape: 'molecule' },
  { name: '금속제조업',     code: 'C24', color: '#0071ff', accentColor: '#2563eb', shape: 'cube' },
  { name: '전기장비제조업', code: 'C28', color: '#1e40af', accentColor: '#3b82f6', shape: 'grid' },
  { name: '가공제품제조업', code: 'C25', color: '#3b82f6', accentColor: '#0071ff', shape: 'gear' },
  { name: '가구제조업',     code: 'C32', color: '#2563eb', accentColor: '#0071ff', shape: 'cube' },
];

const rotatingWords = industryConfigs.map(c => c.name);

interface HeroProps {
  isPreloaderDone?: boolean;
}

export default function Hero({ isPreloaderDone = true }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionFrameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wordContainerRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { transitionToColor } = useTheme();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const isAnimating = useRef(false);

  useEffect(() => {
    transitionToColor('#ffffff', ANIMATION_CONFIG.THEME_TRANSITION_DURATION);
  }, [transitionToColor]);

  useEffect(() => {
    if (!isPreloaderDone) return;

    const readyTimer = setTimeout(() => {
      setIsAnimationReady(true);
    }, ANIMATION_CONFIG.ANIMATION_READY_DELAY);

    return () => clearTimeout(readyTimer);
  }, [isPreloaderDone]);

  const measureRef = useRef<HTMLSpanElement>(null);

  const animateWordChange = useCallback((nextIndex: number) => {
    if (isAnimating.current || !wordContainerRef.current || !measureRef.current) return;
    isAnimating.current = true;

    const container = wordContainerRef.current;
    const currentWordEl = wordRefs.current[currentWordIndex];
    const nextWordEl = wordRefs.current[nextIndex];

    if (!currentWordEl || !nextWordEl) return;

    const currentChars = currentWordEl.querySelectorAll('span');
    const nextChars = nextWordEl.querySelectorAll('span');

    measureRef.current.textContent = rotatingWords[nextIndex];
    const nextWidth = measureRef.current.offsetWidth;

    const timeline = gsap.timeline({
      onComplete: () => {
        setCurrentWordIndex(nextIndex);
        isAnimating.current = false;
      }
    });

    timeline.to(currentChars, {
      y: 30,
      opacity: 0,
      duration: ANIMATION_CONFIG.CHAR_EXIT_DURATION,
      stagger: 0,
      ease: 'power2.in',
    }, 0);

    timeline.fromTo(nextChars,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: ANIMATION_CONFIG.CHAR_ENTER_DURATION,
        stagger: ANIMATION_CONFIG.CHAR_STAGGER_DELAY,
        ease: 'power2.out',
      }, ANIMATION_CONFIG.CHAR_EXIT_DURATION);

    timeline.to(container, {
      width: nextWidth,
      duration: ANIMATION_CONFIG.WIDTH_TRANSITION_DURATION,
      ease: 'power3.inOut',
    }, 0);

  }, [currentWordIndex]);

  useEffect(() => {
    if (!isAnimationReady) return;

    const currentWordEl = wordRefs.current[0];
    if (!currentWordEl) return;

    const chars = currentWordEl.querySelectorAll('span');

    gsap.fromTo(chars,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: ANIMATION_CONFIG.CHAR_ENTER_DURATION,
        stagger: ANIMATION_CONFIG.CHAR_STAGGER_DELAY,
        ease: 'power2.out',
      }
    );
  }, [isAnimationReady]);

  useEffect(() => {
    if (!isAnimationReady) return;

    const interval = setInterval(() => {
      const nextIndex = (currentWordIndex + 1) % rotatingWords.length;
      animateWordChange(nextIndex);
    }, ANIMATION_CONFIG.WORD_ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [isAnimationReady, currentWordIndex, animateWordChange]);

  useEffect(() => {
    if (!sectionRef.current || !sectionFrameRef.current || !isPreloaderDone) return;

    const isMobile = window.matchMedia('(max-width: 809.98px)').matches;
    if (isMobile) return;

    const section = sectionRef.current;
    const sectionFrame = sectionFrameRef.current;

    const ctx = gsap.context(() => {
      gsap.to(section, {
        padding: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.3,
        },
      });

      gsap.to(sectionFrame, {
        borderRadius: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.3,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isPreloaderDone]);

  return (
    <section id="section-hero" ref={sectionRef} className={styles.hero}>
      <div ref={sectionFrameRef} className={styles.sectionFrame}>
        <div className={styles.particleContainer}>
          <HeroScene />
        </div>

        <div ref={contentRef} className={styles.heroContent}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0 }}
            animate={isPreloaderDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {isPreloaderDone && (
              <>
                <span
                  ref={measureRef}
                  className={styles.measureText}
                  aria-hidden="true"
                />
                <span className={styles.titleLine1}>
                  <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    대한민국{' '}
                  </motion.span>
                  <span className={styles.mobileBreak} />
                  <span className={styles.quoteOpen}>"</span>
                  <span
                    ref={wordContainerRef}
                    className={styles.rotatingWordWrapper}
                  >
                    {rotatingWords.map((word, wordIndex) => (
                      <span
                        key={word}
                        ref={el => { wordRefs.current[wordIndex] = el; }}
                        className={`${styles.rotatingWord} ${wordIndex === currentWordIndex ? styles.active : ''}`}
                      >
                        {word.split('').map((char, charIndex) => (
                          <span
                            key={`${word}-${charIndex}`}
                            className={styles.rotatingChar}
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                    ))}
                  </span>
                  <span className={styles.quoteClose}>"</span>
                  <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    을 위한
                  </motion.span>
                </span>
                <br />
                <motion.span
                  className={styles.titleLine}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  산업용 부동산 솔루션
                </motion.span>
              </>
            )}
          </motion.h1>

          <motion.p
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={isPreloaderDone ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            제조업의 다양한 업종을 깊이 이해하는<br />
            전문가들이 모여 최적의 부지를 찾아드립니다.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
