'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp, StaggerChildren } from '@/components/ui/animations';
import styles from './DataPlatform.module.css';

// GSAP ScrollTrigger 등록
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 핵심 데이터 항목
const dataItems = [
  {
    value: '14,000',
    suffix: '+',
    label: '등록 공장·창고',
    description: '전국 매물 정보를 실시간으로 수집하고 업데이트합니다.',
    source: '국토교통부 · 직접 수집',
  },
  {
    value: '43,000',
    suffix: '+',
    label: '산업용 토지',
    description: '용도지역, 지목, 개별공시지가까지 한눈에 확인할 수 있습니다.',
    source: '국토정보플랫폼',
  },
  {
    value: '1,337',
    suffix: '',
    label: '전국 산업단지',
    description: '분양 중인 산단부터 입주 가능 여부까지 모두 포함합니다.',
    source: '한국산업단지공단',
  },
  {
    value: '60',
    suffix: '+',
    label: '공장 전용 필터',
    description: '전력용량, 천정고, 바닥하중, 크레인 유무 등 제조업 맞춤 검색.',
    source: '공짱 자체 개발',
  },
];

// 숫자 파싱 (콤마 제거)
function parseNumber(value: string): number {
  return parseInt(value.replace(/,/g, ''), 10);
}

// 숫자 포맷팅 (콤마 추가)
function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR');
}

// GSAP 기반 숫자 카운팅 애니메이션
function AnimatedNumber({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
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
          duration: 1.5,
          ease: 'power2.out',
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
    <span ref={ref} className={styles.statValue}>
      {displayValue}
      {suffix && <span className={styles.statSuffix}>{suffix}</span>}
    </span>
  );
}

export default function DataPlatform() {
  return (
    <section id="section-data-platform" className={styles.section}>
      <div className={styles.container}>
        <FadeUp>
          <SectionHeader
            sectionName="Data"
            sectionNumber="02"
            description="국토교통부, 대법원, 산업단지공단 등 공공 데이터를 통합했습니다."
          >
            국내 최대 규모의<br />
            산업부동산 데이터베이스
          </SectionHeader>
        </FadeUp>

        <StaggerChildren staggerDelay={0.1} className={styles.dataGrid}>
          {dataItems.map((item, index) => (
            <div key={index} className={styles.dataCard}>
              <div className={styles.cardHeader}>
                <AnimatedNumber value={item.value} suffix={item.suffix} />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardLabel}>{item.label}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.sourceBadge}>{item.source}</span>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
