'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './Hero.module.css';

// GSAP ScrollTrigger 등록
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 순환할 키워드 목록 (KSIC 기반 제조업 주요 업종)
const rotatingWords = [
  '반도체업',     // C26 전자부품, 컴퓨터, 영상, 음향 및 통신장비
  '2차전지업',    // C28 전기장비 제조업
  '자동차부품업', // C30 자동차 및 트레일러 제조업
  '식품가공업',   // C10 식료품 제조업
  '기계장비업',   // C29 기타 기계 및 장비 제조업
  '화학제품업',   // C20 화학물질 및 화학제품 제조업
  '금속가공업',   // C25 금속가공제품 제조업
];

interface HeroProps {
  isPreloaderDone?: boolean;
}

export default function Hero({ isPreloaderDone = true }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wordContainerRef = useRef<HTMLSpanElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const { transitionToColor } = useTheme();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayWord, setDisplayWord] = useState(rotatingWords[0]);
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const isAnimating = useRef(false);

  useEffect(() => {
    transitionToColor('#ffffff', 400);
  }, [transitionToColor]);

  // 초기 애니메이션 완료 후 텍스트 순환 시작
  useEffect(() => {
    if (!isPreloaderDone) return;

    const readyTimer = setTimeout(() => {
      setIsAnimationReady(true);
    }, 1500);

    return () => clearTimeout(readyTimer);
  }, [isPreloaderDone]);

  // 너비 측정을 위한 숨겨진 요소
  const measureRef = useRef<HTMLSpanElement>(null);

  // GSAP 기반 텍스트 전환 애니메이션
  const animateWordChange = useCallback((nextIndex: number) => {
    if (isAnimating.current || !wordContainerRef.current || !measureRef.current) return;
    isAnimating.current = true;

    const container = wordContainerRef.current;
    const currentChars = charsRef.current.filter(Boolean);
    const nextWord = rotatingWords[nextIndex];

    // 다음 단어의 너비 미리 측정
    measureRef.current.textContent = nextWord;
    const nextWidth = measureRef.current.offsetWidth;
    const currentWidth = container.offsetWidth;

    // 현재 글자들 위로 사라지기
    const tl = gsap.timeline({
      onComplete: () => {
        setDisplayWord(nextWord);
        setCurrentWordIndex(nextIndex);
      }
    });

    // 현재 글자들 exit 애니메이션
    tl.to(currentChars, {
      y: -40,
      opacity: 0,
      duration: 0.25,
      stagger: 0.02,
      ease: 'power2.in',
    });

    // 너비 전환 애니메이션 (글자 사라지는 중간에 시작)
    tl.to(container, {
      width: nextWidth,
      duration: 0.5,
      ease: 'power3.inOut',
    }, '-=0.1');

  }, []);

  // 새 글자들 enter 애니메이션
  useEffect(() => {
    if (!isAnimationReady || !wordContainerRef.current) return;

    const currentChars = charsRef.current.filter(Boolean);
    const container = wordContainerRef.current;

    // 컨테이너 너비를 auto로 리셋 (다음 전환을 위해)
    gsap.set(container, { width: 'auto' });

    // 새 글자들 등장
    gsap.fromTo(currentChars,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.03,
        ease: 'power2.out',
        onComplete: () => {
          isAnimating.current = false;
        }
      }
    );
  }, [displayWord, isAnimationReady]);

  // 텍스트 순환 타이머
  useEffect(() => {
    if (!isAnimationReady) return;

    const interval = setInterval(() => {
      const nextIndex = (currentWordIndex + 1) % rotatingWords.length;
      animateWordChange(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAnimationReady, currentWordIndex, animateWordChange]);

  // GSAP 패럴랙스 효과
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !isPreloaderDone) return;

    const ctx = gsap.context(() => {
      // 스크롤시 콘텐츠가 위로 천천히 올라가면서 페이드아웃
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1, // 스크롤에 동기화
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isPreloaderDone]);

  return (
    <section id="section-hero" ref={sectionRef} className={styles.hero}>
      <div className={styles.sectionFrame}>
        <div ref={contentRef} className={styles.heroContent}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0 }}
            animate={isPreloaderDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {isPreloaderDone && (
              <>
                <span className={styles.titleLine}>
                  {/* 너비 측정용 숨겨진 요소 */}
                  <span
                    ref={measureRef}
                    className={styles.measureText}
                    aria-hidden="true"
                  />
                  <span className={styles.quoteOpen}>"</span>
                  <span
                    ref={wordContainerRef}
                    className={styles.rotatingWordWrapper}
                  >
                    <span className={styles.rotatingWord}>
                      {displayWord.split('').map((char, i) => (
                        <span
                          key={`${displayWord}-${i}`}
                          ref={el => { charsRef.current[i] = el; }}
                          className={styles.rotatingChar}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
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
                  단 하나의 부동산 솔루션
                </motion.span>
              </>
            )}
          </motion.h1>

          <motion.p
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={isPreloaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            전력용량, 천정고, 바닥하중, 크레인까지 60+ 필터로 검색.<br />
            14,000+ 공장, 1,300+ 산단, 실거래·경매 데이터를 한 곳에서.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
