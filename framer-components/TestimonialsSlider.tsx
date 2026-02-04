import { useState, useRef, useEffect, useCallback } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * Testimonials 무한 드래그 슬라이더
 * - 자동 스크롤
 * - 드래그 인터랙션 + 모멘텀
 * - staggered 레이아웃 (top/middle/bottom)
 * - 호버 시 스케일 + 색상 변경
 */

interface Testimonial {
    quote: string
    name: string
    role: string
    highlight: string
    position: "top" | "middle" | "bottom"
}

interface Props {
    testimonials: Testimonial[]
    cardWidth: number
    gap: number
    autoScrollSpeed: number
    primaryColor: string
}

const defaultTestimonials: Testimonial[] = [
    {
        quote: "계약 직전, 공짱에서 같은 조건의 경매 물건을 발견했습니다. 3억 원을 아끼고 더 넓은 부지까지 확보했어요. 일반 매물만 봤으면 큰 손해를 볼 뻔했습니다.",
        name: "김OO 대표",
        role: "금속가공업 · 경기 화성",
        highlight: "3억 원 절감",
        position: "top",
    },
    {
        quote: "공장 매각을 비밀리에 진행해야 했는데, 프라이빗 매물 시스템 덕분에 직원들 모르게 매수자를 찾을 수 있었습니다. 정보 유출 걱정 없이 진행했어요.",
        name: "이OO 실장",
        role: "물류업 · 인천",
        highlight: "비밀 매각 성공",
        position: "middle",
    },
    {
        quote: "2년간 구축 공장만 찾아다녔는데, 공짱에서 신규 산단 분양 정보를 보고 방향을 바꿨어요. 입주 업종, 분양가, 인프라까지 한눈에 비교하니 결정이 쉬웠습니다.",
        name: "박OO 이사",
        role: "식품제조업 · 충북 청주",
        highlight: "신규 산단 입주",
        position: "bottom",
    },
    {
        quote: "매물마다 전화해서 전력량, 층고, 호이스트 물어보던 시절이 있었어요. 이제는 검색 한 번으로 끝. 헛걸음 횟수가 확 줄었습니다.",
        name: "최OO 팀장",
        role: "전자부품 제조업 · 경기 평택",
        highlight: "현장 방문 70% 감소",
        position: "top",
    },
    {
        quote: "원하는 조건을 저장해두고 본업에 집중했어요. 3개월 만에 딱 맞는 매물이 등록됐고, 알림 받자마자 바로 계약했습니다. 타이밍을 놓치지 않았어요.",
        name: "정OO 대표",
        role: "기계제조업 · 경남 창원",
        highlight: "조건 100% 매칭",
        position: "middle",
    },
    {
        quote: "5개 산단을 직접 발품 팔아 비교하려면 한 달은 걸렸을 거예요. 공짱에서 분양가, 입주 조건, 규제사항을 하루 만에 파악했습니다.",
        name: "한OO 부장",
        role: "화학제조업 · 전남 여수",
        highlight: "비교 분석 시간 95% 단축",
        position: "bottom",
    },
    {
        quote: "실거래가 데이터로 적정 가격을 파악하고 협상에 임했더니, 호가보다 8% 낮은 가격에 계약할 수 있었습니다. 데이터의 힘이에요.",
        name: "송OO 대표",
        role: "자동차부품 제조업 · 울산",
        highlight: "호가 대비 8% 절감",
        position: "top",
    },
    {
        quote: "경쟁사가 눈독 들이던 물건이었는데, 알림 덕분에 먼저 연락해서 계약했습니다. IC 10분 거리, 물류비 연 2억 절감 예상됩니다.",
        name: "윤OO 상무",
        role: "플라스틱 제조업 · 충남 천안",
        highlight: "물류비 연 2억 절감",
        position: "middle",
    },
    {
        quote: "20년 경력인데, 공장 중개할 때마다 건축물대장, 토지이용계획 일일이 확인하느라 시간이 많이 걸렸어요. 공짱은 한 화면에 다 나와서 고객 응대 속도가 확 빨라졌습니다.",
        name: "강OO 공인중개사",
        role: "산업부동산 전문 · 경기 시흥",
        highlight: "업무 효율 3배 향상",
        position: "bottom",
    },
]

function TestimonialCard({
    testimonial,
    cardWidth,
    primaryColor,
    isHovered,
    onHover,
    onLeave,
}: {
    testimonial: Testimonial
    cardWidth: number
    primaryColor: string
    isHovered: boolean
    onHover: () => void
    onLeave: () => void
}) {
    const positionStyles = {
        top: { alignSelf: "flex-start", transform: isHovered ? "translateY(0) scale(1.05)" : "translateY(0)" },
        middle: { alignSelf: "center", transform: isHovered ? "translateY(40px) scale(1.05)" : "translateY(40px)" },
        bottom: { alignSelf: "flex-end", transform: isHovered ? "translateY(80px) scale(1.05)" : "translateY(80px)" },
    }

    return (
        <div
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            style={{
                flexShrink: 0,
                width: cardWidth,
                background: isHovered ? primaryColor : "#0a0a0a",
                border: `1px solid ${isHovered ? primaryColor : "rgba(255, 255, 255, 0.1)"}`,
                borderRadius: 16,
                padding: 28,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "grab",
                boxShadow: isHovered ? `0 20px 60px ${primaryColor}4D` : "none",
                ...positionStyles[testimonial.position],
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                }}
            >
                {/* Highlight Badge */}
                {testimonial.highlight && (
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 12,
                            fontWeight: 600,
                            letterSpacing: "-0.01em",
                            color: isHovered ? "#ffffff" : primaryColor,
                            background: isHovered ? "rgba(255, 255, 255, 0.2)" : `${primaryColor}26`,
                            padding: "6px 12px",
                            borderRadius: 9999,
                            width: "fit-content",
                            transition: "all 0.3s ease",
                        }}
                    >
                        {testimonial.highlight}
                    </span>
                )}

                {/* Quote */}
                <p
                    style={{
                        fontFamily: "Pretendard, sans-serif",
                        fontSize: 15,
                        fontWeight: 400,
                        lineHeight: 1.7,
                        letterSpacing: "-0.02em",
                        color: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.9)",
                        margin: 0,
                        transition: "color 0.3s ease",
                    }}
                >
                    {testimonial.quote}
                </p>

                {/* Person Info */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        paddingTop: 12,
                        borderTop: `1px solid ${isHovered ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"}`,
                        transition: "border-color 0.3s ease",
                    }}
                >
                    {/* Avatar */}
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 14,
                                fontWeight: 500,
                                color: "rgba(255, 255, 255, 0.8)",
                            }}
                        >
                            {testimonial.name.charAt(0)}
                        </span>
                    </div>

                    {/* Name & Role */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 14,
                                fontWeight: 500,
                                letterSpacing: "-0.01em",
                                color: "rgba(255, 255, 255, 0.95)",
                            }}
                        >
                            {testimonial.name}
                        </span>
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 13,
                                fontWeight: 400,
                                letterSpacing: "-0.01em",
                                color: "rgba(255, 255, 255, 0.6)",
                            }}
                        >
                            {testimonial.role}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function TestimonialsSlider({
    testimonials = defaultTestimonials,
    cardWidth = 360,
    gap = 24,
    autoScrollSpeed = 0.5,
    primaryColor = "#0071ff",
}: Props) {
    const sliderRef = useRef<HTMLDivElement>(null)
    const translateX = useRef(0)
    const animationId = useRef<number | null>(null)
    const isDragging = useRef(false)
    const dragStartX = useRef(0)
    const dragStartTranslate = useRef(0)
    const lastDragX = useRef(0)
    const velocity = useRef(0)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials]
    const singleSetWidth = testimonials.length * (cardWidth + gap)

    const normalizePosition = useCallback(
        (pos: number): number => {
            let normalized = pos
            while (normalized < -singleSetWidth * 2) {
                normalized += singleSetWidth
            }
            while (normalized > -singleSetWidth) {
                normalized -= singleSetWidth
            }
            return normalized
        },
        [singleSetWidth]
    )

    const updateSliderPosition = useCallback(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(${translateX.current}px)`
        }
    }, [])

    const autoScroll = useCallback(() => {
        if (!isDragging.current) {
            translateX.current -= autoScrollSpeed
            translateX.current = normalizePosition(translateX.current)
            updateSliderPosition()
        }
        animationId.current = requestAnimationFrame(autoScroll)
    }, [normalizePosition, updateSliderPosition, autoScrollSpeed])

    useEffect(() => {
        translateX.current = -singleSetWidth
        updateSliderPosition()
        animationId.current = requestAnimationFrame(autoScroll)
        return () => {
            if (animationId.current) {
                cancelAnimationFrame(animationId.current)
            }
        }
    }, [singleSetWidth, autoScroll, updateSliderPosition])

    const applyMomentum = useCallback(() => {
        if (Math.abs(velocity.current) > 0.5) {
            translateX.current += velocity.current
            translateX.current = normalizePosition(translateX.current)
            velocity.current *= 0.95
            updateSliderPosition()
            requestAnimationFrame(applyMomentum)
        }
    }, [normalizePosition, updateSliderPosition])

    const handleDragStart = useCallback((clientX: number) => {
        isDragging.current = true
        dragStartX.current = clientX
        dragStartTranslate.current = translateX.current
        lastDragX.current = clientX
        velocity.current = 0
    }, [])

    const handleDragMove = useCallback(
        (clientX: number) => {
            if (!isDragging.current) return
            const deltaX = clientX - dragStartX.current
            velocity.current = clientX - lastDragX.current
            lastDragX.current = clientX
            translateX.current = dragStartTranslate.current + deltaX
            translateX.current = normalizePosition(translateX.current)
            updateSliderPosition()
        },
        [normalizePosition, updateSliderPosition]
    )

    const handleDragEnd = useCallback(() => {
        if (!isDragging.current) return
        isDragging.current = false
        if (Math.abs(velocity.current) > 2) {
            velocity.current *= 5
            applyMomentum()
        }
    }, [applyMomentum])

    return (
        <div
            style={{
                width: "100%",
                overflow: "hidden",
                padding: "20px 0 100px 0",
                position: "relative",
            }}
            onMouseDown={(e) => {
                e.preventDefault()
                handleDragStart(e.clientX)
            }}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={() => {
                if (isDragging.current) handleDragEnd()
            }}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
        >
            <div
                ref={sliderRef}
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: gap,
                    width: "fit-content",
                    padding: "0 80px",
                    cursor: isDragging.current ? "grabbing" : "grab",
                    userSelect: "none",
                    minHeight: 420,
                }}
            >
                {extendedTestimonials.map((testimonial, index) => (
                    <TestimonialCard
                        key={`${testimonial.name}-${index}`}
                        testimonial={testimonial}
                        cardWidth={cardWidth}
                        primaryColor={primaryColor}
                        isHovered={hoveredIndex === index}
                        onHover={() => setHoveredIndex(index)}
                        onLeave={() => setHoveredIndex(null)}
                    />
                ))}
            </div>
        </div>
    )
}

addPropertyControls(TestimonialsSlider, {
    cardWidth: {
        type: ControlType.Number,
        title: "Card Width",
        defaultValue: 360,
        min: 280,
        max: 500,
        step: 10,
    },
    gap: {
        type: ControlType.Number,
        title: "Gap",
        defaultValue: 24,
        min: 12,
        max: 48,
        step: 4,
    },
    autoScrollSpeed: {
        type: ControlType.Number,
        title: "Auto Scroll Speed",
        defaultValue: 0.5,
        min: 0,
        max: 2,
        step: 0.1,
    },
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})
