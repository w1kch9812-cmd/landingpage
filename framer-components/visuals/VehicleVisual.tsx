import { addPropertyControls, ControlType } from "framer"

/**
 * 차량 통행 시각화 (11톤 윙바디, 25톤 카고, 40ft 트레일러)
 */

interface Props {
    primaryColor: string
}

// Phosphor Icons - Truck duotone
const TruckIcon = ({ color }: { color: string }) => (
    <svg width="18" height="18" viewBox="0 0 256 256" fill={color}>
        <path d="M248,120v64a8,8,0,0,1-8,8H224a24,24,0,0,1-48,0H80a24,24,0,0,1-48,0H16a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H168a8,8,0,0,1,8,8v48Z" opacity="0.2"/>
        <path d="M255.43,117.12l-14-35A15.93,15.93,0,0,0,226.58,72H192V64a8,8,0,0,0-8-8H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H49a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,255.43,117.12ZM192,88h34.58l9.6,24H192ZM32,72H176v64H32ZM80,208a16,16,0,1,1,16-16A16,16,0,0,1,80,208Zm81-24H111a32,32,0,0,0-62,0H32V152H176v12.31A32.11,32.11,0,0,0,161,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,192,208Zm48-24H209a32.06,32.06,0,0,0-17-20.4V128h48Z"/>
    </svg>
)

// Check icon
const CheckIcon = () => (
    <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor">
        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/>
    </svg>
)

// Warning icon
const WarningIcon = () => (
    <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor">
        <path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"/>
    </svg>
)

const vehiclesData = [
    { name: "11톤 윙바디", status: "ok" },
    { name: "25톤 카고", status: "ok" },
    { name: "40ft 트레일러", status: "warning" },
]

export default function VehicleVisual({ primaryColor = "#0071ff" }: Props) {
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
                    flexDirection: "column",
                    gap: 8,
                }}
            >
                {vehiclesData.map((vehicle) => (
                    <div
                        key={vehicle.name}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 14px",
                            background: "#ffffff",
                            borderRadius: 10,
                            boxShadow: `0 2px 8px rgba(0, 113, 255, 0.06)`,
                            minWidth: 160,
                        }}
                    >
                        <TruckIcon color={primaryColor} />
                        <span
                            style={{
                                flex: 1,
                                fontFamily: "Pretendard, sans-serif",
                                fontSize: 12,
                                fontWeight: 500,
                                color: "#001530",
                            }}
                        >
                            {vehicle.name}
                        </span>
                        <span
                            style={{
                                width: 22,
                                height: 22,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: vehicle.status === "ok" ? primaryColor : "#93c5fd",
                                color: vehicle.status === "ok" ? "#ffffff" : "#1e40af",
                            }}
                        >
                            {vehicle.status === "ok" ? <CheckIcon /> : <WarningIcon />}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

addPropertyControls(VehicleVisual, {
    primaryColor: {
        type: ControlType.Color,
        title: "Primary Color",
        defaultValue: "#0071ff",
    },
})
