import { addPropertyControls, ControlType } from "framer"

/**
 * 건축 스펙 시각화 (전력, 바닥하중, 호이스트, 천정고)
 */

interface Props {
    primaryColor: string
}

// Phosphor Icons - duotone style SVG paths
const icons = {
    // Lightning (전력)
    lightning: (
        <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
            <path d="M96,240a8,8,0,0,1-7.77-9.94L112,138H72a8,8,0,0,1-6.66-12.44l80-120a8,8,0,0,1,14.44,6.5L136,104h40a8,8,0,0,1,6.66,12.44l-80,120A8,8,0,0,1,96,240Z" opacity="0.2"/>
            <path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"/>
        </svg>
    ),
    // Barbell (바닥하중)
    barbell: (
        <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
            <path d="M240,88v80a8,8,0,0,1-8,8H208v24a16,16,0,0,1-16,16H176a16,16,0,0,1-16-16V176H96v24a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V176H24a8,8,0,0,1-8-8V88a8,8,0,0,1,8-8H48V56A16,16,0,0,1,64,40H80A16,16,0,0,1,96,56V80h64V56a16,16,0,0,1,16-16h16a16,16,0,0,1,16,16V80h24A8,8,0,0,1,240,88Z" opacity="0.2"/>
            <path d="M248,120h-8V88a16,16,0,0,0-16-16H208V56a24,24,0,0,0-24-24H176a24,24,0,0,0-24,24V72H104V56A24,24,0,0,0,80,32H64A24,24,0,0,0,40,56V72H24A16,16,0,0,0,8,88v32H0a8,8,0,0,0,0,16H8v32a16,16,0,0,0,16,16H40v16a24,24,0,0,0,24,24H80a24,24,0,0,0,24-24V184h48v16a24,24,0,0,0,24,24h16a24,24,0,0,0,24-24V184h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM168,56a8,8,0,0,1,8-8h16a8,8,0,0,1,8,8V72H168ZM56,56a8,8,0,0,1,8-8H80a8,8,0,0,1,8,8V72H56ZM88,200a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V184H88Zm112,0a8,8,0,0,1-8,8H176a8,8,0,0,1-8-8V184h32Zm24-32H32V88H224Z"/>
        </svg>
    ),
    // CraneTower (호이스트)
    crane: (
        <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
            <path d="M224,48V208a8,8,0,0,1-8,8H192V48Z" opacity="0.2"/>
            <path d="M240,48V208a16,16,0,0,1-16,16H152a16,16,0,0,1-16-16V160H112v56a8,8,0,0,1-16,0V160H24a8,8,0,0,1,0-16H96V56a8,8,0,0,1,16,0v88h24V48a16,16,0,0,1,16-16h72A16,16,0,0,1,240,48ZM224,48H184V208h40Zm-56,0V208h24V48Z"/>
        </svg>
    ),
    // Ruler (천정고)
    ruler: (
        <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
            <path d="M208,40V216a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V40A16,16,0,0,1,64,24H192A16,16,0,0,1,208,40Z" opacity="0.2"/>
            <path d="M208,24H48A16,16,0,0,0,32,40V216a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V40A16,16,0,0,0,208,24Zm0,192H48V40H80V64a8,8,0,0,0,16,0V40h64V64a8,8,0,0,0,16,0V40h32ZM176,96a8,8,0,0,1-8,8H160v24a8,8,0,0,1-16,0V104H128v24a8,8,0,0,1-16,0V104H96a8,8,0,0,1,0-16h72A8,8,0,0,1,176,96Zm0,64a8,8,0,0,1-8,8H160v24a8,8,0,0,1-16,0V168H128v24a8,8,0,0,1-16,0V168H96a8,8,0,0,1,0-16h72A8,8,0,0,1,176,160Z"/>
        </svg>
    ),
}

const specsData = [
    { icon: "lightning", label: "전력", value: "500kW" },
    { icon: "barbell", label: "바닥하중", value: "5t/㎡" },
    { icon: "crane", label: "호이스트", value: "10t" },
    { icon: "ruler", label: "천정고", value: "12m" },
]

export default function SpecsVisual({ primaryColor = "#0071ff" }: Props) {
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
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 8,
                }}
            >
                {specsData.map((item, index) => (
                    <div
                        key={item.label}
                        className={`spec-item spec-item-${index}`}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 4,
                            padding: 12,
                            background: "#ffffff",
                            borderRadius: 12,
                            boxShadow: `0 2px 8px rgba(0, 113, 255, 0.06)`,
                            minWidth: 80,
                        }}
                    >
                        <div style={{ color: primaryColor }}>
                            {icons[item.icon as keyof typeof icons]}
                        </div>
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 10,
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
                    @keyframes specPulse {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-4px); }
                    }
                    .spec-item {
                        animation: specPulse 2s ease-in-out infinite;
                    }
                    .spec-item-0 { animation-delay: 0s; }
                    .spec-item-1 { animation-delay: 0.15s; }
                    .spec-item-2 { animation-delay: 0.3s; }
                    .spec-item-3 { animation-delay: 0.45s; }
                `}
            </style>
        </div>
    )
}

addPropertyControls(SpecsVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})
