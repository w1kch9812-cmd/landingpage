'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp } from '@/components/ui/animations';
import CustomCursor from '@/components/ui/CustomCursor';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    quote: '계약 직전, 공짱에서 같은 조건의 경매 물건을 발견했습니다. 3억 원을 아끼고 더 넓은 부지까지 확보했어요. 일반 매물만 봤으면 큰 손해를 볼 뻔했습니다.',
    name: '김OO 대표',
    role: '금속가공업 · 경기 화성',
    highlight: '3억 원 절감',
    position: 'top',
    height: 'large',
    avatar: '',
  },
  {
    quote: '공장 매각을 비밀리에 진행해야 했는데, 프라이빗 매물 시스템 덕분에 직원들 모르게 매수자를 찾을 수 있었습니다. 정보 유출 걱정 없이 진행했어요.',
    name: '이OO 실장',
    role: '물류업 · 인천',
    highlight: '비밀 매각 성공',
    position: 'middle',
    height: 'medium',
    avatar: '',
  },
  {
    quote: '2년간 구축 공장만 찾아다녔는데, 공짱에서 신규 산단 분양 정보를 보고 방향을 바꿨어요. 입주 업종, 분양가, 인프라까지 한눈에 비교하니 결정이 쉬웠습니다.',
    name: '박OO 이사',
    role: '식품제조업 · 충북 청주',
    highlight: '신규 산단 입주',
    position: 'bottom',
    height: 'large',
    avatar: '',
  },
  {
    quote: '매물마다 전화해서 전력량, 층고, 호이스트 물어보던 시절이 있었어요. 이제는 검색 한 번으로 끝. 헛걸음 횟수가 확 줄었습니다.',
    name: '최OO 팀장',
    role: '전자부품 제조업 · 경기 평택',
    highlight: '현장 방문 70% 감소',
    position: 'top',
    height: 'medium',
    avatar: '',
  },
  {
    quote: '원하는 조건을 저장해두고 본업에 집중했어요. 3개월 만에 딱 맞는 매물이 등록됐고, 알림 받자마자 바로 계약했습니다. 타이밍을 놓치지 않았어요.',
    name: '정OO 대표',
    role: '기계제조업 · 경남 창원',
    highlight: '조건 100% 매칭',
    position: 'middle',
    height: 'large',
    avatar: '',
  },
  {
    quote: '5개 산단을 직접 발품 팔아 비교하려면 한 달은 걸렸을 거예요. 공짱에서 분양가, 입주 조건, 규제사항을 하루 만에 파악했습니다.',
    name: '한OO 부장',
    role: '화학제조업 · 전남 여수',
    highlight: '비교 분석 시간 95% 단축',
    position: 'bottom',
    height: 'medium',
    avatar: '',
  },
  {
    quote: '실거래가 데이터로 적정 가격을 파악하고 협상에 임했더니, 호가보다 8% 낮은 가격에 계약할 수 있었습니다. 데이터의 힘이에요.',
    name: '송OO 대표',
    role: '자동차부품 제조업 · 울산',
    highlight: '호가 대비 8% 절감',
    position: 'top',
    height: 'medium',
    avatar: '',
  },
  {
    quote: '경쟁사가 눈독 들이던 물건이었는데, 알림 덕분에 먼저 연락해서 계약했습니다. IC 10분 거리, 물류비 연 2억 절감 예상됩니다.',
    name: '윤OO 상무',
    role: '플라스틱 제조업 · 충남 천안',
    highlight: '물류비 연 2억 절감',
    position: 'middle',
    height: 'large',
    avatar: '',
  },
];

// Double the testimonials for seamless loop
const doubledTestimonials = [...testimonials, ...testimonials];

// Height class mapping
const heightClasses: Record<string, string> = {
  small: styles.heightSmall,
  medium: styles.heightMedium,
  large: styles.heightLarge,
};

// Testimonial card component
const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  const positionClass = styles[testimonial.position as keyof typeof styles] || '';
  const heightClass = heightClasses[testimonial.height] || styles.heightMedium;

  return (
    <div className={`${styles.card} ${positionClass} ${heightClass}`} data-cursor-hover>
      <div className={styles.cardContent}>
        {testimonial.highlight && (
          <span className={styles.highlight}>{testimonial.highlight}</span>
        )}
        <p className={styles.quote}>{testimonial.quote}</p>
        <div className={styles.person}>
          <div className={styles.avatar}>
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={40}
                height={40}
                className={styles.avatarImage}
              />
            ) : (
              <span className={styles.avatarText}>{testimonial.name.charAt(0)}</span>
            )}
          </div>
          <div className={styles.personInfo}>
            <span className={styles.name}>{testimonial.name}</span>
            <span className={styles.role}>{testimonial.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderWrapperRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const baseVelocity = -0.5; // 자동 스크롤 속도 (픽셀/프레임)

  // 트랙 너비 계산
  useEffect(() => {
    const calculateWidth = () => {
      if (containerRef.current) {
        // 카드 하나의 너비 + gap
        const cardWidth = 360 + 24; // card width + gap
        const singleSetWidth = testimonials.length * cardWidth;
        setTrackWidth(singleSetWidth);
      }
    };

    calculateWidth();
    window.addEventListener('resize', calculateWidth);
    return () => window.removeEventListener('resize', calculateWidth);
  }, []);

  // 무한 루프를 위한 위치 리셋
  const wrapX = useCallback((value: number) => {
    if (trackWidth === 0) return value;
    // 음수 방향으로 이동하다가 한 세트 분량 지나면 리셋
    if (value <= -trackWidth) {
      return value + trackWidth;
    }
    // 양수 방향으로 이동하다가 0을 넘으면 리셋
    if (value > 0) {
      return value - trackWidth;
    }
    return value;
  }, [trackWidth]);

  // 자동 스크롤 애니메이션
  useAnimationFrame(() => {
    if (!isDragging && trackWidth > 0) {
      const currentX = x.get();
      const newX = wrapX(currentX + baseVelocity);
      x.set(newX);
    }
  });

  // 드래그 핸들러
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    // 드래그 끝나면 위치 정규화
    const currentX = x.get();
    x.set(wrapX(currentX));
    setIsDragging(false);
  };

  return (
    <section id="section-testimonials" className={styles.section}>
      {/* Header */}
      <div className={styles.headerContainer}>
        <div className={styles.headerGrid}>
          <FadeUp>
            <SectionHeader
              sectionName="Client Stories"
              sectionNumber="05"
              description="금속가공, 물류, 식품제조, 전자부품 등 다양한 산업 분야의 기업들이 공짱에서 최적의 공장/창고를 찾았습니다."
            >
              수많은 제조·물류 기업이<br />
              공짱을 통해 새로운 거점을 찾았습니다
            </SectionHeader>
          </FadeUp>
        </div>
      </div>

      {/* Infinite Draggable Slider */}
      <div ref={sliderWrapperRef} className={styles.sliderWrapper}>
        <motion.div
          ref={containerRef}
          className={styles.slider}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -Infinity, right: Infinity }}
          dragElastic={0}
          dragMomentum={true}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {doubledTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </motion.div>
        <CustomCursor containerRef={sliderWrapperRef} />
      </div>
    </section>
  );
}
