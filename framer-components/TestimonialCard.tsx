import { useState } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * 고객 후기 카드 컴포넌트 (Client Stories / Testimonials)
 * - 검은색 배경 (원본과 동일)
 * - 호버 시 primaryColor 배경 + 스케일
 * - highlight 배지
 * - quote 텍스트
 * - avatar + name + role
 */

interface Props {
    quote: string
    name: string
    role: string
    highlight: string
    avatarText: string
    primaryColor: string
    width: number
    position: "top" | "middle" | "bottom"
    enableHover: boolean
}

export default function TestimonialCard({
    quote = "계약 직전, 공짱에서 같은 조건의 경매 물건을 발견했습니다. 3억 원을 아끼고 더 넓은 부지까지 확보했어요.",
    name = "김OO 대표",
    role = "금속가공업 · 경기 화성",
    highlight = "3억 원 절감",
    avatarText = "",
    primaryColor = "#0071ff",
    width = 360,
    position = "top",
    enableHover = true,
}: Props) {
    const [isHovered, setIsHovered] = useState(false)
    const displayAvatarText = avatarText || name.charAt(0)

    const positionTransforms = {
        top: 0,
        middle: 40,
        bottom: 80,
    }

    const translateY = positionTransforms[position]
    const hoverActive = enableHover && isHovered

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                width: width,
                background: hoverActive ? primaryColor : "#0a0a0a",
                border: `1px solid ${hoverActive ? primaryColor : "rgba(255, 255, 255, 0.1)"}`,
                borderRadius: 16,
                padding: 28,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "grab",
                transform: hoverActive
                    ? `translateY(${translateY}px) scale(1.05)`
                    : `translateY(${translateY}px)`,
                boxShadow: hoverActive ? `0 20px 60px ${primaryColor}4D` : "none",
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
                {highlight && (
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 12,
                            fontWeight: 600,
                            letterSpacing: "-0.01em",
                            color: hoverActive ? "#ffffff" : primaryColor,
                            background: hoverActive ? "rgba(255, 255, 255, 0.2)" : `${primaryColor}26`,
                            padding: "6px 12px",
                            borderRadius: 9999,
                            width: "fit-content",
                            transition: "all 0.3s ease",
                        }}
                    >
                        {highlight}
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
                        color: hoverActive ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.9)",
                        margin: 0,
                        transition: "color 0.3s ease",
                    }}
                >
                    {quote}
                </p>

                {/* Person Info */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        paddingTop: 12,
                        borderTop: `1px solid ${hoverActive ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"}`,
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
                            {displayAvatarText}
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
                            {name}
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
                            {role}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

addPropertyControls(TestimonialCard, {
    quote: {
        type: ControlType.String,
        title: "Quote",
        defaultValue:
            "계약 직전, 공짱에서 같은 조건의 경매 물건을 발견했습니다. 3억 원을 아끼고 더 넓은 부지까지 확보했어요.",
        displayTextArea: true,
    },
    name: {
        type: ControlType.String,
        title: "Name",
        defaultValue: "김OO 대표",
    },
    role: {
        type: ControlType.String,
        title: "Role",
        defaultValue: "금속가공업 · 경기 화성",
    },
    highlight: {
        type: ControlType.String,
        title: "Highlight",
        defaultValue: "3억 원 절감",
    },
    avatarText: {
        type: ControlType.String,
        title: "Avatar Text",
        defaultValue: "",
        description: "비워두면 이름 첫 글자 사용",
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
        max: 500,
        step: 10,
    },
    position: {
        type: ControlType.Enum,
        title: "Position",
        options: ["top", "middle", "bottom"],
        optionTitles: ["Top (0px)", "Middle (+40px)", "Bottom (+80px)"],
        defaultValue: "top",
    },
    enableHover: {
        type: ControlType.Boolean,
        title: "Enable Hover",
        defaultValue: true,
    },
})
