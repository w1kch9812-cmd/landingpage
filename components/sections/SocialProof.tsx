'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp } from '@/components/ui/animations';
import { parseFormattedNumber, formatNumber } from '@/utils/formatters';
import styles from './SocialProof.module.css';

interface Partner {
  name: string;
  logo: string;
}

const partners: Partner[] = [
  { name: '한화솔루션', logo: '/logos/한화솔루션.svg' },
  { name: 'GS건설', logo: '/logos/GS건설.svg' },
  { name: '대우건설', logo: '/logos/대우건설.svg' },
  { name: '한국산업단지공단', logo: '/logos/한국산업단지공단.svg' },
  { name: '충북개발공사', logo: '/logos/충북개발공사.svg' },
  { name: '평택도시공사', logo: '/logos/평택도시공사.svg' },
  { name: '한국농어촌공사', logo: '/logos/한국농어촌공사.svg' },
  { name: '새날', logo: '/logos/새날.svg' },
  { name: '한국프롭테크포럼', logo: '/logos/한국프롭테크포럼.svg' },
  { name: '평택시', logo: '/logos/평택시.svg' },
  { name: '청주시', logo: '/logos/청주시.svg' },
  { name: '천안시', logo: '/logos/천안시.svg' },
  { name: '아산시', logo: '/logos/아산시.svg' },
  { name: '하동군', logo: '/logos/하동군.svg' },
  { name: '부산광역시', logo: '/logos/부산광역시.svg' },
  { name: '울산광역시', logo: '/logos/울산광역시.svg' },
  { name: '경주시', logo: '/logos/경주시.svg' },
  { name: '조달청', logo: '/logos/조달청.svg' },
  { name: '한국언론진흥재단', logo: '/logos/한국언론진흥재단.svg' },
];

const allStats = [
  { id: 'data-parcel', value: '3,980', suffix: '만+', label: '전국 필지 정보' },
  { id: 'data-transaction', value: '700', suffix: '만+', label: '공장 실거래가' },
  { id: 'data-factory', value: '22', suffix: '만+', label: '전국 공장 데이터' },
  { id: 'data-complex', value: '1,337', suffix: '+', label: '전국 산업단지' },
  { id: 'corporate-members', value: '2,000', suffix: '+', label: '기업회원' },
  { id: 'broker-members', value: '1,200', suffix: '+', label: '중개회원' },
  { id: 'developer-ads', value: '50', suffix: '+', label: '광고중인 시행사' },
  { id: 'monthly-visitors', value: '25', suffix: '만+', label: '월간 접속자 수' },
];

function InteractiveDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const dotsRef = useRef<{ x: number; y: number; baseY: number; scale: number; targetScale: number }[]>([]);

  const DOT_SPACING = 12;
  const DOT_RADIUS = 1;
  const INFLUENCE_RADIUS = 150;
  const MAX_DISPLACEMENT = 12;

  const initDots = useCallback((width: number, height: number) => {
    const dots: { x: number; y: number; baseY: number; scale: number; targetScale: number }[] = [];
    const cols = Math.ceil(width / DOT_SPACING) + 1;
    const rows = Math.ceil(height / DOT_SPACING) + 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          x: col * DOT_SPACING,
          y: row * DOT_SPACING,
          baseY: row * DOT_SPACING,
          scale: 1,
          targetScale: 1,
        });
      }
    }
    dotsRef.current = dots;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mx = mousePos.current.x;
    const my = mousePos.current.y;

    dotsRef.current.forEach((dot) => {
      const dx = mx - dot.x;
      const dy = my - dot.baseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < INFLUENCE_RADIUS) {
        const factor = 1 - distance / INFLUENCE_RADIUS;
        const eased = factor * factor * factor;
        dot.targetScale = 1 + eased * 2;
        dot.y = dot.baseY - eased * MAX_DISPLACEMENT;
      } else {
        dot.targetScale = 1;
        dot.y = dot.baseY;
      }

      dot.scale += (dot.targetScale - dot.scale) * 0.15;

      const radius = DOT_RADIUS * dot.scale;
      const alpha = (dot.scale - 1) * 0.5;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 113, 255, ${alpha})`;
      ctx.fill();
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const resizeCanvas = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initDots(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 };
    };

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initDots]);

  return <canvas ref={canvasRef} className={styles.dotCanvas} />;
}

function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState('0');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const targetNumber = parseFormattedNumber(value);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            const duration = 2000;
            const startTime = performance.now();
            let currentValue = 0;

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              currentValue = Math.floor(eased * targetNumber);
              setDisplayValue(formatNumber(currentValue));

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -15% 0px' }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={styles.statValue}>
      <span className={styles.number}>{displayValue}</span>
      {suffix && <span className={styles.suffix}>{suffix}</span>}
    </span>
  );
}

export default function SocialProof() {
  return (
    <section id="section-social-proof" className={styles.section}>
      <div className={styles.container}>
        <FadeUp>
          <SectionHeader
            sectionName="Status"
            sectionNumber="04"
            description="데이터를 기반으로 수많은 기업 회원이 최적의 부지를 찾고 있습니다."
          >
            숫자가 증명하는<br />
            대한민국 최대 산업 데이터 파트너
          </SectionHeader>
        </FadeUp>

        <FadeUp delay={0.1} className={styles.statsGrid}>
          <InteractiveDotGrid />
          {allStats.map((stat) => (
            <div key={stat.id} className={styles.statCard}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </FadeUp>
      </div>

      <div className={styles.partnersSection}>
        <div className={styles.marqueeTrack}>
          {partners.map((partner) => (
            <div key={`original-${partner.name}`} className={styles.logoCard}>
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={40}
                className={styles.logoImage}
              />
            </div>
          ))}
          {partners.map((partner) => (
            <div key={`clone-${partner.name}`} className={styles.logoCard} aria-hidden="true">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={40}
                className={styles.logoImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
