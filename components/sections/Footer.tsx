'use client';

import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span className={styles.logo}>공짱</span>
        <span className={styles.divider}>·</span>
        <span className={styles.copyright}>© 2025 (주)세날</span>
      </div>
    </footer>
  );
}
