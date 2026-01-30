'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FadeUp } from '@/components/ui/animations';
import styles from './SocialProof.module.css';

// GSAP ScrollTrigger 등록
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 커뮤니티 통계 데이터
const communityStats = [
  {
    value: '2,000',
    suffix: '+',
    label: '기업 회원',
    description: '제조/물류 기업이 활발히 활동',
  },
  {
    value: '1,200',
    suffix: '+',
    label: '중개 회원',
    description: '산업 전문 부동산 파트너',
  },
  {
    value: '250,000',
    suffix: '+',
    label: '월 방문자',
    description: '매월 수십만 명이 신뢰',
  },
];

// 숫자 파싱
function parseNumber(value: string): number {
  return parseInt(value.replace(/,/g, ''), 10);
}

// 숫자 포맷팅 (천 단위 콤마)
function formatNumber(num: number): string {
  return num.toLocaleString();
}

// GSAP 기반 숫자 카운팅 컴포넌트
function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState('0');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const targetNumber = parseNumber(value);
    const obj = { value: 0 };

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        gsap.to(obj, {
          value: targetNumber,
          duration: 2,
          ease: 'power3.out',
          onUpdate: () => {
            setDisplayValue(formatNumber(Math.floor(obj.value)));
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [value]);

  return (
    <div ref={ref} className={styles.statValue}>
      <span className={styles.number}>{displayValue}</span>
      <span className={styles.suffix}>{suffix}</span>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section id="section-social-proof" className={styles.section}>
      <div className={styles.container}>
        <FadeUp>
          <div className={styles.header}>
            <p className={styles.tagline}>이미 많은 분들이 공짱을 이용하고 있습니다</p>
          </div>
        </FadeUp>

        <div className={styles.statsRow}>
          {communityStats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div className={styles.statLabel}>{stat.label}</div>
              <p className={styles.statDescription}>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
