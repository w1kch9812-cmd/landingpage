import { useEffect, useState } from "react"
import { addPropertyControls, ControlType } from "framer"

interface Props {
    size: number
    color: string
    strokeWidth: number
    delay: number
}

export default function CheckAnimation({
    size = 80,
    color = "#0071ff",
    strokeWidth = 3,
    delay = 0,
}: Props) {
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimating(true), delay)
        return () => clearTimeout(timer)
    }, [delay])

    const circleRadius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * circleRadius

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={{ overflow: "visible" }}
        >
            {/* Circle */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={circleRadius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: isAnimating ? 0 : circumference,
                    transition: "stroke-dashoffset 0.6s ease-out",
                    transformOrigin: "center",
                    transform: "rotate(-90deg)",
                }}
            />

            {/* Checkmark */}
            <path
                d={`M${size * 0.28} ${size * 0.5} L${size * 0.42} ${size * 0.65} L${size * 0.72} ${size * 0.35}`}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    strokeDasharray: size,
                    strokeDashoffset: isAnimating ? 0 : size,
                    transition: "stroke-dashoffset 0.4s ease-out 0.4s",
                }}
            />
        </svg>
    )
}

addPropertyControls(CheckAnimation, {
    size: {
        type: ControlType.Number,
        title: "Size",
        defaultValue: 80,
        min: 20,
        max: 200,
    },
    color: {
        type: ControlType.Color,
        title: "Color",
        defaultValue: "#0071ff",
    },
    strokeWidth: {
        type: ControlType.Number,
        title: "Stroke Width",
        defaultValue: 3,
        min: 1,
        max: 10,
    },
    delay: {
        type: ControlType.Number,
        title: "Delay (ms)",
        defaultValue: 0,
        min: 0,
        max: 2000,
        step: 100,
    },
})
