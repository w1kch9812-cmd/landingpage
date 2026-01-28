'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Partners.module.css';

interface Partner {
  name: string;
  logo: string;
}

// 모든 파트너를 단일 배열로 통합
const partners: Partner[] = [
  { name: '한화솔루션', logo: '/logos/한화솔루션.svg' },
  { name: 'GS건설', logo: '/logos/GS건설.svg' },
  { name: '대우건설', logo: '/logos/대우건설.svg' },
  { name: '한국산업단지공단', logo: '/logos/한국산업단지공단.svg' },
  { name: '충북개발공사', logo: '/logos/충북개발공사.svg' },
  { name: '평택도시공사', logo: '/logos/평택도시공사.svg' },
  { name: '한국농어촌공사', logo: '/logos/한국농어촌공사.svg' },
  { name: '새날', logo: '/logos/새날.svg' },
  { name: '한국프롭테크포럼', logo: '/logos/한국프롭테크포럼.svg' },
  { name: '평택시', logo: '/logos/평택시.svg' },
  { name: '청주시', logo: '/logos/청주시.svg' },
  { name: '천안시', logo: '/logos/천안시.svg' },
  { name: '아산시', logo: '/logos/아산시.svg' },
  { name: '하동군', logo: '/logos/하동군.svg' },
  { name: '부산광역시', logo: '/logos/부산광역시.svg' },
  { name: '울산광역시', logo: '/logos/울산광역시.svg' },
  { name: '경주시', logo: '/logos/경주시.svg' },
  { name: '조달청', logo: '/logos/조달청.svg' },
  { name: '한국언론진흥재단', logo: '/logos/한국언론진흥재단.svg' },
];

export default function Partners() {
  return (
    <section id="section-partners" className={styles.section}>
      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          {partners.map((partner, index) => (
            <div key={`a-${index}`} className={styles.logoCard}>
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={40}
                className={styles.logoImage}
              />
            </div>
          ))}
          {/* 무한 루프를 위한 복제 */}
          {partners.map((partner, index) => (
            <div key={`b-${index}`} className={styles.logoCard} aria-hidden="true">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={40}
                className={styles.logoImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
