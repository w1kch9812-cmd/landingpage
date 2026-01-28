'use client';

import React from 'react';
import Badge from '@/components/ui/Badge';
import styles from './Statistics.module.css';

export default function Statistics() {

  return (
    <section id="section-statistics" className={styles.section}>
      <div className={styles.container}>
        {/* Top */}
        <div className={styles.top}>
          {/* Badge */}
          <div className={styles.badgeWrapper}>
            <Badge text="Private Listings" variant="light" />
          </div>

          {/* Heading */}
          <div className={styles.heading}>
            <div className={styles.headingText}>
              <h2>
                걱정 없이, 안전하게. <span className={styles.mutedText}>프라이빗 매물 시스템</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Items */}
          <div className={styles.items}>
            {/* Description Text */}
            <div className={styles.descriptionText}>
              <p>
                <span className={styles.boldText}>기업의 자산 거래는 더 조심스럽고 안전해야 합니다.</span> 직원도, 거래처도 모르게 진행하고 싶으신가요? 공짱의 프라이빗 매물 시스템은 철저한 신원 인증을 거친 실수요자에게만 제한적으로 정보를 공개합니다.
              </p>
            </div>

            {/* Cards */}
            <div className={styles.cards}>
              {/* Card 1 */}
              <div className={styles.cardContainer}>
                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.numberContainer}>
                      <div className={styles.number}>
                        <span>100</span>
                        <span>%</span>
                      </div>
                    </div>
                    <div className={styles.cardId}>
                      <p>01</p>
                    </div>
                  </div>
                  <div className={styles.cardBottom}>
                    <div className={styles.cardTopText}>
                      <div className={styles.cardLabel}>
                        <p>신원 인증 시스템</p>
                      </div>
                    </div>
                    <div className={styles.cardDescription}>
                      <p>사업자등록증 확인 후 매물 정보 제공</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className={styles.cardContainer}>
                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.numberContainer}>
                      <div className={styles.number}>
                        <span>100</span>
                        <span>%</span>
                      </div>
                    </div>
                    <div className={styles.cardId}>
                      <p>02</p>
                    </div>
                  </div>
                  <div className={styles.cardBottom}>
                    <div className={styles.cardTopText}>
                      <div className={styles.cardLabel}>
                        <p>제한적 공개</p>
                      </div>
                    </div>
                    <div className={styles.cardDescription}>
                      <p>경쟁사 모르게, 조용히 진행</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
