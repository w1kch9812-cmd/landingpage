'use client';

import React, { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.css';

const LAUNCH_DATE = new Date('2026-03-01T00:00:00+09:00').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = LAUNCH_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(showTimer);
    };
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.label}>서비스 런칭까지</div>
      <div className={styles.timer}>
        <div className={styles.timeUnit}>
          <span className={styles.number}>{formatNumber(timeLeft.days)}</span>
          <span className={styles.unit}>일</span>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.timeUnit}>
          <span className={styles.number}>{formatNumber(timeLeft.hours)}</span>
          <span className={styles.unit}>시</span>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.timeUnit}>
          <span className={styles.number}>{formatNumber(timeLeft.minutes)}</span>
          <span className={styles.unit}>분</span>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.timeUnit}>
          <span className={styles.number}>{formatNumber(timeLeft.seconds)}</span>
          <span className={styles.unit}>초</span>
        </div>
      </div>
    </div>
  );
}
