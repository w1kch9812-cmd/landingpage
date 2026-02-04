'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import SocialProof from '@/components/sections/SocialProof';
import Needs from '@/components/sections/Needs';
import CoreFeatures from '@/components/sections/CoreFeatures';
import TrustSecurity from '@/components/sections/TrustSecurity';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import LaunchNotify from '@/components/sections/LaunchNotify';
import Footer from '@/components/sections/Footer';
import Preloader from '@/components/Preloader';
import CountdownTimer from '@/components/ui/CountdownTimer';
import ProgressiveBlur from '@/components/ui/ProgressiveBlur';
import styles from './page.module.css';

export default function LandingPage() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);
  const [isContentReady, setIsContentReady] = useState(false);

  // 프리로더 중 스크롤 비활성화
  useEffect(() => {
    if (!isPreloaderDone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPreloaderDone]);

  const handlePreloaderComplete = useCallback(() => {
    setIsPreloaderDone(true);
    requestAnimationFrame(() => {
      setIsContentReady(true);
    });
  }, []);

  const handleRevealProgress = useCallback((progress: number) => {
    setRevealProgress(progress);
  }, []);

  const contentOpacity = isPreloaderDone ? 1 : revealProgress;

  return (
    <>
      {/* 메인 콘텐츠 */}
      <main
        className={styles.landingPage}
        style={{ opacity: contentOpacity }}
      >
        <Navbar />

        {/* Hero - sticky로 고정 */}
        <Hero isPreloaderDone={isContentReady} />

        {/* Hero 위로 올라오는 섹션들 */}
        <div className={styles.sectionsWrapper}>
          {/* 01. Needs */}
          <Needs />

          {/* 03. Core Features */}
          <CoreFeatures />

          {/* 04. Private Listing */}
          <TrustSecurity />

          {/* 05. Platform + User */}
          <SocialProof />

          {/* 07. Client Stories */}
          <Testimonials />

          {/* 08. FAQ */}
          <FAQ />

          {/* 09. 출시 알림 */}
          <LaunchNotify />

          {/* Footer */}
          <Footer />
        </div>
      </main>

      {/* 프리로더 */}
      {!isPreloaderDone && (
        <Preloader
          onComplete={handlePreloaderComplete}
          isAssetsReady={true}
          onRevealProgress={handleRevealProgress}
        />
      )}

      {/* 카운트다운 타이머 */}
      {isPreloaderDone && <CountdownTimer />}

      {/* Progressive Blur - 뷰포트 하단 */}
      <ProgressiveBlur position="bottom" height={120} />
    </>
  );
}
