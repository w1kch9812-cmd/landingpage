'use client';

import React, { useState, useEffect, useRef, Suspense, lazy, useCallback, createContext, useContext } from 'react';
import styles from './Scene3DScroller.module.css';

const Spline = lazy(() => import('@splinetool/react-spline'));

// 섹션 정의
interface SectionConfig {
  id: string;
  label: string;
  cameraPosition?: { x: number; y: number; z: number };
  event?: string;
}

const defaultSections: SectionConfig[] = [
  { id: 'hero', label: '홈', event: 'scene-hero' },
  { id: 'features', label: '서비스', event: 'scene-features' },
  { id: 'how-it-works', label: '기능', event: 'scene-howitworks' },
  { id: 'statistics', label: '프라이빗', event: 'scene-statistics' },
  { id: 'showcase', label: '성과', event: 'scene-showcase' },
  { id: 'pricing', label: '비교', event: 'scene-pricing' },
];

// Context for child components to know current section
interface Scene3DContextType {
  activeSection: string;
  scrollProgress: number;
}

const Scene3DContext = createContext<Scene3DContextType>({
  activeSection: 'hero',
  scrollProgress: 0,
});

export const useScene3D = () => useContext(Scene3DContext);

interface Scene3DScrollerProps {
  children: React.ReactNode;
  splineScene?: string;
  sections?: SectionConfig[];
  showIndicators?: boolean;
}

export default function Scene3DScroller({
  children,
  splineScene = '/spline/scene.splinecode',
  sections = defaultSections,
  showIndicators = true,
}: Scene3DScrollerProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || 'hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<any>(null);

  const onSplineLoad = useCallback((splineApp: any) => {
    splineRef.current = splineApp;
  }, []);

  // 스크롤 및 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const containerTop = rect.top + scrollTop;
      const containerHeight = containerRef.current.offsetHeight;

      // 진행도 계산
      const relativeScroll = scrollTop - containerTop + viewportHeight;
      const totalScrollable = containerHeight;
      const progress = Math.min(Math.max(relativeScroll / totalScrollable, 0), 1);
      setScrollProgress(progress);

      // 화면에 보이는지 확인
      setIsVisible(rect.top < viewportHeight && rect.bottom > 0);

      // 현재 섹션 감지
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const elRect = el.getBoundingClientRect();
          if (elRect.top <= viewportHeight * 0.4) {
            if (activeSection !== sections[i].id) {
              setActiveSection(sections[i].id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection]);

  // Spline 이벤트 트리거
  useEffect(() => {
    if (splineRef.current && activeSection) {
      const sectionConfig = sections.find(s => s.id === activeSection);
      if (sectionConfig?.event) {
        try {
          splineRef.current.emitEvent('mouseHover', sectionConfig.event);
        } catch (e) {
          // 이벤트가 없는 경우 무시
        }
      }
    }
  }, [activeSection, sections]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offsetTop = el.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <Scene3DContext.Provider value={{ activeSection, scrollProgress }}>
      <div ref={containerRef} className={styles.scene3DScroller}>
        {/* Fixed 3D Scene */}
        <div className={`${styles.sceneFixed} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.sceneContent}>
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
                  <div className={styles.animatedShape}>
                    <div className={styles.shape} />
                    <div className={styles.shape} />
                    <div className={styles.shape} />
                  </div>
                  <p className={styles.fallbackText}>3D 씬</p>
                </div>
              </div>
            )}
          </div>

          {/* Section Indicators */}
          {showIndicators && (
            <div className={styles.indicators}>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ height: `${scrollProgress * 100}%` }}
                />
              </div>
              <div className={styles.sectionDots}>
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    className={`${styles.dot} ${activeSection === section.id ? styles.active : ''}`}
                    onClick={() => scrollToSection(section.id)}
                    aria-label={section.label}
                  >
                    <span className={styles.dotInner} />
                    <span className={styles.dotLabel}>{section.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className={styles.scrollableContent}>
          {children}
        </div>
      </div>
    </Scene3DContext.Provider>
  );
}
