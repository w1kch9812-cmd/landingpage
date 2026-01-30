'use client';

import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import CTAButton from '@/components/ui/CTAButton';
import { FadeUp, StaggerChildren, SlideIn } from '@/components/ui/animations';
import styles from './ProofPoints.module.css';

// 효율성 지표
const efficiencyMetrics = [
  {
    value: '70%',
    label: '현장 방문 감소',
    description: '상세 스펙 필터로 조건에 맞지 않는 매물을 사전에 걸러 헛걸음을 줄입니다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: '95%',
    label: '비교 분석 시간 단축',
    description: '5개 산단 비교에 한 달 걸리던 작업을 하루 만에 완료합니다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: '3주',
    label: '평균 탐색 기간',
    description: '기존 6개월 이상 소요되던 공장 탐색을 3주로 단축합니다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    value: '24/7',
    label: '실시간 알림',
    description: '조건에 맞는 매물이 등록되면 즉시 알림을 받아 기회를 놓치지 않습니다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

// 커뮤니티 통계
const communityStats = [
  { number: '2,000', suffix: '+', label: '기업 회원', description: '제조/물류 기업이 활발히 활동' },
  { number: '1,200', suffix: '+', label: '중개 회원', description: '산업 전문 부동산 파트너' },
  { number: '250,000', suffix: '+', label: '월 방문자', description: '매월 수십만 명이 방문' },
];

// Before/After 비교
const comparisonItems = [
  {
    before: '부동산 중개인 10곳에 전화',
    after: '한 번의 검색으로 전체 매물 확인',
  },
  {
    before: '매물마다 전력량, 층고 직접 문의',
    after: '상세 스펙 필터로 즉시 확인',
  },
  {
    before: '산단별 분양가 개별 조회',
    after: '분양가, 입주 조건 한눈에 비교',
  },
  {
    before: '적정가 몰라서 부르는 대로 계약',
    after: '실거래가 데이터로 협상력 확보',
  },
];

export default function ProofPoints() {
  return (
    <section id="section-proof" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <FadeUp>
          <SectionHeader
            sectionName="Proof Points"
            sectionNumber="04"
            description="발품 팔고, 전화 돌리고, 엑셀 정리하던 시간을 아끼세요. 숫자로 증명하는 공짱의 효율성입니다."
          >
            숫자로 증명하는<br />
            공짱의 가치
          </SectionHeader>
        </FadeUp>

        {/* 효율성 지표 */}
        <StaggerChildren className={styles.metricsGrid}>
          {efficiencyMetrics.map((metric, index) => (
            <div key={index} className={styles.metricCard}>
              <div className={styles.metricIcon}>{metric.icon}</div>
              <div className={styles.metricValue}>{metric.value}</div>
              <div className={styles.metricLabel}>{metric.label}</div>
              <p className={styles.metricDescription}>{metric.description}</p>
            </div>
          ))}
        </StaggerChildren>

        {/* 커뮤니티 통계 */}
        <FadeUp delay={0.2}>
          <div className={styles.communitySection}>
            <h3 className={styles.communityTitle}>활발히 활동 중인 커뮤니티</h3>
            <div className={styles.communityGrid}>
              {communityStats.map((stat, index) => (
                <SlideIn key={index} direction="up" delay={0.1 * index} distance={30}>
                  <div className={styles.communityItem}>
                    <div className={styles.communityNumber}>
                      <span className={styles.number}>{stat.number}</span>
                      <span className={styles.suffix}>{stat.suffix}</span>
                    </div>
                    <p className={styles.communityLabel}>{stat.label}</p>
                    <p className={styles.communityDesc}>{stat.description}</p>
                  </div>
                </SlideIn>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Before/After 비교 */}
        <FadeUp delay={0.3}>
          <div className={styles.comparisonSection}>
            <h3 className={styles.comparisonTitle}>공짱 도입 전후 비교</h3>
            <div className={styles.comparisonGrid}>
              <div className={styles.comparisonColumn}>
                <div className={styles.columnHeader}>
                  <span className={styles.beforeBadge}>Before</span>
                  기존 방식
                </div>
                {comparisonItems.map((item, index) => (
                  <div key={index} className={styles.comparisonItem}>
                    <span className={styles.beforeIcon}>✕</span>
                    <span className={styles.comparisonText}>{item.before}</span>
                  </div>
                ))}
              </div>
              <div className={styles.comparisonDivider}>
                <div className={styles.dividerLine} />
                <div className={styles.dividerArrow}>→</div>
                <div className={styles.dividerLine} />
              </div>
              <div className={styles.comparisonColumn}>
                <div className={styles.columnHeader}>
                  <span className={styles.afterBadge}>After</span>
                  공짱 활용
                </div>
                {comparisonItems.map((item, index) => (
                  <div key={index} className={`${styles.comparisonItem} ${styles.afterItem}`}>
                    <span className={styles.afterIcon}>✓</span>
                    <span className={styles.comparisonText}>{item.after}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        {/* CTA 섹션 */}
        <FadeUp delay={0.4}>
          <div className={styles.ctaSection}>
            <p className={styles.ctaText}>
              지금 바로 공짱에서 원하는 공장을 찾아보세요.
            </p>
            <div className={styles.ctaButtons}>
              <CTAButton
                variant="primary"
                size="large"
                href="https://gongzzang.com"
              >
                무료로 시작하기
              </CTAButton>
              <CTAButton
                variant="outline"
                size="large"
                href="#section-faq"
              >
                자주 묻는 질문
              </CTAButton>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
