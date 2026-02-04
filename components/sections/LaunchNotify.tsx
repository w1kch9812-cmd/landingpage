'use client';

import React, { useState } from 'react';
import { FadeUp, SlideIn } from '@/components/ui/animations';
import CheckAnimation from '@/components/ui/CheckAnimation';
import styles from './LaunchNotify.module.css';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error' | 'duplicate';

export default function LaunchNotify() {
  const [formData, setFormData] = useState({
    phone: '',
  });
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      console.log('Form submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 800));

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleRetry = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length > 7) {
      value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');
    }

    setFormData({
      ...formData,
      phone: value,
    });
  };

  return (
    <section id="section-launch-notify" className={styles.section}>
      <div className={styles.sectionFrame}>
        <div className={styles.noiseOverlay} />
        <div className={styles.gradientGlow} />

        <div className={styles.card}>
          <FadeUp className={styles.content}>
            <h2 className={styles.title}>
              최적의 생산 거점을 찾는<br />
              가장 확실한 방법
            </h2>
            <p className={styles.description}>
              공짱 2.0 업데이트에 맞춰 가장 먼저 알림 받아보세요
            </p>
          </FadeUp>

          <SlideIn direction="up" delay={0.2} className={styles.formWrapper}>
              {status === 'success' && (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>
                    <CheckAnimation size={80} />
                  </div>
                  <h3 className={styles.successTitle}>신청 완료!</h3>
                  <p className={styles.successDescription}>
                    출시 시 가장 먼저 알려드릴게요.
                  </p>
                </div>
              )}

              {status === 'duplicate' && (
                <div className={styles.statusMessage}>
                  <div className={styles.statusIcon}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className={styles.statusTitle}>이미 신청된 번호예요</h3>
                  <p className={styles.statusDescription}>
                    입력하신 번호로 이미 알림 신청이 완료되어 있습니다.<br />
                    출시되면 가장 먼저 연락드릴게요!
                  </p>
                  <button type="button" className={styles.retryButton} onClick={handleRetry}>
                    다른 번호로 신청
                  </button>
                </div>
              )}

              {status === 'error' && (
                <div className={styles.statusMessage}>
                  <div className={`${styles.statusIcon} ${styles.errorIcon}`}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className={styles.statusTitle}>오류가 발생했어요</h3>
                  <p className={styles.statusDescription}>
                    {errorMessage}
                  </p>
                  <button type="button" className={styles.retryButton} onClick={handleRetry}>
                    다시 시도
                  </button>
                </div>
              )}

              {(status === 'idle' || status === 'loading') && (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.inputGroup}>
                    <input
                      id="launch-notify-phone"
                      type="tel"
                      required
                      name="phone"
                      placeholder="연락처를 입력해주세요"
                      className={styles.input}
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                      title="올바른 전화번호 형식을 입력해주세요 (010-1234-5678)"
                      autoComplete="tel"
                      disabled={status === 'loading'}
                    />
                    <button
                      type="submit"
                      className={`${styles.ctaButton} ${status === 'loading' ? styles.ctaButtonLoading : ''}`}
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <div className={styles.spinner} />
                      ) : (
                        <div className={styles.ctaTextWrapper}>
                          <span className={styles.ctaText}>알림 신청</span>
                          <span className={styles.ctaTextHover}>알림 신청</span>
                        </div>
                      )}
                    </button>
                  </div>
                  <p className={styles.termsText}>
                    신청 시 <a href="https://gongzzang.net/terms" target="_blank" rel="noopener noreferrer">이용약관</a> 및 <a href="https://gongzzang.net/terms?tab=2" target="_blank" rel="noopener noreferrer">개인정보처리방침</a>에 동의합니다.
                  </p>
                </form>
              )}
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
