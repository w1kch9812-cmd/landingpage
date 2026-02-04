# 공짱 랜딩페이지 개발 핸드오프 문서

## 프로젝트 개요

**프로젝트명:** 공짱 (산업용 부동산 플랫폼) 랜딩페이지
**기술 스택:** Next.js 14, React, TypeScript, CSS Modules, GSAP, Framer Motion, Spline
**배포:** Vercel
**저장소:** https://github.com/w1kch9812-cmd/landingpage

---

## 프로젝트 구조

```
landingpage/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 메인 랜딩페이지
│   ├── layout.tsx         # 루트 레이아웃
│   └── globals.css        # 전역 스타일 변수
├── components/
│   ├── Navbar.tsx         # 상단 네비게이션 (로고 + CTA)
│   ├── Preloader.tsx      # 로딩 애니메이션
│   ├── ScrollToTop.tsx    # 스크롤 투 탑 버튼 (데스크톱만)
│   ├── SmoothScroll.tsx   # Lenis 스무스 스크롤
│   ├── 3d/
│   │   └── HeroScene.tsx  # Spline 3D 씬 (데스크톱만)
│   ├── sections/          # 페이지 섹션들
│   │   ├── Hero.tsx
│   │   ├── Needs.tsx
│   │   ├── CoreFeatures.tsx
│   │   ├── TrustSecurity.tsx
│   │   ├── SocialProof.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── LaunchNotify.tsx
│   │   └── Footer.tsx
│   └── ui/                # 재사용 UI 컴포넌트
│       ├── SectionHeader.tsx
│       ├── CountdownTimer.tsx
│       ├── ProgressiveBlur.tsx
│       ├── CheckAnimation.tsx
│       ├── CustomCursor.tsx
│       └── animations.tsx
├── public/
│   └── spline/
│       └── scene.splinecode  # Spline 3D 씬 파일
└── contexts/
    └── ThemeContext.tsx   # 테마 컨텍스트
```

---

## 섹션별 설명

### 1. Hero (Hero.tsx)
- 메인 히어로 영역
- Spline 3D 애니메이션 배경 (데스크톱만, 810px 이하에서 비활성화)
- 업종명 로테이션 애니메이션 (GSAP)
- 스크롤 시 프레임 애니메이션

### 2. Needs (Needs.tsx)
- 무한 스크롤 마키 애니메이션
- 공장 거래 시 검토해야 할 조건들 표시
- 4개 행, 좌우 교차 스크롤

### 3. CoreFeatures (CoreFeatures.tsx)
- 플랫폼 핵심 기능 소개
- 3개 카드 그리드 레이아웃

### 4. TrustSecurity (TrustSecurity.tsx) - Private Listing
- 비공개 매물 시스템 소개
- 3개 시나리오 카드
- 하단 features bar: "사업자 인증을 완료한 실수요자에게만 공개되도록 설정할 수 있습니다"

### 5. SocialProof (SocialProof.tsx)
- 플랫폼 신뢰 지표
- 사용자 통계

### 6. Testimonials (Testimonials.tsx)
- 고객 후기 카드
- 드래그 가능한 캐러셀

### 7. FAQ (FAQ.tsx)
- 자주 묻는 질문 아코디언

### 8. LaunchNotify (LaunchNotify.tsx)
- 전화번호 수집 폼 (010-1234-5678 형식)
- 출시 알림 신청
- **API 연동 필요**: 현재 `handleSubmit` 함수에서 콘솔 로그만 출력됨. 실제 API 호출로 교체 필요

### 9. Footer (Footer.tsx)
- 푸터 정보
- 저작권

---

## 주요 컴포넌트

### Navbar
- 로고 (좌측) + CTA 버튼 (우측)
- 스크롤 시 배경 변화
- CTA 클릭 시 LaunchNotify 섹션으로 스크롤

### CountdownTimer
- 출시일까지 카운트다운
- 화면 하단 고정 (2026년 3월 1일 기준)

### ScrollToTop
- 우측 하단 스크롤 투 탑 버튼
- 모바일(768px 이하)에서는 숨김

### HeroScene (Spline)
- Spline으로 제작된 3D 씬
- 모바일(810px 이하)에서는 렌더링하지 않음
- 파일 위치: `/public/spline/scene.splinecode`

---

## 반응형 브레이크포인트

```css
/* Desktop: 1200px 이상 */
/* Tablet: 810px - 1199px */
/* Mobile: 810px 미만 */
/* Small Mobile: 480px 미만 */
```

---

## CSS 변수 (globals.css)

```css
--color-primary: #0071ff;
--color-background: #f8f9fa;
--color-text-primary: #001530;
--color-text-muted: #5c6b7a;
--font-pretendard: 'Pretendard', sans-serif;
--radius-card: 16px;
--radius-full: 9999px;
```

---

## 배포

```bash
# 개발 서버
npm run dev

# 빌드
npm run build

# Vercel 배포
npx vercel --prod
```

---

## 주의사항

1. **Spline 3D**: Hero 섹션의 Spline 씬은 모바일에서 성능 고려하여 비활성화됨
2. **GSAP ScrollTrigger**: 스크롤 애니메이션은 모바일에서 비활성화됨
3. **Lenis**: 스무스 스크롤 라이브러리 사용 중

---

## 개발 필요 사항

### 1. 전화번호 수집 API 연동

**파일:** `components/sections/LaunchNotify.tsx`

현재 폼 제출 시 콘솔 로그만 출력됨. 실제 API 연동 필요.

**사용 변수:**
- `formData.phone` - 사용자가 입력한 전화번호 (예: "010-1234-5678")
- `setStatus('success')` - 성공 시 호출
- `setStatus('duplicate')` - 중복 번호 시 호출
- `setStatus('error')` - 오류 시 호출
- `setErrorMessage('메시지')` - 오류 메시지 설정

---

### 2. 출시 후 변경 사항

현재는 출시 전 버전입니다. 출시 후 아래 내용 수정 필요:

**Navbar CTA 버튼 텍스트 변경**
- 파일: `components/Navbar.tsx`
- 현재: "출시 알림 받기"
- 변경: (출시 후 텍스트로 교체 필요)

**출시 알림 섹션 제거**
- 파일: `components/sections/LaunchNotify.tsx`
- 메인 페이지(`app/page.tsx`)에서 `<LaunchNotify />` 컴포넌트 제거

**카운트다운 타이머 제거**
- 파일: `components/ui/CountdownTimer.tsx`
- 메인 페이지(`app/page.tsx`)에서 `<CountdownTimer />` 컴포넌트 제거

---

**마지막 업데이트:** 2026-02-04
