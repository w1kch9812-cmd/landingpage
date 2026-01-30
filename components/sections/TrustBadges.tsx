'use client';

import React from 'react';
import { FadeUp, SlideIn } from '@/components/ui/animations';
import styles from './TrustBadges.module.css';

const trustItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'SSL 보안 인증',
    description: '256-bit SSL 암호화로 모든 데이터 전송을 보호합니다',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="16" r="1" fill="currentColor"/>
      </svg>
    ),
    title: '개인정보 보호',
    description: '개인정보보호법 준수, 정보 제3자 제공 없음',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: '공공 데이터 기반',
    description: '국토교통부, 법원, 산단공단 등 공신력 있는 데이터 활용',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: '24시간 모니터링',
    description: '허위 매물 실시간 감시 및 자동 차단 시스템 운영',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M22 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: '실명 인증 시스템',
    description: '매물 등록 시 사업자 인증 필수, 신뢰도 확보',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: '정보 정확도 99%+',
    description: '다중 검증 시스템으로 매물 정보 정확도 보장',
  },
];

const certifications = [
  { name: '정보보호 관리체계', code: 'ISMS' },
  { name: '개인정보보호', code: 'PIMS' },
  { name: '클라우드 보안', code: 'CSAP' },
];

export default function TrustBadges() {
  return (
    <section id="section-trust" className={styles.section}>
      <div className={styles.container}>
        <FadeUp>
          <div className={styles.header}>
            <span className={styles.sectionTag}>Trust & Security</span>
            <h2 className={styles.title}>
              안심하고 이용하세요
            </h2>
            <p className={styles.description}>
              공짱은 고객의 정보를 최우선으로 보호합니다.<br />
              신뢰할 수 있는 데이터와 철저한 보안으로 안전한 서비스를 제공합니다.
            </p>
          </div>
        </FadeUp>

        <div className={styles.trustGrid}>
          {trustItems.map((item, index) => (
            <SlideIn key={index} direction="up" delay={0.05 * index} distance={30}>
              <div className={styles.trustCard}>
                <div className={styles.trustIcon}>{item.icon}</div>
                <h3 className={styles.trustTitle}>{item.title}</h3>
                <p className={styles.trustDescription}>{item.description}</p>
              </div>
            </SlideIn>
          ))}
        </div>

        <FadeUp delay={0.3}>
          <div className={styles.certificationBar}>
            <span className={styles.certLabel}>보안 인증</span>
            <div className={styles.certList}>
              {certifications.map((cert, index) => (
                <div key={index} className={styles.certItem}>
                  <span className={styles.certCode}>{cert.code}</span>
                  <span className={styles.certName}>{cert.name}</span>
                </div>
              ))}
            </div>
            <span className={styles.certNote}>* 인증 준비 중</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
