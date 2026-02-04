'use client';

import React from 'react';
import styles from './Footer.module.css';

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

const footerLinks = [
  { label: '공지사항', href: 'https://gongzzang.net/notice?tab=1' },
  { label: '이용약관', href: 'https://gongzzang.net/terms' },
  { label: '개인정보처리방침', href: 'https://gongzzang.net/terms?tab=2' },
];

const socialLinks = [
  {
    label: 'Blog',
    href: 'https://blog.naver.com/gongzzanginc',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 4h12v12H4V4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 8h6M7 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@gongzzang_official',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M18 6.5c-.2-1.2-1-2-2.2-2.2C14.2 4 10 4 10 4s-4.2 0-5.8.3C3 4.5 2.2 5.3 2 6.5 1.7 8.2 1.7 10 1.7 10s0 1.8.3 3.5c.2 1.2 1 2 2.2 2.2 1.6.3 5.8.3 5.8.3s4.2 0 5.8-.3c1.2-.2 2-1 2.2-2.2.3-1.7.3-3.5.3-3.5s0-1.8-.3-3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12.5l4-2.5-4-2.5v5z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/gongzzang__app?igshid=NGVhN2U2NjQ0Yg==',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="14.5" cy="5.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainSection}>
          <div className={styles.brandArea}>
            <Logo className={styles.logo} />
            <p className={styles.tagline}>
              산업용 부동산의 새로운 기준
            </p>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.middleSection}>
          <div className={styles.contactArea}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Tel</span>
              <a href="tel:1899-2296" className={styles.contactValue}>1899-2296</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Email</span>
              <a href="mailto:gongzzanginc@naver.com" className={styles.contactValue}>gongzzanginc@naver.com</a>
            </div>
          </div>

          <div className={styles.socialLinks}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomSection}>
          <div className={styles.companyInfo}>
            <span>사업자등록번호: 204-87-02334</span>
            <span className={styles.separator}>|</span>
            <span>경기도 화성시 동탄기흥로 590, 동탄센트럴에이스타워 B동 9층 14호</span>
          </div>
          <div className={styles.bottomRow}>
            <span className={styles.copyright}>
              Copyright © GONGZZANG. All rights reserved.
            </span>
            <nav className={styles.links}>
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
