'use client';

import React from 'react';
import StatCard from '@/components/ui/StatCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp, StaggerChildren } from '@/components/ui/animations';
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
      <div className={styles.contentWrapper}>
        <FadeUp>
          <SectionHeader
            sectionName="Data Count"
            sectionNumber="01"
            description="국토부 실거래가, 전국 필지 정보, 산업단지 현황, 경매/공매 물건까지. 제조업 입지 선정에 필요한 모든 데이터를 한곳에서 확인하세요."
          >
            하나의 지도 위,<br />
            제조업에 필요한 모든 정보
          </SectionHeader>
        </FadeUp>

        <div className={styles.mainLayout}>
          <StaggerChildren staggerDelay={0.1} className={styles.cardsGrid}>
            <StatCard
              number={stats[0].number}
              suffix={stats[0].suffix}
              label={stats[0].label}
              id={stats[0].id}
            />
            <StatCard
              number={stats[1].number}
              suffix={stats[1].suffix}
              label={stats[1].label}
              id={stats[1].id}
            />
            <StatCard
              number={stats[2].number}
              suffix={stats[2].suffix}
              label={stats[2].label}
              id={stats[2].id}
            />
            <StatCard
              number={stats[3].number}
              suffix={stats[3].suffix}
              label={stats[3].label}
              id={stats[3].id}
            />
          </StaggerChildren>

          <div className={styles.particleCell}>
            <div id="datacount-particle-anchor" className={styles.particleAnchor} />
          </div>
        </div>
      </div>
    </section>
  );
}
