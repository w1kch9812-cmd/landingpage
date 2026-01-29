'use client';

import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp, SlideIn } from '@/components/ui/animations';
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
        <FadeUp>
          <SectionHeader
            sectionName="Community"
            sectionNumber="02"
            description="제조/물류 기업과 산업 전문 부동산이 모여 활발히 거래하고 있습니다. 매월 수십만 명이 찾는 산업부동산의 중심지입니다."
          >
            산업부동산 주체가 만들어가는<br />
            비즈니스 허브
          </SectionHeader>
        </FadeUp>

        <div className={styles.statsGrid}>
          {communityStats.map((stat, index) => (
            <SlideIn key={index} direction="up" delay={0.1 * index} distance={40}>
              <div className={styles.statItem}>
                <p className={styles.statLabel}>{stat.label}</p>
                <div className={styles.statNumber}>
                  {stat.number && <span className={styles.number}>{stat.number}</span>}
                  <span className={styles.suffix}>{stat.suffix}</span>
                </div>
                <p className={styles.statDescription}>{stat.description}</p>
              </div>
            </SlideIn>
          ))}
        </div>

        <div className={styles.anchorCell}>
          <div id="community-particle-anchor" className={styles.particleAnchor} />
        </div>
      </div>
    </section>
  );
}
