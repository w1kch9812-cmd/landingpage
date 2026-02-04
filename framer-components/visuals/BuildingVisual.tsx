import { addPropertyControls, ControlType } from "framer"

/**
 * 건물별 스펙 시각화 (제조동, 사무동, 가설건축물)
 */

interface Props {
    primaryColor: string
}

// Phosphor Icons - duotone style SVG paths
const icons = {
    // Factory (제조동)
    factory: (color: string) => (
        <svg width="18" height="18" viewBox="0 0 256 256" fill={color}>
            <path d="M232,208H216V88l-72,48V88L72,136V32H24V208H232Z" opacity="0.2"/>
            <path d="M116,176a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h28A8,8,0,0,1,116,176Zm60-8H148a8,8,0,0,0,0,16h28a8,8,0,0,0,0-16Zm64,48a8,8,0,0,1-8,8H24a8,8,0,0,1,0-16H32V32a8,8,0,0,1,16,0v96l56-37.34V88a8,8,0,0,1,12.8-6.4L176,124V88a8,8,0,0,1,12.8-6.4l36,27a8,8,0,0,1,3.2,6.4v93h4A8,8,0,0,1,240,216Zm-32-8V115.68l-20-15V136a8,8,0,0,1-12.8,6.4L116,99.68V136a8,8,0,0,1-12.8,6.4L48,103.68V208Z"/>
        </svg>
    ),
    // Buildings (사무동)
    buildings: (color: string) => (
        <svg width="18" height="18" viewBox="0 0 256 256" fill={color}>
            <path d="M144,216V32a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8V216" opacity="0.2"/>
            <path d="M240,208H224V96a16,16,0,0,0-16-16H152V32a16,16,0,0,0-16-16H40A16,16,0,0,0,24,32V208H8a8,8,0,0,0,0,16H248a8,8,0,0,0,0-16ZM208,96V208H152V96ZM40,32H136V208H40ZM72,64a8,8,0,0,1,8-8H96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,64Zm0,40a8,8,0,0,1,8-8H96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,104Zm0,40a8,8,0,0,1,8-8H96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,144Zm0,40a8,8,0,0,1,8-8H96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,184Zm96-64a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,120Zm0,40a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,160Z"/>
        </svg>
    ),
    // House (가설건축물)
    house: (color: string) => (
        <svg width="18" height="18" viewBox="0 0 256 256" fill={color}>
            <path d="M216,115.54V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V115.54a8,8,0,0,1,2.62-5.92l80-75.54a8,8,0,0,1,10.77,0l80,75.54A8,8,0,0,1,216,115.54Z" opacity="0.2"/>
            <path d="M219.31,108.68l-80-75.54a16.14,16.14,0,0,0-22.62,0l-80,75.54A16,16,0,0,0,32,120v96a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V120A16,16,0,0,0,219.31,108.68ZM208,216H48V120l80-75.54L208,120Z"/>
        </svg>
    ),
}

const buildingsData = [
    { name: "제조동", area: "1,200평", main: true, iconKey: "factory" },
    { name: "사무동", area: "150평", main: false, iconKey: "buildings" },
    { name: "가설건축물", area: "80평", main: false, iconKey: "house" },
]

export default function BuildingVisual({ primaryColor = "#0071ff" }: Props) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                background: `rgba(0, 113, 255, 0.02)`,
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                }}
            >
                {buildingsData.map((building, index) => (
                    <div
                        key={building.name}
                        className={`building-item building-item-${index}`}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 14px",
                            background: building.main ? primaryColor : "#ffffff",
                            borderRadius: 10,
                            boxShadow: building.main
                                ? `0 4px 16px ${primaryColor}4D`
                                : `0 2px 8px rgba(0, 113, 255, 0.06)`,
                        }}
                    >
                        {icons[building.iconKey as keyof typeof icons](building.main ? "#ffffff" : primaryColor)}
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
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: building.main ? "#ffffff" : "#001530",
                                }}
                            >
                                {building.name}
                            </span>
                            <span
                                style={{
                                    fontFamily: "Pretendard, sans-serif",
                                    fontSize: 11,
                                    color: building.main ? "rgba(255,255,255,0.8)" : "#5c6b7a",
                                }}
                            >
                                {building.area}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <style>
                {`
                    @keyframes buildingSlide {
                        0%, 100% { transform: translateX(0); }
                        50% { transform: translateX(6px); }
                    }
                    .building-item {
                        animation: buildingSlide 2.5s ease-in-out infinite;
                    }
                    .building-item-0 { animation-delay: 0s; }
                    .building-item-1 { animation-delay: 0.15s; }
                    .building-item-2 { animation-delay: 0.3s; }
                `}
            </style>
        </div>
    )
}

addPropertyControls(BuildingVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})
