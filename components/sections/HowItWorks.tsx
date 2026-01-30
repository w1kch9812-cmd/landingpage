'use client';

import React from 'react';
import { FadeUp, SlideIn } from '@/components/ui/animations';
import styles from './HowItWorks.module.css';

const steps = [
  {
    number: '01',
    title: '조건 설정',
    subtitle: '원하는 스펙을 입력하세요',
    description: '위치, 면적, 전력량, 층고, 호이스트 등 생산 설비에 필요한 조건을 설정합니다. 제조 현장을 아는 공짱만의 맞춤 필터로 헛걸음을 줄이세요.',
    features: ['지역/면적 설정', '전력/층고 필터', '호이스트/크레인 조건', '예산 범위 설정'],
  },
  {
    number: '02',
    title: '통합 검색',
    subtitle: '모든 정보를 한눈에',
    description: '매물, 경매, 분양, 실거래가를 하나의 지도에서 확인합니다. 각 물건의 상세 정보와 주변 시세까지 비교 분석하세요.',
    features: ['매물/경매/분양 통합', '실거래가 시세 비교', '산업단지 정보 확인', '규제 사항 체크'],
  },
  {
    number: '03',
    title: '맞춤 알림',
    subtitle: '놓치지 않도록',
    description: '조건에 맞는 새 매물이 등록되면 즉시 알림을 보내드립니다. 경쟁사보다 한 발 빠르게 좋은 물건을 선점하세요.',
    features: ['실시간 신규 매물 알림', '경매 입찰 일정 알림', '관심 매물 가격 변동', '맞춤 분양 정보'],
  },
];

export default function HowItWorks() {
  return (
    <section id="section-how-it-works" className={styles.section}>
      <div className={styles.container}>
        {/* SectionHeader 제거 - PainPoints에서 자연스럽게 연결됨 */}
        <FadeUp>
          <div className={styles.sectionIntro}>
            <span className={styles.stepBadge}>How It Works</span>
            <h2 className={styles.sectionTitle}>
              3단계로 끝나는 공장 부지 탐색
            </h2>
          </div>
        </FadeUp>

        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <SlideIn key={index} direction="up" delay={0.15 * index} distance={40}>
              <div className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <div className={styles.stepTitles}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepSubtitle}>{step.subtitle}</p>
                  </div>
                </div>
                <p className={styles.stepDescription}>{step.description}</p>
                <ul className={styles.featureList}>
                  {step.features.map((feature, fIndex) => (
                    <li key={fIndex} className={styles.featureItem}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SlideIn>
          ))}
        </div>

        {/* 연결선 (데스크탑만) */}
        <div className={styles.connectorLine} aria-hidden="true">
          <div className={styles.line} />
          <div className={styles.arrow}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
          <div className={styles.line} />
          <div className={styles.arrow}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
          <div className={styles.line} />
        </div>
      </div>
    </section>
  );
}
