import { useEffect, useState } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * Spline Embed 컴포넌트 (iframe 방식)
 * - Spline에서 export한 embed URL 사용
 * - 외부 패키지 없이 작동
 * - 반응형 지원
 */

interface Props {
    embedUrl: string
    hideOnMobile: boolean
    mobileBreakpoint: number
    showLoadingSpinner: boolean
    primaryColor: string
}

export default function SplineEmbed({
    embedUrl = "https://my.spline.design/YOUR_SCENE_ID/",
    hideOnMobile = true,
    mobileBreakpoint = 810,
    showLoadingSpinner = true,
    primaryColor = "#0071ff",
}: Props) {
    const [shouldRender, setShouldRender] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    // 반응형 처리
    useEffect(() => {
        if (!hideOnMobile) {
            setShouldRender(true)
            return
        }

        const mediaQuery = window.matchMedia(`(max-width: ${mobileBreakpoint - 0.02}px)`)

        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setShouldRender(!e.matches)
        }

        handleChange(mediaQuery)
        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [hideOnMobile, mobileBreakpoint])

    if (!shouldRender) return null

    const isPlaceholder = embedUrl.includes("YOUR_SCENE_ID")

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 로딩 스피너 */}
            {showLoadingSpinner && isLoading && !isPlaceholder && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "transparent",
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            border: `3px solid ${primaryColor}33`,
                            borderTopColor: primaryColor,
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                        }}
                    />
                </div>
            )}

            {/* 플레이스홀더 */}
            {isPlaceholder ? (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                        background: `${primaryColor}0D`,
                        borderRadius: 16,
                        border: `2px dashed ${primaryColor}33`,
                    }}
                >
                    <svg width="48" height="48" viewBox="0 0 256 256" fill="none">
                        <path
                            d="M128 24L232 80V176L128 232L24 176V80L128 24Z"
                            stroke={primaryColor}
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill={`${primaryColor}1A`}
                        />
                        <path d="M24 80L128 136L232 80" stroke={primaryColor} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="128" y1="136" x2="128" y2="232" stroke={primaryColor} strokeWidth="12" strokeLinecap="round" />
                    </svg>
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 14,
                            fontWeight: 500,
                            color: primaryColor,
                        }}
                    >
                        Spline Embed URL을 입력하세요
                    </span>
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 12,
                            color: "#5c6b7a",
                        }}
                    >
                        Export → Embed → Copy Link
                    </span>
                </div>
            ) : (
                /* Spline iframe */
                <iframe
                    src={embedUrl}
                    onLoad={() => setIsLoading(false)}
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        background: "transparent",
                    }}
                    allow="autoplay; fullscreen; vr"
                    loading="lazy"
                />
            )}

            <style>
                {`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    )
}

addPropertyControls(SplineEmbed, {
    embedUrl: {
        type: ControlType.String,
        title: "Embed URL",
        defaultValue: "https://my.spline.design/YOUR_SCENE_ID/",
        description: "Spline → Export → Embed → Copy Link",
    },
    hideOnMobile: {
        type: ControlType.Boolean,
        title: "Hide on Mobile",
        defaultValue: true,
        description: "모바일에서 3D 숨김 (성능 최적화)",
    },
    mobileBreakpoint: {
        type: ControlType.Number,
        title: "Mobile Breakpoint",
        defaultValue: 810,
        min: 320,
        max: 1200,
        step: 10,
        hidden: (props) => !props.hideOnMobile,
    },
    showLoadingSpinner: {
        type: ControlType.Boolean,
        title: "Loading Spinner",
        defaultValue: true,
    },
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})
