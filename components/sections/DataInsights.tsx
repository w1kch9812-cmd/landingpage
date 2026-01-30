'use client';

import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp, StaggerChildren } from '@/components/ui/animations';
import styles from './DataInsights.module.css';

// 실제 gongzzang 지역통계패널 기반 기능
const dataFeatures = [
  {
    title: '실거래가 추이 분석',
    description: '공장·창고 실거래 데이터를 기반으로 시세 흐름을 파악합니다.',
    details: [
      '월별/분기별 가격 추이 그래프',
      '평당가 변동 트렌드',
      '거래량 변화 추이',
      '지역별 가격 비교',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 16L12 11L15 14L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="21" cy="8" r="2" fill="currentColor"/>
      </svg>
    ),
    color: '#0071ff',
  },
  {
    title: '행정구역별 통계',
    description: '시/군/구 단위로 상세한 시장 현황을 분석합니다.',
    details: [
      '행정구역별 매물 분포',
      '지역별 평균 시세',
      '거래 활성화 지역 표시',
      '신규 매물 등록 추이',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    color: '#00d4aa',
  },
  {
    title: '가격/면적 분포',
    description: '가격대별, 면적대별 매물 분포를 한눈에 확인합니다.',
    details: [
      '가격대별 매물 분포 차트',
      '면적대별 분포 히스토그램',
      '가격-면적 상관관계 분석',
      '희망 조건 적합 매물 비율',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="12" width="4" height="9" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="10" y="8" width="4" height="13" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="17" y="3" width="4" height="18" rx="1" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    color: '#ff9500',
  },
  {
    title: '업종 분포 (KSIC)',
    description: '한국표준산업분류 기반으로 지역 내 업종 현황을 분석합니다.',
    details: [
      '업종별 공장 분포 현황',
      'KSIC 코드 기반 분류',
      '인접 업종 클러스터 확인',
      '업종 특화 지역 파악',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 2C12 2 12 12 12 12L19.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 12L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: '#a855f7',
  },
  {
    title: '경매 통계',
    description: '공장 경매 시장의 핵심 지표를 실시간으로 확인합니다.',
    details: [
      '감정가 대비 낙찰가율',
      '유찰 횟수별 통계',
      '경매 물건 지역 분포',
      '낙찰 추이 분석',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 4L18 7.5L7.5 18H4V14.5L14.5 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6.5L17.5 12" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 21H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: '#ef4444',
  },
  {
    title: '시장 현황 대시보드',
    description: '전체 시장의 동향을 종합 대시보드로 확인합니다.',
    details: [
      '실시간 매물 등록 현황',
      '거래 완료 추이',
      '인기 검색 조건',
      '시장 활성화 지수',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    color: '#06b6d4',
  },
];

const dataStats = [
  { value: '43,266', label: '필지 데이터' },
  { value: '14,193', label: '공장 정보' },
  { value: '6개', label: '통계 대시보드' },
  { value: '실시간', label: '데이터 갱신' },
];

export default function DataInsights() {
  return (
    <section id="section-data-insights" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <FadeUp>
          <SectionHeader
            sectionName="Data Intelligence"
            sectionNumber="07"
            description="지역통계패널에서 가격 추이, 면적 분포, 업종 현황, 경매 동향까지 한눈에 확인하세요. 데이터 기반의 객관적인 의사결정이 가능합니다."
          >
            지역통계패널로<br />
            시장을 읽으세요
          </SectionHeader>
        </FadeUp>

        {/* Data Stats Bar */}
        <FadeUp delay={0.1}>
          <div className={styles.statsBar}>
            {dataStats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Features Grid */}
        <StaggerChildren className={styles.featuresGrid}>
          {dataFeatures.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div
                className={styles.featureIcon}
                style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
              >
                {feature.icon}
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
                <ul className={styles.featureDetails}>
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className={styles.detailItem}>
                      <span
                        className={styles.detailDot}
                        style={{ backgroundColor: feature.color }}
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </StaggerChildren>

        {/* Bottom CTA */}
        <FadeUp delay={0.4}>
          <div className={styles.bottomCta}>
            <div className={styles.ctaContent}>
              <span className={styles.ctaEmoji}>📊</span>
              <div className={styles.ctaText}>
                <h4 className={styles.ctaTitle}>데이터 기반 의사결정의 시작</h4>
                <p className={styles.ctaDescription}>
                  더 이상 감으로 결정하지 마세요. 공짱의 데이터 분석 기능으로 확실한 근거를 확보하세요.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
