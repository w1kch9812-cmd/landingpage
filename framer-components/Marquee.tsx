import { useRef, useEffect, useState } from "react"
import { addPropertyControls, ControlType } from "framer"

interface Props {
    items: string[]
    speed: number
    direction: "left" | "right"
    gap: number
    fontSize: number
    fontWeight: number
    color: string
    backgroundColor: string
    padding: number
    borderRadius: number
}

export default function Marquee({
    items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
    speed = 30,
    direction = "left",
    gap = 16,
    fontSize = 14,
    fontWeight = 500,
    color = "#001530",
    backgroundColor = "#ffffff",
    padding = 12,
    borderRadius = 8,
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [contentWidth, setContentWidth] = useState(0)

    useEffect(() => {
        if (containerRef.current) {
            const firstSet = containerRef.current.querySelector("[data-marquee-content]")
            if (firstSet) {
                setContentWidth(firstSet.scrollWidth)
            }
        }
    }, [items, gap, fontSize, padding])

    const duration = contentWidth / speed

    return (
        <div
            style={{
                width: "100%",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <div
                ref={containerRef}
                style={{
                    display: "flex",
                    width: "fit-content",
                    animation: `marquee-${direction} ${duration}s linear infinite`,
                }}
            >
                {[0, 1].map((setIndex) => (
                    <div
                        key={setIndex}
                        data-marquee-content={setIndex === 0 ? true : undefined}
                        style={{
                            display: "flex",
                            gap,
                            paddingRight: gap,
                        }}
                    >
                        {items.map((item, index) => (
                            <div
                                key={`${setIndex}-${index}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: `${padding}px ${padding * 1.5}px`,
                                    backgroundColor,
                                    borderRadius,
                                    whiteSpace: "nowrap",
                                    fontFamily: "Pretendard, sans-serif",
                                    fontSize,
                                    fontWeight,
                                    color,
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <style>
                {`
                    @keyframes marquee-left {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    @keyframes marquee-right {
                        0% { transform: translateX(-50%); }
                        100% { transform: translateX(0); }
                    }
                `}
            </style>
        </div>
    )
}

addPropertyControls(Marquee, {
    items: {
        type: ControlType.Array,
        title: "Items",
        control: {
            type: ControlType.String,
        },
        defaultValue: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
    },
    speed: {
        type: ControlType.Number,
        title: "Speed (px/s)",
        defaultValue: 30,
        min: 10,
        max: 100,
    },
    direction: {
        type: ControlType.Enum,
        title: "Direction",
        options: ["left", "right"],
        optionTitles: ["Left", "Right"],
        defaultValue: "left",
    },
    gap: {
        type: ControlType.Number,
        title: "Gap",
        defaultValue: 16,
        min: 4,
        max: 48,
    },
    fontSize: {
        type: ControlType.Number,
        title: "Font Size",
        defaultValue: 14,
        min: 10,
        max: 24,
    },
    fontWeight: {
        type: ControlType.Number,
        title: "Font Weight",
        defaultValue: 500,
        min: 100,
        max: 900,
        step: 100,
    },
    color: {
        type: ControlType.Color,
        title: "Text Color",
        defaultValue: "#001530",
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Item Background",
        defaultValue: "#ffffff",
    },
    padding: {
        type: ControlType.Number,
        title: "Padding",
        defaultValue: 12,
        min: 4,
        max: 32,
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Border Radius",
        defaultValue: 8,
        min: 0,
        max: 24,
    },
})
