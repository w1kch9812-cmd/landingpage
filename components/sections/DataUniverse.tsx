'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp } from '@/components/ui/animations';
import styles from './DataUniverse.module.css';

// 실제 gongzzang 레이어 및 데이터 기반
const orbitData = {
  // 1번째 궤도 (안쪽) - 핵심 매물 유형
  orbit1: [
    { name: '공장', shortName: '공장', color: '#0071ff', angle: 0 },
    { name: '창고', shortName: '창고', color: '#0071ff', angle: 90 },
    { name: '지식산업센터', shortName: 'KIC', color: '#0071ff', angle: 180 },
    { name: '필지', shortName: '필지', color: '#0071ff', angle: 270 },
  ],
  // 2번째 궤도 (중간) - 레이어 데이터 (실제 gongzzang 레이어)
  orbit2: [
    { name: '매물마커', shortName: '매물', color: '#00d4aa', angle: 0 },
    { name: '실거래마커', shortName: '실거래', color: '#00d4aa', angle: 60 },
    { name: '경매마커', shortName: '경매', color: '#ff9500', angle: 120 },
    { name: '산업클러스터', shortName: '클러스터', color: '#a855f7', angle: 180 },
    { name: '산업단지', shortName: '산단', color: '#ef4444', angle: 240 },
    { name: '용도지역', shortName: '용도', color: '#06b6d4', angle: 300 },
  ],
  // 3번째 궤도 (바깥) - 상세 스펙 필터
  orbit3: [
    { name: '전력량', shortName: 'kW', color: '#fbbf24', angle: 22.5 },
    { name: '층고', shortName: 'm', color: '#60a5fa', angle: 67.5 },
    { name: '바닥하중', shortName: 't/㎡', color: '#f472b6', angle: 112.5 },
    { name: '크레인', shortName: 'T/H', color: '#34d399', angle: 157.5 },
    { name: '도크', shortName: 'Dock', color: '#a78bfa', angle: 202.5 },
    { name: '호이스트', shortName: 'Hoist', color: '#fb923c', angle: 247.5 },
    { name: 'IC접근성', shortName: 'IC', color: '#38bdf8', angle: 292.5 },
    { name: '업종분류', shortName: 'KSIC', color: '#e879f9', angle: 337.5 },
  ],
};

// 단일 궤도 아이템 컴포넌트
const OrbitItem = ({
  item,
  radius,
  duration,
  size,
}: {
  item: { name: string; shortName: string; color: string; angle: number };
  radius: number;
  duration: number;
  size: 'large' | 'medium' | 'small';
}) => {
  const angleRad = (item.angle * Math.PI) / 180;
  const x = Math.cos(angleRad) * radius;
  const y = Math.sin(angleRad) * radius;

  const sizeClass = styles[`item${size.charAt(0).toUpperCase() + size.slice(1)}`];

  return (
    <motion.div
      className={`${styles.orbitItemWrapper}`}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
      animate={{ rotate: -360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <div
        className={`${styles.orbitItem} ${sizeClass}`}
        style={{
          background: `linear-gradient(135deg, ${item.color}ee 0%, ${item.color}aa 100%)`,
          boxShadow: `0 4px 20px ${item.color}40`,
        }}
      >
        <span className={styles.itemText}>{item.shortName}</span>
      </div>
    </motion.div>
  );
};

// 궤도 컴포넌트
const Orbit = ({
  radius,
  duration,
  items,
  size,
  reverse = false,
}: {
  radius: number;
  duration: number;
  items: typeof orbitData.orbit1;
  size: 'large' | 'medium' | 'small';
  reverse?: boolean;
}) => {
  return (
    <div className={styles.orbit} style={{ width: radius * 2, height: radius * 2 }}>
      {/* 궤도 라인 */}
      <div className={styles.orbitLine} />

      {/* 궤도 위의 아이템들 */}
      <motion.div
        className={styles.orbitItems}
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {items.map((item, index) => (
          <OrbitItem
            key={index}
            item={item}
            radius={radius}
            duration={duration}
            size={size}
          />
        ))}
      </motion.div>
    </div>
  );
};

// 연결선 점 컴포넌트
const ConnectionDot = ({ delay }: { delay: number }) => (
  <motion.div
    className={styles.connectionDot}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.3, 1, 0.3],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  />
);

export default function DataUniverse() {
  return (
    <section id="section-data-universe" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <FadeUp>
          <SectionHeader
            sectionName="Data Universe"
            sectionNumber="08"
            description="매물, 실거래, 경매, 산업클러스터, 산업단지 레이어를 한 지도에서 확인하세요. 지도 위에서 모든 데이터가 연결됩니다."
          >
            레이어 하나로<br />
            모든 정보가 보입니다
          </SectionHeader>
        </FadeUp>

        {/* Solar System Visualization */}
        <FadeUp delay={0.2}>
          <div className={styles.solarSystem}>
            {/* 배경 그라데이션 */}
            <div className={styles.bgGradient} />

            {/* 연결선 점들 */}
            <div className={styles.connectionDots}>
              <ConnectionDot delay={0} />
              <ConnectionDot delay={0.5} />
              <ConnectionDot delay={1} />
              <ConnectionDot delay={1.5} />
            </div>

            {/* 3번째 궤도 (가장 바깥) */}
            <Orbit
              radius={320}
              duration={100}
              items={orbitData.orbit3}
              size="small"
              reverse
            />

            {/* 2번째 궤도 */}
            <Orbit
              radius={220}
              duration={70}
              items={orbitData.orbit2}
              size="medium"
            />

            {/* 1번째 궤도 */}
            <Orbit
              radius={140}
              duration={50}
              items={orbitData.orbit1}
              size="large"
            />

            {/* 중심 - 공짱 */}
            <motion.div
              className={styles.center}
              animate={{
                boxShadow: [
                  '0 0 40px rgba(0, 113, 255, 0.3), inset 0 0 30px rgba(0, 113, 255, 0.1)',
                  '0 0 60px rgba(0, 113, 255, 0.5), inset 0 0 40px rgba(0, 113, 255, 0.2)',
                  '0 0 40px rgba(0, 113, 255, 0.3), inset 0 0 30px rgba(0, 113, 255, 0.1)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className={styles.centerLogo}>공짱</span>
            </motion.div>
          </div>
        </FadeUp>

        {/* 범례 */}
        <FadeUp delay={0.3}>
          <div className={styles.legend}>
            <div className={styles.legendGroup}>
              <span className={styles.legendTitle}>매물 유형</span>
              <div className={styles.legendItems}>
                {orbitData.orbit1.map((item, i) => (
                  <div key={i} className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: item.color }} />
                    <span className={styles.legendName}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.legendDivider} />
            <div className={styles.legendGroup}>
              <span className={styles.legendTitle}>지도 레이어</span>
              <div className={styles.legendItems}>
                {orbitData.orbit2.map((item, i) => (
                  <div key={i} className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: item.color }} />
                    <span className={styles.legendName}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.legendDivider} />
            <div className={styles.legendGroup}>
              <span className={styles.legendTitle}>시설 스펙</span>
              <div className={styles.legendItems}>
                {orbitData.orbit3.slice(0, 4).map((item, i) => (
                  <div key={i} className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: item.color }} />
                    <span className={styles.legendName}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Bottom Stats */}
        <FadeUp delay={0.4}>
          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>6개</span>
              <span className={styles.statLabel}>지도 레이어</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statBox}>
              <span className={styles.statNumber}>43,266</span>
              <span className={styles.statLabel}>필지 데이터</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statBox}>
              <span className={styles.statNumber}>14,193</span>
              <span className={styles.statLabel}>공장 정보</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statBox}>
              <span className={styles.statNumber}>실시간</span>
              <span className={styles.statLabel}>클러스터 분석</span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
