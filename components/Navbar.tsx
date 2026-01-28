'use client';

import React, { useState, useEffect } from 'react';
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <button className={styles.navLogo} onClick={scrollToTop}>
          <span className={styles.logoText}>공짱</span>
        </button>

        <div className={`${styles.navMenu} ${mobileMenuOpen ? styles.open : ''}`}>
          <button onClick={() => scrollToSection('section-features')} className={styles.navLink}>
            서비스 소개
          </button>
          <button onClick={() => scrollToSection('section-howitworks')} className={styles.navLink}>
            핵심 기능
          </button>
          <button onClick={() => scrollToSection('section-pricing')} className={styles.navLink}>
            서비스 비교
          </button>
          <button onClick={() => scrollToSection('section-faq')} className={styles.navLink}>
            FAQ
          </button>
        </div>

        <div className={styles.navActions}>
          <div className={styles.ctaWrapper}>
            <CTAButton
              variant="accent"
              size="small"
              onClick={() => scrollToSection('section-contact')}
            >
              출시 알림 받기
            </CTAButton>
          </div>

          <button
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
