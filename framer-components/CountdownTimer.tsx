import { useState, useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"

interface Props {
    targetDate: string
    label: string
    backgroundColor: string
    textColor: string
    numberColor: string
}

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export default function CountdownTimer({
    targetDate = "2026-03-01T00:00:00",
    label = "출시까지",
    backgroundColor = "rgba(255, 255, 255, 0.75)",
    textColor = "#5c6b7a",
    numberColor = "#001530",
}: Props) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 500)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate).getTime() - new Date().getTime()

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                })
            }
        }

        calculateTimeLeft()
        const timer = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    const formatNumber = (num: number) => String(num).padStart(2, "0")

    return (
        <div
            style={{
                position: "fixed",
                bottom: 32,
                left: "50%",
                transform: `translateX(-50%) translateY(${isVisible ? 0 : 20}px)`,
                zIndex: 9999,
                background: backgroundColor,
                backdropFilter: "blur(5px) saturate(180%)",
                WebkitBackdropFilter: "blur(5px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.6)",
                borderRadius: 9999,
                padding: "16px 32px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                boxShadow:
                    "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
        >
            <span
                style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    color: textColor,
                    letterSpacing: "-0.01em",
                    whiteSpace: "nowrap",
                }}
            >
                {label}
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {[
                    { value: timeLeft.days, unit: "일" },
                    { value: timeLeft.hours, unit: "시" },
                    { value: timeLeft.minutes, unit: "분" },
                    { value: timeLeft.seconds, unit: "초" },
                ].map((item, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                            <span
                                style={{
                                    fontFamily: "Pretendard, sans-serif",
                                    fontSize: 28,
                                    fontWeight: 700,
                                    color: numberColor,
                                    fontVariantNumeric: "tabular-nums",
                                    minWidth: 36,
                                    textAlign: "center",
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                {formatNumber(item.value)}
                            </span>
                            <span
                                style={{
                                    fontFamily: "Pretendard, sans-serif",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: textColor,
                                }}
                            >
                                {item.unit}
                            </span>
                        </div>
                        {index < 3 && (
                            <span
                                style={{
                                    fontFamily: "Pretendard, sans-serif",
                                    fontSize: 24,
                                    fontWeight: 500,
                                    color: "rgba(0, 21, 48, 0.2)",
                                    margin: "0 2px",
                                }}
                            >
                                :
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

addPropertyControls(CountdownTimer, {
    targetDate: {
        type: ControlType.String,
        title: "Target Date",
        defaultValue: "2026-03-01T00:00:00",
    },
    label: {
        type: ControlType.String,
        title: "Label",
        defaultValue: "출시까지",
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "rgba(255, 255, 255, 0.75)",
    },
    textColor: {
        type: ControlType.Color,
        title: "Text Color",
        defaultValue: "#5c6b7a",
    },
    numberColor: {
        type: ControlType.Color,
        title: "Number Color",
        defaultValue: "#001530",
    },
})
