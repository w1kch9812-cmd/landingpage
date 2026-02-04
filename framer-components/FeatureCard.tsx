import { useState } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * CoreFeatures 기능 카드 컴포넌트
 * - 시각적 영역 + 타이틀 + 설명
 * - Coming Soon 뱃지 지원
 * - 호버 효과
 */

interface Props {
    title: string
    description: string
    comingSoon: boolean
    primaryColor: string
    width: number | string
    children?: React.ReactNode
}

export default function FeatureCard({
    title = "건축 구조 및 동력",
    description = "전력(kW), 바닥 하중, 호이스트 등 설비 가동에 필수적인 하드웨어 스펙을 상세히 제공합니다.",
    comingSoon = false,
    primaryColor = "#0071ff",
    width = "100%",
    children,
}: Props) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                width: width,
                background: "#ffffff",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                borderRadius: 20,
                overflow: "hidden",
                transition: "all 0.3s ease",
                transform: !comingSoon && isHovered ? "translateY(-4px)" : "translateY(0)",
                borderColor: !comingSoon && isHovered ? `${primaryColor}26` : "rgba(0, 0, 0, 0.06)",
                boxShadow: !comingSoon && isHovered ? `0 16px 48px ${primaryColor}14` : "none",
                opacity: comingSoon ? 0.7 : 1,
                position: "relative",
            }}
        >
            {/* Coming Soon Badge */}
            {comingSoon && (
                <span
                    style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        zIndex: 10,
                        fontFamily: "Pretendard, sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#5c6b7a",
                        background: "#f8f9fa",
                        padding: "6px 10px",
                        borderRadius: 9999,
                        letterSpacing: "-0.01em",
                        border: "1px solid rgba(0, 0, 0, 0.06)",
                    }}
                >
                    Coming Soon
                </span>
            )}

            {/* Visual Area */}
            <div
                style={{
                    width: "100%",
                    height: 180,
                    background: `${primaryColor}05`,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {children}
            </div>

            {/* Content Area */}
            <div
                style={{
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                }}
            >
                <h3
                    style={{
                        fontFamily: "Pretendard, sans-serif",
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#001530",
                        margin: 0,
                        letterSpacing: "-0.02em",
                    }}
                >
                    {title}
                </h3>
                <p
                    style={{
                        fontFamily: "Pretendard, sans-serif",
                        fontSize: 15,
                        color: "#5c6b7a",
                        lineHeight: 1.65,
                        margin: 0,
                    }}
                >
                    {description}
                </p>
            </div>
        </div>
    )
}

addPropertyControls(FeatureCard, {
    title: {
        type: ControlType.String,
        title: "Title",
        defaultValue: "건축 구조 및 동력",
    },
    description: {
        type: ControlType.String,
        title: "Description",
        defaultValue: "전력(kW), 바닥 하중, 호이스트 등 설비 가동에 필수적인 하드웨어 스펙을 상세히 제공합니다.",
        displayTextArea: true,
    },
    comingSoon: {
        type: ControlType.Boolean,
        title: "Coming Soon",
        defaultValue: false,
    },
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
    width: {
        type: ControlType.Number,
        title: "Width",
        defaultValue: 360,
        min: 280,
        max: 600,
        step: 10,
    },
})
