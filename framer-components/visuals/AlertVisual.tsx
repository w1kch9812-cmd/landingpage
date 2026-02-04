import { addPropertyControls, ControlType } from "framer"

/**
 * 조건 매칭 알림
 */

interface Props {
    primaryColor: string
}

export default function AlertVisual({ primaryColor = "#3b82f6" }: Props) {
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
                className="alert-phone"
                style={{
                    width: 140,
                    padding: 10,
                    background: "#1a1a1a",
                    borderRadius: 14,
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                }}
            >
                <div
                    className="alert-notification"
                    style={{
                        background: "#fff",
                        borderRadius: 8,
                        padding: 10,
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                        }}
                    >
                        {/* Bell 아이콘 (Phosphor Icons fill) */}
                        <svg
                            className="alert-icon"
                            width="16"
                            height="16"
                            viewBox="0 0 256 256"
                            fill={primaryColor}
                        >
                            <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216Z" />
                        </svg>
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#001530",
                            }}
                        >
                            새 매물 알림
                        </span>
                    </div>
                    <p
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 9,
                            fontWeight: 400,
                            color: "#5c6b7a",
                            margin: 0,
                            lineHeight: 1.4,
                        }}
                    >
                        저장한 조건에 맞는 매물이 등록되었습니다
                    </p>
                </div>
            </div>

            <style>
                {`
                    @keyframes phoneVibrate {
                        0%, 100% { transform: rotate(0deg); }
                        5% { transform: rotate(-2deg); }
                        10% { transform: rotate(2deg); }
                        15% { transform: rotate(-2deg); }
                        20% { transform: rotate(2deg); }
                        25% { transform: rotate(0deg); }
                    }
                    @keyframes notificationPop {
                        0%, 100% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.02); }
                        95% { opacity: 1; }
                        97% { opacity: 0.5; transform: translateY(-3px); }
                    }
                    @keyframes bellRing {
                        0%, 100% { transform: rotate(0deg); }
                        10% { transform: rotate(20deg); }
                        20% { transform: rotate(-20deg); }
                        30% { transform: rotate(15deg); }
                        40% { transform: rotate(-15deg); }
                        50% { transform: rotate(0deg); }
                    }
                    .alert-phone {
                        animation: phoneVibrate 3s ease-in-out infinite;
                    }
                    .alert-notification {
                        animation: notificationPop 3s ease-in-out infinite;
                    }
                    .alert-icon {
                        animation: bellRing 1.5s ease-in-out infinite;
                        transform-origin: top center;
                    }
                `}
            </style>
        </div>
    )
}

addPropertyControls(AlertVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#3b82f6",
    },
})
