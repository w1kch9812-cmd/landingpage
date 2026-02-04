# Framer Code Components

공짱 랜딩페이지용 Framer Code Component 모음

## 사용법

1. Framer 프로젝트에서 **Code** 탭 열기
2. **New File** 클릭
3. 각 파일 내용을 복사하여 붙여넣기
4. 컴포넌트를 캔버스에 드래그하여 사용

---

## 컴포넌트 목록

### 1. AnimatedCounter
숫자가 0부터 목표값까지 올라가는 카운트업 애니메이션

**Props:**
- `value` - 목표 숫자 (예: "1,000")
- `suffix` - 접미사 (예: "+", "만+")
- `duration` - 애니메이션 시간 (ms)
- `fontSize` - 폰트 크기
- `fontWeight` - 폰트 굵기
- `color` - 텍스트 색상

---

### 2. InteractiveDotGrid
마우스를 따라 움직이는 인터랙티브 점 그리드

**Props:**
- `dotSpacing` - 점 간격
- `dotRadius` - 점 크기
- `influenceRadius` - 마우스 영향 범위
- `maxDisplacement` - 최대 이동 거리
- `dotColor` - 점 색상 (RGB 형식: "0, 113, 255")

**사용 시 주의:**
- 부모 Frame에 `position: relative` 설정 필요
- 부모 Frame 크기에 맞게 자동 조절됨

---

### 3. CountdownTimer
특정 날짜까지 카운트다운 타이머

**Props:**
- `targetDate` - 목표 날짜 (ISO 형식: "2026-03-01T00:00:00")
- `label` - 라벨 텍스트
- `backgroundColor` - 배경색
- `textColor` - 텍스트 색상
- `numberColor` - 숫자 색상

**위치:**
- 화면 하단 중앙에 고정 (fixed)

---

### 4. Preloader
페이지 로딩 애니메이션

**Props:**
- `duration` - 로딩 시간 (ms)
- `backgroundColor` - 배경색
- `logoColor` - 로고 색상

**사용 시 주의:**
- 페이지 최상단에 배치
- 로딩 완료 후 자동으로 사라짐

---

### 5. CheckAnimation
체크 표시 애니메이션 (폼 제출 성공 시 사용)

**Props:**
- `size` - 크기
- `color` - 색상
- `strokeWidth` - 선 두께
- `delay` - 애니메이션 시작 지연 (ms)

---

### 6. RotatingText
텍스트가 순환하며 바뀌는 애니메이션 (Hero 섹션용)

**Props:**
- `words` - 순환할 단어 배열
- `interval` - 전환 간격 (ms)
- `fontSize` - 폰트 크기
- `fontWeight` - 폰트 굵기
- `color` - 텍스트 색상
- `prefix` - 앞에 붙는 문자 (예: ")
- `suffix` - 뒤에 붙는 문자 (예: ")

---

### 7. Marquee
무한 스크롤 마키 애니메이션 (Needs, Partners 섹션용)

**Props:**
- `items` - 표시할 아이템 배열
- `speed` - 스크롤 속도 (px/s)
- `direction` - 방향 (left / right)
- `gap` - 아이템 간격
- `fontSize` - 폰트 크기
- `fontWeight` - 폰트 굵기
- `color` - 텍스트 색상
- `backgroundColor` - 아이템 배경색
- `padding` - 아이템 패딩
- `borderRadius` - 아이템 모서리 둥글기

---

### 8. FAQAccordion
FAQ 섹션용 아코디언 컴포넌트

**Props:**
- `items` - FAQ 아이템 배열 (question, answer)
- `defaultOpenIndex` - 기본 열려있는 항목 인덱스 (-1이면 모두 닫힘)
- `questionFontSize` - 질문 폰트 크기
- `answerFontSize` - 답변 폰트 크기
- `primaryColor` - 주요 색상 (아이콘 회전 시)
- `backgroundColor` - 외부 배경색
- `questionColor` - 질문 텍스트 색상
- `answerColor` - 답변 텍스트 색상
- `borderRadius` - 모서리 둥글기
- `gap` - 항목 간격

**기본 FAQ 포함:**
공짱 서비스 관련 7개 FAQ가 기본으로 포함되어 있음

---

### 9. TestimonialCard
고객 후기 카드 컴포넌트 (Client Stories 섹션용)
검은색 배경 + 호버 시 primaryColor 배경으로 변경

**Props:**
- `quote` - 후기 내용
- `name` - 이름
- `role` - 역할/업종
- `highlight` - 하이라이트 배지 텍스트
- `avatarText` - 아바타 텍스트 (비워두면 이름 첫 글자)
- `primaryColor` - 주요 색상 (호버 시 배경색)
- `width` - 카드 너비
- `position` - 위치 (top / middle / bottom) - staggered 레이아웃용
- `enableHover` - 호버 효과 활성화

---

### 10. TestimonialsSlider
Client Stories 섹션용 무한 드래그 슬라이더

**특징:**
- 자동 스크롤 (멈추지 않음)
- 드래그 인터랙션 + 모멘텀 효과
- staggered 레이아웃 (top/middle/bottom)
- 호버 시 스케일 + 색상 변경
- 무한 루프

**Props:**
- `cardWidth` - 카드 너비 (기본 360)
- `gap` - 카드 간격 (기본 24)
- `autoScrollSpeed` - 자동 스크롤 속도 (기본 0.5)
- `primaryColor` - 주요 색상

**기본 후기 포함:**
공짱 고객 후기 9개가 기본으로 포함되어 있음

---

### 11. NeedsMarquee
Needs 섹션용 4줄 마키 컴포넌트

**특징:**
- 4줄 마키 (좌-우-좌-우 교대 방향)
- 이모지 + 텍스트 카드
- 양쪽 페이드 마스크
- 호버 시 카드 상승 효과

**Props:**
- `speed` - 애니메이션 시간 (초, 낮을수록 빠름)
- `gap` - 카드 간격
- `rowGap` - 줄 간격

**기본 질문 포함:**
공짱 관련 질문 24개 (6개 × 4줄)가 기본으로 포함되어 있음

---

### 12. CoreFeaturesTab
CoreFeatures 섹션용 탭 네비게이션 컴포넌트

**Props:**
- `activeTab` - 활성 탭 (data / map / matching)
- `primaryColor` - 주요 색상

**탭 목록:**
- 산업시설 데이터 분석
- 공간정보 시각화
- 맞춤형 컨설팅

---

### 13. FeatureCard
CoreFeatures 섹션용 기능 카드 컴포넌트

**Props:**
- `title` - 카드 제목
- `description` - 카드 설명
- `comingSoon` - Coming Soon 뱃지 표시 여부
- `primaryColor` - 주요 색상
- `width` - 카드 너비

**특징:**
- 시각적 영역 (children으로 Visual 컴포넌트 삽입)
- 호버 시 상승 + 그림자 효과
- Coming Soon 뱃지 지원

---

### 14. CoreFeaturesSection
CoreFeatures 전체 섹션 컴포넌트 (탭 + 카드 그리드 통합)

**Props:**
- `primaryColor` - 주요 색상

**특징:**
- 탭 네비게이션 + 기능 카드 그리드 통합
- 탭 전환 시 페이드 애니메이션
- 14개 시각화 컴포넌트 모두 포함
- Coming Soon 기능 지원

**사용 방법:**
1. 단독으로 사용하면 전체 CoreFeatures 섹션 완성
2. 탭 전환과 카드 그리드가 자동으로 연동됨

---

### 15. CoreFeaturesVisuals (visuals 폴더)
Core Features 섹션의 시각화 컴포넌트 모음 (14개)
각 컴포넌트는 개별 파일로 분리되어 있으며, 원본 CSS 애니메이션을 정확히 재현합니다.

**포함된 컴포넌트:**

| 파일 | 설명 | 애니메이션 |
|------|------|------------|
| `SpecsVisual` | 건축 스펙 (전력, 바닥하중, 호이스트, 천정고) | specPulse |
| `BuildingVisual` | 건물별 스펙 (제조동, 사무동, 가설건축물) | buildingSlide |
| `VehicleVisual` | 차량 통행 (11톤 윙바디, 25톤 카고, 40ft 트레일러) | - |
| `TrafficVisual` | 인프라 (IC 접근, 배후 주거, 인력 수급) | trafficWave |
| `PriceVisual` | 시세 (공장 vs 창고) | priceFill |
| `HeatmapVisual` | 필지별 데이터 시각화 | cellFade |
| `ClusterVisual` | 업종별 산업 클러스터 | clusterPulse |
| `RealtimeVisual` | 지역별 실시간 분석 | cursorMove |
| `RequestVisual` | 매도/매수 의뢰 플로우 | arrowPulse |
| `ExpertVisual` | 원스톱 전문가 케어 타임라인 | - |
| `SaveVisual` | 필터 조건 저장 | saveSlide, saveGlow, iconWiggle |
| `AlertVisual` | 조건 매칭 알림 | phoneVibrate, notificationPop, bellRing |
| `DistrictVisual` | 산업단지 정밀 브리핑 | boundaryPulse |
| `MockupVisual` | 통합 지도 시스템 목업 | browserFloat, filterPulse, pinBounce |

**공통 Props:**
- `primaryColor` - 주요 색상 (기본값: #3b82f6)

---

## 폰트 설정

모든 컴포넌트에서 `Pretendard` 폰트를 사용합니다.
Framer 프로젝트 설정에서 커스텀 폰트로 Pretendard를 추가하세요.

```
https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css
```

---

## 색상 변수

```
Primary: #0071ff
Text Primary: #001530
Text Muted: #5c6b7a
Background: #f8f9fa
```
