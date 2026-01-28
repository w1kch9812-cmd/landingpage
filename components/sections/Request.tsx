'use client';

import React, { useState } from 'react';
import Badge from '@/components/ui/Badge';
import styles from './Request.module.css';

export default function Request() {
  const [requestType, setRequestType] = useState<'buy' | 'sell'>('buy');

  const buyFeatures = [
    '조건 맞춤 매물 추천',
    '프라이빗 매물 우선 제공',
    '실시간 신규 매물 알림',
    '전문 중개사 1:1 배정',
  ];

  const sellFeatures = [
    '무료 매물 등록',
    '프라이빗 매물 옵션',
    '시세 분석 리포트 제공',
    '전문 사진 촬영 지원',
  ];

  const currentFeatures = requestType === 'buy' ? buyFeatures : sellFeatures;

  return (
    <section id="section-request" className={styles.section}>
      <div className={styles.container}>
        {/* Heading */}
        <div className={styles.heading}>
          <div className={styles.headingForm}>
            <Badge text="매물 의뢰" variant="light" />
          </div>

          <div className={styles.headingContent}>
            <div className={styles.headingText}>
              <h2>정식 출시 후 이렇게 이용하세요.</h2>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className={styles.tableContainer}>
          {/* Top Section */}
          <div className={styles.top}>
            <div className={styles.filler}></div>

            {/* Toggle */}
            <div className={styles.optionWrapper}>
              <div className={styles.pricingOption}>
                <button
                  className={`${styles.toggleButton} ${requestType === 'buy' ? styles.selected : styles.notSelected}`}
                  onClick={() => setRequestType('buy')}
                >
                  <p>매수 의뢰</p>
                </button>
                <button
                  className={`${styles.toggleButton} ${requestType === 'sell' ? styles.selected : styles.notSelected}`}
                  onClick={() => setRequestType('sell')}
                >
                  <p>매도 의뢰</p>
                </button>
              </div>
            </div>

            {/* Cards Container */}
            <div className={styles.cardsContainer}>
              {/* Card 1 - Request Info */}
              <div className={styles.card1}>
                <div className={styles.planDescription}>
                  <div className={styles.planSubtitle}>
                    <p>{requestType === 'buy' ? '원하는 매물을 찾고 계신가요?' : '보유 매물을 등록하시겠습니까?'}</p>
                  </div>
                  <div className={styles.planDetails}>
                    <p>
                      {requestType === 'buy'
                        ? '조건에 맞는 산업 부동산을 빠르게 찾아드립니다.'
                        : '전문 중개사가 최적의 가격으로 거래를 도와드립니다.'}
                    </p>
                  </div>
                </div>

                <div className={styles.toggleInfo}>
                  <div className={styles.deliveryTimeValue}>
                    <p>{requestType === 'buy' ? '24시간' : '즉시'}</p>
                  </div>
                  <div className={styles.planToggle}>
                    <div
                      className={`${styles.toggleEllipse} ${requestType === 'sell' ? styles.toggleRight : ''}`}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Service Details */}
              <div className={styles.card2}>
                <div className={styles.cardTop}>
                  <div className={styles.priceContainer}>
                    <div className={styles.priceAmount}>
                      <p>{requestType === 'buy' ? '무료' : '중개수수료만'}</p>
                    </div>
                    <div className={styles.priceUnit}>
                      <p>{requestType === 'buy' ? '/의뢰' : '/등록'}</p>
                    </div>
                  </div>

                  <div className={styles.featureList}>
                    {currentFeatures.map((feature, index) => (
                      <div key={index} className={styles.featureItem}>
                        <div className={styles.featureIconWrapper}>
                          <div className={styles.featureIcon}>
                            <div className={styles.featureIconV}></div>
                            <div className={styles.featureIconH}></div>
                          </div>
                        </div>
                        <div className={styles.featureDescription}>
                          <p>{feature}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.cardBottom}>
                  <div className={styles.delivery}>
                    <div className={styles.deliveryLabel}>
                      <p>예상 소요 시간</p>
                    </div>
                    <div className={styles.deliveryValue}>
                      <p>{requestType === 'buy' ? '24시간 내 첫 매물 제안' : '등록 후 즉시 노출'}</p>
                    </div>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill}></div>
                    </div>
                  </div>

                  <div className={styles.ctaButtonWrapper}>
                    <button className={styles.ctaButton}>
                      <div className={styles.ctaText1}>
                        <p>{requestType === 'buy' ? '매수 의뢰하기' : '매도 의뢰하기'}</p>
                      </div>
                      <div className={styles.ctaText2}>
                        <p>{requestType === 'buy' ? '매수 의뢰하기' : '매도 의뢰하기'}</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className={styles.quote}>
          <div className={styles.quoteLeft}>
            <div className={styles.quoteText}>
              <p>지금 바로 상담받고 싶으신가요?</p>
            </div>
          </div>

          <div className={styles.quoteRight}>
            <div className={styles.quoteDescription}>
              <p>
                공짱 정식 출시 전이라도 <span className={styles.highlight}>새날 중개법인</span>을 통해
                산업부동산 상담을 받으실 수 있습니다.
              </p>
            </div>

            <div className={styles.contactInfo}>
              <div className={styles.contactImage}>
                <div className={styles.imagePlaceholder}></div>
              </div>

              <div className={styles.contactText}>
                <div className={styles.contactName}>
                  <p>새날 중개법인</p>
                </div>
                <div className={styles.contactRole}>
                  <p>10년 산업부동산 전문</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
