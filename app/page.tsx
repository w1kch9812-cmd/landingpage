'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Partners from '@/components/sections/Partners';
import PainPoints from '@/components/sections/PainPoints';
import HowItWorks from '@/components/sections/HowItWorks';
import CoreFeatures from '@/components/sections/CoreFeatures';
import DataPlatform from '@/components/sections/DataPlatform';
import ExpectedResults from '@/components/sections/ExpectedResults';
import TrustSecurity from '@/components/sections/TrustSecurity';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import LaunchNotify from '@/components/sections/LaunchNotify';
import Footer from '@/components/sections/Footer';
import Preloader from '@/components/Preloader';
import CountdownTimer from '@/components/ui/CountdownTimer';
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

        {/* 1. 도입부: 브랜드 소개 + 신뢰 */}
        <Hero isPreloaderDone={isContentReady} />
        <Partners />

        {/* 2. 문제 제기 */}
        <PainPoints />

        {/* 3. 데이터 (자산): "무엇을 가지고 있는가" */}
        <DataPlatform />

        {/* 4. 기능 (활용): "어떻게 활용하는가" */}
        <CoreFeatures />

        {/* 5. 사용 방법 (참고용, 추후 검토) */}
        <HowItWorks />

        {/* 5. 도입 기대효과: "어떤 결과가 나오는가" */}
        <ExpectedResults />

        {/* 6. 신뢰 & 보안: "안심하고 사용할 수 있는가" */}
        <TrustSecurity />

        {/* 7. 사회적 증명 + 전환 */}
        <Testimonials />
        <FAQ />
        <LaunchNotify />
        <Footer />
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
    </>
  );
}
