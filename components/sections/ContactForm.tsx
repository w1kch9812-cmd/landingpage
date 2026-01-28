'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import SectionHeader from '@/components/ui/SectionHeader';
import CTAButton from '@/components/ui/CTAButton';
import styles from './ContactForm.module.css';

const SplineScene = dynamic(() => import('@/components/3d/SplineScene'), {
  ssr: false,
  loading: () => <div className={styles.splineFallback} />,
});

export default function ContactForm() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    <section id="section-contact" className={styles.section}>
      <div className={styles.darkCard}>
        {/* Spline 배경 */}
        <div className={styles.splineWrapper}>
          <SplineScene
            sceneUrl="/spline/glass.splinecode"
            interactive={false}
          />
        </div>

        {/* Left Content */}
        <div className={styles.content}>
          <SectionHeader sectionName="Contact" sectionNumber="07">
            출시 알림 신청
          </SectionHeader>
          <p className={styles.description}>
            최적의 생산 거점을 찾는 가장 확실한 방법.<br />
            <span className={styles.highlight}>공짱 2.0 업데이트에 맞춰 가장 먼저 알림 받아보세요.</span>
          </p>
        </div>

        {/* Right Form */}
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formInputs}>
              <label className={styles.formLabel}>
                <span className={styles.labelText}>이메일</span>
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="hello@example.com"
                  className={styles.input}
                  value={formData.email}
                  onChange={handleChange}
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="올바른 이메일 형식을 입력해주세요"
                />
              </label>
              <label className={styles.formLabel}>
                <span className={styles.labelText}>연락처</span>
                <input
                  type="tel"
                  required
                  name="phone"
                  placeholder="010-1234-5678"
                  className={styles.input}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                  title="올바른 전화번호 형식을 입력해주세요 (010-1234-5678)"
                />
              </label>
            </div>
            <CTAButton type="submit" variant="accent" size="medium" fullWidth>
              출시 알림 받기
            </CTAButton>
            <p className={styles.termsText}>
              신청하시면 <a href="https://gongzzang.net/terms" target="_blank" rel="noopener noreferrer">이용약관</a> 및 <a href="https://gongzzang.net/terms" target="_blank" rel="noopener noreferrer">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
