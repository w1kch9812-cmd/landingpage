'use client';

import React from 'react';
import StatCard from '@/components/ui/StatCard';
import SectionHeader, { Muted } from '@/components/ui/SectionHeader';
import styles from './InfoSection.module.css';

const stats = [
  { number: 250000, suffix: '+', label: '국토부 실거래가', id: 'Transactions' },
  { number: 10000, suffix: '+', label: '실시간 매물', id: 'Listings' },
  { number: 1200, suffix: '+', label: '산업단지 현황', id: 'Districts' },
  { number: 0, suffix: 'Daily', label: '경매/공매 물건', id: 'Auction' },
];

export default function InfoSection() {
  return (
    <section id="section-info" className={styles.section}>
      {/* 3D 파티클 앵커 (좌측 영역) */}
      <div id="particle-anchor" className={styles.particleAnchor} />

      {/* 콘텐츠 */}
      <div className={styles.contentWrapper}>
        {/* 헤더 + 설명 */}
        <div className={styles.headerArea}>
          <SectionHeader sectionName="Data" sectionNumber="01">
            흩어진 정보를 <Muted>하나의 지도에</Muted>
          </SectionHeader>
          <p className={styles.description}>
            <span className={styles.boldText}>필지, 공장, 지식산업센터, 산업단지.</span> 국토부 실거래가, 법원 경매, 각종 플랫폼 매물까지. 산업부동산에 필요한 모든 정보를 지도 위에서 한눈에 비교하세요.
          </p>
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
