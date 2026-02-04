import { useState } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * CoreFeatures 탭 네비게이션 컴포넌트
 * - 3개 탭: 산업시설 데이터 분석, 공간정보 시각화, 맞춤형 컨설팅
 * - 각 탭에 아이콘 + 라벨
 * - 활성 탭 스타일 변경
 */

interface Tab {
    id: string
    label: string
    icon: React.ReactNode
}

interface Props {
    activeTab: string
    onTabChange?: (tabId: string) => void
    primaryColor: string
}

// 데이터 분석 아이콘
const DataIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2"/>
        <polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke="currentColor" strokeWidth="2"/>
        <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
    </svg>
)

// 공간정보 시각화 아이콘
const MapIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

// 맞춤형 컨설팅 아이콘
const MatchingIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const tabs: Tab[] = [
    { id: "data", label: "산업시설 데이터 분석", icon: <DataIcon /> },
    { id: "map", label: "공간정보 시각화", icon: <MapIcon /> },
    { id: "matching", label: "맞춤형 컨설팅", icon: <MatchingIcon /> },
]

export default function CoreFeaturesTab({
    activeTab = "data",
    onTabChange,
    primaryColor = "#0071ff",
}: Props) {
    const [internalActiveTab, setInternalActiveTab] = useState(activeTab)
    const currentActiveTab = onTabChange ? activeTab : internalActiveTab

    const handleTabClick = (tabId: string) => {
        if (onTabChange) {
            onTabChange(tabId)
        } else {
            setInternalActiveTab(tabId)
        }
    }

    return (
        <div
            style={{
                display: "flex",
                gap: 8,
                background: `${primaryColor}0A`,
                padding: 8,
                borderRadius: 16,
                width: "100%",
            }}
        >
            {tabs.map((tab) => {
                const isActive = currentActiveTab === tab.id
                return (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 10,
                            padding: "14px 24px",
                            background: isActive ? "rgba(255, 255, 255, 0.95)" : "transparent",
                            border: "none",
                            borderRadius: 12,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            boxShadow: isActive ? `0 2px 8px ${primaryColor}14` : "none",
                        }}
                    >
                        <span
                            style={{
                                width: 20,
                                height: 20,
                                color: isActive ? primaryColor : "#5c6b7a",
                                transition: "color 0.2s ease",
                            }}
                        >
                            {tab.icon}
                        </span>
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 15,
                                fontWeight: 600,
                                color: isActive ? "#001530" : "#5c6b7a",
                                transition: "color 0.2s ease",
                            }}
                        >
                            {tab.label}
                        </span>
                    </button>
                )
            })}

            <style>
                {`
                    button:hover {
                        background: rgba(255, 255, 255, 0.6);
                    }
                `}
            </style>
        </div>
    )
}

addPropertyControls(CoreFeaturesTab, {
    activeTab: {
        type: ControlType.Enum,
        title: "Active Tab",
        options: ["data", "map", "matching"],
        optionTitles: ["산업시설 데이터 분석", "공간정보 시각화", "맞춤형 컨설팅"],
        defaultValue: "data",
    },
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})
