import { useState, useRef, useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * FAQ 아코디언 컴포넌트
 * - 클릭 시 열고 닫는 애니메이션
 * - 아이콘 회전 효과
 * - 높이 트랜지션
 */

interface FAQItem {
    question: string
    answer: string
}

interface Props {
    items: FAQItem[]
    defaultOpenIndex: number
    questionFontSize: number
    answerFontSize: number
    primaryColor: string
    backgroundColor: string
    questionColor: string
    answerColor: string
    borderRadius: number
    gap: number
}

function AccordionItem({
    item,
    isOpen,
    onToggle,
    questionFontSize,
    answerFontSize,
    primaryColor,
    questionColor,
    answerColor,
    borderRadius,
}: {
    item: FAQItem
    isOpen: boolean
    onToggle: () => void
    questionFontSize: number
    answerFontSize: number
    primaryColor: string
    questionColor: string
    answerColor: string
    borderRadius: number
}) {
    const contentRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight)
        }
    }, [item.answer])

    return (
        <div
            style={{
                background: "#ffffff",
                borderRadius: borderRadius,
                overflow: "hidden",
            }}
        >
            {/* Question Button */}
            <button
                onClick={onToggle}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "22px 24px",
                    gap: 12,
                    width: "100%",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                }}
            >
                <span
                    style={{
                        flex: 1,
                        color: questionColor,
                        fontFamily: "Pretendard, sans-serif",
                        fontSize: questionFontSize,
                        fontWeight: 500,
                        lineHeight: 1.5,
                        letterSpacing: "-0.02em",
                    }}
                >
                    {item.question}
                </span>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                        flexShrink: 0,
                        color: isOpen ? primaryColor : questionColor,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease",
                    }}
                >
                    <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {/* Answer */}
            <div
                style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? height : 0,
                    transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div
                    ref={contentRef}
                    style={{
                        padding: "0 24px 22px 24px",
                    }}
                >
                    <p
                        style={{
                            color: answerColor,
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: answerFontSize,
                            fontWeight: 400,
                            lineHeight: 1.7,
                            letterSpacing: "-0.02em",
                            margin: 0,
                        }}
                    >
                        {item.answer}
                    </p>
                </div>
            </div>
        </div>
    )
}

const defaultFAQs: FAQItem[] = [
    {
        question: "기존 부동산 플랫폼과 공짱의 차이점은 무엇인가요?",
        answer: "공짱은 산업용 부동산에 특화된 플랫폼입니다. 전력용량, 천정고, 바닥하중, 호이스트 등 제조·물류 기업이 반드시 확인해야 할 60가지 이상의 조건을 검색할 수 있고, 산업단지 입주 규제, 실거래가, 경매 정보까지 한 곳에서 비교할 수 있습니다.",
    },
    {
        question: "제공되는 정보의 신뢰도는 어느 정도인가요?",
        answer: "공짱은 국토교통부 실거래 데이터, 법원 경매 정보, 한국산업단지공단 등 공신력 있는 기관의 데이터를 기반으로 가공 및 분석 정보를 제공합니다. 데이터는 매일 업데이트되어 최신 정보를 유지합니다.",
    },
    {
        question: "허위 매물 관리는 어떻게 되고 있나요?",
        answer: "공짱은 허위 매물 근절을 위해 엄격한 모니터링 시스템을 운영합니다. 실소유 인증 시스템과 허위 매물 신고 제도를 통해, 검증된 매물 정보만을 제공하여 헛걸음하지 않도록 최선을 다하고 있습니다.",
    },
    {
        question: "공짱을 통한 계약까지 평균 얼마나 걸리나요?",
        answer: "기존 방식으로 평균 6개월 이상 걸리던 산업용 부동산 탐색이 공짱을 통해 평균 3주 내로 단축됩니다. 조건 필터링과 실시간 알림으로 불필요한 현장 방문을 70% 이상 줄일 수 있습니다.",
    },
    {
        question: "원하는 조건의 매물이 나오면 알림 받을 수 있나요?",
        answer: "네, 원하는 조건(지역, 면적, 전력용량 등)을 설정해두시면 해당 조건에 맞는 새 매물이 등록될 때 실시간으로 이메일 및 앱 푸시 알림을 받으실 수 있습니다.",
    },
    {
        question: "기업 회원이 매물 정보를 확인하는 데 비용이 드나요?",
        answer: "아닙니다. 공짱의 일반 기업 회원은 무료입니다. 회원가입만 하시면 전국의 공장/창고 매물 검색, 실거래가 통계 조회, 실시간 알림 서비스 등 핵심 기능을 비용 부담 없이 자유롭게 이용하실 수 있습니다.",
    },
    {
        question: "매물 등록비는 얼마인가요?",
        answer: "0원입니다. 부담없이 등록하시고, 월 25만명의 방문자를 만나보세요.",
    },
]

export default function FAQAccordion({
    items = defaultFAQs,
    defaultOpenIndex = 0,
    questionFontSize = 16,
    answerFontSize = 15,
    primaryColor = "#0071ff",
    backgroundColor = "#f8f9fa",
    questionColor = "#001530",
    answerColor = "#5c6b7a",
    borderRadius = 16,
    gap = 4,
}: Props) {
    const [openIndex, setOpenIndex] = useState(defaultOpenIndex)

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index)
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: gap,
                background: backgroundColor,
                padding: 4,
                borderRadius: borderRadius + 4,
                width: "100%",
            }}
        >
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    item={item}
                    isOpen={openIndex === index}
                    onToggle={() => toggleFAQ(index)}
                    questionFontSize={questionFontSize}
                    answerFontSize={answerFontSize}
                    primaryColor={primaryColor}
                    questionColor={questionColor}
                    answerColor={answerColor}
                    borderRadius={borderRadius}
                />
            ))}
        </div>
    )
}

addPropertyControls(FAQAccordion, {
    items: {
        type: ControlType.Array,
        title: "FAQ Items",
        control: {
            type: ControlType.Object,
            controls: {
                question: { type: ControlType.String, title: "Question" },
                answer: { type: ControlType.String, title: "Answer" },
            },
        },
        defaultValue: defaultFAQs,
    },
    defaultOpenIndex: {
        type: ControlType.Number,
        title: "Default Open",
        defaultValue: 0,
        min: -1,
        step: 1,
        displayStepper: true,
    },
    questionFontSize: {
        type: ControlType.Number,
        title: "Question Size",
        defaultValue: 16,
        min: 12,
        max: 24,
        step: 1,
    },
    answerFontSize: {
        type: ControlType.Number,
        title: "Answer Size",
        defaultValue: 15,
        min: 12,
        max: 20,
        step: 1,
    },
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#f8f9fa",
    },
    questionColor: {
        type: ControlType.Color,
        title: "Question Color",
        defaultValue: "#001530",
    },
    answerColor: {
        type: ControlType.Color,
        title: "Answer Color",
        defaultValue: "#5c6b7a",
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Border Radius",
        defaultValue: 16,
        min: 0,
        max: 32,
        step: 4,
    },
    gap: {
        type: ControlType.Number,
        title: "Gap",
        defaultValue: 4,
        min: 0,
        max: 16,
        step: 2,
    },
})
