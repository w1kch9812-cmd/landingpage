import { addPropertyControls, ControlType } from "framer"

/**
 * 원스톱 전문가 케어 타임라인
 */

interface Props {
    primaryColor: string
}

const expertSteps = [
    { label: "인허가 검토", done: true },
    { label: "전략 수립", done: true },
    { label: "계약 체결", done: false },
    { label: "사후 관리", done: false },
]

export default function ExpertVisual({ primaryColor = "#3b82f6" }: Props) {
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
                    gap: 8,
                }}
            >
                {expertSteps.map((step, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <div
                            style={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                background: step.done ? primaryColor : "rgba(0, 0, 0, 0.1)",
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {step.done && (
                                <span
                                    style={{
                                        fontSize: 8,
                                        color: "#fff",
                                        lineHeight: 1,
                                    }}
                                >
                                    ✓
                                </span>
                            )}
                        </div>
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 11,
                                color: step.done ? "#001530" : "#5c6b7a",
                                fontWeight: step.done ? 600 : 400,
                            }}
                        >
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

addPropertyControls(ExpertVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#3b82f6",
    },
})
