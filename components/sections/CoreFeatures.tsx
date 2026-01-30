'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp } from '@/components/ui/animations';
import styles from './CoreFeatures.module.css';

// 맥락별 탭 구성
const featureTabs = [
  {
    id: 'discover',
    label: '탐색 & 검색',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: '#0071ff',
    features: [
      {
        name: '스마트 필터',
        title: '공장 전용 60+ 필터',
        description: '전력용량, 천정고, 바닥하중, 크레인, 도크, 용도지역까지. 제조·물류 현장에서 실제로 필요한 조건만 모았습니다.',
      },
      {
        name: '추천 프리셋',
        title: '업종별 맞춤 프리셋',
        description: '제조업, 물류, 지식산업센터 등 업종별로 최적화된 검색 조건을 프리셋으로 제공합니다.',
      },
      {
        name: '통합 지도',
        title: '6개 레이어, 하나의 지도',
        description: '매물, 실거래가, 경매, 산업단지, 클러스터, 용도지역을 하나의 지도에서 레이어로 확인합니다.',
      },
    ],
  },
  {
    id: 'analyze',
    label: '분석 & 인사이트',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 16L12 11L15 14L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#ff9500',
    features: [
      {
        name: '비교 분석',
        title: '최대 3개 매물 비교',
        description: '관심 매물을 최대 3개까지 선택해서 면적, 가격, 시설, 입지 조건을 한눈에 비교할 수 있습니다.',
      },
      {
        name: '산업 생태계',
        title: '주변 산업 생태계 분석',
        description: '반경 내 어떤 업종이 밀집해 있는지, 협력업체·경쟁사 분포는 어떤지 KSIC 기반으로 분석합니다.',
      },
      {
        name: '인프라 분석',
        title: '유틸리티 & 인력 수급',
        description: '전기·가스·용수 비용, 주변 인력 수급 현황까지. 입주 전 운영 환경을 사전에 파악하세요.',
      },
      {
        name: '투자 점수',
        title: 'AI 기반 투자 적합도',
        description: '입지, 시설, 가격, 시장 동향을 종합 분석하여 투자 적합도 점수를 제공합니다.',
      },
    ],
  },
  {
    id: 'manage',
    label: '알림 & 관리',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#a855f7',
    features: [
      {
        name: '조건 저장',
        title: '검색 조건 저장',
        description: '자주 사용하는 검색 조건을 저장해두고 언제든 불러와 사용하세요. 최대 20개 프리셋 저장 가능.',
      },
      {
        name: '실시간 알림',
        title: '조건 매칭 알림',
        description: '저장한 조건에 맞는 신규 매물이 등록되면 즉시 알림을 받습니다. 새 매물을 놓치지 마세요.',
      },
    ],
  },
];

export default function CoreFeatures() {
  const [activeTab, setActiveTab] = useState('discover');
  const currentTab = featureTabs.find(t => t.id === activeTab) || featureTabs[0];

  return (
    <section id="section-core-features" className={styles.section}>
      <div className={styles.container}>
        <FadeUp>
          <SectionHeader
            sectionName="Core Features"
            sectionNumber="03"
            description="제조 현장의 니즈를 반영한 60+ 필터, 매물 비교, 산업 생태계 분석까지. 다방·직방에서는 검색조차 안 되는 것들입니다."
          >
            공짱만의<br />
            핵심 기능
          </SectionHeader>
        </FadeUp>

        {/* 탭 네비게이션 */}
        <div className={styles.tabNav}>
          {featureTabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ '--tab-color': tab.color } as React.CSSProperties}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 기능 카드 리스트 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={styles.featureList}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentTab.features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
              >
                <span className={styles.featureBadge}>{feature.name}</span>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
