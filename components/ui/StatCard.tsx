'use client';

import React from 'react';
import styles from './StatCard.module.css';

interface StatCardProps {
  number: number;
  suffix: string;
  label: string;
  id?: string;
}

// 숫자를 "만" 단위로 포맷팅
function formatNumber(num: number, suffix: string): string {
  if (num === 0) return suffix;

  if (num >= 10000) {
    const man = num / 10000;
    // 정수면 소수점 없이, 아니면 소수점 1자리
    const formatted = man % 1 === 0 ? man.toString() : man.toFixed(1);
    return `${formatted.replace(/\.0$/, '')}만${suffix}`;
  }

  return `${num.toLocaleString()}${suffix}`;
}

export default function StatCard({ number, suffix, label, id }: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.number}>
          {formatNumber(number, suffix)}
        </div>
        {id && <span className={styles.cardId}>{id}</span>}
      </div>
      <p className={styles.cardLabel}>{label}</p>
    </div>
  );
}
