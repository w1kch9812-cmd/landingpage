import { addPropertyControls, ControlType } from "framer"

/**
 * Needs 섹션용 4줄 마키
 * - 좌우 교대 방향
 * - 이모지 + 텍스트 카드
 * - 양쪽 페이드 마스크
 */

interface NeedItem {
    icon: string
    text: string
    color: string
}

interface Props {
    speed: number
    gap: number
    rowGap: number
}

const needsRows: NeedItem[][] = [
    [
        { icon: "💬", text: "이 공장, 전력 몇 kW까지 들어오나요?", color: "#0071ff" },
        { icon: "⚙️", text: "바닥 하중이 5톤/㎡ 이상인가요?", color: "#3b82f6" },
        { icon: "📦", text: "25톤 트럭 진입 가능한가요?", color: "#2563eb" },
        { icon: "🏭", text: "호이스트 설치 가능한 천장 높이인가요?", color: "#0071ff" },
        { icon: "📊", text: "이 지역 공장 실거래가가 얼마인가요?", color: "#3b82f6" },
        { icon: "🗺️", text: "IC까지 거리가 어떻게 되나요?", color: "#2563eb" },
    ],
    [
        { icon: "🔍", text: "경매 물건 중 조건 맞는 게 있나요?", color: "#0071ff" },
        { icon: "📋", text: "이 산업단지 입주 업종 제한이 있나요?", color: "#3b82f6" },
        { icon: "💰", text: "분양가 대비 시세가 어떤가요?", color: "#2563eb" },
        { icon: "🏢", text: "제조동과 사무동 면적이 각각 얼마인가요?", color: "#0071ff" },
        { icon: "📈", text: "이 지역 시세 추이가 어떤가요?", color: "#3b82f6" },
        { icon: "🔒", text: "매각 정보 비공개로 진행 가능한가요?", color: "#2563eb" },
    ],
    [
        { icon: "🚚", text: "40피트 컨테이너 회전 가능한가요?", color: "#0071ff" },
        { icon: "⚡", text: "증설 전력 여유가 있나요?", color: "#3b82f6" },
        { icon: "👷", text: "주변 인력 수급 여건은 어떤가요?", color: "#2563eb" },
        { icon: "🏘️", text: "직원 통근 가능한 주거지가 근처에 있나요?", color: "#0071ff" },
        { icon: "📍", text: "유사 업종 기업들이 밀집해 있나요?", color: "#3b82f6" },
        { icon: "📑", text: "토지이용계획 확인해 주실 수 있나요?", color: "#2563eb" },
    ],
    [
        { icon: "🔔", text: "조건 맞는 매물 나오면 알림 받을 수 있나요?", color: "#0071ff" },
        { icon: "🤝", text: "매수자 매칭 서비스가 있나요?", color: "#3b82f6" },
        { icon: "📝", text: "인허가 검토도 도와주시나요?", color: "#2563eb" },
        { icon: "💼", text: "거래 전 과정을 케어해 주시나요?", color: "#0071ff" },
        { icon: "🏗️", text: "신축 vs 구축, 뭐가 나을까요?", color: "#3b82f6" },
        { icon: "📊", text: "이 매물 적정 가격이 맞나요?", color: "#2563eb" },
    ],
]

function NeedCard({ item }: { item: NeedItem }) {
    return (
        <div
            className="need-card"
            style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 20px",
                background: "#ffffff",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                borderRadius: 9999,
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
            }}
        >
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    fontSize: 16,
                    flexShrink: 0,
                    background: `${item.color}15`,
                }}
            >
                {item.icon}
            </span>
            <span
                style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#001530",
                    letterSpacing: "-0.01em",
                }}
            >
                {item.text}
            </span>
        </div>
    )
}

function MarqueeTrack({
    items,
    direction,
    speed,
    gap,
}: {
    items: NeedItem[]
    direction: "left" | "right"
    speed: number
    gap: number
}) {
    const duplicated = [...items, ...items]

    return (
        <div
            className={`marquee-track marquee-${direction}`}
            style={{
                display: "flex",
                gap: gap,
                width: "max-content",
            }}
        >
            {duplicated.map((item, index) => (
                <NeedCard key={`${item.text}-${index}`} item={item} />
            ))}

            <style>
                {`
                    .marquee-left {
                        animation: scrollLeft ${speed}s linear infinite;
                    }
                    .marquee-right {
                        animation: scrollRight ${speed}s linear infinite;
                    }
                    @keyframes scrollLeft {
                        from { transform: translateX(0); }
                        to { transform: translateX(-50%); }
                    }
                    @keyframes scrollRight {
                        from { transform: translateX(-50%); }
                        to { transform: translateX(0); }
                    }
                    .need-card:hover {
                        border-color: rgba(0, 113, 255, 0.2);
                        box-shadow: 0 4px 20px rgba(0, 21, 48, 0.08);
                        transform: translateY(-2px);
                    }
                `}
            </style>
        </div>
    )
}

export default function NeedsMarquee({ speed = 60, gap = 16, rowGap = 16 }: Props) {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: rowGap,
                padding: "24px 0",
                maskImage:
                    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
        >
            {needsRows.map((row, rowIndex) => (
                <MarqueeTrack
                    key={rowIndex}
                    items={row}
                    direction={rowIndex % 2 === 0 ? "left" : "right"}
                    speed={speed}
                    gap={gap}
                />
            ))}
        </div>
    )
}

addPropertyControls(NeedsMarquee, {
    speed: {
        type: ControlType.Number,
        title: "Animation Duration",
        defaultValue: 60,
        min: 20,
        max: 120,
        step: 5,
        description: "Duration in seconds (lower = faster)",
    },
    gap: {
        type: ControlType.Number,
        title: "Card Gap",
        defaultValue: 16,
        min: 8,
        max: 32,
        step: 4,
    },
    rowGap: {
        type: ControlType.Number,
        title: "Row Gap",
        defaultValue: 16,
        min: 8,
        max: 32,
        step: 4,
    },
})
