import { useState, useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"

interface Props {
    duration: number
    backgroundColor: string
    logoColor: string
    onComplete?: () => void
}

function Logo({ color }: { color: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 266.77 181.62"
            style={{ width: 120, height: "auto" }}
        >
            <g>
                <path fill={color} d="M103.82,65.57H84.15v-46H24.28V1.38h79.54Z" />
                <path fill={color} d="M103.82,102H0V83.81H41.73V64.13H62.1V83.81h41.72Z" />
                <path
                    fill={color}
                    d="M29.31,146.17a31.29,31.29,0,0,1,3-13.6A36.72,36.72,0,0,1,52.05,113.8,37,37,0,0,1,66.42,111a37.54,37.54,0,0,1,14.45,2.79,38.24,38.24,0,0,1,11.79,7.53,39.39,39.39,0,0,1,8.09,11.24,30.79,30.79,0,0,1,3.07,13.6A31.58,31.58,0,0,1,100.75,160a37.72,37.72,0,0,1-34.33,21.63,37.12,37.12,0,0,1-26.09-10.47,36.14,36.14,0,0,1-8-11.16A32.1,32.1,0,0,1,29.31,146.17Zm54.14,0a15.61,15.61,0,0,0-1.33-6.28,17,17,0,0,0-3.55-5.3A16.36,16.36,0,0,0,73.05,131a18.18,18.18,0,0,0-13.25,0,14.89,14.89,0,0,0-5.38,3.63,15.81,15.81,0,0,0-3.69,5.3,15.61,15.61,0,0,0-1.33,6.28,16.23,16.23,0,0,0,1.33,6.56,15.61,15.61,0,0,0,3.69,5.3,14.76,14.76,0,0,0,5.38,3.63,17.6,17.6,0,0,0,6.62,1.26A16.5,16.5,0,0,0,78.57,158,16.16,16.16,0,0,0,83.45,146.17Z"
                />
                <path
                    fill={color}
                    d="M186.59,146.17a31.44,31.44,0,0,1,3-13.6,36.72,36.72,0,0,1,19.74-18.77A37,37,0,0,1,223.71,111a37.52,37.52,0,0,1,14.44,2.79,38.24,38.24,0,0,1,11.79,7.53,39.62,39.62,0,0,1,8.1,11.24,30.93,30.93,0,0,1,3.07,13.6A31.73,31.73,0,0,1,258,160a37.39,37.39,0,0,1-8.1,11.16,36.87,36.87,0,0,1-11.79,7.68,37.52,37.52,0,0,1-14.44,2.79,37.12,37.12,0,0,1-26.1-10.47,36.3,36.3,0,0,1-8-11.16A32.25,32.25,0,0,1,186.59,146.17Zm54.14,0a15.77,15.77,0,0,0-1.32-6.28,17,17,0,0,0-3.56-5.3,16.32,16.32,0,0,0-5.51-3.63,18.21,18.21,0,0,0-13.26,0,14.85,14.85,0,0,0-5.37,3.63,16.18,16.18,0,0,0-5,11.58,16.23,16.23,0,0,0,1.33,6.56,15.5,15.5,0,0,0,3.7,5.3,14.72,14.72,0,0,0,5.37,3.63,17.61,17.61,0,0,0,6.63,1.26A16.49,16.49,0,0,0,235.85,158,16.16,16.16,0,0,0,240.73,146.17Z"
                />
                <path
                    fill={color}
                    d="M247.54,40.74V0H227.91V76.17l-20.45-19.1,20.45-26.82L213.2,12.09H123.46V30.25H158L123.19,74.82v26.82l23-28.45,28.32,27.1,22.21-29.13,31.16,30.48h19.63v-43h19.23V40.74Zm-73,32.59-16.26-14.9L181,30.25h25.33Z"
                />
            </g>
        </svg>
    )
}

export default function Preloader({
    duration = 2000,
    backgroundColor = "#ffffff",
    logoColor = "#0071ff",
    onComplete,
}: Props) {
    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        const startTime = performance.now()

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const newProgress = Math.min(elapsed / duration, 1)
            setProgress(newProgress)

            if (newProgress < 1) {
                requestAnimationFrame(animate)
            } else {
                setTimeout(() => {
                    setIsComplete(true)
                    onComplete?.()
                }, 300)
            }
        }

        requestAnimationFrame(animate)
    }, [duration, onComplete])

    if (isComplete) return null

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 10000,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor,
                opacity: progress >= 1 ? 0 : 1,
                transition: "opacity 0.3s ease",
            }}
        >
            <Logo color={logoColor} />

            <div
                style={{
                    marginTop: 40,
                    width: 200,
                    height: 4,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        width: `${progress * 100}%`,
                        height: "100%",
                        backgroundColor: logoColor,
                        borderRadius: 2,
                        transition: "width 0.1s ease",
                    }}
                />
            </div>

            <span
                style={{
                    marginTop: 16,
                    fontFamily: "Pretendard, sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "rgba(0, 0, 0, 0.5)",
                }}
            >
                {Math.round(progress * 100)}%
            </span>
        </div>
    )
}

addPropertyControls(Preloader, {
    duration: {
        type: ControlType.Number,
        title: "Duration (ms)",
        defaultValue: 2000,
        min: 1000,
        max: 5000,
        step: 100,
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#ffffff",
    },
    logoColor: {
        type: ControlType.Color,
        title: "Logo Color",
        defaultValue: "#0071ff",
    },
})
