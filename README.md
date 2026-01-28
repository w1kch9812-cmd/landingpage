# 공짱 랜딩 페이지

산업부동산 플랫폼 공짱의 랜딩 페이지입니다.

## ✨ 주요 특징

- 🎯 **깔끔한 구조** - 컴포넌트 기반 아키텍처, 명확한 파일 구조
- 📱 **완전 반응형** - 모바일, 태블릿, 데스크톱 모두 최적화
- 🎨 **모던 디자인** - Spline 3D 배경과 Aurora 효과
- 🚀 **최소 의존성** - Spline과 Phosphor Icons만 사용
- 🌏 **한글 최적화** - 한화 계열 폰트 완벽 지원 (외부 CDN)

## 🛠 기술 스택

### 핵심
- **Next.js 16.1.4** - React 기반 프레임워크
- **TypeScript** - 타입 안정성
- **CSS Modules** - 스타일 캡슐화

### UI 라이브러리
- **@splinetool/react-spline** - 3D 인터랙티브 배경
- **@phosphor-icons/react** - 아이콘 세트

### 폰트 (외부 CDN)
- **Hanwha** (Light, Regular, Bold) - 메인 타이틀
- **HanwhaGothic** (Light, Regular) - 본문 텍스트
- **Pretendard** - 보조 텍스트
- **Gmarket Sans** - 강조 텍스트
- **Inter** - 영문 폰트

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📁 프로젝트 구조

```
saenal-land/
├── app/
│   ├── layout.tsx              # 루트 레이아웃
│   ├── page.tsx                # 메인 페이지 (컴포넌트 조립)
│   ├── page.module.css         # 페이지 레이아웃 스타일
│   └── globals.css             # 글로벌 스타일, 폰트
├── components/
│   ├── sections/
│   │   ├── Hero.tsx            # 히어로 섹션
│   │   ├── Hero.module.css
│   │   ├── InfoSection.tsx     # 정보 섹션
│   │   └── InfoSection.module.css
│   ├── FloatingCTA.tsx         # 플로팅 CTA 버튼
│   └── FloatingCTA.module.css
└── public/                     # 정적 파일 (이미지 등)
```

## 🎨 스타일 시스템

### CSS 네이밍 규칙
```
📦 Component
 ├── [ComponentName].tsx
 └── [ComponentName].module.css
    ├── .componentName      (루트 컨테이너)
    ├── .componentSection   (섹션)
    ├── .componentTitle     (제목)
    └── .componentButton    (버튼)
```

**명칭 원칙:**
- **명확성**: `heroSection`, `infoContainer`, `ctaButton`
- **일관성**: 컴포넌트명 + 요소 역할
- **의미론적**: HTML 구조와 매칭 (section, container, content, title)

### 반응형 브레이크포인트
- **Desktop**: 1200px 이상
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small**: 479px 이하

### 컬러 팔레트
```css
Primary Blue:    #0571ff
Text Dark:       rgb(17, 17, 17)
Text Light:      rgba(17, 17, 17, 0.6)
Background:      #ffffff / #000000
Aurora Accent:   rgba(5, 113, 255, 0.1)
```

## 🚀 배포

### Vercel (권장)
```bash
npm i -g vercel
vercel
```

### 기타 플랫폼
- **Netlify**: `netlify deploy`
- **AWS Amplify**: amplify.yml 설정
- **Cloudflare Pages**: CF Pages 연동

## 🔧 개발 가이드

### 새로운 섹션 추가하기
1. `components/sections/` 에 컴포넌트 생성
2. CSS Module 파일 생성
3. `app/page.tsx`에 import 및 추가

```tsx
// components/sections/NewSection.tsx
'use client';
import styles from './NewSection.module.css';

export default function NewSection() {
  return (
    <section className={styles.newSection}>
      {/* 내용 */}
    </section>
  );
}
```

### CSS 모듈 작성 규칙
```css
/* 루트 요소 */
.componentName {
  width: 100%;
  /* ... */
}

/* 하위 요소 */
.componentSection {
  /* ... */
}

/* 반응형 */
@media (max-width: 768px) {
  .componentName {
    /* 모바일 스타일 */
  }
}
```

### 폰트 관련
- 외부 CDN 사용 (Framer CDN)
- `font-display: swap` 적용
- Placeholder 폰트로 CLS 방지
- 로컬 폰트 불필요 (네트워크 로딩)

## 📊 성능 최적화

- ✅ CSS Modules로 스타일 스코프 분리
- ✅ 폰트 최적화 (`font-display: swap`)
- ✅ 최소 의존성 (2개 라이브러리만 사용)
- ✅ 정적 생성 (Static Generation)
- ✅ 코드 스플리팅 (Next.js 자동)

## 📄 라이선스

이 프로젝트는 원본 사이트(site.saenal.land)의 디자인을 기반으로 하여 Next.js로 재구성한 클린 버전입니다.

## 🙋‍♂️ FAQ

**Q: 폰트를 로컬에 저장해야 하나요?**  
A: 아니요. 외부 CDN(Framer)을 사용하며, `font-display: swap`으로 최적화되어 있습니다.

**Q: container 너비가 1200px로 제한되어 있나요?**  
A: 아니요. 전체 너비(`100%`)를 사용하며, 내부 컨텐츠만 `max-width: 1200px`로 제한됩니다.

**Q: 클래스명 규칙은 무엇인가요?**  
A: `[컴포넌트명][요소역할]` 형식입니다. 예: `heroSection`, `infoTitle`, `ctaButton`
