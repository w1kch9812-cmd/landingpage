'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import styles from './Features.module.css';

// Problem icons
const icons = {
  scatter: (
    <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
      <path d="M216,48V88a8,8,0,0,1-16,0V67.31L156.28,111a40,40,0,1,1-11.31-11.31L188.69,56H168a8,8,0,0,1,0-16h40A8,8,0,0,1,216,48ZM96,144a40,40,0,1,0-11.31,27.31L128,214.63l27.31-27.32A40,40,0,0,0,144,128a40.07,40.07,0,0,0-32,16H96Z" opacity="0.6" />
      <circle cx="96" cy="168" r="24" />
      <circle cx="160" cy="88" r="24" />
    </svg>
  ),
  factory: (
    <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
      <path d="M232,208H224V96a8,8,0,0,0-12.8-6.4L152,136V96a8,8,0,0,0-12.8-6.4L80,136V32a8,8,0,0,0-16,0V208H32a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16ZM152,153.6,208,112v96H152Zm-64,0L152,112v41.6l-64,48Zm0,0" />
    </svg>
  ),
  chart: (
    <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
      <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12.06l-64,56a8,8,0,0,1-10.07.38L96.39,114.33,40,163.63V200H224A8,8,0,0,1,232,208Z" />
    </svg>
  ),
  clock: (
    <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z" />
    </svg>
  ),
};

const problems = [
  {
    number: '01',
    title: '여기저기 흩어진 정보',
    description: '매물은 이 사이트, 경매는 저 사이트, 실거래가는 또 다른 곳. 정보 찾느라 하루가 갑니다.',
    icon: 'scatter',
  },
  {
    number: '02',
    title: '가봐야 아는 현장 조건',
    description: '천장 높이, 전력 용량, 크레인 유무. 직접 가봐야 알 수 있는 것들이 너무 많습니다.',
    icon: 'factory',
  },
  {
    number: '03',
    title: '비교가 어려운 시세',
    description: '이 가격이 비싼 건지, 싼 건지. 주변 실거래가와 비교할 수 있는 데이터가 없습니다.',
    icon: 'chart',
  },
  {
    number: '04',
    title: '놓치는 기회',
    description: '괜찮은 매물은 금방 나갑니다. 경매 기일도, 신규 매물도 실시간으로 체크해야 합니다.',
    icon: 'clock',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function Features() {
  return (
    <section id="section-features" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.badgeWrapper}>
            <Badge text="Problems" variant="dark" />
          </div>
          <div className={styles.headingText}>
            <h2>
              여전히 산업부동산은<br />
              <span className={styles.mutedText}>이렇게 어렵습니다</span>
            </h2>
          </div>
          <div className={styles.subtitle}>
            <p>공짱은 이 모든 문제를 해결하기 위해 만들어졌습니다</p>
          </div>
        </motion.div>

        {/* Problem Cards */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              className={styles.featureCard}
              variants={cardVariants}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <div className={styles.featureNumber}>
                    <p>{problem.number}</p>
                  </div>
                  <div className={styles.problemIcon}>
                    {icons[problem.icon as keyof typeof icons]}
                  </div>
                </div>

                <div className={styles.cardBottom}>
                  <div className={styles.featureTitle}>
                    <p>{problem.title}</p>
                  </div>
                  <div className={styles.featureDescription}>
                    <p>{problem.description}</p>
                  </div>
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className={styles.gradientOverlay} />

              {/* Grain Overlay */}
              <div className={styles.grainOverlay} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
