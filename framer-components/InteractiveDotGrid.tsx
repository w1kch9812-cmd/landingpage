import { useEffect, useRef, useCallback } from "react"
import { addPropertyControls, ControlType } from "framer"

interface Props {
    dotSpacing: number
    dotRadius: number
    influenceRadius: number
    maxDisplacement: number
    dotColor: string
    width: number
    height: number
}

export default function InteractiveDotGrid({
    dotSpacing = 12,
    dotRadius = 1,
    influenceRadius = 150,
    maxDisplacement = 12,
    dotColor = "0, 113, 255",
    width = 400,
    height = 300,
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number | null>(null)
    const mousePos = useRef({ x: -1000, y: -1000 })
    const dotsRef = useRef<
        { x: number; y: number; baseY: number; scale: number; targetScale: number }[]
    >([])

    const initDots = useCallback(
        (w: number, h: number) => {
            const dots: {
                x: number
                y: number
                baseY: number
                scale: number
                targetScale: number
            }[] = []
            const cols = Math.ceil(w / dotSpacing) + 1
            const rows = Math.ceil(h / dotSpacing) + 1

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    dots.push({
                        x: col * dotSpacing,
                        y: row * dotSpacing,
                        baseY: row * dotSpacing,
                        scale: 1,
                        targetScale: 1,
                    })
                }
            }
            dotsRef.current = dots
        },
        [dotSpacing]
    )

    const animate = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const mx = mousePos.current.x
        const my = mousePos.current.y

        dotsRef.current.forEach((dot) => {
            const dx = mx - dot.x
            const dy = my - dot.baseY
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < influenceRadius) {
                const factor = 1 - distance / influenceRadius
                const eased = factor * factor * factor
                dot.targetScale = 1 + eased * 2
                dot.y = dot.baseY - eased * maxDisplacement
            } else {
                dot.targetScale = 1
                dot.y = dot.baseY
            }

            dot.scale += (dot.targetScale - dot.scale) * 0.15

            const radius = dotRadius * dot.scale
            const alpha = (dot.scale - 1) * 0.5

            ctx.beginPath()
            ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${dotColor}, ${alpha})`
            ctx.fill()
        })

        animationRef.current = requestAnimationFrame(animate)
    }, [influenceRadius, maxDisplacement, dotRadius, dotColor])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const parent = canvas.parentElement
        if (!parent) return

        const resizeCanvas = () => {
            const rect = parent.getBoundingClientRect()
            canvas.width = rect.width
            canvas.height = rect.height
            initDots(rect.width, rect.height)
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mousePos.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            }
        }

        const handleMouseLeave = () => {
            mousePos.current = { x: -1000, y: -1000 }
        }

        parent.addEventListener("mousemove", handleMouseMove)
        parent.addEventListener("mouseleave", handleMouseLeave)

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            parent.removeEventListener("mousemove", handleMouseMove)
            parent.removeEventListener("mouseleave", handleMouseLeave)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [animate, initDots])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
            }}
        />
    )
}

addPropertyControls(InteractiveDotGrid, {
    dotSpacing: {
        type: ControlType.Number,
        title: "Dot Spacing",
        defaultValue: 12,
        min: 5,
        max: 30,
    },
    dotRadius: {
        type: ControlType.Number,
        title: "Dot Radius",
        defaultValue: 1,
        min: 0.5,
        max: 5,
        step: 0.5,
    },
    influenceRadius: {
        type: ControlType.Number,
        title: "Influence Radius",
        defaultValue: 150,
        min: 50,
        max: 300,
    },
    maxDisplacement: {
        type: ControlType.Number,
        title: "Max Displacement",
        defaultValue: 12,
        min: 5,
        max: 30,
    },
    dotColor: {
        type: ControlType.String,
        title: "Dot Color (RGB)",
        defaultValue: "0, 113, 255",
    },
})
