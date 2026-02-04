import { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * Spline 3D 뷰어 컴포넌트
 * - Spline에서 export한 scene URL 입력
 * - 반응형 지원 (모바일 숨김 옵션)
 * - 로딩 상태 표시
 */

interface Props {
    sceneUrl: string
    hideOnMobile: boolean
    mobileBreakpoint: number
    width: string | number
    height: string | number
    style?: React.CSSProperties
}

export default function SplineViewer({
    sceneUrl = "https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode",
    hideOnMobile = true,
    mobileBreakpoint = 810,
    width = "100%",
    height = "100%",
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [shouldRender, setShouldRender] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

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

    // Spline 런타임 로드
    useEffect(() => {
        if (!shouldRender || !sceneUrl || sceneUrl.includes("YOUR_SCENE_ID")) {
            setIsLoading(false)
            return
        }

        let isMounted = true
        setIsLoading(true)
        setHasError(false)

        const loadSpline = async () => {
            try {
                // @splinetool/runtime 동적 import
                const { Application } = await import("@splinetool/runtime")

                if (!isMounted || !containerRef.current) return

                // 기존 캔버스 제거
                const existingCanvas = containerRef.current.querySelector("canvas")
                if (existingCanvas) {
                    existingCanvas.remove()
                }

                // 새 캔버스 생성
                const canvas = document.createElement("canvas")
                canvas.style.width = "100%"
                canvas.style.height = "100%"
                containerRef.current.appendChild(canvas)

                // Spline 앱 초기화
                const app = new Application(canvas)
                await app.load(sceneUrl)

                if (isMounted) {
                    setIsLoading(false)
                }
            } catch (error) {
                console.error("Spline load error:", error)
                if (isMounted) {
                    setHasError(true)
                    setIsLoading(false)
                }
            }
        }

        loadSpline()

        return () => {
            isMounted = false
        }
    }, [sceneUrl, shouldRender])

    if (!shouldRender) return null

    return (
        <div
            ref={containerRef}
            style={{
                width,
                height,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 로딩 표시 */}
            {isLoading && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "transparent",
                    }}
                >
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            border: "3px solid rgba(0, 113, 255, 0.2)",
                            borderTopColor: "#0071ff",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                        }}
                    />
                </div>
            )}

            {/* 에러 표시 */}
            {hasError && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        color: "#5c6b7a",
                        fontFamily: "Pretendard, sans-serif",
                        fontSize: 14,
                    }}
                >
                    <span>3D 로딩 실패</span>
                    <span style={{ fontSize: 12, opacity: 0.7 }}>Spline URL을 확인하세요</span>
                </div>
            )}

            {/* 플레이스홀더 (URL 미설정 시) */}
            {sceneUrl.includes("YOUR_SCENE_ID") && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                        background: "rgba(0, 113, 255, 0.05)",
                        borderRadius: 16,
                        border: "2px dashed rgba(0, 113, 255, 0.2)",
                    }}
                >
                    <svg width="48" height="48" viewBox="0 0 256 256" fill="none">
                        <path
                            d="M128 24L232 80V176L128 232L24 176V80L128 24Z"
                            stroke="#0071ff"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="rgba(0, 113, 255, 0.1)"
                        />
                        <path d="M24 80L128 136L232 80" stroke="#0071ff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="128" y1="136" x2="128" y2="232" stroke="#0071ff" strokeWidth="12" strokeLinecap="round" />
                    </svg>
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#0071ff",
                        }}
                    >
                        Spline Scene URL을 입력하세요
                    </span>
                </div>
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

addPropertyControls(SplineViewer, {
    sceneUrl: {
        type: ControlType.String,
        title: "Scene URL",
        defaultValue: "https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode",
        description: "Spline에서 Export → Code → Production URL 복사",
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
})
