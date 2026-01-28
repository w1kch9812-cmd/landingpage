'use client';

import React from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import MagneticButton from './MagneticButton';
import styles from './FloatingCTA.module.css';

export default function FloatingCTA() {
  return (
    <MagneticButton className={styles.ctaButton}>
      <span className={styles.ctaText}>무료로 시작하기</span>
      <ArrowRight size={20} weight="regular" color="#ffffff" />
    </MagneticButton>
  );
}
