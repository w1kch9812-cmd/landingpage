import { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * 무지개빛 글래스 3D 오브젝트
 * - Three.js + Iridescence 효과
 * - 컬러 조명으로 무지개빛 구현
 * - 반응형 지원 (모바일 숨김)
 */

interface Props {
    shape: "torusKnot" | "torus" | "sphere" | "icosahedron"
    scale: number
    rotationSpeed: number
    iridescence: number
    metalness: number
    roughness: number
    clearcoat: number
    hideOnMobile: boolean
    mobileBreakpoint: number
}

export default function GlassObject3D({
    shape = "torus",
    scale = 2,
    rotationSpeed = 0.5,
    iridescence = 1,
    metalness = 1,
    roughness = 0,
    clearcoat = 1,
    hideOnMobile = true,
    mobileBreakpoint = 810,
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [shouldRender, setShouldRender] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    // 반응형 처리
    useEffect(() => {
        if (!hideOnMobile) {
            setShouldRender(true)
            return
        }

        const mediaQuery = window.matchMedia(`(max-width: ${mobileBreakpoint - 0.02}px)`)
        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setShouldRender(!e.matches)
        }

        handleChange(mediaQuery)
        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [hideOnMobile, mobileBreakpoint])

    // Three.js 초기화
    useEffect(() => {
        if (!shouldRender || !containerRef.current) return

        let isMounted = true
        let animationId: number
        let renderer: any
        let scene: any
        let camera: any
        let mesh: any

        const init = async () => {
            try {
                const THREE = await import("three")

                if (!isMounted || !containerRef.current) return

                const container = containerRef.current
                const width = container.clientWidth
                const height = container.clientHeight

                // Scene
                scene = new THREE.Scene()

                // Camera
                camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
                camera.position.z = 6

                // Renderer
                renderer = new THREE.WebGLRenderer({
                    antialias: true,
                    alpha: true,
                })
                renderer.setSize(width, height)
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
                renderer.toneMapping = THREE.ACESFilmicToneMapping
                renderer.toneMappingExposure = 1.5
                container.appendChild(renderer.domElement)

                // Geometry 선택
                let geometry: any
                switch (shape) {
                    case "torusKnot":
                        geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 32)
                        break
                    case "torus":
                        geometry = new THREE.TorusGeometry(1, 0.4, 64, 128)
                        break
                    case "sphere":
                        geometry = new THREE.SphereGeometry(1.2, 64, 64)
                        break
                    case "icosahedron":
                        geometry = new THREE.IcosahedronGeometry(1.2, 1)
                        break
                    default:
                        geometry = new THREE.TorusGeometry(1, 0.4, 64, 128)
                }

                // Material - Iridescent Glass
                const material = new THREE.MeshPhysicalMaterial({
                    color: new THREE.Color("#111111"),
                    metalness: metalness,
                    roughness: roughness,
                    clearcoat: clearcoat,
                    clearcoatRoughness: 0,
                    reflectivity: 1,
                    iridescence: iridescence,
                    iridescenceIOR: 1.3,
                    iridescenceThicknessRange: [100, 800],
                    side: THREE.DoubleSide,
                })

                // Mesh
                mesh = new THREE.Mesh(geometry, material)
                mesh.scale.setScalar(scale)
                scene.add(mesh)

                // 컬러 조명들 (무지개빛 효과)
                const lights = [
                    { color: "#ff0040", position: [5, 5, 5], intensity: 3 },
                    { color: "#00ff80", position: [-5, 5, -5], intensity: 3 },
                    { color: "#0080ff", position: [0, -5, 5], intensity: 3 },
                    { color: "#ff8000", position: [5, -5, -5], intensity: 2 },
                    { color: "#8000ff", position: [-5, -5, 5], intensity: 2 },
                    { color: "#ffffff", position: [0, 10, 0], intensity: 2 },
                ]

                lights.forEach(({ color, position, intensity }) => {
                    const light = new THREE.PointLight(color, intensity, 50)
                    light.position.set(position[0], position[1], position[2])
                    scene.add(light)
                })

                // Ambient Light
                const ambientLight = new THREE.AmbientLight("#ffffff", 0.3)
                scene.add(ambientLight)

                // Animation
                const speed = rotationSpeed * 0.01
                const animate = () => {
                    if (!isMounted) return
                    animationId = requestAnimationFrame(animate)

                    if (mesh) {
                        mesh.rotation.x += speed * 0.5
                        mesh.rotation.y += speed
                        mesh.rotation.z += speed * 0.3
                    }

                    renderer.render(scene, camera)
                }

                animate()
                setIsLoading(false)

                // Resize handler
                const handleResize = () => {
                    if (!container || !camera || !renderer) return
                    const w = container.clientWidth
                    const h = container.clientHeight
                    camera.aspect = w / h
                    camera.updateProjectionMatrix()
                    renderer.setSize(w, h)
                }

                window.addEventListener("resize", handleResize)

                return () => {
                    window.removeEventListener("resize", handleResize)
                }
            } catch (error) {
                console.error("Three.js error:", error)
                if (isMounted) {
                    setHasError(true)
                    setIsLoading(false)
                }
            }
        }

        init()

        return () => {
            isMounted = false
            if (animationId) cancelAnimationFrame(animationId)
            if (renderer && containerRef.current) {
                containerRef.current.removeChild(renderer.domElement)
                renderer.dispose()
            }
        }
    }, [shouldRender, shape, scale, rotationSpeed, iridescence, metalness, roughness, clearcoat])

    if (!shouldRender) return null

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 로딩 */}
            {isLoading && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            border: "3px solid rgba(255, 255, 255, 0.1)",
                            borderTopColor: "#0071ff",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                        }}
                    />
                </div>
            )}

            {/* 에러 */}
            {hasError && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        color: "#5c6b7a",
                        fontFamily: "Pretendard, sans-serif",
                        fontSize: 14,
                    }}
                >
                    <span>3D 로딩 실패</span>
                </div>
            )}

            <style>
                {`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    )
}

addPropertyControls(GlassObject3D, {
    shape: {
        type: ControlType.Enum,
        title: "Shape",
        options: ["torus", "torusKnot", "sphere", "icosahedron"],
        optionTitles: ["Torus (도넛)", "Torus Knot (매듭)", "Sphere (구)", "Icosahedron (20면체)"],
        defaultValue: "torus",
    },
    scale: {
        type: ControlType.Number,
        title: "Scale",
        defaultValue: 2,
        min: 0.5,
        max: 5,
        step: 0.1,
    },
    rotationSpeed: {
        type: ControlType.Number,
        title: "Rotation Speed",
        defaultValue: 0.5,
        min: 0,
        max: 2,
        step: 0.1,
    },
    iridescence: {
        type: ControlType.Number,
        title: "Iridescence",
        defaultValue: 1,
        min: 0,
        max: 1,
        step: 0.1,
        description: "무지개빛 강도",
    },
    metalness: {
        type: ControlType.Number,
        title: "Metalness",
        defaultValue: 1,
        min: 0,
        max: 1,
        step: 0.1,
    },
    roughness: {
        type: ControlType.Number,
        title: "Roughness",
        defaultValue: 0,
        min: 0,
        max: 1,
        step: 0.1,
    },
    clearcoat: {
        type: ControlType.Number,
        title: "Clearcoat",
        defaultValue: 1,
        min: 0,
        max: 1,
        step: 0.1,
    },
    hideOnMobile: {
        type: ControlType.Boolean,
        title: "Hide on Mobile",
        defaultValue: true,
    },
    mobileBreakpoint: {
        type: ControlType.Number,
        title: "Mobile Breakpoint",
        defaultValue: 810,
        min: 320,
        max: 1200,
        step: 10,
        hidden: (props) => !props.hideOnMobile,
    },
})
