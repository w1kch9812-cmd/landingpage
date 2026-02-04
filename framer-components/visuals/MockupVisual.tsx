import { addPropertyControls, ControlType } from "framer"

/**
 * 통합 지도 시스템 브라우저 목업
 */

interface Props {
    primaryColor: string
}

export default function MockupVisual({ primaryColor = "#0071ff" }: Props) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                background: `${primaryColor}05`,
            }}
        >
            <div
                className="mockup-browser"
                style={{
                    width: "100%",
                    maxWidth: 240,
                    background: "#1a1a1a",
                    borderRadius: 10,
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                }}
            >
                {/* Browser Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 12px",
                        background: "#2a2a2a",
                    }}
                >
                    <div style={{ display: "flex", gap: 5 }}>
                        <span
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: primaryColor,
                            }}
                        />
                        <span
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: primaryColor,
                            }}
                        />
                        <span
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: primaryColor,
                            }}
                        />
                    </div>
                    <div
                        style={{
                            flex: 1,
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 10,
                            color: "#888",
                            background: "#1a1a1a",
                            padding: "3px 8px",
                            borderRadius: 4,
                            textAlign: "center",
                        }}
                    >
                        gongzzang.com
                    </div>
                </div>

                {/* Content */}
                <div style={{ display: "flex", height: 100 }}>
                    {/* Sidebar */}
                    <div
                        style={{
                            width: 50,
                            background: "#f5f5f5",
                            padding: "8px 6px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 5,
                        }}
                    >
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className={`mockup-filter mockup-filter-${i}`}
                                style={{
                                    height: 16,
                                    background: "#e0e0e0",
                                    borderRadius: 3,
                                }}
                            />
                        ))}
                    </div>

                    {/* Map */}
                    <div
                        style={{
                            flex: 1,
                            background: "#e8f0fe",
                            position: "relative",
                        }}
                    >
                        {[
                            { top: "25%", left: "35%" },
                            { top: "45%", left: "55%" },
                            { top: "65%", left: "40%" },
                        ].map((pos, i) => (
                            <div
                                key={i}
                                className={`mockup-pin mockup-pin-${i}`}
                                style={{
                                    position: "absolute",
                                    top: pos.top,
                                    left: pos.left,
                                    width: 10,
                                    height: 10,
                                    background: primaryColor,
                                    borderRadius: "50%",
                                    border: "2px solid #fff",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style>
                {`
                    @keyframes browserFloat {
                        0%, 100% { transform: translateY(0) rotate(0deg); }
                        25% { transform: translateY(-3px) rotate(0.5deg); }
                        75% { transform: translateY(3px) rotate(-0.5deg); }
                    }
                    @keyframes filterPulse {
                        0%, 100% { opacity: 0.6; }
                        50% { opacity: 1; }
                    }
                    @keyframes pinBounce {
                        0%, 100% { transform: translateY(0) scale(1); }
                        50% { transform: translateY(-8px) scale(1.2); }
                    }
                    .mockup-browser {
                        animation: browserFloat 4s ease-in-out infinite;
                    }
                    .mockup-filter {
                        animation: filterPulse 2s ease-in-out infinite;
                    }
                    .mockup-filter-0 { animation-delay: 0s; }
                    .mockup-filter-1 { animation-delay: 0.3s; }
                    .mockup-filter-2 { animation-delay: 0.6s; }
                    .mockup-pin {
                        animation: pinBounce 1.5s ease-in-out infinite;
                    }
                    .mockup-pin-0 { animation-delay: 0s; }
                    .mockup-pin-1 { animation-delay: 0.3s; }
                    .mockup-pin-2 { animation-delay: 0.6s; }
                `}
            </style>
        </div>
    )
}

addPropertyControls(MockupVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})
