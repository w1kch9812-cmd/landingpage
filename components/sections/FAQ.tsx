'use client';

import React, { useState, useRef, useEffect } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp, SlideIn } from '@/components/ui/animations';
import styles from './FAQ.module.css';

const faqs = [
  {
    id: 'differentiation',
    question: '기존 부동산 플랫폼과 공짱의 차이점은 무엇인가요?',
    answer: '공짱은 산업용 부동산에 특화된 플랫폼입니다. 전력용량, 천정고, 바닥하중, 호이스트 등 제조·물류 기업이 반드시 확인해야 할 60가지 이상의 조건을 검색할 수 있고, 산업단지 입주 규제, 실거래가, 경매 정보까지 한 곳에서 비교할 수 있습니다.',
  },
  {
    id: 'data-reliability',
    question: '제공되는 정보의 신뢰도는 어느 정도인가요?',
    answer: '공짱은 국토교통부 실거래 데이터, 법원 경매 정보, 한국산업단지공단 등 공신력 있는 기관의 데이터를 기반으로 가공 및 분석 정보를 제공합니다. 데이터는 매일 업데이트되어 최신 정보를 유지합니다.',
  },
  {
    id: 'fake-listing',
    question: '허위 매물 관리는 어떻게 되고 있나요?',
    answer: '공짱은 허위 매물 근절을 위해 엄격한 모니터링 시스템을 운영합니다. 실소유 인증 시스템과 허위 매물 신고 제도를 통해, 검증된 매물 정보만을 제공하여 헛걸음하지 않도록 최선을 다하고 있습니다.',
  },
  {
    id: 'average-duration',
    question: '공짱을 통한 계약까지 평균 얼마나 걸리나요?',
    answer: '기존 방식으로 평균 6개월 이상 걸리던 산업용 부동산 탐색이 공짱을 통해 평균 3주 내로 단축됩니다. 조건 필터링과 실시간 알림으로 불필요한 현장 방문을 70% 이상 줄일 수 있습니다.',
  },
  {
    id: 'alert-service',
    question: '원하는 조건의 매물이 나오면 알림 받을 수 있나요?',
    answer: '네, 원하는 조건(지역, 면적, 전력용량 등)을 설정해두시면 해당 조건에 맞는 새 매물이 등록될 때 실시간으로 이메일 및 앱 푸시 알림을 받으실 수 있습니다.',
  },
  {
    id: 'pricing-member',
    question: '기업 회원이 매물 정보를 확인하는 데 비용이 드나요?',
    answer: '아닙니다. 공짱의 일반 기업 회원은 무료입니다. 회원가입만 하시면 전국의 공장/창고 매물 검색, 실거래가 통계 조회, 실시간 알림 서비스 등 핵심 기능을 비용 부담 없이 자유롭게 이용하실 수 있습니다.',
  },
  {
    id: 'listing-fee',
    question: '매물 등록비는 얼마인가요?',
    answer: '0원입니다. 부담없이 등록하시고, 월 25만명의 방문자를 만나보세요.',
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [faq.answer]);

  const answerId = `faq-answer-${faq.id}`;

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
      <button
        type="button"
        id={`faq-question-${faq.id}`}
        className={styles.faqQuestion}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <span className={styles.questionText}>{faq.question}</span>
        <svg
          className={`${styles.icon} ${isOpen ? styles.iconRotated : ''}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        id={answerId}
        className={styles.faqAnswer}
        style={{
          maxHeight: isOpen ? `${height}px` : '0px',
        }}
        role="region"
        aria-labelledby={`faq-question-${faq.id}`}
      >
        <div className={styles.answerContent} ref={contentRef}>
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="section-faq" className={styles.section}>
      <div className={styles.contentGrid}>
        <FadeUp className={styles.headerCell}>
          <SectionHeader
            sectionName="FAQ"
            sectionNumber="06"
            description="공짱 서비스 이용에 대해 궁금한 점을 확인하세요."
          >
            자주 묻는 질문
          </SectionHeader>
        </FadeUp>

        <SlideIn direction="right" distance={40} className={`${styles.faqCellWrapper} ${styles.faqCell}`}>
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </SlideIn>
      </div>
    </section>
  );
}
