'use client';

import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ScrollAnimations';
import styles from './Metrics.module.css';

const savings = [
  {
    value: '1',
    suffix: '주일',
    description: '평균 매물 탐색 기간',
    detail: '기존 2개월 이상 소요',
  },
  {
    value: '50',
    suffix: '개+',
    description: '한 번에 비교 가능한 매물',
    detail: '통합 지도에서 바로',
  },
  {
    value: '0',
    suffix: '원',
    description: '시세 조회 비용',
    detail: '실거래가 무료 제공',
  },
  {
    value: '100',
    suffix: '%',
    description: '수수료 사전 공개',
    detail: '숨겨진 비용 없음',
  },
];

export default function Metrics() {
  return (
    <section id="section-metrics" className={styles.section}>
      <div className={styles.container}>
        {/* Numbers Grid */}
        <StaggerContainer className={styles.numbers} staggerDelay={0.1}>
          {savings.map((saving, index) => (
            <StaggerItem key={index} direction="up">
              <div className={styles.metricCard}>
                <div className={styles.metricNumber}>
                  <span>{saving.value}</span>
                  <span>{saving.suffix}</span>
                </div>
                <div className={styles.metricDescription}>
                  <p>{saving.description}</p>
                </div>
                <div className={styles.metricDetail}>
                  <p>{saving.detail}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom Content */}
        <FadeIn direction="up" delay={0.3}>
          <div className={styles.bottomContent}>
            <div className={styles.intro}>
              <div className={styles.brandText}>
                <p>공짱®</p>
              </div>
            </div>

            <div className={styles.textContainer}>
              <div className={styles.descriptionText}>
                <p>
                  <span className={styles.mutedText}>발품 줄이고, 정보는 더 많이.</span> 여러 사이트 돌아다니며 정보 모으던 시간, 공짱에서 한 번에 해결하세요.
                </p>
              </div>
              <div className={styles.subText}>
                <p>베타 테스트 사용자 기준, 평균 매물 탐색 기간이 2개월에서 1주일로 줄었습니다. 숨겨진 비용 없이 수수료를 미리 확인하고 거래를 진행할 수 있어요.</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
