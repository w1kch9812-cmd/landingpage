import { useState, useEffect, useRef } from "react"
import { addPropertyControls, ControlType } from "framer"

interface Props {
    words: string[]
    interval: number
    fontSize: number
    fontWeight: number
    color: string
    prefix: string
    suffix: string
}

export default function RotatingText({
    words = ["식료품제조업", "음료제조업", "의약품제조업", "금속제조업", "전기장비제조업"],
    interval = 3000,
    fontSize = 48,
    fontWeight = 700,
    color = "#001530",
    prefix = '"',
    suffix = '"',
}: Props) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [displayChars, setDisplayChars] = useState<string[]>([])
    const containerRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        setDisplayChars(words[0].split(""))
    }, [words])

    useEffect(() => {
        const timer = setInterval(() => {
            setIsAnimating(true)

            setTimeout(() => {
                const nextIndex = (currentIndex + 1) % words.length
                setCurrentIndex(nextIndex)
                setDisplayChars(words[nextIndex].split(""))
                setIsAnimating(false)
            }, 300)
        }, interval)

        return () => clearInterval(timer)
    }, [currentIndex, words, interval])

    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "baseline",
                fontFamily: "Pretendard, sans-serif",
                fontSize,
                fontWeight,
                color,
            }}
        >
            <span style={{ color }}>{prefix}</span>
            <span
                ref={containerRef}
                style={{
                    display: "inline-flex",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                {displayChars.map((char, index) => (
                    <span
                        key={`${currentIndex}-${index}`}
                        style={{
                            display: "inline-block",
                            transform: isAnimating ? "translateY(100%)" : "translateY(0)",
                            opacity: isAnimating ? 0 : 1,
                            transition: `transform 0.3s ease ${index * 0.03}s, opacity 0.3s ease ${index * 0.03}s`,
                        }}
                    >
                        {char}
                    </span>
                ))}
            </span>
            <span style={{ color }}>{suffix}</span>
        </span>
    )
}

addPropertyControls(RotatingText, {
    words: {
        type: ControlType.Array,
        title: "Words",
        control: {
            type: ControlType.String,
        },
        defaultValue: ["식료품제조업", "음료제조업", "의약품제조업", "금속제조업"],
    },
    interval: {
        type: ControlType.Number,
        title: "Interval (ms)",
        defaultValue: 3000,
        min: 1000,
        max: 10000,
        step: 500,
    },
    fontSize: {
        type: ControlType.Number,
        title: "Font Size",
        defaultValue: 48,
        min: 16,
        max: 120,
    },
    fontWeight: {
        type: ControlType.Number,
        title: "Font Weight",
        defaultValue: 700,
        min: 100,
        max: 900,
        step: 100,
    },
    color: {
        type: ControlType.Color,
        title: "Color",
        defaultValue: "#001530",
    },
    prefix: {
        type: ControlType.String,
        title: "Prefix",
        defaultValue: '"',
    },
    suffix: {
        type: ControlType.String,
        title: "Suffix",
        defaultValue: '"',
    },
})
