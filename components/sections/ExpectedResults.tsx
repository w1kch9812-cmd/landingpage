'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp, SlideIn } from '@/components/ui/animations';
import styles from './ExpectedResults.module.css';

// GSAP ScrollTrigger 등록
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 핵심 효율성 지표
const efficiencyMetrics = [
  {
    value: '70',
    suffix: '%',
    label: '현장 방문 감소',
    description: '상세 스펙 필터로 조건에 맞지 않는 매물을 사전에 걸러냅니다.',
  },
  {
    value: '95',
    suffix: '%',
    label: '비교 분석 시간 단축',
    description: '5개 산단 비교에 한 달 걸리던 작업을 하루 만에.',
  },
  {
    value: '85',
    suffix: '%',
    label: '탐색 기간 단축',
    description: '6개월 이상 소요되던 공장 탐색을 3주로 단축.',
  },
];

// 숫자 파싱 및 포맷팅
function parseNumber(value: string): number {
  return parseInt(value.replace(/,/g, ''), 10);
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
            setDisplayValue(Math.floor(obj.value).toString());
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [value]);

  return (
    <div ref={ref} className={styles.metricValue}>
      <span className={styles.number}>{displayValue}</span>
      <span className={styles.suffix}>{suffix}</span>
    </div>
  );
}

export default function ExpectedResults() {
  return (
    <section id="section-expected-results" className={styles.section}>
      <div className={styles.container}>
        <FadeUp>
          <SectionHeader
            sectionName="Expected Results"
            sectionNumber="05"
            description="발품 팔고, 전화 돌리고, 엑셀 정리하던 시간을 아끼세요."
          >
            공짱을 쓰면<br />
            이렇게 달라집니다
          </SectionHeader>
        </FadeUp>

        {/* 핵심 효율성 지표 - 3열 그리드 */}
        <div className={styles.metricsGrid}>
          {efficiencyMetrics.map((metric, index) => (
            <SlideIn key={index} direction="up" delay={0.1 * index} distance={30}>
              <div className={styles.metricCard}>
                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                <div className={styles.metricLabel}>{metric.label}</div>
                <p className={styles.metricDescription}>{metric.description}</p>
              </div>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}
