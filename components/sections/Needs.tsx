'use client';

import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp } from '@/components/ui/animations';
import styles from './Needs.module.css';

const needsRows = [
  [
    { icon: '💬', text: '이 공장, 전력 몇 kW까지 들어오나요?', color: '#0071ff' },
    { icon: '⚙️', text: '바닥 하중이 5톤/㎡ 이상인가요?', color: '#3b82f6' },
    { icon: '📦', text: '25톤 트럭 진입 가능한가요?', color: '#2563eb' },
    { icon: '🏭', text: '호이스트 설치 가능한 천장 높이인가요?', color: '#0071ff' },
    { icon: '📊', text: '이 지역 공장 실거래가가 얼마인가요?', color: '#3b82f6' },
    { icon: '🗺️', text: 'IC까지 거리가 어떻게 되나요?', color: '#2563eb' },
  ],
  [
    { icon: '🔍', text: '경매 물건 중 조건 맞는 게 있나요?', color: '#0071ff' },
    { icon: '📋', text: '이 산업단지 입주 업종 제한이 있나요?', color: '#3b82f6' },
    { icon: '💰', text: '분양가 대비 시세가 어떤가요?', color: '#2563eb' },
    { icon: '🏢', text: '제조동과 사무동 면적이 각각 얼마인가요?', color: '#0071ff' },
    { icon: '📈', text: '이 지역 시세 추이가 어떤가요?', color: '#3b82f6' },
    { icon: '🔒', text: '매각 정보 비공개로 진행 가능한가요?', color: '#2563eb' },
  ],
  [
    { icon: '🚚', text: '40피트 컨테이너 회전 가능한가요?', color: '#0071ff' },
    { icon: '⚡', text: '증설 전력 여유가 있나요?', color: '#3b82f6' },
    { icon: '👷', text: '주변 인력 수급 여건은 어떤가요?', color: '#2563eb' },
    { icon: '🏘️', text: '직원 통근 가능한 주거지가 근처에 있나요?', color: '#0071ff' },
    { icon: '📍', text: '유사 업종 기업들이 밀집해 있나요?', color: '#3b82f6' },
    { icon: '📑', text: '토지이용계획 확인해 주실 수 있나요?', color: '#2563eb' },
  ],
  [
    { icon: '🔔', text: '조건 맞는 매물 나오면 알림 받을 수 있나요?', color: '#0071ff' },
    { icon: '🤝', text: '매수자 매칭 서비스가 있나요?', color: '#3b82f6' },
    { icon: '📝', text: '인허가 검토도 도와주시나요?', color: '#2563eb' },
    { icon: '💼', text: '거래 전 과정을 케어해 주시나요?', color: '#0071ff' },
    { icon: '🏗️', text: '신축 vs 구축, 뭐가 나을까요?', color: '#3b82f6' },
    { icon: '📊', text: '이 매물 적정 가격이 맞나요?', color: '#2563eb' },
  ],
];

const duplicatedRows = needsRows.map(row => [...row, ...row]);

export default function Needs() {
  return (
    <section id="section-needs" className={styles.section}>
      <div className={styles.container}>
        <FadeUp>
          <SectionHeader
            sectionName="Needs"
            sectionNumber="01"
            description="전력, 층고, 진입로, 각종 규제까지... 이 수많은 질문 중 하나라도 놓치면 공장은 돌아가지 않으니까요."
          >
            공장 하나를 계약하기 위해,<br />
            검토해야 할 조건만 수십 가지입니다.
          </SectionHeader>
        </FadeUp>
      </div>

      <div className={styles.marqueeContainer}>
        {duplicatedRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`${styles.marqueeTrack} ${rowIndex % 2 === 0 ? styles.trackLeft : styles.trackRight}`}
          >
            {row.map((item, itemIndex) => (
              <div key={`${rowIndex}-${itemIndex}`} className={styles.needsCard}>
                <span
                  className={styles.cardIcon}
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  {item.icon}
                </span>
                <span className={styles.cardText}>{item.text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
