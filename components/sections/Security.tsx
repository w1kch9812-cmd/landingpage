'use client';

import React from 'react';
import SectionHeader, { Muted } from '@/components/ui/SectionHeader';
import styles from './Security.module.css';

// Shield icon
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
    <path d="M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,26.07,47.48,26.56a8,8,0,0,0,5.18,0c1.49-.49,24.42-7.7,47.48-26.56C200.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm0,72c0,37.07-13.66,67.16-40.6,89.42A129.43,129.43,0,0,1,128,223.62a128.86,128.86,0,0,1-39.4-22.2C61.66,179.16,48,149.07,48,112V56H208Z" />
  </svg>
);

// Lock icon
const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
    <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-80-96a28,28,0,0,0-8,54.83V184a8,8,0,0,0,16,0V166.83A28,28,0,0,0,128,112Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,128,152Z" />
  </svg>
);

// Eye off icon
const EyeOffIcon = () => (
  <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
    <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z" />
  </svg>
);

const features = [
  {
    icon: <ShieldIcon />,
    title: '완벽한 정보 보호',
    description: '검증된 실수요자만 매물 정보에 접근할 수 있습니다.',
  },
  {
    icon: <LockIcon />,
    title: '검증된 기업 매칭',
    description: '공개 범위를 직접 선택하여 노출을 제한할 수 있습니다.',
  },
  {
    icon: <EyeOffIcon />,
    title: '내부 동요 방지',
    description: '매각 의사가 외부에 노출되지 않도록 보호합니다.',
  },
];

export default function Security() {
  return (
    <section id="section-security" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <SectionHeader sectionName="Security" sectionNumber="04" variant="dark">
            매각 소문, 걱정되시나요? <Muted>철저한 보안 속에 실수요자에게만 공개하세요.</Muted>
          </SectionHeader>
          <p className={styles.description}>
            매물 노출 범위를 직접 선택하세요. 공짱은 사업자 인증을 완료한 검증된 실수요자에게만 정보를 공개하는 '프라이빗 매물' 시스템을 도입하여, 귀사의 비즈니스 기밀을 완벽하게 보호합니다.
          </p>
        </div>

        {/* Feature Cards */}
        <div className={styles.cards}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardIcon}>{feature.icon}</div>
              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>{feature.title}</p>
                <p className={styles.cardDescription}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
