'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

interface StickyItemProps {
  children: ReactNode;
  className?: string;
  /** 배경색 */
  bgColor?: string;
  /** 딤 처리 시 최대 불투명도 */
  dimOpacity?: number;
  /** 딤 효과 시작 시점 (0~1, 기본값 0 = 즉시 시작) */
  dimStart?: number;
  /** 스케일 다운 비율 */
  scaleDown?: number;
  /** 스티키 효과 비활성화 (deprecated, use passthrough instead) */
  noSticky?: boolean;
  /** z-index만 적용하고 sticky/transform 없이 패스스루 */
  passthrough?: boolean;
  /** z-index 값 */
  zIndex?: number;
}

/**
 * 스티키 스택의 개별 아이템 (바닐라 JS 버전)
 * 100vh 높이로 고정, 스크롤 시 딤 효과
 */
export function StickyItem({
  children,
  className = '',
  bgColor = '#0a0a0a',
  dimOpacity = 0.6,
  dimStart = 0,
  scaleDown = 0.95,
  noSticky = false,
  passthrough = false,
  zIndex = 1,
}: StickyItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !overlayRef.current || noSticky || passthrough) return;

    const content = contentRef.current;
    const overlay = overlayRef.current;

    let ticking = false;

    const updateStyles = () => {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // progress: 0 (스크롤 0) to 1 (스크롤 = viewportHeight)
      const progress = Math.max(0, Math.min(1, scrollY / viewportHeight));

      // 딤 처리: dimStart 이후부터 시작
      const dimProgress = Math.max(0, (progress - dimStart) / (1 - dimStart));
      overlay.style.opacity = String(dimProgress * dimOpacity);

      // 스케일 다운
      const scale = 1 - (dimProgress * (1 - scaleDown));
      content.style.transform = `scale(${scale})`;
      content.style.borderRadius = `${dimProgress * 20}px`;

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateStyles);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // 초기 상태 설정
    updateStyles();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [noSticky, passthrough, dimOpacity, dimStart, scaleDown]);

  // passthrough: z-index만 적용하고 sticky/transform 없이 그대로 렌더링
  if (passthrough) {
    return (
      <div
        className={className}
        style={{
          position: 'relative',
          zIndex,
        }}
      >
        {children}
      </div>
    );
  }

  // noSticky인 경우 일반 div로 렌더링 (deprecated)
  if (noSticky) {
    return (
      <div
        className={className}
        style={{
          position: 'relative',
          zIndex,
          background: '#f8f9fa',
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex,
      }}
    >
      <div
        ref={contentRef}
        style={{
          transformOrigin: 'center top',
          willChange: 'transform',
          overflow: scaleDown < 1 ? 'hidden' : 'visible',
          height: '100%',
        }}
      >
        {children}
      </div>
      {/* 딤 오버레이 */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: bgColor,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 50,
        }}
      />
    </div>
  );
}

interface StickyStackProps {
  children: ReactNode;
  className?: string;
}

/**
 * 스티키 섹션들을 스택으로 관리하는 컨테이너
 */
export function StickyStack({ children, className = '' }: StickyStackProps) {
  const childArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childArray.map((child, index) => {
        if (React.isValidElement<StickyItemProps>(child)) {
          return React.cloneElement(child, {
            key: index,
            zIndex: index + 1,
          });
        }
        return child;
      })}
    </div>
  );
}
