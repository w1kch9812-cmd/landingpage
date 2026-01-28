'use client';

import React, { useState, useRef, useEffect } from 'react';
import SectionHeader, { Muted } from '@/components/ui/SectionHeader';
import styles from './FAQ.module.css';

const faqs = [
  {
    question: '제공되는 정보의 신뢰도는 어느 정도인가요?',
    answer: '공짱은 국토교통부 실거래 데이터, 법원 경매 정보, 한국산업단지공단 등 공신력 있는 기관의 데이터를 기반으로 가공 및 분석 정보를 제공합니다.',
  },
  {
    question: '허위 매물 관리는 어떻게 되고 있나요?',
    answer: '공짱은 허위 매물 근절을 위해 엄격한 모니터링 시스템을 운영합니다. 실소유 인증 시스템과 허위 매물 신고 제도를 통해, 검증된 매물 정보만을 제공하여 헛걸음하지 않도록 최선을 다하고 있습니다.',
  },
  {
    question: '산업단지 입주 조건도 확인 가능한가요?',
    answer: '네, 전국 1,200여 개 산업단지의 입주 가능 업종, 건폐율/용적률, 규제 사항 등 상세 정보를 통합적으로 제공합니다.',
  },
  {
    question: '프라이빗 매물은 무엇인가요?',
    answer: '공짱은 매물을 등록할 때 전체공개 / 프라이빗 매물을 구분하고 있습니다. 전체 공개 매물은 모든 회원에게 노출되는 반면에, 프라이빗 매물은 사업자 인증이 완료된 실수요자에게만 공개되는 정보입니다.',
  },
  {
    question: '기업 회원이 매물 정보를 확인하는 데 비용이 드나요?',
    answer: '아닙니다. 공짱의 일반 기업 회원은 무료입니다. 회원가입만 하시면 전국의 공장/창고 매물 검색, 실거래가 통계 조회, 실시간 알림 서비스 등 핵심 기능을 비용 부담 없이 자유롭게 이용하실 수 있습니다.',
  },
  {
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

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
      <div
        className={styles.faqQuestion}
        onClick={onToggle}
      >
        <div className={styles.questionText}>
          <span>{faq.question}</span>
        </div>
        <svg
          className={`${styles.icon} ${isOpen ? styles.iconRotated : ''}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className={styles.faqAnswer}
        style={{
          maxHeight: isOpen ? `${height}px` : '0px',
        }}
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
        {/* Left: Header - Columns 1-2 */}
        <div className={styles.headerCell}>
          <SectionHeader sectionName="FAQ" sectionNumber="06">
            자주 묻는 <Muted>질문</Muted>
          </SectionHeader>
        </div>

        {/* Right: FAQ Accordion - Columns 3-4 */}
        <div className={styles.faqCell}>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
