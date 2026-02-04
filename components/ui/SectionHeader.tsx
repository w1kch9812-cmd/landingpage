'use client';

import React, { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  sectionName: string;
  sectionNumber: string;
  children: ReactNode;
  description?: ReactNode;
  variant?: 'light' | 'dark';
  layout?: 'grid' | 'stacked'; // grid: 기본 그리드 레이아웃, stacked: 세로 나열
}

export default function SectionHeader({ sectionName, sectionNumber, children, description, variant = 'light', layout = 'stacked' }: SectionHeaderProps) {
  const headerClasses = [
    styles.header,
    variant === 'dark' ? styles.dark : '',
    layout === 'grid' ? styles.grid : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={headerClasses}>
      <div className={styles.caption}>
        <span className={styles.decorator} aria-hidden="true" />
        <span className={styles.name}>{sectionName}</span>
        <span className={styles.number}>({sectionNumber})</span>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{children}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
}

export function Muted({ children }: { children: ReactNode }) {
  return <span className={styles.muted}>{children}</span>;
}
