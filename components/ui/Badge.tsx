import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  text: string;
  variant?: 'dark' | 'light';
}

export default function Badge({ text, variant = 'dark' }: BadgeProps) {
  return (
    <div className={`${styles.badge} ${variant === 'light' ? styles.light : styles.dark}`}>
      <div className={styles.plusIconWrapper}>
        <div className={styles.plusIcon}>
          <div className={styles.plusV}></div>
          <div className={styles.plusH}></div>
        </div>
      </div>
      <div className={styles.badgeText}>
        <p>{text}</p>
      </div>
    </div>
  );
}
