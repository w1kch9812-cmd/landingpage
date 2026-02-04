import { addPropertyControls, ControlType } from "framer"

/**
 * 산업단지 정밀 브리핑 시각화
 */

interface Props {
    primaryColor: string
}

export default function DistrictVisual({ primaryColor = "#0071ff" }: Props) {
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
                style={{
                    position: "relative",
                    width: 180,
                    height: 120,
                    background: "#e8f0fe",
                    borderRadius: 12,
                    overflow: "hidden",
                }}
            >
                {/* Boundary */}
                <div
                    className="district-boundary"
                    style={{
                        position: "absolute",
                        top: "20%",
                        left: "15%",
                        width: "70%",
                        height: "60%",
                        border: "2px dashed #3b82f6",
                        borderRadius: 8,
                    }}
                />

                {/* Info Card */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 8,
                        left: 8,
                        right: 8,
                        background: "#ffffff",
                        borderRadius: 6,
                        padding: 8,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <span
                        style={{
                            display: "block",
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#001530",
                            marginBottom: 4,
                        }}
                    >
                        반월시화 산단
                    </span>
                    <div
                        style={{
                            display: "flex",
                            gap: 8,
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 9,
                                color: "#5c6b7a",
                            }}
                        >
                            제한업종: 화학
                        </span>
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 9,
                                color: "#5c6b7a",
                            }}
                        >
                            입주기업: 1,240개
                        </span>
                    </div>
                </div>
            </div>

            <style>
                {`
                    @keyframes boundaryPulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                    .district-boundary {
                        animation: boundaryPulse 2s ease-in-out infinite;
                    }
                `}
            </style>
        </div>
    )
}

addPropertyControls(DistrictVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})
