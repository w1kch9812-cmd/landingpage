import { addPropertyControls, ControlType } from "framer"

/**
 * 매도/매수 의뢰 플로우
 */

interface Props {
    primaryColor: string
}

export default function RequestVisual({ primaryColor = "#3b82f6" }: Props) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                background: `${primaryColor}08`,
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                {/* 매도자 */}
                <div
                    style={{
                        padding: "10px 14px",
                        background: "#fff",
                        borderRadius: 8,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#5c6b7a",
                        }}
                    >
                        매도자
                    </span>
                </div>

                {/* Arrow - ArrowsLeftRight 아이콘 */}
                <div className="request-arrow">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 256 256"
                        fill={primaryColor}
                    >
                        <path d="M216.49,184.49l-32,32a12,12,0,0,1-17-17L179,188H48a12,12,0,0,1,0-24H179l-11.52-11.51a12,12,0,0,1,17-17l32,32A12,12,0,0,1,216.49,184.49Zm-145-64a12,12,0,0,0,17-17L77,92H208a12,12,0,0,0,0-24H77L88.49,56.49a12,12,0,0,0-17-17l-32,32a12,12,0,0,0,0,17Z" />
                    </svg>
                </div>

                {/* 공짱 (Center) */}
                <div
                    style={{
                        padding: "12px 18px",
                        background: primaryColor,
                        borderRadius: 10,
                        boxShadow: `0 4px 16px ${primaryColor}4D`,
                    }}
                >
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#fff",
                        }}
                    >
                        공짱
                    </span>
                </div>

                {/* Arrow - ArrowsLeftRight 아이콘 */}
                <div className="request-arrow">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 256 256"
                        fill={primaryColor}
                    >
                        <path d="M216.49,184.49l-32,32a12,12,0,0,1-17-17L179,188H48a12,12,0,0,1,0-24H179l-11.52-11.51a12,12,0,0,1,17-17l32,32A12,12,0,0,1,216.49,184.49Zm-145-64a12,12,0,0,0,17-17L77,92H208a12,12,0,0,0,0-24H77L88.49,56.49a12,12,0,0,0-17-17l-32,32a12,12,0,0,0,0,17Z" />
                    </svg>
                </div>

                {/* 매수자 */}
                <div
                    style={{
                        padding: "10px 14px",
                        background: "#fff",
                        borderRadius: 8,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#5c6b7a",
                        }}
                    >
                        매수자
                    </span>
                </div>
            </div>

            <style>
                {`
                    @keyframes arrowPulse {
                        0%, 100% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.2); opacity: 0.7; }
                    }
                    .request-arrow {
                        animation: arrowPulse 1.5s ease-in-out infinite;
                    }
                `}
            </style>
        </div>
    )
}

addPropertyControls(RequestVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#3b82f6",
    },
})
