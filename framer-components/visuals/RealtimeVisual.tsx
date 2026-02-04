import { addPropertyControls, ControlType } from "framer"

/**
 * 지역별 실시간 분석
 */

interface Props {
    primaryColor: string
}

const realtimeData = [
    { label: "평균시세", value: "185만/평" },
    { label: "매물수", value: "127건" },
]

export default function RealtimeVisual({ primaryColor = "#3b82f6" }: Props) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: 16,
                background: `${primaryColor}08`,
            }}
        >
            {/* Map Area */}
            <div
                style={{
                    width: 100,
                    height: 80,
                    background: "#e8f0fe",
                    borderRadius: 8,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    className="realtime-cursor"
                    style={{
                        position: "absolute",
                        width: 40,
                        height: 40,
                        border: `2px solid ${primaryColor}`,
                        borderRadius: 4,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            </div>

            {/* Data Panel */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                }}
            >
                {realtimeData.map((item, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            padding: "8px 10px",
                            background: "#fff",
                            borderRadius: 6,
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 9,
                                color: "#5c6b7a",
                            }}
                        >
                            {item.label}
                        </span>
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 13,
                                fontWeight: 700,
                                color: primaryColor,
                            }}
                        >
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>

            <style>
                {`
                    @keyframes cursorMove {
                        0%, 100% { top: 30%; left: 30%; }
                        25% { top: 60%; left: 40%; }
                        50% { top: 40%; left: 70%; }
                        75% { top: 70%; left: 60%; }
                    }
                    .realtime-cursor {
                        animation: cursorMove 4s ease-in-out infinite;
                    }
                `}
            </style>
        </div>
    )
}

addPropertyControls(RealtimeVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#3b82f6",
    },
})
