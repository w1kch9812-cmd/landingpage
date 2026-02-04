import { useRef, useEffect, useState, Children, ReactNode } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * Slot 방식 마키 컴포넌트
 * - children으로 아이템을 받아서 무한 스크롤
 * - Framer Canvas에서 직접 디자인한 컴포넌트 사용 가능
 * - 양쪽 페이드 마스크 지원
 * - 화면보다 아이템이 적으면 자동으로 복제하여 채움
 */

interface Props {
    children: ReactNode
    duration: number
    direction: "left" | "right"
    gap: number
    pauseOnHover: boolean
    fadeEdges: boolean
    fadeWidth: number
    uniformSize: boolean
    itemWidth: number
    itemHeight: number
}

export default function SlotMarquee({
    children,
    duration = 30,
    direction = "left",
    gap = 16,
    pauseOnHover = true,
    fadeEdges = true,
    fadeWidth = 10,
    uniformSize = false,
    itemWidth = 120,
    itemHeight = 40,
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const [repeatCount, setRepeatCount] = useState(4)
    const [isPaused, setIsPaused] = useState(false)

    // children을 배열로 변환
    const childArray = Children.toArray(children)

    // 컨테이너 너비와 콘텐츠 너비를 비교하여 반복 횟수 계산
    useEffect(() => {
        const calculate = () => {
            if (!containerRef.current || !trackRef.current) return

            const containerWidth = containerRef.current.offsetWidth
            const firstSet = trackRef.current.querySelector("[data-marquee-set='0']")
            if (!firstSet) return

            const contentWidth = (firstSet as HTMLElement).scrollWidth

            if (contentWidth > 0 && containerWidth > 0) {
                // 화면을 채우기 위해 필요한 반복 횟수 (최소 2, 넉넉하게 계산)
                const needed = Math.ceil((containerWidth * 3) / contentWidth) + 1
                setRepeatCount(Math.max(2, needed))
            }
        }

        // 렌더링 후 측정
        const frame = requestAnimationFrame(() => {
            calculate()
            // Framer children 로드 지연 대응
            setTimeout(calculate, 100)
            setTimeout(calculate, 500)
        })

        // 리사이즈 대응
        window.addEventListener("resize", calculate)

        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener("resize", calculate)
        }
    }, [children, gap])

    // children이 없으면 플레이스홀더 표시
    if (childArray.length === 0) {
        return (
            <div
                style={{
                    width: "100%",
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0, 113, 255, 0.05)",
                    borderRadius: 12,
                    border: "2px dashed rgba(0, 113, 255, 0.2)",
                }}
            >
                <span
                    style={{
                        fontFamily: "Pretendard, sans-serif",
                        fontSize: 14,
                        color: "#0071ff",
                    }}
                >
                    마키 아이템을 이 안에 넣어주세요
                </span>
            </div>
        )
    }

    // 마스크 스타일
    const maskStyle = fadeEdges
        ? {
              maskImage: `linear-gradient(to right, transparent 0%, black ${fadeWidth}%, black ${100 - fadeWidth}%, transparent 100%)`,
              WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${fadeWidth}%, black ${100 - fadeWidth}%, transparent 100%)`,
          }
        : {}

    // 반복 세트 생성
    const sets = Array.from({ length: repeatCount }, (_, i) => i)

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                overflow: "hidden",
                position: "relative",
                ...maskStyle,
            }}
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
            <div
                ref={trackRef}
                style={{
                    display: "flex",
                    width: "max-content",
                    animation: `marquee-scroll-${direction} ${duration}s linear infinite`,
                    animationPlayState: isPaused ? "paused" : "running",
                }}
            >
                {sets.map((setIndex) => (
                    <div
                        key={setIndex}
                        data-marquee-set={setIndex}
                        style={{
                            display: "flex",
                            gap,
                            paddingRight: gap,
                        }}
                    >
                        {childArray.map((child, index) => (
                            <div
                                key={`set${setIndex}-${index}`}
                                data-uniform-item={uniformSize ? true : undefined}
                                style={{
                                    flexShrink: 0,
                                    ...(uniformSize && {
                                        width: itemWidth,
                                        height: itemHeight,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }),
                                }}
                            >
                                {child}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <style>
                {`
                    @keyframes marquee-scroll-left {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-${100 / repeatCount}%); }
                    }
                    @keyframes marquee-scroll-right {
                        0% { transform: translateX(-${100 / repeatCount}%); }
                        100% { transform: translateX(0); }
                    }
                    ${uniformSize ? `
                    [data-uniform-item] img,
                    [data-uniform-item] picture,
                    [data-uniform-item] picture img,
                    [data-uniform-item] > div,
                    [data-uniform-item] > div > img {
                        width: 100% !important;
                        height: 100% !important;
                        max-width: ${itemWidth}px !important;
                        max-height: ${itemHeight}px !important;
                        object-fit: contain !important;
                    }
                    ` : ''}
                `}
            </style>
        </div>
    )
}

addPropertyControls(SlotMarquee, {
    children: {
        type: ControlType.Array,
        title: "Items",
        control: {
            type: ControlType.ComponentInstance,
        },
    },
    duration: {
        type: ControlType.Number,
        title: "Duration (s)",
        defaultValue: 30,
        min: 5,
        max: 120,
        step: 5,
        description: "Animation duration in seconds",
    },
    direction: {
        type: ControlType.Enum,
        title: "Direction",
        options: ["left", "right"],
        optionTitles: ["← Left", "→ Right"],
        defaultValue: "left",
    },
    gap: {
        type: ControlType.Number,
        title: "Gap",
        defaultValue: 16,
        min: 0,
        max: 64,
        step: 4,
    },
    pauseOnHover: {
        type: ControlType.Boolean,
        title: "Pause on Hover",
        defaultValue: true,
    },
    fadeEdges: {
        type: ControlType.Boolean,
        title: "Fade Edges",
        defaultValue: true,
    },
    fadeWidth: {
        type: ControlType.Number,
        title: "Fade Width (%)",
        defaultValue: 10,
        min: 0,
        max: 25,
        step: 1,
        hidden: (props) => !props.fadeEdges,
    },
    uniformSize: {
        type: ControlType.Boolean,
        title: "Uniform Size",
        defaultValue: false,
        description: "모든 아이템을 동일한 크기로 표시 (로고 마키용)",
    },
    itemWidth: {
        type: ControlType.Number,
        title: "Item Width",
        defaultValue: 120,
        min: 40,
        max: 300,
        step: 10,
        hidden: (props) => !props.uniformSize,
    },
    itemHeight: {
        type: ControlType.Number,
        title: "Item Height",
        defaultValue: 40,
        min: 20,
        max: 200,
        step: 5,
        hidden: (props) => !props.uniformSize,
    },
})
