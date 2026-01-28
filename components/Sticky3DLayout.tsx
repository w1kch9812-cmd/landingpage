'use client';

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import styles from './Sticky3DLayout.module.css';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'intro', label: '소개' },
  { id: 'features', label: '서비스' },
  { id: 'how-it-works', label: '핵심 기능' },
  { id: 'statistics', label: '프라이빗' },
  { id: 'showcase', label: '성과' },
];

interface Sticky3DLayoutProps {
  children: React.ReactNode;
  splineScene?: string;
}

export default function Sticky3DLayout({ children, splineScene = '/spline/scene.splinecode' }: Sticky3DLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Sticky 상태 확인
      const shouldBeSticky = containerTop <= 0 && containerTop > -(containerHeight - viewportHeight);
      setIsSticky(shouldBeSticky);

      // 스크롤 진행도 계산
      if (shouldBeSticky) {
        const progress = Math.abs(containerTop) / (containerHeight - viewportHeight);
        setScrollProgress(Math.min(Math.max(progress, 0), 1));

        // 섹션 감지
        const sectionElements = sections.map(s => document.getElementById(s.id)).filter(Boolean);
        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const el = sectionElements[i];
          if (el) {
            const elRect = el.getBoundingClientRect();
            if (elRect.top <= viewportHeight * 0.5) {
              setActiveSection(sections[i].id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Spline 카메라/씬 전환 핸들러
  const onSplineLoad = (splineApp: any) => {
    splineRef.current = splineApp;
  };

  useEffect(() => {
    if (splineRef.current) {
      // 섹션에 따라 Spline 이벤트 트리거
      // 실제 Spline 씬에서 정의한 이벤트 이름으로 변경 필요
      try {
        splineRef.current.emitEvent('mouseHover', activeSection);
      } catch (e) {
        // Spline 이벤트가 없는 경우 무시
      }
    }
  }, [activeSection]);

  return (
    <div ref={containerRef} className={styles.sticky3DContainer}>
      {/* Sticky 3D 영역 */}
      <div className={`${styles.stickyWrapper} ${isSticky ? styles.isSticky : ''}`}>
        <div className={styles.scene3DWrapper}>
          {!hasError ? (
            <Suspense fallback={<div className={styles.sceneFallback} />}>
              <Spline
                scene={splineScene}
                onLoad={onSplineLoad}
                onError={() => setHasError(true)}
              />
            </Suspense>
          ) : (
            <div className={styles.sceneFallback}>
              <div className={styles.fallbackContent}>
                <div className={styles.fallbackIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                    <polyline points="7.5 19.79 7.5 14.6 3 12" />
                    <polyline points="21 12 16.5 14.6 16.5 19.79" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <p>3D 씬 로딩 중...</p>
              </div>
            </div>
          )}

          {/* 진행 표시기 */}
          <div className={styles.progressIndicator}>
            <div
              className={styles.progressBar}
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* 섹션 인디케이터 */}
          <div className={styles.sectionIndicators}>
            {sections.map((section) => (
              <button
                key={section.id}
                className={`${styles.sectionDot} ${activeSection === section.id ? styles.active : ''}`}
                onClick={() => {
                  const el = document.getElementById(section.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                aria-label={section.label}
              >
                <span className={styles.dotLabel}>{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 스크롤되는 콘텐츠 영역 */}
      <div className={styles.scrollContent}>
        {children}
      </div>
    </div>
  );
}
