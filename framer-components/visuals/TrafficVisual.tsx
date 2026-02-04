import { addPropertyControls, ControlType } from "framer"

/**
 * 교통/인프라 시각화 (IC 접근, 배후 주거, 인력 수급)
 */

interface Props {
    primaryColor: string
}

// Phosphor Icons - duotone style
const icons = {
    // Path (IC 접근)
    path: (color: string) => (
        <svg width="20" height="20" viewBox="0 0 256 256" fill={color}>
            <path d="M200,168a32,32,0,1,1-32-32A32,32,0,0,1,200,168ZM88,120a32,32,0,1,0-32,32A32,32,0,0,0,88,120Z" opacity="0.2"/>
            <path d="M200,168a40,40,0,1,0-40,40A40,40,0,0,0,200,168Zm-64,0a24,24,0,1,1,24,24A24,24,0,0,1,136,168ZM56,72a40,40,0,1,0,40,40A40,40,0,0,0,56,72Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,56,136Zm144-8h-6.32l18.21-29.66a8,8,0,0,0-2.54-11.08l-46.88-30A8,8,0,0,0,152,64.62l18.67,56H128.54L102.41,57.38a8,8,0,0,0-10.82-3.52l-48,24a8,8,0,0,0-2.35,12.94L67.76,120H56a8,8,0,0,0,0,16H86.18L60.39,179.64a8,8,0,0,0,3.52,10.82l48,24a8,8,0,0,0,10.7-3.38l19.43-38.85,13.79,41.38a8,8,0,0,0,7.17,5.31,7.5,7.5,0,0,0,1.69-.18,8,8,0,0,0,5.78-4.81l24-56a8,8,0,0,0-.9-7.58Z"/>
        </svg>
    ),
    // HouseLine (배후 주거)
    houseLine: (color: string) => (
        <svg width="20" height="20" viewBox="0 0 256 256" fill={color}>
            <path d="M216,115.54V208a8,8,0,0,1-8,8H160V152H96v64H48a8,8,0,0,1-8-8V115.54a8,8,0,0,1,2.62-5.92l80-75.54a8,8,0,0,1,10.77,0l80,75.54A8,8,0,0,1,216,115.54Z" opacity="0.2"/>
            <path d="M240,208H224V115.54a16,16,0,0,0-5.23-11.84l-80-75.54a16.14,16.14,0,0,0-21.54,0l-80,75.54A16,16,0,0,0,32,115.54V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM48,115.54l80-75.54,80,75.54V208H168V152a8,8,0,0,0-8-8H96a8,8,0,0,0-8,8v56H48Zm104,92.46H104V160h48Z"/>
        </svg>
    ),
    // UsersThree (인력 수급)
    usersThree: (color: string) => (
        <svg width="20" height="20" viewBox="0 0 256 256" fill={color}>
            <path d="M168,100a36,36,0,1,1-36-36A36,36,0,0,1,168,100Z" opacity="0.2"/>
            <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1,0-16,24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219.83,124a67.94,67.94,0,0,1,26.57,15.2A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,36.17,124a67.94,67.94,0,0,0-26.57,15.2,8,8,0,1,0,10.4,12.2A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"/>
        </svg>
    ),
}

const trafficData = [
    { iconKey: "path", label: "IC 접근", value: "3.2km" },
    { iconKey: "houseLine", label: "배후 주거", value: "양호" },
    { iconKey: "usersThree", label: "인력 수급", value: "우수" },
]

export default function TrafficVisual({ primaryColor = "#0071ff" }: Props) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                background: `rgba(0, 113, 255, 0.02)`,
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: 12,
                }}
            >
                {trafficData.map((item, index) => (
                    <div
                        key={item.label}
                        className={`traffic-item traffic-item-${index}`}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 6,
                            padding: 12,
                            background: "#ffffff",
                            borderRadius: 12,
                            boxShadow: `0 2px 8px rgba(0, 113, 255, 0.06)`,
                            minWidth: 65,
                        }}
                    >
                        {icons[item.iconKey as keyof typeof icons](primaryColor)}
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 10,
                                color: "#5c6b7a",
                            }}
                        >
                            {item.label}
                        </span>
                        <span
                            style={{
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 12,
                                fontWeight: 700,
                                color: primaryColor,
                            }}
                        >
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>

            <style>
                {`
                    @keyframes trafficWave {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-6px); }
                    }
                    .traffic-item {
                        animation: trafficWave 2s ease-in-out infinite;
                    }
                    .traffic-item-0 { animation-delay: 0s; }
                    .traffic-item-1 { animation-delay: 0.2s; }
                    .traffic-item-2 { animation-delay: 0.4s; }
                `}
            </style>
        </div>
    )
}

addPropertyControls(TrafficVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})
