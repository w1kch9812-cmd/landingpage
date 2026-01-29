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
    quote: '매물 계약 직전, 공짱에서 \'경매\' 물건 보고 3억 아꼈습니다. 같은 조건의 물건을 훨씬 저렴하게 확보할 수 있었습니다.',
    name: '김OO 대표',
    role: '금속가공업',
    position: 'top',
    height: 'large',
    avatar: '', // /images/avatars/avatar-1.jpg
  },
  {
    quote: '매물 정보 유출 걱정이 없어 마음이 놓입니다.',
    name: '이OO 실장',
    role: '물류업',
    position: 'middle',
    height: 'small',
    avatar: '', // /images/avatars/avatar-2.jpg
  },
  {
    quote: '구축 공장만 보러 다녔는데, \'신규 산단 분양\'이 답이었네요. 공짱에서 신규 분양 정보를 한눈에 볼 수 있어 좋았습니다.',
    name: '박OO 이사',
    role: '식품제조업',
    position: 'bottom',
    height: 'medium',
    avatar: '', // /images/avatars/avatar-3.jpg
  },
  {
    quote: '전력량 확인하느라 부동산에 전화 돌리던 일, 이제 안 합니다.',
    name: '최OO 팀장',
    role: '전자부품 제조업',
    position: 'top',
    height: 'small',
    avatar: '', // /images/avatars/avatar-4.jpg
  },
  {
    quote: '원하는 조건 저장해두고, 본업에만 집중했습니다. 매물이 나오면 바로 알림이 와서 놓치는 일이 없었습니다.',
    name: '정OO 대표',
    role: '기계제조업',
    position: 'middle',
    height: 'medium',
    avatar: '', // /images/avatars/avatar-5.jpg
  },
  {
    quote: '여러 산단을 비교하는 게 이렇게 쉬울 줄 몰랐습니다. 분양가, 인허가 조건까지 한눈에 파악할 수 있어 시간이 절약됩니다.',
    name: '한OO 부장',
    role: '화학제조업',
    position: 'bottom',
    height: 'large',
    avatar: '', // /images/avatars/avatar-6.jpg
  },
  {
    quote: '실제 현장 방문 전 충분한 검토가 가능했습니다.',
    name: '송OO 대표',
    role: '자동차부품 제조업',
    position: 'top',
    height: 'small',
    avatar: '', // /images/avatars/avatar-7.jpg
  },
  {
    quote: '경쟁사보다 한 발 빠르게 좋은 입지를 확보할 수 있었습니다. 실시간 알림 덕분에 놓치지 않았습니다.',
    name: '윤OO 상무',
    role: '플라스틱 제조업',
    position: 'middle',
    height: 'medium',
    avatar: '', // /images/avatars/avatar-8.jpg
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
