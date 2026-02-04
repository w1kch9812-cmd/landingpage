import { addPropertyControls, ControlType } from "framer"

// ========== 1. SpecsVisual ==========
// 건축 스펙 (전력, 바닥하중, 호이스트, 천정고)

const specsData = [
    { label: "전력", value: "500kW" },
    { label: "바닥하중", value: "5t/㎡" },
    { label: "호이스트", value: "10t" },
    { label: "천정고", value: "12m" },
]

export function SpecsVisual({ primaryColor = "#0071ff" }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                padding: 16,
                background: "rgba(0, 113, 255, 0.04)",
                borderRadius: 12,
            }}
        >
            {specsData.map((item) => (
                <div
                    key={item.label}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        padding: 12,
                        background: "#ffffff",
                        borderRadius: 8,
                    }}
                >
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 12,
                            color: "#5c6b7a",
                        }}
                    >
                        {item.label}
                    </span>
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 18,
                            fontWeight: 700,
                            color: primaryColor,
                        }}
                    >
                        {item.value}
                    </span>
                </div>
            ))}
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

// ========== 2. BuildingVisual ==========
// 건물별 스펙 (제조동, 사무동, 가설건축물)

const buildingsData = [
    { name: "제조동", area: "1,200평", main: true },
    { name: "사무동", area: "150평", main: false },
    { name: "가설건축물", area: "80평", main: false },
]

export function BuildingVisual({ primaryColor = "#0071ff" }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: 16,
            }}
        >
            {buildingsData.map((building) => (
                <div
                    key={building.name}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 16px",
                        background: building.main ? primaryColor : "#f8f9fa",
                        borderRadius: 8,
                        color: building.main ? "#ffffff" : "#001530",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 14,
                            fontWeight: 600,
                        }}
                    >
                        {building.name}
                    </span>
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 14,
                            fontWeight: 700,
                        }}
                    >
                        {building.area}
                    </span>
                </div>
            ))}
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

// ========== 3. VehicleVisual ==========
// 차량 통행 (11톤 윙바디, 25톤 카고, 40ft 트레일러)

const vehiclesData = [
    { name: "11톤 윙바디", status: "ok" },
    { name: "25톤 카고", status: "ok" },
    { name: "40ft 트레일러", status: "warning" },
]

export function VehicleVisual() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: 16,
            }}
        >
            {vehiclesData.map((vehicle) => (
                <div
                    key={vehicle.name}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 14px",
                        background: "#f8f9fa",
                        borderRadius: 8,
                    }}
                >
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#001530",
                        }}
                    >
                        {vehicle.name}
                    </span>
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: vehicle.status === "ok" ? "#10b981" : "#f59e0b",
                            color: "#ffffff",
                            fontSize: 12,
                            fontWeight: 700,
                        }}
                    >
                        {vehicle.status === "ok" ? "✓" : "!"}
                    </span>
                </div>
            ))}
        </div>
    )
}

// ========== 4. TrafficVisual ==========
// 인프라 (IC 접근, 배후 주거, 인력 수급)

const trafficData = [
    { label: "IC 접근", value: "3.2km" },
    { label: "배후 주거", value: "양호" },
    { label: "인력 수급", value: "우수" },
]

export function TrafficVisual({ primaryColor = "#0071ff" }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: 16,
            }}
        >
            {trafficData.map((item) => (
                <div
                    key={item.label}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 14px",
                        background: "rgba(0, 113, 255, 0.04)",
                        borderRadius: 8,
                    }}
                >
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 14,
                            color: "#5c6b7a",
                        }}
                    >
                        {item.label}
                    </span>
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 14,
                            fontWeight: 700,
                            color: primaryColor,
                        }}
                    >
                        {item.value}
                    </span>
                </div>
            ))}
        </div>
    )
}

addPropertyControls(TrafficVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})

// ========== 5. PriceVisual ==========
// 시세 (공장 vs 창고)

export function PriceVisual({ primaryColor = "#0071ff" }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                padding: 16,
            }}
        >
            {[
                { label: "공장", value: "180만/평", width: "75%" },
                { label: "창고", value: "120만/평", width: "55%" },
            ].map((item) => (
                <div
                    key={item.label}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                    }}
                >
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 12,
                            color: "#5c6b7a",
                        }}
                    >
                        {item.label}
                    </span>
                    <div
                        style={{
                            width: "100%",
                            height: 32,
                            background: "#f1f5f9",
                            borderRadius: 6,
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                width: item.width,
                                height: "100%",
                                background: primaryColor,
                                borderRadius: 6,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                paddingRight: 10,
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "Pretendard, sans-serif",
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: "#ffffff",
                                }}
                            >
                                {item.value}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

addPropertyControls(PriceVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})

// ========== 6. HeatmapVisual ==========
// 필지별 데이터 시각화 (히트맵)

const heatmapOpacities = [0.35, 0.65, 0.45, 0.78, 0.52, 0.28, 0.72, 0.41, 0.58, 0.32, 0.68, 0.48, 0.75, 0.38, 0.62, 0.55]

export function HeatmapVisual({ primaryColor = "#3b82f6" }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                padding: 16,
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 4,
                }}
            >
                {heatmapOpacities.map((opacity, i) => (
                    <div
                        key={i}
                        style={{
                            aspectRatio: "1",
                            borderRadius: 4,
                            backgroundColor: primaryColor,
                            opacity,
                        }}
                    />
                ))}
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: 11,
                    color: "#5c6b7a",
                    fontFamily: "Pretendard, sans-serif",
                }}
            >
                <span>저렴</span>
                <div
                    style={{
                        flex: 1,
                        height: 6,
                        margin: "0 8px",
                        background: `linear-gradient(to right, ${primaryColor}33, ${primaryColor})`,
                        borderRadius: 3,
                    }}
                />
                <span>고가</span>
            </div>
        </div>
    )
}

addPropertyControls(HeatmapVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#3b82f6",
    },
})

// ========== 7. ClusterVisual ==========
// 업종별 산업 클러스터

export function ClusterVisual() {
    const clusters = [
        { name: "금속", color: "#0071ff", size: 70, top: "10%", left: "10%" },
        { name: "화학", color: "#3b82f6", size: 55, top: "30%", left: "50%" },
        { name: "기계", color: "#2563eb", size: 45, top: "55%", left: "25%" },
    ]

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: 150,
                background: "#f8f9fa",
                borderRadius: 12,
                overflow: "hidden",
            }}
        >
            {clusters.map((cluster) => (
                <div
                    key={cluster.name}
                    style={{
                        position: "absolute",
                        top: cluster.top,
                        left: cluster.left,
                        width: cluster.size,
                        height: cluster.size,
                        borderRadius: "50%",
                        background: `${cluster.color}20`,
                        border: `2px solid ${cluster.color}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 12,
                            fontWeight: 600,
                            color: cluster.color,
                        }}
                    >
                        {cluster.name}
                    </span>
                </div>
            ))}
        </div>
    )
}

// ========== 8. RealtimeVisual ==========
// 지역별 실시간 분석

export function RealtimeVisual({ primaryColor = "#0071ff" }) {
    return (
        <div
            style={{
                display: "flex",
                gap: 12,
                padding: 16,
            }}
        >
            <div
                style={{
                    flex: 1,
                    height: 100,
                    background: "#e2e8f0",
                    borderRadius: 8,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        border: `3px solid ${primaryColor}`,
                        background: `${primaryColor}20`,
                    }}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    justifyContent: "center",
                }}
            >
                {[
                    { label: "평균시세", value: "185만/평" },
                    { label: "매물수", value: "127건" },
                ].map((item) => (
                    <div
                        key={item.label}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 11,
                                color: "#5c6b7a",
                            }}
                        >
                            {item.label}
                        </span>
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 16,
                                fontWeight: 700,
                                color: primaryColor,
                            }}
                        >
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

addPropertyControls(RealtimeVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})

// ========== 9. RequestVisual ==========
// 매도/매수 의뢰 플로우

export function RequestVisual({ primaryColor = "#0071ff" }) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: 20,
            }}
        >
            {["매도자", "공짱", "매수자"].map((label, i) => (
                <>
                    <div
                        key={label}
                        style={{
                            padding: "10px 16px",
                            background: i === 1 ? primaryColor : "#f1f5f9",
                            borderRadius: 8,
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 13,
                            fontWeight: 600,
                            color: i === 1 ? "#ffffff" : "#001530",
                        }}
                    >
                        {label}
                    </div>
                    {i < 2 && (
                        <span style={{ color: "#cbd5e1", fontSize: 16 }}>↔</span>
                    )}
                </>
            ))}
        </div>
    )
}

addPropertyControls(RequestVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})

// ========== 10. ExpertVisual ==========
// 원스톱 전문가 케어 타임라인

export function ExpertVisual({ primaryColor = "#0071ff" }) {
    const steps = ["인허가 검토", "전략 수립", "계약 체결", "사후 관리"]

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 16px",
                position: "relative",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: 24,
                    right: 24,
                    height: 2,
                    background: "#e2e8f0",
                    transform: "translateY(-50%)",
                    zIndex: 0,
                }}
            />
            {steps.map((step, i) => (
                <div
                    key={step}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            background: i <= 1 ? primaryColor : "#e2e8f0",
                            border: `2px solid ${i <= 1 ? primaryColor : "#e2e8f0"}`,
                        }}
                    />
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 11,
                            fontWeight: 500,
                            color: i <= 1 ? primaryColor : "#94a3b8",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {step}
                    </span>
                </div>
            ))}
        </div>
    )
}

addPropertyControls(ExpertVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})

// ========== 11. SaveVisual ==========
// 필터 조건 저장

export function SaveVisual({ primaryColor = "#0071ff" }) {
    const saves = ["경기 화성 · 500평 이상", "충북 청주 · 제조업", "인천 · 물류창고"]

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                padding: 16,
            }}
        >
            {saves.map((text, i) => (
                <div
                    key={text}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 14px",
                        background: i === 0 ? `${primaryColor}10` : "#f8f9fa",
                        borderRadius: 8,
                        border: i === 0 ? `1px solid ${primaryColor}30` : "1px solid transparent",
                    }}
                >
                    <span style={{ fontSize: 14 }}>📁</span>
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 13,
                            fontWeight: 500,
                            color: i === 0 ? primaryColor : "#5c6b7a",
                        }}
                    >
                        {text}
                    </span>
                </div>
            ))}
        </div>
    )
}

addPropertyControls(SaveVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})

// ========== 12. AlertVisual ==========
// 조건 매칭 알림

export function AlertVisual({ primaryColor = "#0071ff" }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                padding: 16,
            }}
        >
            <div
                style={{
                    width: 200,
                    background: "#ffffff",
                    borderRadius: 16,
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        background: primaryColor,
                        padding: "12px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <span style={{ fontSize: 14 }}>🔔</span>
                    <span
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#ffffff",
                        }}
                    >
                        새 매물 알림
                    </span>
                </div>
                <div style={{ padding: "12px 16px" }}>
                    <p
                        style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 12,
                            color: "#5c6b7a",
                            lineHeight: 1.5,
                            margin: 0,
                        }}
                    >
                        저장한 조건에 맞는 매물이 등록되었습니다
                    </p>
                </div>
            </div>
        </div>
    )
}

addPropertyControls(AlertVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})

// ========== 13. DistrictVisual ==========
// 산업단지 정밀 브리핑

export function DistrictVisual({ primaryColor = "#0071ff" }) {
    return (
        <div
            style={{
                position: "relative",
                padding: 16,
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: 100,
                    background: "#e2e8f0",
                    borderRadius: 12,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "20%",
                        left: "15%",
                        width: "70%",
                        height: "60%",
                        border: `2px dashed ${primaryColor}`,
                        borderRadius: 8,
                        background: `${primaryColor}10`,
                    }}
                />
            </div>
            <div
                style={{
                    marginTop: 12,
                    padding: "10px 14px",
                    background: "#f8f9fa",
                    borderRadius: 8,
                }}
            >
                <div
                    style={{
                        fontFamily: "Pretendard, sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#001530",
                        marginBottom: 6,
                    }}
                >
                    반월시화 산단
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: 12,
                        fontFamily: "Pretendard, sans-serif",
                        fontSize: 11,
                        color: "#5c6b7a",
                    }}
                >
                    <span>제한업종: 화학</span>
                    <span>입주기업: 1,240개</span>
                </div>
            </div>
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

// ========== 14. MockupVisual ==========
// 통합 지도 시스템 브라우저 목업

export function MockupVisual({ primaryColor = "#0071ff" }) {
    return (
        <div
            style={{
                padding: 16,
            }}
        >
            <div
                style={{
                    background: "#ffffff",
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
                }}
            >
                {/* Browser Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "10px 14px",
                        background: "#f1f5f9",
                        borderBottom: "1px solid #e2e8f0",
                    }}
                >
                    <div style={{ display: "flex", gap: 4 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                    </div>
                    <div
                        style={{
                            flex: 1,
                            padding: "4px 10px",
                            background: "#ffffff",
                            borderRadius: 4,
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: 11,
                            color: "#94a3b8",
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
                            width: 60,
                            padding: 8,
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                            background: "#f8f9fa",
                        }}
                    >
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                style={{
                                    height: 8,
                                    background: "#e2e8f0",
                                    borderRadius: 4,
                                }}
                            />
                        ))}
                    </div>

                    {/* Map */}
                    <div
                        style={{
                            flex: 1,
                            background: "#e2e8f0",
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
                                style={{
                                    position: "absolute",
                                    top: pos.top,
                                    left: pos.left,
                                    width: 12,
                                    height: 12,
                                    borderRadius: "50%",
                                    background: primaryColor,
                                    border: "2px solid #ffffff",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
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
