'use client';

import React from 'react';
import StatCard from '@/components/ui/StatCard';
import SectionHeader, { Muted } from '@/components/ui/SectionHeader';
import styles from './DataCount.module.css';

const stats = [
  {
    number: 7000000,
    suffix: '+',
    label: '국토부 실거래가 데이터',
    id: 'Transactions'
  },
  {
    number: 39800000,
    suffix: '+',
    label: '전국 필지 정보',
    id: 'Parcels'
  },
  {
    number: 1200,
    suffix: '+',
    label: '산업단지 현황',
    id: 'Districts'
  },
  {
    number: 0,
    suffix: 'Daily',
    label: '경매/공매 물건',
    id: 'Auction'
  },
];

export default function DataCount() {
  return (
    <section id="section-data-count" className={styles.section}>
      {/* 3D 파티클 앵커 (좌측 영역) */}
      <div id="datacount-particle-anchor" className={styles.particleAnchor} />

      {/* 콘텐츠 */}
      <div className={styles.contentWrapper}>
        {/* 헤더 + 설명 */}
        <div className={styles.headerArea}>
          <SectionHeader sectionName="Data Count" sectionNumber="01">
            하나의 지도 위, <Muted>제조업에 필요한 모든 정보</Muted>
          </SectionHeader>
        </div>

        {/* 카드 영역 - 100% 폭 */}
        <div className={styles.cards}>
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              number={stat.number}
              suffix={stat.suffix}
              label={stat.label}
              id={stat.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
