import { addPropertyControls, ControlType } from "framer"

/**
 * 시세 시각화 (공장 vs 창고)
 */

interface Props {
    primaryColor: string
}

export default function PriceVisual({ primaryColor = "#0071ff" }: Props) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
                background: `${primaryColor}05`,
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    width: "100%",
                    maxWidth: 200,
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
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 11,
                                fontWeight: 600,
                                color: "#5c6b7a",
                                width: 32,
                            }}
                        >
                            {item.label}
                        </span>
                        <div
                            className="price-bar-fill"
                            style={{
                                width: item.width,
                                height: 28,
                                background: `linear-gradient(90deg, ${primaryColor} 0%, #3b82f6 100%)`,
                                borderRadius: 6,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                paddingRight: 8,
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "Pretendard, sans-serif",
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: "#ffffff",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {item.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <style>
                {`
                    @keyframes priceFill {
                        0% { transform: scaleX(0); }
                        100% { transform: scaleX(1); }
                    }
                    .price-bar-fill {
                        animation: priceFill 1.5s ease-out forwards;
                        transform-origin: left;
                    }
                `}
            </style>
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
