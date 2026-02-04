import { addPropertyControls, ControlType } from "framer"

/**
 * 필지별 데이터 시각화 (히트맵)
 */

interface Props {
    primaryColor: string
}

const heatmapOpacities = [0.35, 0.65, 0.45, 0.78, 0.52, 0.28, 0.72, 0.41, 0.58, 0.32, 0.68, 0.48, 0.75, 0.38, 0.62, 0.55]

export default function HeatmapVisual({ primaryColor = "#3b82f6" }: Props) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: 16,
                background: `${primaryColor}08`,
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 3,
                    width: 140,
                }}
            >
                {heatmapOpacities.map((opacity, i) => (
                    <div
                        key={i}
                        className={`heatmap-cell ${i % 2 === 1 ? "heatmap-cell-odd" : ""}`}
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
                    gap: 8,
                    fontFamily: "Pretendard, sans-serif",
                    fontSize: 9,
                    color: "#5c6b7a",
                }}
            >
                <span>저렴</span>
                <div
                    style={{
                        width: 60,
                        height: 6,
                        background: `linear-gradient(90deg, ${primaryColor}4D, ${primaryColor})`,
                        borderRadius: 3,
                    }}
                />
                <span>고가</span>
            </div>

            <style>
                {`
                    @keyframes cellFade {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.6; }
                    }
                    .heatmap-cell {
                        animation: cellFade 3s ease-in-out infinite;
                    }
                    .heatmap-cell-odd {
                        animation-delay: 0.5s;
                    }
                `}
            </style>
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
