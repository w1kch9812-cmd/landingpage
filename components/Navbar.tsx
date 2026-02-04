'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { List, X } from '@phosphor-icons/react';
import styles from './Navbar.module.css';

function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 266.77 181.62"
      className={className}
      aria-hidden="true"
    >
      <g>
        <path fill="currentColor" d="M103.82,65.57H84.15v-46H24.28V1.38h79.54Z"/>
        <path fill="currentColor" d="M103.82,102H0V83.81H41.73V64.13H62.1V83.81h41.72Z"/>
        <path fill="currentColor" d="M29.31,146.17a31.29,31.29,0,0,1,3-13.6A36.72,36.72,0,0,1,52.05,113.8,37,37,0,0,1,66.42,111a37.54,37.54,0,0,1,14.45,2.79,38.24,38.24,0,0,1,11.79,7.53,39.39,39.39,0,0,1,8.09,11.24,30.79,30.79,0,0,1,3.07,13.6A31.58,31.58,0,0,1,100.75,160a37.72,37.72,0,0,1-34.33,21.63,37.12,37.12,0,0,1-26.09-10.47,36.14,36.14,0,0,1-8-11.16A32.1,32.1,0,0,1,29.31,146.17Zm54.14,0a15.61,15.61,0,0,0-1.33-6.28,17,17,0,0,0-3.55-5.3A16.36,16.36,0,0,0,73.05,131a18.18,18.18,0,0,0-13.25,0,14.89,14.89,0,0,0-5.38,3.63,15.81,15.81,0,0,0-3.69,5.3,15.61,15.61,0,0,0-1.33,6.28,16.23,16.23,0,0,0,1.33,6.56,15.61,15.61,0,0,0,3.69,5.3,14.76,14.76,0,0,0,5.38,3.63,17.6,17.6,0,0,0,6.62,1.26A16.5,16.5,0,0,0,78.57,158,16.16,16.16,0,0,0,83.45,146.17Z"/>
        <path fill="currentColor" d="M186.59,146.17a31.44,31.44,0,0,1,3-13.6,36.72,36.72,0,0,1,19.74-18.77A37,37,0,0,1,223.71,111a37.52,37.52,0,0,1,14.44,2.79,38.24,38.24,0,0,1,11.79,7.53,39.62,39.62,0,0,1,8.1,11.24,30.93,30.93,0,0,1,3.07,13.6A31.73,31.73,0,0,1,258,160a37.39,37.39,0,0,1-8.1,11.16,36.87,36.87,0,0,1-11.79,7.68,37.52,37.52,0,0,1-14.44,2.79,37.12,37.12,0,0,1-26.1-10.47,36.3,36.3,0,0,1-8-11.16A32.25,32.25,0,0,1,186.59,146.17Zm54.14,0a15.77,15.77,0,0,0-1.32-6.28,17,17,0,0,0-3.56-5.3,16.32,16.32,0,0,0-5.51-3.63,18.21,18.21,0,0,0-13.26,0,14.85,14.85,0,0,0-5.37,3.63,16.18,16.18,0,0,0-5,11.58,16.23,16.23,0,0,0,1.33,6.56,15.5,15.5,0,0,0,3.7,5.3,14.72,14.72,0,0,0,5.37,3.63,17.61,17.61,0,0,0,6.63,1.26A16.49,16.49,0,0,0,235.85,158,16.16,16.16,0,0,0,240.73,146.17Z"/>
        <path fill="currentColor" d="M247.54,40.74V0H227.91V76.17l-20.45-19.1,20.45-26.82L213.2,12.09H123.46V30.25H158L123.19,74.82v26.82l23-28.45,28.32,27.1,22.21-29.13,31.16,30.48h19.63v-43h19.23V40.74Zm-73,32.59-16.26-14.9L181,30.25h25.33Z"/>
      </g>
    </svg>
  );
}

interface NavItem {
  label: string;
  sectionId: string;
}

const navItems: NavItem[] = [
  { label: '니즈', sectionId: 'section-needs' },
  { label: '핵심기능', sectionId: 'section-core-features' },
  { label: '프라이빗 매물', sectionId: 'section-trust-security' },
  { label: '현황', sectionId: 'section-social-proof' },
  { label: '고객사례', sectionId: 'section-testimonials' },
  { label: 'FAQ', sectionId: 'section-faq' },
];

interface NavbarProps {
  style?: React.CSSProperties;
}


export default function Navbar({ style }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetTop = scrollTop + rect.top;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      role="navigation"
      aria-label="메인 내비게이션"
      style={style}
    >
      <button
        className={styles.navLogo}
        onClick={scrollToTop}
        aria-label="홈으로 이동"
      >
        <Logo className={styles.logoImage} />
      </button>

      <div
        className={`${styles.navMenu} ${mobileMenuOpen ? styles.open : ''}`}
        role="menubar"
        aria-label="주요 메뉴"
      >
        {navItems.map((item) => (
          <button
            key={item.sectionId}
            onClick={() => scrollToSection(item.sectionId)}
            className={styles.navLink}
            role="menuitem"
          >
            <span className={styles.linkTextWrapper}>
              <span className={styles.linkText}>{item.label}</span>
              <span className={styles.linkTextHover}>{item.label}</span>
            </span>
          </button>
        ))}
      </div>

      <div className={styles.navActions}>
        <button
          className={styles.ctaButton}
          onClick={() => scrollToSection('section-launch-notify')}
          aria-label="출시 알림 신청 섹션으로 이동"
        >
          <span className={styles.ctaTextWrapper}>
            <span className={styles.ctaText}>출시 알림 받기</span>
            <span className={styles.ctaTextHover}>출시 알림 받기</span>
          </span>
        </button>

        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>
    </nav>
  );
}
