'use client';

import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp, SlideIn } from '@/components/ui/animations';
import styles from './PainPoints.module.css';

const painPoints = [
  {
    number: '01',
    title: '"전력 500kW 이상" 검색이 안 돼요',
    description: '다방, 직방에서 공장을 찾아보세요. 전력용량, 천정고, 바닥하중 같은 필터가 없습니다. 결국 모든 매물을 하나씩 확인해야 합니다.',
    solution: '60+ 공장 전용 필터',
  },
  {
    number: '02',
    title: '매물·경매·분양 사이트 따로따로',
    description: '네이버 부동산, 법원 경매, 산단공단... 비교 분석하려면 탭을 12개씩 열어놓고 엑셀에 정리해야 합니다.',
    solution: '1곳에서 모든 데이터',
  },
  {
    number: '03',
    title: '이 가격이 적정한지 모르겠어요',
    description: '인근 실거래가가 얼마인지, 비슷한 조건 매물은 얼마에 나와있는지. 비교 자료 없이 중개인 말만 믿고 결정해야 합니다.',
    solution: '최대 3개 매물 비교',
  },
  {
    number: '04',
    title: '직원들 모르게 매각하고 싶어요',
    description: '공장을 내놓고 싶지만, 네이버에 올리면 직원과 거래처가 다 알게 됩니다. 비공개로 진행할 방법이 없었습니다.',
    solution: '비공개 매물 등록',
  },
];

export default function PainPoints() {
  return (
    <section id="section-pain-points" className={styles.section}>
      <div className={styles.container}>
        <FadeUp>
          <SectionHeader
            sectionName="Pain Points"
            sectionNumber="01"
            description="수많은 제조·물류 기업들이 겪고 있는 문제들입니다."
          >
            공장 부지 찾기,<br />
            지금 이런 문제를 겪고 계신가요?
          </SectionHeader>
        </FadeUp>

        <div className={styles.painList}>
          {painPoints.map((point, index) => (
            <SlideIn key={index} direction="up" delay={0.08 * index} distance={30}>
              <div className={styles.painItem}>
                <div className={styles.painNumber}>{point.number}</div>
                <div className={styles.painContent}>
                  <h3 className={styles.painTitle}>{point.title}</h3>
                  <p className={styles.painDescription}>{point.description}</p>
                </div>
                <div className={styles.painSolution}>
                  <span className={styles.solutionBadge}>{point.solution}</span>
                </div>
              </div>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}
