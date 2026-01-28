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
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        {/* 상단: 숫자 + ID */}
        <div className={styles.cardTop}>
          <div className={styles.numberContainer}>
            <div className={styles.number}>
              {formatNumber(number, suffix)}
            </div>
          </div>
          {id && (
            <div className={styles.cardId}>
              <p>{id}</p>
            </div>
          )}
        </div>

        {/* 하단: 라벨 */}
        <div className={styles.cardBottom}>
          <div className={styles.cardLabel}>
            <p>{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
