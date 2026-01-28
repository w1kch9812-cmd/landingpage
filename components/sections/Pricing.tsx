'use client';

import React from 'react';
import SectionHeader, { Muted } from '@/components/ui/SectionHeader';
import styles from './Pricing.module.css';

const comparisonData = {
  general: {
    title: '일반 플랫폼',
    features: [
      { label: '지도 기반 통합 검색', available: true },
      { label: '기본 매물 검색', available: true },
      { label: '매물 사진 확인', available: true },
      { label: '산업부동산 매물', available: false },
      { label: '현장 스펙 필터 (천장고, 전력, 하중)', available: false },
      { label: '실거래가 기반 시세 비교', available: false },
      { label: '경매·분양 통합 검색', available: false },
      { label: '용도지역·화물차 진입 확인', available: false },
      { label: '프라이빗 매물', available: false },
    ],
  },
  gongzzang: {
    title: '공짱',
    features: [
      { label: '지도 기반 통합 검색', available: true },
      { label: '기본 매물 검색', available: true },
      { label: '매물 사진 확인', available: true },
      { label: '산업부동산 매물', available: true },
      { label: '현장 스펙 필터 (천장고, 전력, 하중)', available: true },
      { label: '실거래가 기반 시세 비교', available: true },
      { label: '경매·분양 통합 검색', available: true },
      { label: '용도지역·화물차 진입 확인', available: true },
      { label: '프라이빗 매물', available: true },
    ],
  },
};

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.1" />
    <path d="M14 7L8.5 12.5L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.05" />
    <path d="M13 7L7 13M7 7L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ComparisonCard = ({ data, isHighlighted }: { data: typeof comparisonData.general; isHighlighted?: boolean }) => (
  <div className={`${styles.comparisonCard} ${isHighlighted ? styles.highlighted : ''}`}>
    <div className={styles.cardHeader}>
      <h3 className={styles.cardTitle}>{data.title}</h3>
      {isHighlighted && <span className={styles.recommendBadge}>추천</span>}
    </div>
    <div className={styles.featureList}>
      {data.features.map((feature, index) => (
        <div
          key={index}
          className={`${styles.featureItem} ${feature.available ? styles.available : styles.unavailable}`}
        >
          <span className={styles.featureIcon}>
            {feature.available ? <CheckIcon /> : <XIcon />}
          </span>
          <span className={styles.featureLabel}>{feature.label}</span>
        </div>
      ))}
    </div>
    {isHighlighted && (
      <div className={styles.cardFooter}>
        <p className={styles.footerNote}>플랫폼 이용은 무료입니다</p>
      </div>
    )}
  </div>
);

export default function Pricing() {
  return (
    <section id="section-pricing" className={styles.section}>
      {/* Header */}
      <div className={styles.headerGrid}>
        <SectionHeader sectionName="Comparison" sectionNumber="05">
          왜 <span className={styles.primaryText}>공짱</span><Muted>일까요?</Muted>
        </SectionHeader>
      </div>

      {/* Comparison Cards */}
      <div className={styles.cardsContainer}>
        <ComparisonCard data={comparisonData.general} />
        <ComparisonCard data={comparisonData.gongzzang} isHighlighted />
      </div>
    </section>
  );
}
