'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';
import styles from './Showcase.module.css';

const SplineScene = dynamic(() => import('@/components/3d/SplineScene'), {
  ssr: false,
  loading: () => <div className={styles.splineFallback} />,
});

export default function Showcase() {
  return (
    <section id="section-showcase" className={styles.showcase}>
      <div className={styles.splineWrapper}>
        <SplineScene
          sceneUrl="/spline/container.splinecode"
          interactive={false}
        />
      </div>

      <div className={styles.content}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          산업부동산 전문 데이터 플랫폼
        </motion.p>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          가봐야 알았던 정보,<br />
          <span className={styles.muted}>이제 클릭 한 번으로</span>
        </motion.h2>
        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          천장 높이, 전력 용량, 크레인 유무까지.<br />
          현장에서 꼭 확인해야 했던 스펙을 미리 필터링하세요.
        </motion.p>
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CTAButton href="https://gongzzang.com" size="medium">
            무료로 시작하기
          </CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
