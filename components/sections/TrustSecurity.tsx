'use client';

import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp, SlideIn } from '@/components/ui/animations';
import styles from './TrustSecurity.module.css';

// 프라이빗 매물 시나리오
const privateScenarios = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: '직원들의 동요가 걱정될 때',
    description: '공장 매각 소문이 퍼지면 핵심 인력이 이탈할 수 있습니다. 프라이빗 매물로 등록하면 사업자 인증을 완료한 실수요자만 매물 정보를 확인할 수 있습니다.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: '거래처와의 관계가 민감할 때',
    description: '주요 납품처나 협력업체에 매각 의사가 알려지면 거래 관계에 영향을 줄 수 있습니다. 비공개 매물 시스템으로 원하는 시점까지 정보를 보호하세요.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: '경쟁사에 알리고 싶지 않을 때',
    description: '사업 확장이나 이전 계획이 경쟁사에 노출되면 전략적 불이익이 생길 수 있습니다. 공개 범위를 직접 설정하여 원하는 대상에게만 매물 정보를 공개할 수 있습니다.',
  },
];

// 프라이빗 매물 혜택
const privateBenefits = [
  { number: '01', title: '사업자 인증 필수', description: '실수요자만 매물 정보 열람' },
  { number: '02', title: '열람 이력 추적', description: '누가 언제 봤는지 확인 가능' },
  { number: '03', title: '공개 범위 설정', description: '업종/지역별 선택적 노출' },
  { number: '04', title: '즉시 공개 전환', description: '원할 때 바로 전체 공개 가능' },
];

// 보안 및 신뢰 항목
const trustItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'SSL 보안 인증',
    description: '256-bit SSL 암호화로 모든 데이터 전송 보호',
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
      </svg>
    ),
    title: '공공 데이터 기반',
    description: '국토교통부, 법원, 산단공단 등 공신력 있는 데이터',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: '24시간 모니터링',
    description: '허위 매물 실시간 감시 및 자동 차단',
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
    description: '매물 등록 시 사업자 인증 필수',
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

export default function TrustSecurity() {
  return (
    <section id="section-trust-security" className={styles.section}>
      <div className={styles.container}>
        {/* 프라이빗 매물 섹션 */}
        <div className={styles.privateSection}>
          <FadeUp>
            <SectionHeader
              sectionName="Private Listing"
              sectionNumber="06"
              description="공장을 내놓고 싶지만, 직원들과 거래처에 알려질까 걱정되시나요? 공짱의 프라이빗 매물 시스템으로 안전하게 매각을 진행하세요."
            >
              매각 소문, 걱정되시나요?<br />
              비밀리에 진행하세요
            </SectionHeader>
          </FadeUp>

          {/* 시나리오 카드 */}
          <div className={styles.scenariosGrid}>
            {privateScenarios.map((scenario, index) => (
              <SlideIn key={index} direction="up" delay={0.1 * index} distance={40}>
                <div className={styles.scenarioCard}>
                  <div className={styles.scenarioIcon}>{scenario.icon}</div>
                  <h3 className={styles.scenarioTitle}>{scenario.title}</h3>
                  <p className={styles.scenarioDescription}>{scenario.description}</p>
                </div>
              </SlideIn>
            ))}
          </div>

          {/* 혜택 리스트 */}
          <FadeUp delay={0.3}>
            <div className={styles.benefitsSection}>
              <h4 className={styles.benefitsTitle}>프라이빗 매물 시스템</h4>
              <div className={styles.benefitsGrid}>
                {privateBenefits.map((benefit, index) => (
                  <div key={index} className={styles.benefitItem}>
                    <span className={styles.benefitNumber}>{benefit.number}</span>
                    <div className={styles.benefitContent}>
                      <span className={styles.benefitTitle}>{benefit.title}</span>
                      <span className={styles.benefitDescription}>{benefit.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* 연결 메시지 */}
        <FadeUp delay={0.4}>
          <div className={styles.transitionBlock}>
            <p className={styles.transitionText}>
              프라이빗 매물뿐 아니라,<br />
              <strong>모든 정보가 철저히 보호됩니다</strong>
            </p>
          </div>
        </FadeUp>

        {/* 보안 & 신뢰 섹션 */}
        <div className={styles.trustSection}>
          <FadeUp>
            <div className={styles.header}>
              <span className={styles.sectionTag}>Trust & Security</span>
              <h2 className={styles.title}>
                안심하고 이용하세요
              </h2>
              <p className={styles.description}>
                공짱은 고객의 정보를 최우선으로 보호합니다.
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
      </div>
    </section>
  );
}
