'use client';

import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp, SlideIn } from '@/components/ui/animations';
import styles from './TrustSecurity.module.css';

const privateScenarios = [
  {
    id: 'scenario-employee',
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
    solution: '사업자 인증 필수',
  },
  {
    id: 'scenario-partner',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: '거래처와의 관계가 민감할 때',
    description: '주요 납품처나 협력업체에 매각 의사가 알려지면 거래 관계에 영향을 줄 수 있습니다. 비공개 매물 시스템으로 원하는 시점까지 정보를 보호하세요.',
    solution: '공개 범위 설정',
  },
  {
    id: 'scenario-competitor',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: '경쟁사에 알리고 싶지 않을 때',
    description: '사업 확장이나 이전 계획이 경쟁사에 노출되면 전략적 불이익이 생길 수 있습니다. 공개 범위를 직접 설정하여 원하는 대상에게만 매물 정보를 공개할 수 있습니다.',
    solution: '즉시 공개 전환',
  },
];

export default function TrustSecurity() {
  return (
    <section id="section-trust-security" className={styles.section}>
      <div className={styles.container}>
        <FadeUp>
          <SectionHeader
            sectionName="Private Listing"
            sectionNumber="03"
            description="매각 정보가 새어나가면 안 되는 이유, 저희가 잘 알고 있습니다."
          >
            매각 소문, 걱정되시나요?<br />
            비밀리에 진행하세요
          </SectionHeader>
        </FadeUp>

        <div className={styles.scenariosGrid}>
          {privateScenarios.map((scenario, index) => (
            <SlideIn key={scenario.id} direction="up" delay={0.1 * index} distance={40} className={styles.scenarioCard}>
              <div className={styles.scenarioIcon}>{scenario.icon}</div>
              <h3 className={styles.scenarioTitle}>{scenario.title}</h3>
              <p className={styles.scenarioDescription}>{scenario.description}</p>
              <div className={styles.solutionTag}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11.5 3.5L5.5 10.5L2.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{scenario.solution}</span>
              </div>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}
