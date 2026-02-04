import { useState, useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * CoreFeatures 전체 섹션 컴포넌트
 * - 탭 네비게이션 + 기능 카드 그리드
 * - 탭 전환 시 애니메이션
 * - 14개 시각화 컴포넌트 포함
 */

interface Feature {
    name: string
    title: string
    description: string
    visualType: string
    comingSoon?: boolean
}

interface Tab {
    id: string
    label: string
    icon: React.ReactNode
    features: Feature[]
}

interface Props {
    primaryColor: string
}

// Icons
const DataIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2"/>
        <polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke="currentColor" strokeWidth="2"/>
        <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
    </svg>
)

const MapIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const MatchingIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

// Phosphor Icons (Duotone)
const LightningIcon = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none">
        <path d="M96,240,112,160H48L160,16l-16,80h64Z" fill={`${color}33`}/>
        <path d="M96,240,112,160H48L160,16l-16,80h64Z" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
)

const BarbellIcon = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none">
        <rect x="56" y="56" width="40" height="144" rx="8" fill={`${color}33`}/>
        <rect x="160" y="56" width="40" height="144" rx="8" fill={`${color}33`}/>
        <line x1="96" y1="128" x2="160" y2="128" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <rect x="56" y="56" width="40" height="144" rx="8" stroke={color} strokeWidth="16"/>
        <rect x="160" y="56" width="40" height="144" rx="8" stroke={color} strokeWidth="16"/>
        <line x1="40" y1="96" x2="40" y2="160" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <line x1="216" y1="96" x2="216" y2="160" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <line x1="24" y1="128" x2="56" y2="128" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <line x1="200" y1="128" x2="232" y2="128" stroke={color} strokeWidth="16" strokeLinecap="round"/>
    </svg>
)

const CraneTowerIcon = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none">
        <polygon points="128 24 104 80 152 80 128 24" fill={`${color}33`}/>
        <line x1="128" y1="80" x2="128" y2="232" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <line x1="128" y1="24" x2="232" y2="24" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <line x1="232" y1="24" x2="232" y2="104" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <polygon points="128 24 104 80 152 80 128 24" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="96" y1="232" x2="160" y2="232" stroke={color} strokeWidth="16" strokeLinecap="round"/>
    </svg>
)

const RulerIcon = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none">
        <rect x="26.51" y="82.75" width="202.98" height="90.51" rx="8" transform="translate(-53.02 128) rotate(-45)" fill={`${color}33`}/>
        <rect x="26.51" y="82.75" width="202.98" height="90.51" rx="8" transform="translate(-53.02 128) rotate(-45)" stroke={color} strokeWidth="16" fill="none"/>
        <line x1="132" y1="60" x2="164" y2="92" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <line x1="96" y1="96" x2="128" y2="128" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <line x1="60" y1="132" x2="92" y2="164" stroke={color} strokeWidth="16" strokeLinecap="round"/>
    </svg>
)

const FactoryIcon = ({ color }: { color: string }) => (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none">
        <path d="M32,216V88l64,48V88l64,48V32h64V216Z" fill={`${color}33`}/>
        <path d="M32,216V88l64,48V88l64,48V32h64V216Z" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="16" y1="216" x2="240" y2="216" stroke={color} strokeWidth="16" strokeLinecap="round"/>
    </svg>
)

const BuildingsIcon = ({ color }: { color: string }) => (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none">
        <path d="M136,216V40a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8V216" fill={`${color}33`}/>
        <path d="M224,216V104a8,8,0,0,0-8-8H136" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M136,216V40a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8V216" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="16" y1="216" x2="240" y2="216" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <line x1="72" y1="72" x2="96" y2="72" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <line x1="72" y1="112" x2="96" y2="112" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <line x1="72" y1="152" x2="96" y2="152" stroke={color} strokeWidth="16" strokeLinecap="round"/>
    </svg>
)

const HouseIcon = ({ color }: { color: string }) => (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none">
        <path d="M152,208V160a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v48a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V115.54a8,8,0,0,1,2.62-5.92l80-75.54a8,8,0,0,1,10.77,0l80,75.54a8,8,0,0,1,2.62,5.92V208a8,8,0,0,1-8,8H160A8,8,0,0,1,152,208Z" fill={`${color}33`}/>
        <path d="M152,208V160a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v48a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V115.54a8,8,0,0,1,2.62-5.92l80-75.54a8,8,0,0,1,10.77,0l80,75.54a8,8,0,0,1,2.62,5.92V208a8,8,0,0,1-8,8H160A8,8,0,0,1,152,208Z" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
)

const TruckIcon = ({ color }: { color: string }) => (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none">
        <path d="M160,192V72a8,8,0,0,0-8-8H24a8,8,0,0,0-8,8v112a8,8,0,0,0,8,8H44" fill={`${color}33`}/>
        <path d="M160,192V72a8,8,0,0,0-8-8H24a8,8,0,0,0-8,8v112a8,8,0,0,0,8,8H44" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="80" cy="192" r="24" stroke={color} strokeWidth="16"/>
        <circle cx="192" cy="192" r="24" stroke={color} strokeWidth="16"/>
        <path d="M160,112h48l32,40v40H216" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="104" y1="192" x2="168" y2="192" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <line x1="160" y1="64" x2="160" y2="152" stroke={color} strokeWidth="16" strokeLinecap="round"/>
    </svg>
)

const CheckIcon = ({ color }: { color: string }) => (
    <svg width="12" height="12" viewBox="0 0 256 256" fill="none">
        <polyline points="40 144 96 200 224 72" stroke={color} strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const WarningIcon = ({ color }: { color: string }) => (
    <svg width="12" height="12" viewBox="0 0 256 256" fill="none">
        <line x1="128" y1="104" x2="128" y2="144" stroke={color} strokeWidth="20" strokeLinecap="round"/>
        <circle cx="128" cy="180" r="12" fill={color}/>
    </svg>
)

const PathIcon = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none">
        <circle cx="200" cy="200" r="24" fill={`${color}33`}/>
        <line x1="32" y1="72" x2="176" y2="72" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <circle cx="200" cy="72" r="24" stroke={color} strokeWidth="16"/>
        <circle cx="56" cy="200" r="24" stroke={color} strokeWidth="16"/>
        <path d="M80,200h80a32,32,0,0,0,32-32V104" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="200" cy="200" r="24" stroke={color} strokeWidth="16"/>
    </svg>
)

const HouseLineIcon = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none">
        <path d="M152,208V160a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v48a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V115.54a8,8,0,0,1,2.62-5.92l80-75.54a8,8,0,0,1,10.77,0l80,75.54a8,8,0,0,1,2.62,5.92V208a8,8,0,0,1-8,8H160A8,8,0,0,1,152,208Z" fill={`${color}33`}/>
        <path d="M152,208V160a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v48a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V115.54a8,8,0,0,1,2.62-5.92l80-75.54a8,8,0,0,1,10.77,0l80,75.54a8,8,0,0,1,2.62,5.92V208a8,8,0,0,1-8,8H160A8,8,0,0,1,152,208Z" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
)

const UsersThreeIcon = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none">
        <circle cx="128" cy="140" r="40" fill={`${color}33`}/>
        <circle cx="128" cy="140" r="40" stroke={color} strokeWidth="16"/>
        <path d="M196,116a24,24,0,1,1,24-24" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <path d="M60,116A24,24,0,1,0,36,92" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <path d="M60,200c-3.68-33.84,15.24-64,68-64s71.68,30.16,68,64" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M166.4,152.46A58.29,58.29,0,0,1,196,144c35.44,0,48.14,20.31,45.6,40" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M89.6,152.46A58.29,58.29,0,0,0,60,144c-35.44,0-48.14,20.31-45.6,40" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const FolderOpenIcon = ({ color }: { color: string }) => (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="none">
        <path d="M32,80V56a8,8,0,0,1,8-8H92.69a8,8,0,0,1,5.65,2.34L128,80" fill={`${color}33`}/>
        <path d="M224,88v24" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32,80V56a8,8,0,0,1,8-8H92.69a8,8,0,0,1,5.65,2.34L128,80H216a8,8,0,0,1,8,8v24" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32,80V200a8,8,0,0,0,8,8H216.89a7.11,7.11,0,0,0,6.78-9.35L200.94,117.4a8,8,0,0,0-7.72-5.4H32" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const BellIcon = ({ color }: { color: string }) => (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="none">
        <path d="M56.2,104a71.94,71.94,0,0,1,72.27-72c39.18.29,70.94,32.93,71.45,72.12.29,22.56-6.53,43.51-19.92,58.92-10.33,11.88-21.66,27.35-21.66,42.92H97.66c0-15.57-11.33-31-21.66-42.92C62.59,147.77,55.9,126.69,56.2,104Z" fill={`${color}33`}/>
        <path d="M96,192v8a32,32,0,0,0,64,0v-8" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M56.2,104a71.94,71.94,0,0,1,72.27-72c39.18.29,70.94,32.93,71.45,72.12.29,22.56-6.53,43.51-19.92,58.92-10.33,11.88-21.66,27.35-21.66,42.92H97.66c0-15.57-11.33-31-21.66-42.92C62.59,147.77,55.9,126.69,56.2,104Z" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const ArrowsLeftRightIcon = ({ color }: { color: string }) => (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="none">
        <polyline points="176 48 208 80 176 112" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="48" y1="80" x2="208" y2="80" stroke={color} strokeWidth="16" strokeLinecap="round"/>
        <polyline points="80 208 48 176 80 144" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="208" y1="176" x2="48" y2="176" stroke={color} strokeWidth="16" strokeLinecap="round"/>
    </svg>
)

// Visual Components
const SpecsVisual = ({ color }: { color: string }) => {
    const specs = [
        { icon: <LightningIcon color={color} />, label: "전력", value: "500kW" },
        { icon: <BarbellIcon color={color} />, label: "바닥하중", value: "5t/㎡" },
        { icon: <CraneTowerIcon color={color} />, label: "호이스트", value: "10t" },
        { icon: <RulerIcon color={color} />, label: "천정고", value: "12m" },
    ]

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, padding: 16 }}>
            {specs.map((item, i) => (
                <div
                    key={item.label}
                    className={`spec-item spec-item-${i}`}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                        padding: 12,
                        background: "#ffffff",
                        borderRadius: 12,
                        boxShadow: `0 2px 8px ${color}0F`,
                        minWidth: 80,
                    }}
                >
                    {item.icon}
                    <span style={{ fontFamily: "Pretendard", fontSize: 10, color: "#5c6b7a" }}>{item.label}</span>
                    <span style={{ fontFamily: "Pretendard", fontSize: 13, fontWeight: 700, color }}>{item.value}</span>
                </div>
            ))}
            <style>{`
                @keyframes specPulse { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
                .spec-item { animation: specPulse 2s ease-in-out infinite; }
                .spec-item-0 { animation-delay: 0s; }
                .spec-item-1 { animation-delay: 0.15s; }
                .spec-item-2 { animation-delay: 0.3s; }
                .spec-item-3 { animation-delay: 0.45s; }
            `}</style>
        </div>
    )
}

const BuildingVisual = ({ color }: { color: string }) => {
    const buildings = [
        { name: "제조동", area: "1,200평", icon: <FactoryIcon color={color} />, isMain: true },
        { name: "사무동", area: "150평", icon: <BuildingsIcon color={color} />, isMain: false },
        { name: "가설건축물", area: "80평", icon: <HouseIcon color={color} />, isMain: false },
    ]

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 16 }}>
            {buildings.map((b, i) => (
                <div
                    key={b.name}
                    className={`building-item building-item-${i}`}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 14px",
                        background: b.isMain ? color : "#ffffff",
                        borderRadius: 10,
                        boxShadow: b.isMain ? `0 4px 16px ${color}4D` : `0 2px 8px ${color}0F`,
                    }}
                >
                    <span style={{ color: b.isMain ? "#ffffff" : color }}>{b.icon}</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ fontFamily: "Pretendard", fontSize: 12, fontWeight: 600, color: b.isMain ? "#ffffff" : "#001530" }}>{b.name}</span>
                        <span style={{ fontFamily: "Pretendard", fontSize: 11, color: b.isMain ? "rgba(255,255,255,0.8)" : "#5c6b7a" }}>{b.area}</span>
                    </div>
                </div>
            ))}
            <style>{`
                @keyframes buildingSlide { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(6px); } }
                .building-item { animation: buildingSlide 2.5s ease-in-out infinite; }
                .building-item-0 { animation-delay: 0s; }
                .building-item-1 { animation-delay: 0.15s; }
                .building-item-2 { animation-delay: 0.3s; }
            `}</style>
        </div>
    )
}

const VehicleVisual = ({ color }: { color: string }) => {
    const vehicles = [
        { name: "11톤 윙바디", status: "ok" },
        { name: "25톤 카고", status: "ok" },
        { name: "40ft 트레일러", status: "warning" },
    ]

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 16 }}>
            {vehicles.map((v) => (
                <div
                    key={v.name}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 14px",
                        background: "#ffffff",
                        borderRadius: 10,
                        boxShadow: `0 2px 8px ${color}0F`,
                        minWidth: 160,
                    }}
                >
                    <TruckIcon color={color} />
                    <span style={{ flex: 1, fontFamily: "Pretendard", fontSize: 12, fontWeight: 500, color: "#001530" }}>{v.name}</span>
                    <span
                        style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            background: v.status === "ok" ? color : "#93c5fd",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {v.status === "ok" ? <CheckIcon color="#ffffff" /> : <WarningIcon color="#1e40af" />}
                    </span>
                </div>
            ))}
        </div>
    )
}

const TrafficVisual = ({ color }: { color: string }) => {
    const traffic = [
        { icon: <PathIcon color={color} />, label: "IC 접근", value: "3.2km" },
        { icon: <HouseLineIcon color={color} />, label: "배후 주거", value: "양호" },
        { icon: <UsersThreeIcon color={color} />, label: "인력 수급", value: "우수" },
    ]

    return (
        <div style={{ display: "flex", gap: 12, padding: 16 }}>
            {traffic.map((item, i) => (
                <div
                    key={item.label}
                    className={`traffic-item traffic-item-${i}`}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                        padding: 12,
                        background: "#ffffff",
                        borderRadius: 12,
                        boxShadow: `0 2px 8px ${color}0F`,
                        minWidth: 65,
                    }}
                >
                    {item.icon}
                    <span style={{ fontFamily: "Pretendard", fontSize: 10, color: "#5c6b7a" }}>{item.label}</span>
                    <span style={{ fontFamily: "Pretendard", fontSize: 12, fontWeight: 700, color }}>{item.value}</span>
                </div>
            ))}
            <style>{`
                @keyframes trafficWave { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
                .traffic-item { animation: trafficWave 2s ease-in-out infinite; }
                .traffic-item-0 { animation-delay: 0s; }
                .traffic-item-1 { animation-delay: 0.2s; }
                .traffic-item-2 { animation-delay: 0.4s; }
            `}</style>
        </div>
    )
}

const PriceVisual = ({ color }: { color: string }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 200, padding: 20 }}>
        {[{ label: "공장", value: "180만/평", width: "75%" }, { label: "창고", value: "120만/평", width: "55%" }].map((bar) => (
            <div key={bar.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "Pretendard", fontSize: 11, fontWeight: 600, color: "#5c6b7a", width: 32 }}>{bar.label}</span>
                <div
                    className="price-bar-fill"
                    style={{
                        width: bar.width,
                        height: 28,
                        background: `linear-gradient(90deg, ${color} 0%, #3b82f6 100%)`,
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        paddingRight: 8,
                    }}
                >
                    <span style={{ fontFamily: "Pretendard", fontSize: 10, fontWeight: 700, color: "#ffffff", whiteSpace: "nowrap" }}>{bar.value}</span>
                </div>
            </div>
        ))}
        <style>{`
            @keyframes priceFill { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
            .price-bar-fill { animation: priceFill 1.5s ease-out forwards; transform-origin: left; }
        `}</style>
    </div>
)

const MockupVisual = ({ color }: { color: string }) => (
    <div className="mockup-browser" style={{ width: "100%", maxWidth: 240, background: "#1a1a1a", borderRadius: 10, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "#2a2a2a" }}>
            <div style={{ display: "flex", gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
            </div>
            <div style={{ flex: 1, fontFamily: "Pretendard", fontSize: 10, color: "#888", background: "#1a1a1a", padding: "3px 8px", borderRadius: 4, textAlign: "center" }}>gongzzang.com</div>
        </div>
        <div style={{ display: "flex", height: 100 }}>
            <div style={{ width: 50, background: "#f5f5f5", padding: "8px 6px", display: "flex", flexDirection: "column", gap: 5 }}>
                {[0, 1, 2].map((i) => (
                    <div key={i} className={`mockup-filter mockup-filter-${i}`} style={{ height: 16, background: "#e0e0e0", borderRadius: 3 }} />
                ))}
            </div>
            <div style={{ flex: 1, background: "#e8f0fe", position: "relative" }}>
                {[{ top: "25%", left: "35%" }, { top: "45%", left: "55%" }, { top: "65%", left: "40%" }].map((pos, i) => (
                    <div key={i} className={`mockup-pin mockup-pin-${i}`} style={{ position: "absolute", ...pos, width: 10, height: 10, background: color, borderRadius: "50%", border: "2px solid #fff", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} />
                ))}
            </div>
        </div>
        <style>{`
            @keyframes browserFloat { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-3px) rotate(0.5deg); } 75% { transform: translateY(3px) rotate(-0.5deg); } }
            @keyframes filterPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
            @keyframes pinBounce { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-8px) scale(1.2); } }
            .mockup-browser { animation: browserFloat 4s ease-in-out infinite; }
            .mockup-filter { animation: filterPulse 2s ease-in-out infinite; }
            .mockup-filter-0 { animation-delay: 0s; }
            .mockup-filter-1 { animation-delay: 0.3s; }
            .mockup-filter-2 { animation-delay: 0.6s; }
            .mockup-pin { animation: pinBounce 1.5s ease-in-out infinite; }
            .mockup-pin-0 { animation-delay: 0s; }
            .mockup-pin-1 { animation-delay: 0.3s; }
            .mockup-pin-2 { animation-delay: 0.6s; }
        `}</style>
    </div>
)

const DistrictVisual = ({ color }: { color: string }) => (
    <div style={{ position: "relative", width: 180, height: 120, background: "#e8f0fe", borderRadius: 12, overflow: "hidden" }}>
        <div className="district-boundary" style={{ position: "absolute", top: "20%", left: "15%", width: "70%", height: "60%", border: `2px dashed #3b82f6`, borderRadius: 8 }} />
        <div style={{ position: "absolute", bottom: 8, left: 8, right: 8, background: "#ffffff", borderRadius: 6, padding: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <span style={{ fontFamily: "Pretendard", fontSize: 11, fontWeight: 700, color: "#001530", display: "block", marginBottom: 4 }}>반월시화 산단</span>
            <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontFamily: "Pretendard", fontSize: 9, color: "#5c6b7a" }}>제한업종: 화학</span>
                <span style={{ fontFamily: "Pretendard", fontSize: 9, color: "#5c6b7a" }}>입주기업: 1,240개</span>
            </div>
        </div>
        <style>{`
            @keyframes boundaryPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
            .district-boundary { animation: boundaryPulse 2s ease-in-out infinite; }
        `}</style>
    </div>
)

const HeatmapVisual = ({ color }: { color: string }) => {
    const opacities = [0.35, 0.65, 0.45, 0.78, 0.52, 0.28, 0.72, 0.41, 0.58, 0.32, 0.68, 0.48, 0.75, 0.38, 0.62, 0.55]
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3, width: 140 }}>
                {opacities.map((opacity, i) => (
                    <div key={i} className={i % 2 === 1 ? "heatmap-cell-odd" : "heatmap-cell"} style={{ aspectRatio: "1", borderRadius: 4, backgroundColor: `rgba(59, 130, 246, ${opacity})` }} />
                ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "Pretendard", fontSize: 9, color: "#5c6b7a" }}>
                <span>저렴</span>
                <div style={{ width: 60, height: 6, background: "linear-gradient(90deg, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 1))", borderRadius: 3 }} />
                <span>고가</span>
            </div>
            <style>{`
                @keyframes cellFade { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
                .heatmap-cell, .heatmap-cell-odd { animation: cellFade 3s ease-in-out infinite; }
                .heatmap-cell-odd { animation-delay: 0.5s; }
            `}</style>
        </div>
    )
}

const ClusterVisual = ({ color }: { color: string }) => {
    const clusters = [
        { label: "금속", color: "#0071ff", top: "10%", left: "5%", width: 80, height: 70 },
        { label: "화학", color: "#3b82f6", top: "40%", left: "45%", width: 70, height: 60 },
        { label: "기계", color: "#2563eb", top: "15%", left: "55%", width: 60, height: 50 },
    ]
    return (
        <div style={{ position: "relative", width: 160, height: 120 }}>
            {clusters.map((c, i) => (
                <div
                    key={c.label}
                    className={`cluster-area cluster-area-${i}`}
                    style={{
                        position: "absolute",
                        top: c.top,
                        left: c.left,
                        width: c.width,
                        height: c.height,
                        background: c.color,
                        opacity: 0.3,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span style={{ fontFamily: "Pretendard", fontSize: 11, fontWeight: 700, color: c.color, opacity: 1 / 0.3 }}>{c.label}</span>
                </div>
            ))}
            <style>{`
                @keyframes clusterPulse { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.1); opacity: 0.5; } }
                .cluster-area { animation: clusterPulse 3s ease-in-out infinite; }
                .cluster-area-1 { animation-delay: 0.5s; }
                .cluster-area-2 { animation-delay: 1s; }
            `}</style>
        </div>
    )
}

const RealtimeVisual = ({ color }: { color: string }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 16 }}>
        <div style={{ width: 100, height: 80, background: "#e8f0fe", borderRadius: 8, position: "relative", overflow: "hidden" }}>
            <div className="realtime-cursor" style={{ position: "absolute", width: 40, height: 40, border: "2px solid #3b82f6", borderRadius: 4, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[{ label: "평균시세", value: "185만/평" }, { label: "매물수", value: "127건" }].map((item) => (
                <div key={item.label} style={{ display: "flex", flexDirection: "column", gap: 2, padding: "8px 10px", background: "#ffffff", borderRadius: 6, boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                    <span style={{ fontFamily: "Pretendard", fontSize: 9, color: "#5c6b7a" }}>{item.label}</span>
                    <span style={{ fontFamily: "Pretendard", fontSize: 13, fontWeight: 700, color }}>{item.value}</span>
                </div>
            ))}
        </div>
        <style>{`
            @keyframes cursorMove { 0%, 100% { top: 30%; left: 30%; } 25% { top: 60%; left: 40%; } 50% { top: 40%; left: 70%; } 75% { top: 70%; left: 60%; } }
            .realtime-cursor { animation: cursorMove 4s ease-in-out infinite; }
        `}</style>
    </div>
)

const RequestVisual = ({ color }: { color: string }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 16 }}>
        <div style={{ padding: "10px 14px", background: "#ffffff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <span style={{ fontFamily: "Pretendard", fontSize: 11, fontWeight: 600, color: "#5c6b7a" }}>매도자</span>
        </div>
        <div className="request-arrow"><ArrowsLeftRightIcon color={color} /></div>
        <div style={{ padding: "12px 18px", background: color, borderRadius: 10, boxShadow: `0 4px 16px ${color}4D` }}>
            <span style={{ fontFamily: "Pretendard", fontSize: 13, fontWeight: 700, color: "#ffffff" }}>공짱</span>
        </div>
        <div className="request-arrow"><ArrowsLeftRightIcon color={color} /></div>
        <div style={{ padding: "10px 14px", background: "#ffffff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <span style={{ fontFamily: "Pretendard", fontSize: 11, fontWeight: 600, color: "#5c6b7a" }}>매수자</span>
        </div>
        <style>{`
            @keyframes arrowPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } }
            .request-arrow { animation: arrowPulse 1.5s ease-in-out infinite; }
        `}</style>
    </div>
)

const ExpertVisual = ({ color }: { color: string }) => {
    const steps = ["인허가 검토", "전략 수립", "계약 체결", "사후 관리"]
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 16 }}>
            {steps.map((step, i) => {
                const isDone = i <= 1
                return (
                    <div key={step} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: isDone ? color : "rgba(0,0,0,0.1)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {isDone && <span style={{ fontSize: 8, color: "#ffffff" }}>✓</span>}
                        </div>
                        <span style={{ fontFamily: "Pretendard", fontSize: 11, color: isDone ? "#001530" : "#5c6b7a", fontWeight: isDone ? 600 : 400 }}>{step}</span>
                    </div>
                )
            })}
        </div>
    )
}

const SaveVisual = ({ color }: { color: string }) => {
    const saves = ["경기 화성 · 500평 이상", "충북 청주 · 제조업", "인천 · 물류창고"]
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: 16 }}>
            {saves.map((text, i) => {
                const isActive = i === 0
                return (
                    <div
                        key={text}
                        className={`save-item save-item-${i} ${isActive ? "save-item-active" : ""}`}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 12px",
                            background: isActive ? color : "#ffffff",
                            borderRadius: 8,
                            boxShadow: isActive ? `0 4px 16px ${color}4D` : `0 2px 8px ${color}0F`,
                            minWidth: 160,
                        }}
                    >
                        <span style={{ color: isActive ? "#ffffff" : color }}><FolderOpenIcon color={isActive ? "#ffffff" : color} /></span>
                        <span style={{ fontFamily: "Pretendard", fontSize: 11, fontWeight: isActive ? 600 : 500, color: isActive ? "#ffffff" : "#5c6b7a" }}>{text}</span>
                    </div>
                )
            })}
            <style>{`
                @keyframes saveSlide { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(6px); } }
                @keyframes saveGlow { 0%, 100% { box-shadow: 0 4px 16px ${color}4D; } 50% { box-shadow: 0 8px 32px ${color}80; } }
                .save-item { animation: saveSlide 2.5s ease-in-out infinite; }
                .save-item-0 { animation-delay: 0s; }
                .save-item-1 { animation-delay: 0.15s; }
                .save-item-2 { animation-delay: 0.3s; }
                .save-item-active { animation: saveGlow 1.5s ease-in-out infinite, saveSlide 2.5s ease-in-out infinite; }
            `}</style>
        </div>
    )
}

const AlertVisual = ({ color }: { color: string }) => (
    <div className="alert-phone" style={{ width: 140, padding: 10, background: "#1a1a1a", borderRadius: 14, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
        <div className="alert-notification" style={{ background: "#ffffff", borderRadius: 8, padding: 10, display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span className="alert-bell"><BellIcon color={color} /></span>
                <span style={{ fontFamily: "Pretendard", fontSize: 10, fontWeight: 700, color: "#001530" }}>새 매물 알림</span>
            </div>
            <p style={{ fontFamily: "Pretendard", fontSize: 9, color: "#5c6b7a", margin: 0, lineHeight: 1.4 }}>저장한 조건에 맞는 매물이 등록되었습니다</p>
        </div>
        <style>{`
            @keyframes phoneVibrate { 0%, 100% { transform: rotate(0deg); } 5% { transform: rotate(-2deg); } 10% { transform: rotate(2deg); } 15% { transform: rotate(-2deg); } 20% { transform: rotate(2deg); } 25% { transform: rotate(0deg); } }
            @keyframes notificationPop { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.02); } 95% { opacity: 1; } 97% { opacity: 0.5; transform: translateY(-3px); } }
            @keyframes bellRing { 0%, 100% { transform: rotate(0deg); } 10% { transform: rotate(20deg); } 20% { transform: rotate(-20deg); } 30% { transform: rotate(15deg); } 40% { transform: rotate(-15deg); } 50% { transform: rotate(0deg); } }
            .alert-phone { animation: phoneVibrate 3s ease-in-out infinite; }
            .alert-notification { animation: notificationPop 3s ease-in-out infinite; }
            .alert-bell { transform-origin: top center; animation: bellRing 1.5s ease-in-out infinite; }
        `}</style>
    </div>
)

const renderVisual = (type: string, color: string) => {
    switch (type) {
        case "specs": return <SpecsVisual color={color} />
        case "building": return <BuildingVisual color={color} />
        case "vehicle": return <VehicleVisual color={color} />
        case "traffic": return <TrafficVisual color={color} />
        case "price": return <PriceVisual color={color} />
        case "mockup": return <MockupVisual color={color} />
        case "district": return <DistrictVisual color={color} />
        case "heatmap": return <HeatmapVisual color={color} />
        case "cluster": return <ClusterVisual color={color} />
        case "realtime": return <RealtimeVisual color={color} />
        case "request": return <RequestVisual color={color} />
        case "expert": return <ExpertVisual color={color} />
        case "save": return <SaveVisual color={color} />
        case "alert": return <AlertVisual color={color} />
        default: return null
    }
}

const featureTabs: Tab[] = [
    {
        id: "data",
        label: "산업시설 데이터 분석",
        icon: <DataIcon />,
        features: [
            { name: "건축 스펙", title: "건축 구조 및 동력", description: "전력(kW), 바닥 하중, 호이스트 등 설비 가동에 필수적인 하드웨어 스펙을 상세히 제공합니다.", visualType: "specs" },
            { name: "건물별 스펙", title: "건물별 개별 스펙 시스템", description: "뭉뚱그린 합계 면적이 아닌 제조동, 사무동, 가설건축물의 제원을 건물별로 분리하여 보여드립니다.", visualType: "building" },
            { name: "차량 통행", title: "진입로 및 차량 통행 분석", description: "11톤 윙바디, 40피트 트레일러 등 대형 차량의 진입 가능 여부를 아이콘으로 즉시 확인하세요.", visualType: "vehicle" },
            { name: "인프라", title: "광역 교통 & 인력 수급 인프라", description: "물류비를 아끼는 IC 접근성부터 직원 채용을 위한 배후 주거 환경까지 꼼꼼하게 분석해 드립니다.", visualType: "traffic" },
            { name: "시세", title: "정밀한 산업부동산 시세", description: "공장과 창고를 명확히 구분하여, 데이터 왜곡 없는 순수 제조업소 실거래가를 제공합니다.", visualType: "price" },
        ],
    },
    {
        id: "map",
        label: "공간정보 시각화",
        icon: <MapIcon />,
        features: [
            { name: "통합 지도", title: "통합 지도 시스템", description: "매물, 건축물대장, 토지이용계획, 실거래가, 경매 정보까지 핀 하나로 통합하여 확인하세요.", visualType: "mockup" },
            { name: "산단 브리핑", title: "산업단지 정밀 브리핑", description: "지도에 없는 산업단지 경계부터 입주 제한 업종, 입주 기업 리스트까지 정밀하게 브리핑합니다.", visualType: "district" },
            { name: "시각화", title: "필지별 데이터 시각화", description: "실거래가와 노후도에 따라 필지 색상이 변하는 시각화 지도로, 숨겨진 알짜 매물을 직관적으로 찾아냅니다.", visualType: "heatmap" },
            { name: "클러스터", title: "업종별 산업 클러스터", description: "금속, 화학 등 유사 업종이 밀집된 지역을 영역으로 시각화하여 산업 시너지를 확인하세요.", visualType: "cluster" },
            { name: "지역 분석", title: "지역별 실시간 분석", description: "지도를 움직이면 보고 계신 지역의 시세·산업·인프라 분석 결과가 실시간으로 동기화됩니다.", visualType: "realtime" },
        ],
    },
    {
        id: "matching",
        label: "맞춤형 컨설팅",
        icon: <MatchingIcon />,
        features: [
            { name: "의뢰", title: "매도/매수 의뢰", description: "희망하시는 조건만 말씀해 주세요. 최적의 매수자를 매칭해 드리거나, 맞춤형 매물을 신속하게 연결해 드립니다.", visualType: "request" },
            { name: "전문가", title: "원스톱 전문가 케어", description: "인허가 검토부터 매입·매각 전략 수립까지, 전담 전문가가 배정되어 A to Z를 완벽하게 케어합니다.", visualType: "expert" },
            { name: "조건 저장", title: "필터 조건 저장", description: "자주 사용하는 필터 조건을 저장해두고, 언제든 불러와 사용하세요.", visualType: "save", comingSoon: true },
            { name: "알림", title: "조건 매칭 알림", description: "저장한 조건에 맞는 신규 매물이 등록되거나 정보가 업데이트되면 즉시 알람을 발송해 드립니다.", visualType: "alert", comingSoon: true },
        ],
    },
]

export default function CoreFeaturesSection({ primaryColor = "#0071ff" }: Props) {
    const [activeTab, setActiveTab] = useState(featureTabs[0].id)
    const [isAnimating, setIsAnimating] = useState(false)
    const currentTab = featureTabs.find((t) => t.id === activeTab) ?? featureTabs[0]

    const handleTabChange = (tabId: string) => {
        if (tabId !== activeTab) {
            setIsAnimating(true)
            setTimeout(() => {
                setActiveTab(tabId)
                setTimeout(() => setIsAnimating(false), 50)
            }, 150)
        }
    }

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 40 }}>
            {/* Tab Navigation */}
            <div style={{ display: "flex", gap: 8, background: `${primaryColor}0A`, padding: 8, borderRadius: 16 }}>
                {featureTabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
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
                            <span style={{ width: 20, height: 20, color: isActive ? primaryColor : "#5c6b7a", transition: "color 0.2s ease" }}>{tab.icon}</span>
                            <span style={{ fontFamily: "Pretendard, sans-serif", fontSize: 15, fontWeight: 600, color: isActive ? "#001530" : "#5c6b7a", transition: "color 0.2s ease" }}>{tab.label}</span>
                        </button>
                    )
                })}
            </div>

            {/* Feature Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 20,
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating ? "translateY(20px)" : "translateY(0)",
                    transition: "all 0.3s ease",
                }}
            >
                {currentTab.features.map((feature) => (
                    <FeatureCard key={feature.name} feature={feature} primaryColor={primaryColor} />
                ))}
            </div>

            <style>{`
                button:hover { background: rgba(255, 255, 255, 0.6) !important; }
            `}</style>
        </div>
    )
}

function FeatureCard({ feature, primaryColor }: { feature: Feature; primaryColor: string }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                background: "#ffffff",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                borderRadius: 20,
                overflow: "hidden",
                transition: "all 0.3s ease",
                transform: !feature.comingSoon && isHovered ? "translateY(-4px)" : "translateY(0)",
                borderColor: !feature.comingSoon && isHovered ? `${primaryColor}26` : "rgba(0, 0, 0, 0.06)",
                boxShadow: !feature.comingSoon && isHovered ? `0 16px 48px ${primaryColor}14` : "none",
                opacity: feature.comingSoon ? 0.7 : 1,
                position: "relative",
            }}
        >
            {feature.comingSoon && (
                <span
                    style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        zIndex: 10,
                        fontFamily: "Pretendard, sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#5c6b7a",
                        background: "#f8f9fa",
                        padding: "6px 10px",
                        borderRadius: 9999,
                        letterSpacing: "-0.01em",
                        border: "1px solid rgba(0, 0, 0, 0.06)",
                    }}
                >
                    Coming Soon
                </span>
            )}

            <div
                style={{
                    width: "100%",
                    height: 180,
                    background: `${primaryColor}05`,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {renderVisual(feature.visualType, primaryColor)}
            </div>

            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                <h3 style={{ fontFamily: "Pretendard, sans-serif", fontSize: 20, fontWeight: 700, color: "#001530", margin: 0, letterSpacing: "-0.02em" }}>{feature.title}</h3>
                <p style={{ fontFamily: "Pretendard, sans-serif", fontSize: 15, color: "#5c6b7a", lineHeight: 1.65, margin: 0 }}>{feature.description}</p>
            </div>
        </div>
    )
}

addPropertyControls(CoreFeaturesSection, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})
