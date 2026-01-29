'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import DataCount from '@/components/sections/DataCount';
import Community from '@/components/sections/Community';
import CoreFeatures from '@/components/sections/CoreFeatures';
import PrivateListing from '@/components/sections/PrivateListing';
import Partners from '@/components/sections/Partners';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import LaunchNotify from '@/components/sections/LaunchNotify';
import Footer from '@/components/sections/Footer';
import Preloader from '@/components/Preloader';
import styles from './page.module.css';

const GlobalParticle3D = dynamic(() => import('@/components/3d/GlobalParticle3D'), {
  ssr: false,
});

const CityModelDebugUI = dynamic(() => import('@/components/3d/CityModelDebugUI'), {
  ssr: false,
});

const Particle3DErrorBoundary = dynamic(() => import('@/components/3d/Particle3DErrorBoundary'), {
  ssr: false,
});

export default function LandingPage() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isParticlesReady, setIsParticlesReady] = useState(false);
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

  const handleParticlesReady = useCallback(() => {
    setIsParticlesReady(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    // 프리로더 완료 후 약간의 지연을 두고 콘텐츠 애니메이션 시작
    // 이렇게 하면 프리로더 제거와 애니메이션 시작이 분리되어 렉 감소
    setIsPreloaderDone(true);
    // 다음 프레임에서 콘텐츠 애니메이션 활성화
    requestAnimationFrame(() => {
      setIsContentReady(true);
    });
  }, []);

  const handleRevealProgress = useCallback((progress: number) => {
    setRevealProgress(progress);
  }, []);

  // 콘텐츠 opacity: reveal 진행에 따라 0 -> 1
  const contentOpacity = isPreloaderDone ? 1 : revealProgress;

  return (
    <>
      {/* 파티클: 프리로더 중에도 로드하여 원 안으로 보이게 */}
      <div
        className={styles.particleFixed}
        style={{ opacity: contentOpacity }}
        aria-hidden="true"
      >
        <Particle3DErrorBoundary>
          <GlobalParticle3D onReady={handleParticlesReady} />
        </Particle3DErrorBoundary>
      </div>

      {/* 메인 콘텐츠: 프리로더의 원 안으로 보임 */}
      <main
        className={styles.landingPage}
        style={{ opacity: contentOpacity }}
      >
        <Navbar />
        <Hero isPreloaderDone={isContentReady} />
        <Partners />
        <DataCount />
        <Community />
        <CoreFeatures />
        <PrivateListing />
        <Testimonials />
        <FAQ />
        <LaunchNotify />
        <Footer />
      </main>

      {/* 프리로더: 맨 위에서 마스크 역할 */}
      {!isPreloaderDone && (
        <Preloader
          onComplete={handlePreloaderComplete}
          isAssetsReady={isParticlesReady}
          onRevealProgress={handleRevealProgress}
        />
      )}

      {/* 디버그 UI (개발용 - 배포 시 제거) */}
      {process.env.NODE_ENV === 'development' && <CityModelDebugUI />}
    </>
  );
}
