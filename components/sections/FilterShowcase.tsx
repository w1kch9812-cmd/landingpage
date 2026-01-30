'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp } from '@/components/ui/animations';
import styles from './FilterShowcase.module.css';

// 실제 gongzzang 필터 탭 구조 기반
const filterTabs = [
  {
    name: '기본',
    filters: ['매물유형', '거래유형', '면적(대지/연면적/전용)'],
  },
  {
    name: '건물',
    filters: ['건물구조', '층수', '준공년도', '건폐율/용적률', '내진설계'],
  },
  {
    name: '토지',
    filters: ['지목', '용도지역', '공시지가', '지형(형상/고저)', '도로접면'],
  },
  {
    name: '시설',
    filters: ['전력용량(kW)', '천정고(m)', '바닥하중(t/㎡)', '크레인/도크/호이스트'],
  },
  {
    name: '경매',
    filters: ['경매상태', '감정가', '최저가율', '유찰횟수', '낙찰가율'],
  },
];

// 필터 프리셋
const filterPresets = [
  { icon: '🏭', name: '제조업 창업', desc: '50-200평, 호이스트, 전력 300kW+' },
  { icon: '📦', name: '물류/창고업', desc: '1층, 천정고 6m+, 대지 500평+' },
  { icon: '🏢', name: '지식산업센터', desc: '준공 5년 이내, 소형 사무실' },
  { icon: '⚙️', name: '중장비 제조', desc: '천정고 7m+, 크레인, 전력 1MW+' },
];

// 흐름 단계
const flowSteps = [
  {
    number: '01',
    icon: '🔍',
    title: '5개 탭, 50+ 필터',
    description: '공장 전용 필터로 조건을 세밀하게 설정',
  },
  {
    number: '02',
    icon: '💾',
    title: '필터 저장 (최대 20개)',
    description: '자주 쓰는 조건을 프리셋으로 저장',
  },
  {
    number: '03',
    icon: '🔔',
    title: '신규 매물 알림',
    description: '저장 조건에 맞는 매물 등록 시 알림',
  },
];

export default function FilterShowcase() {
  return (
    <section id="section-filter-showcase" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <FadeUp>
          <SectionHeader
            sectionName="Smart Filter"
            sectionNumber="04"
            description="5개 탭, 50개 이상의 필터로 원하는 조건을 정밀하게 설정하세요. 저장해두면 조건에 맞는 새 매물이 등록될 때 알림을 받을 수 있습니다."
          >
            공장 전용 필터로<br />
            딱 맞는 매물만
          </SectionHeader>
        </FadeUp>

        {/* Main Content */}
        <div className={styles.content}>
          {/* Left: Filter Tabs */}
          <FadeUp delay={0.1}>
            <div className={styles.filterSection}>
              {/* Tab Preview */}
              <div className={styles.tabPreview}>
                <div className={styles.tabBar}>
                  {filterTabs.map((tab, i) => (
                    <span key={i} className={`${styles.tab} ${i === 3 ? styles.activeTab : ''}`}>
                      {tab.name}
                    </span>
                  ))}
                </div>
                <div className={styles.tabContent}>
                  <span className={styles.tabLabel}>시설 탭 필터 예시</span>
                  <div className={styles.filterItems}>
                    {filterTabs[3].filters.map((f, i) => (
                      <span key={i} className={styles.filterItem}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Presets */}
              <div className={styles.presets}>
                <span className={styles.presetsLabel}>추천 프리셋</span>
                <div className={styles.presetGrid}>
                  {filterPresets.map((preset, i) => (
                    <motion.div
                      key={i}
                      className={styles.presetCard}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <span className={styles.presetIcon}>{preset.icon}</span>
                      <div className={styles.presetInfo}>
                        <span className={styles.presetName}>{preset.name}</span>
                        <span className={styles.presetDesc}>{preset.desc}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Right: Flow */}
          <FadeUp delay={0.2}>
            <div className={styles.flowSection}>
              <span className={styles.flowTitle}>필터 저장 → 알림</span>
              {flowSteps.map((step, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    className={styles.flowStep}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className={styles.stepNumber}>{step.number}</div>
                    <div className={styles.stepIcon}>{step.icon}</div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>{step.title}</h4>
                      <p className={styles.stepDescription}>{step.description}</p>
                    </div>
                  </motion.div>
                  {index < flowSteps.length - 1 && (
                    <div className={styles.flowConnector}>
                      <motion.div
                        className={styles.connectorDot}
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
