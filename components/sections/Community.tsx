'use client';

import React from 'react';
import SectionHeader, { Muted } from '@/components/ui/SectionHeader';
import styles from './Community.module.css';

const communityStats = [
  { number: '2,000', suffix: '+', label: '기업 회원', description: '제조/물류 기업이 활발히 활동합니다.' },
  { number: '1,200', suffix: '+', label: '중개 회원', description: '산업 전문 부동산이 파트너로 활동합니다.' },
  { number: '250,000', suffix: '+', label: '월 평균 방문자 수', description: '매월 수십만 명이 방문합니다.' },
];

export default function Community() {
  return (
    <section id="section-community" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionHeader sectionName="Community" sectionNumber="02">
            산업부동산 주체가 만들어가는 <Muted>비즈니스 허브</Muted>
          </SectionHeader>
        </div>

        <div className={styles.statsGrid}>
          {communityStats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statNumber}>
                {stat.number && <span className={styles.number}>{stat.number}</span>}
                <span className={styles.suffix}>{stat.suffix}</span>
              </div>
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statDescription}>{stat.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.anchorCell}>
          <div id="community-particle-anchor" className={styles.particleAnchor} />
        </div>
      </div>
    </section>
  );
}
