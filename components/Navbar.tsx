'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { List, X } from '@phosphor-icons/react';
import CTAButton from '@/components/ui/CTAButton';
import styles from './Navbar.module.css';

export default function Navbar() {
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
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  // 키보드 접근성: Escape로 모바일 메뉴 닫기
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
    >
      <div className={styles.navContainer}>
        <button
          className={styles.navLogo}
          onClick={scrollToTop}
          aria-label="홈으로 이동"
        >
          <span className={styles.logoText}>공짱</span>
        </button>

        <div
          className={`${styles.navMenu} ${mobileMenuOpen ? styles.open : ''}`}
          role="menubar"
          aria-label="주요 메뉴"
        >
          <button
            onClick={() => scrollToSection('section-community')}
            className={styles.navLink}
            role="menuitem"
          >
            서비스 소개
          </button>
          <button
            onClick={() => scrollToSection('section-core-features')}
            className={styles.navLink}
            role="menuitem"
          >
            핵심 기능
          </button>
          <button
            onClick={() => scrollToSection('section-testimonials')}
            className={styles.navLink}
            role="menuitem"
          >
            고객 후기
          </button>
          <button
            onClick={() => scrollToSection('section-faq')}
            className={styles.navLink}
            role="menuitem"
          >
            FAQ
          </button>
        </div>

        <div className={styles.navActions}>
          <div className={styles.ctaWrapper}>
            <CTAButton
              variant="accent"
              size="small"
              onClick={() => scrollToSection('section-launch-notify')}
              aria-label="출시 알림 신청 섹션으로 이동"
            >
              출시 알림 받기
            </CTAButton>
          </div>

          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <List size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
