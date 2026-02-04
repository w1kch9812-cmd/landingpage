import { addPropertyControls, ControlType } from "framer"

/**
 * 필터 조건 저장
 */

interface Props {
    primaryColor: string
}

const saveItems = [
    { label: "경기 화성 · 500평 이상", active: true },
    { label: "충북 청주 · 제조업", active: false },
    { label: "인천 · 물류창고", active: false },
]

export default function SaveVisual({ primaryColor = "#3b82f6" }: Props) {
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
                    flexDirection: "column",
                    gap: 6,
                }}
            >
                {saveItems.map((item, i) => (
                    <div
                        key={i}
                        className={`save-item save-item-${i} ${item.active ? "save-item-active" : ""}`}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 12px",
                            background: item.active ? primaryColor : "#fff",
                            borderRadius: 8,
                            boxShadow: item.active
                                ? `0 4px 16px ${primaryColor}4D`
                                : "0 2px 8px rgba(0, 113, 255, 0.06)",
                            minWidth: 160,
                        }}
                    >
                        {/* FolderOpen 아이콘 (Phosphor Icons duotone) */}
                        <svg
                            className="save-icon"
                            width="16"
                            height="16"
                            viewBox="0 0 256 256"
                            fill={item.active ? "#fff" : primaryColor}
                        >
                            <path d="M245,110.64A16,16,0,0,0,232,104H216V88a16,16,0,0,0-16-16H130.67L102.94,51.2a16.14,16.14,0,0,0-9.6-3.2H40A16,16,0,0,0,24,64V208h0a8,8,0,0,0,8,8H211.1a8,8,0,0,0,7.59-5.47l28.49-85.47A16.05,16.05,0,0,0,245,110.64ZM93.34,64l27.73,20.8a16.12,16.12,0,0,0,9.6,3.2H200v16H69.77a16,16,0,0,0-15.18,10.94L40,158.7V64Z" />
                        </svg>
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 11,
                                fontWeight: item.active ? 600 : 500,
                                color: item.active ? "#fff" : "#5c6b7a",
                            }}
                        >
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            <style>
                {`
                    @keyframes saveSlide {
                        0%, 100% { transform: translateX(0); }
                        50% { transform: translateX(6px); }
                    }
                    @keyframes saveGlow {
                        0%, 100% { box-shadow: 0 4px 16px ${primaryColor}4D; }
                        50% { box-shadow: 0 8px 32px ${primaryColor}80; }
                    }
                    @keyframes iconWiggle {
                        0%, 100% { transform: rotate(0deg); }
                        25% { transform: rotate(-5deg); }
                        75% { transform: rotate(5deg); }
                    }
                    .save-item {
                        animation: saveSlide 2.5s ease-in-out infinite;
                    }
                    .save-item-0 { animation-delay: 0s; }
                    .save-item-1 { animation-delay: 0.15s; }
                    .save-item-2 { animation-delay: 0.3s; }
                    .save-item-active {
                        animation: saveGlow 1.5s ease-in-out infinite, saveSlide 2.5s ease-in-out infinite;
                    }
                    .save-icon {
                        animation: iconWiggle 2s ease-in-out infinite;
                    }
                `}
            </style>
        </div>
    )
}

addPropertyControls(SaveVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#3b82f6",
    },
})
