import { addPropertyControls, ControlType } from "framer"

/**
 * 업종별 산업 클러스터
 */

interface Props {
    primaryColor: string
}

const clusterData = [
    { label: "금속", color: "#0071ff", size: 80, height: 70, top: "10%", left: "5%" },
    { label: "화학", color: "#3b82f6", size: 70, height: 60, top: "40%", left: "45%" },
    { label: "기계", color: "#2563eb", size: 60, height: 50, top: "15%", left: "55%" },
]

export default function ClusterVisual({ primaryColor = "#3b82f6" }: Props) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                background: `${primaryColor}08`,
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: 160,
                    height: 120,
                }}
            >
                {clusterData.map((cluster, i) => (
                    <div
                        key={i}
                        className={`cluster-area cluster-area-${i}`}
                        style={{
                            position: "absolute",
                            background: cluster.color,
                            opacity: 0.3,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: cluster.size,
                            height: cluster.height,
                            top: cluster.top,
                            left: cluster.left,
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 11,
                                fontWeight: 700,
                                color: cluster.color,
                                opacity: 1,
                            }}
                        >
                            {cluster.label}
                        </span>
                    </div>
                ))}
            </div>

            <style>
                {`
                    @keyframes clusterPulse {
                        0%, 100% { transform: scale(1); opacity: 0.3; }
                        50% { transform: scale(1.1); opacity: 0.5; }
                    }
                    .cluster-area {
                        animation: clusterPulse 3s ease-in-out infinite;
                    }
                    .cluster-area-1 {
                        animation-delay: 0.5s;
                    }
                    .cluster-area-2 {
                        animation-delay: 1s;
                    }
                `}
            </style>
        </div>
    )
}

addPropertyControls(ClusterVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#3b82f6",
    },
})
