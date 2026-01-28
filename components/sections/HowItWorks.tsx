'use client';

import React, { useEffect, useRef } from 'react';
import SectionHeader, { Muted } from '@/components/ui/SectionHeader';
import CTAButton from '@/components/ui/CTAButton';
import styles from './HowItWorks.module.css';

// Plus Circle Icon
const PlusCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
    <path d="M128,24A104,104,0,1,0,232,128,104.13,104.13,0,0,0,128,24Zm40,112H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32a8,8,0,0,1,0,16Z" />
  </svg>
);

// Feature icons
const icons = {
  lightning: (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
      <path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17Z" />
    </svg>
  ),
  rocket: (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
      <path d="M152,224a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,224ZM128,112a12,12,0,1,0-12-12A12,12,0,0,0,128,112Zm95.62,43.83-12.36,55.63a16,16,0,0,1-25.51,9.11L158.51,200h-61L70.25,220.57a16,16,0,0,1-25.51-9.11L32.38,155.83a16.09,16.09,0,0,1,3.32-13.71l28.56-34.26a123.07,123.07,0,0,1,8.57-36.67c12.9-32.34,36-52.63,45.37-59.85a16,16,0,0,1,19.6,0c9.34,7.22,32.47,27.51,45.37,59.85a123.07,123.07,0,0,1,8.57,36.67l28.56,34.26A16.09,16.09,0,0,1,223.62,155.83Z" />
    </svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z" />
    </svg>
  ),
};

const features = [
  { icon: 'lightning', title: '50+ 고급 필터', desc: '천장 높이, 전력 용량, 크레인, 호이스트 등 현장 스펙으로 필터링합니다.' },
  { icon: 'rocket', title: '시각화 분석', desc: '가격, 면적, 거래 활동을 색상으로 표현해 패턴을 한눈에 파악합니다.' },
  { icon: 'clock', title: '비교 저장', desc: '관심 매물을 저장하고, 여러 물건을 나란히 비교할 수 있습니다.' },
];

const points = [
  '필지·공장·지산센 통합 지도',
  '실거래·매물·경매 한눈에',
  '50+ 고급 필터',
  '지역별 시세 분석',
  '산업단지 정보',
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  // Body background color interpolation based on scroll position
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const securitySection = document.getElementById('section-security');
      const securityRect = securitySection?.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Dark zone: from HowItWorks top to Security bottom
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

      // Entering dark zone (HowItWorks coming into view)
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
    <section id="section-howitworks" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Headline */}
        <div className={styles.headline}>
          <SectionHeader sectionName="Features" sectionNumber="03" variant="dark">
            지도 위에서 <Muted>모든 정보를 한눈에</Muted>
          </SectionHeader>
        </div>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          {/* Card 1 - Main Feature Card (tall) */}
          <div className={styles.card1}>
            <div className={styles.card1Top}>
              <div className={styles.pointsList}>
                {points.map((point, i) => (
                  <div key={i} className={styles.pointItem}>
                    <PlusCircleIcon />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.card1Bottom}>
              <div className={styles.card1Bg}>
                <div id="particle-howitworks-anchor" className={styles.particleAnchor} />
              </div>
              <div className={styles.card1Title}>
                <p>산업용 부동산 맞춤 플랫폼</p>
              </div>
              <div className={styles.card1Actions}>
                <span className={styles.card1Year}>© 2025</span>
                <CTAButton href="https://gongzzang.com" size="small">
                  지도 열기
                </CTAButton>
              </div>
            </div>
          </div>

          {/* Card 2 - Social Proof */}
          <div className={styles.card2}>
            <div className={styles.card2Top}>
              <div className={styles.avatarGroup}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={styles.avatar} />
                ))}
              </div>
              <div className={styles.rating}>
                <span>4.9/5</span>
                <svg width="12" height="12" viewBox="0 0 256 256" fill="#757575">
                  <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z" />
                </svg>
              </div>
            </div>
            <div className={styles.card2Desc}>
              <p><span className={styles.highlight}>100+</span> 사업자가 사용 중</p>
            </div>
            <div className={styles.card2Bottom}>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 256 256" fill="rgb(0, 21, 48)">
                    <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z" />
                  </svg>
                ))}
              </div>
              <p className={styles.testimonial}>
                "공짱 덕분에 헛걸음이 확 줄었어요. 천장 높이랑 전력 용량 미리 보고 갔더니 시간 낭비가 없더라고요."
              </p>
              <div className={styles.reviewer}>
                <div className={styles.reviewerAvatar} />
                <div className={styles.reviewerInfo}>
                  <p className={styles.reviewerName}>김OO 대표</p>
                  <p className={styles.reviewerRole}>금속가공업</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Feature Cards Stack */}
          <div className={styles.card3}>
            {features.map((feature, i) => (
              <div key={i} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  {icons[feature.icon as keyof typeof icons]}
                </div>
                <div className={styles.featureContent}>
                  <p className={styles.featureTitle}>{feature.title}</p>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
