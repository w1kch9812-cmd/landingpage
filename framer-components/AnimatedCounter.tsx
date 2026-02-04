import { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType } from "framer"

interface Props {
    value: string
    suffix: string
    duration: number
    fontSize: number
    fontWeight: number
    color: string
}

function parseFormattedNumber(str: string): number {
    return parseInt(str.replace(/,/g, ""), 10) || 0
}

function formatNumber(num: number): string {
    return num.toLocaleString("ko-KR")
}

export default function AnimatedCounter({
    value = "1,000",
    suffix = "+",
    duration = 2000,
    fontSize = 28,
    fontWeight = 700,
    color = "#001530",
}: Props) {
    const ref = useRef<HTMLSpanElement>(null)
    const [displayValue, setDisplayValue] = useState("0")
    const hasAnimated = useRef(false)

    useEffect(() => {
        if (!ref.current || hasAnimated.current) return

        const targetNumber = parseFormattedNumber(value)

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true

                        const startTime = performance.now()
                        let currentValue = 0

                        const animate = (currentTime: number) => {
                            const elapsed = currentTime - startTime
                            const progress = Math.min(elapsed / duration, 1)
                            const eased = 1 - Math.pow(1 - progress, 3)
                            currentValue = Math.floor(eased * targetNumber)
                            setDisplayValue(formatNumber(currentValue))

                            if (progress < 1) {
                                requestAnimationFrame(animate)
                            }
                        }

                        requestAnimationFrame(animate)
                        observer.disconnect()
                    }
                })
            },
            { threshold: 0.1, rootMargin: "0px 0px -15% 0px" }
        )

        observer.observe(ref.current)

        return () => observer.disconnect()
    }, [value, duration])

    return (
        <span
            ref={ref}
            style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: 2,
            }}
        >
            <span
                style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontSize,
                    fontWeight,
                    color,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.02em",
                }}
            >
                {displayValue}
            </span>
            {suffix && (
                <span
                    style={{
                        fontFamily: "Pretendard, sans-serif",
                        fontSize: fontSize * 0.6,
                        fontWeight: 600,
                        color,
                    }}
                >
                    {suffix}
                </span>
            )}
        </span>
    )
}

addPropertyControls(AnimatedCounter, {
    value: {
        type: ControlType.String,
        title: "Value",
        defaultValue: "1,000",
    },
    suffix: {
        type: ControlType.String,
        title: "Suffix",
        defaultValue: "+",
    },
    duration: {
        type: ControlType.Number,
        title: "Duration (ms)",
        defaultValue: 2000,
        min: 500,
        max: 5000,
        step: 100,
    },
    fontSize: {
        type: ControlType.Number,
        title: "Font Size",
        defaultValue: 28,
        min: 12,
        max: 100,
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
})
