'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import styles from './CoreFeatures.module.css';

const features = [
  {
    id: 1,
    title: '제조 현장 맞춤 필터',
    subtitle: '"기계가 들어갈 공간인가?"를 먼저 확인하세요.',
    description: '호이스트, 크레인, 동력(전력), 층고 등 생산 설비에 필수적인 스펙으로 매물을 찾을 수 있습니다.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M12 12h.01" />
        <path d="M17 12h.01" />
        <path d="M7 12h.01" />
      </svg>
    ),
  },
  {
    id: 2,
    title: '물류/입지 최적화 분석',
    subtitle: '"물류비 절감은 입지에서 시작됩니다."',
    description: '대형 트레일러 진입 가능 여부, 진입도로 폭, 고속도로 IC와의 거리 등 입지 경쟁력을 따져보세요.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: 3,
    title: '투명한 실거래가 통계',
    subtitle: '"다른 부동산을 걷어낸 진짜 시세를 확인하세요."',
    description: '산업부동산 전용 실거래가만을 추출하여, 정확한 시장 가격 흐름과 적정 매매가를 제시합니다.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    id: 4,
    title: '스마트 매칭 시스템',
    subtitle: '"원하는 조건의 공장, 놓치지 마세요."',
    description: '희망하는 스펙과 입지 조건을 저장하면, 부합하는 신규 매물 등록 시 즉시 알림을 발송합니다.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    ),
  },
];

export default function CoreFeatures() {
  const containerRef = useRef<HTMLElement>(null);

  // Body background color interpolation based on scroll position
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const securitySection = document.getElementById('section-security');
      const securityRect = securitySection?.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Dark zone: from CoreFeatures top to Security bottom
      const enterStart = windowHeight;
      const enterEnd = windowHeight * 0.5;
      const exitStart = windowHeight * 0.5;
      const exitEnd = 0;

      // 다크 섹션 영역에 있는지 확인
      const inDarkZone = rect.top < enterStart && (!securityRect || securityRect.bottom > exitEnd);

      // 다크 섹션 영역 밖이면 Hero/다른 섹션이 배경색 제어하도록 건드리지 않음
      if (!inDarkZone) return;

      // progress: 0 = white, 1 = dark (rgb(0,21,48))
      let progress = 0;

      // Entering dark zone (CoreFeatures coming into view)
      if (rect.top > enterEnd) {
        progress = (enterStart - rect.top) / (enterStart - enterEnd);
      }
      // Inside dark zone
      else if (!securityRect || securityRect.bottom >= exitStart) {
        progress = 1;
      }
      // Exiting dark zone (Security leaving view)
      else if (securityRect.bottom > exitEnd) {
        progress = securityRect.bottom / exitStart;
      }

      progress = Math.max(0, Math.min(1, progress));

      // Interpolate: white(255,255,255) -> dark(0,21,48)
      const r = Math.round(255 - progress * 255);
      const g = Math.round(255 - progress * 234);
      const b = Math.round(255 - progress * 207);

      document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="section-corefeatures" ref={containerRef} className={styles.section}>
      <div className={styles.container}>
        {/* Left: 파티클 Anchor 영역 (sticky) */}
        <div id="corefeatures-particle-anchor" className={styles.particleAnchor}>
          <div className={styles.anchorContent}>
            {/* 파티클이 이 영역 중앙에 위치 - GlobalParticle3D에서 처리 */}
            <div className={styles.headerInAnchor}>
              <Badge text="Core Features" variant="dark" />
              <h2 className={styles.title}>
                현장을 아는 사람들이 만든,
                <br />
                <span className={styles.highlight}>현장에 필요한 기능</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Right: 스크롤되는 기능 카드들 */}
        <div className={styles.featuresScroll}>
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: (typeof features)[0];
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={cardRef}
      id={`section-corefeature-${index + 1}`}
      className={styles.featureCard}
      style={{ opacity, y }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>{feature.icon}</div>
        <span className={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className={styles.cardTitle}>{feature.title}</h3>
      <p className={styles.cardSubtitle}>{feature.subtitle}</p>
      <p className={styles.cardDescription}>{feature.description}</p>
    </motion.div>
  );
}
