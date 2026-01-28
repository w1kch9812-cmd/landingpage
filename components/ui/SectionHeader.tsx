'use client';

import React, { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  sectionName: string;
  sectionNumber: string;
  children: ReactNode;
  variant?: 'light' | 'dark';
}

export default function SectionHeader({ sectionName, sectionNumber, children, variant = 'light' }: SectionHeaderProps) {
  return (
    <div className={`${styles.header} ${variant === 'dark' ? styles.dark : ''}`}>
      <div className={styles.meta}>
        <span className={styles.slash}>/</span>
        <span className={styles.name}>{sectionName}</span>
        <span className={styles.number}>({sectionNumber})</span>
      </div>
      <h2 className={styles.title}>{children}</h2>
    </div>
  );
}

// Muted text helper component
export function Muted({ children }: { children: ReactNode }) {
  return <span className={styles.muted}>{children}</span>;
}
