'use client';

import React, { useEffect, useState } from 'react';

// 전역 설정 (다른 컴포넌트에서 import 가능)
export interface CityModelSettings {
  rotationX: number;  // X축 회전 (도)
  rotationY: number;  // Y축 회전 (도)
  rotationZ: number;  // Z축 회전 (도)
  offsetY: number;    // Y축 오프셋
  scale: number;      // 스케일
}

export interface PostProcessingSettings {
  bloomEnabled: boolean;
  bloomIntensity: number;
  bloomThreshold: number;
  bloomSmoothing: number;
  bloomLevels: number;
}

export interface MouseInteractionSettings {
  enabled: boolean;
  radius: number;
  pushForce: number;
  springStiffness: number;
  damping: number;
  maxVelocity: number;
  velocityBoostMultiplier: number;
}

// 🌊 물결 애니메이션 설정
export interface WaveSettings {
  // 카메라 위치 설정
  cameraX: number;           // 카메라 X 위치
  cameraY: number;           // 카메라 Y 위치
  cameraZ: number;           // 카메라 거리 (Z 위치)
  cameraFov: number;         // 시야각 (Field of View)

  // 카메라 회전 설정 (구도)
  cameraRotX: number;        // 카메라 X축 회전 (틸트 - 위/아래)
  cameraRotY: number;        // 카메라 Y축 회전 (팬 - 좌/우)
  cameraRotZ: number;        // 카메라 Z축 회전 (롤 - 기울기)

  // 카메라 시점 설정
  lookAtX: number;           // 바라보는 지점 X
  lookAtY: number;           // 바라보는 지점 Y
  lookAtZ: number;           // 바라보는 지점 Z

  // 메인 파도 설정
  mainWaveSpeed: number;     // 메인 파도 속도
  mainWaveScale: number;     // 메인 파도 X축 스케일
  mainWaveHeight: number;    // 메인 파도 높이

  // 크로스 파도 설정
  crossWaveSpeed: number;    // 교차 파도 속도
  crossWaveScale: number;    // 교차 파도 Z축 스케일
  crossWaveHeight: number;   // 교차 파도 높이

  // 대각선 파도 설정
  diagWaveSpeed: number;     // 대각선 파도 속도
  diagWaveScale: number;     // 대각선 파도 스케일
  diagWaveHeight: number;    // 대각선 파도 높이

  // 잔물결 설정
  ripple1Speed: number;      // 잔물결1 속도
  ripple1Scale: number;      // 잔물결1 스케일
  ripple1Height: number;     // 잔물결1 높이
  ripple2Speed: number;      // 잔물결2 속도
  ripple2Scale: number;      // 잔물결2 스케일
  ripple2Height: number;     // 잔물결2 높이

  // 원형 파동 설정
  radialWaveSpeed: number;   // 원형 파동 속도
  radialWaveScale: number;   // 원형 파동 스케일
  radialWaveHeight: number;  // 원형 파동 높이
  radialWaveFalloff: number; // 원형 파동 감쇠

  // X/Z 흔들림 설정
  swayXSpeed: number;        // X축 흔들림 속도
  swayXScale: number;        // X축 흔들림 스케일
  swayXAmount: number;       // X축 흔들림 양
  swayZSpeed: number;        // Z축 흔들림 속도
  swayZScale: number;        // Z축 흔들림 스케일
  swayZAmount: number;       // Z축 흔들림 양

  // 부유 효과
  floatSpeed: number;        // 부유 속도
  floatAmount: number;       // 부유 양

  // 🔄 오브젝트 회전 설정 (Wave 섹션 전용 그룹 변환)
  objectRotX: number;        // 오브젝트 X축 회전 (기울기)
  objectRotY: number;        // 오브젝트 Y축 회전
  objectRotZ: number;        // 오브젝트 Z축 회전
  objectOffsetY: number;     // 오브젝트 Y 오프셋

  // 전환 설정
  disableTransitionSpin: boolean;  // 형태 전환 시 회전 비활성화
}

// 기본값
const defaultCitySettings: CityModelSettings = {
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  offsetY: -2,
  scale: 5,
};

const defaultPostProcessingSettings: PostProcessingSettings = {
  bloomEnabled: true,
  bloomIntensity: 0.8,
  bloomThreshold: 0.3,
  bloomSmoothing: 0.9,
  bloomLevels: 3,
};

const defaultMouseSettings: MouseInteractionSettings = {
  enabled: true,
  radius: 1.2,
  pushForce: 0.012,
  springStiffness: 0.025,
  damping: 0.94,
  maxVelocity: 0.02,
  velocityBoostMultiplier: 0.4,
};

// 🌊 물결 기본값 (히어로 섹션 전용 카메라 설정 포함)
const defaultWaveSettings: WaveSettings = {
  // 카메라 위치
  cameraX: 0,
  cameraY: 1,
  cameraZ: 5.5,
  cameraFov: 55,

  // 카메라 회전 (구도)
  cameraRotX: -45,
  cameraRotY: 4.5,
  cameraRotZ: 0,

  // 카메라 시점
  lookAtX: 0,
  lookAtY: 1.8,
  lookAtZ: 0,

  // 메인 파도
  mainWaveSpeed: 1.4,
  mainWaveScale: 1.25,
  mainWaveHeight: 0.13,

  // 크로스 파도
  crossWaveSpeed: 0.9,
  crossWaveScale: 0.5,
  crossWaveHeight: 0.3,

  // 대각선 파도
  diagWaveSpeed: 2,
  diagWaveScale: 1.8,
  diagWaveHeight: 0.02,

  // 잔물결1
  ripple1Speed: 1.3,
  ripple1Scale: 1.2,
  ripple1Height: 0.1,

  // 잔물결2
  ripple2Speed: 0.85,
  ripple2Scale: 1.0,
  ripple2Height: 0.012,

  // 원형 파동
  radialWaveSpeed: 2,
  radialWaveScale: 0.5,
  radialWaveHeight: 0.2,
  radialWaveFalloff: 0.5,

  // X/Z 흔들림
  swayXSpeed: 0.35,
  swayXScale: 0.4,
  swayXAmount: 0.015,
  swayZSpeed: 0.3,
  swayZScale: 0.4,
  swayZAmount: 0.015,

  // 부유 효과
  floatSpeed: 1,
  floatAmount: 0.03,

  // 🔄 오브젝트 회전 (Wave 섹션 전용)
  objectRotX: 0,
  objectRotY: 0,
  objectRotZ: 0,
  objectOffsetY: 1.2,

  // 전환 설정
  disableTransitionSpin: true,  // 형태 전환 시 회전 비활성화
};

// 전역 상태 (리액트 외부에서도 접근 가능)
let globalCitySettings: CityModelSettings = { ...defaultCitySettings };
let globalPostProcessingSettings: PostProcessingSettings = { ...defaultPostProcessingSettings };
let globalMouseSettings: MouseInteractionSettings = { ...defaultMouseSettings };
let globalWaveSettings: WaveSettings = { ...defaultWaveSettings };

let cityListeners: Set<(settings: CityModelSettings) => void> = new Set();
let postProcessingListeners: Set<(settings: PostProcessingSettings) => void> = new Set();
let mouseListeners: Set<(settings: MouseInteractionSettings) => void> = new Set();
let waveListeners: Set<(settings: WaveSettings) => void> = new Set();

// City Model Settings
export function getCityModelSettings(): CityModelSettings {
  return globalCitySettings;
}

export function setCityModelSettings(settings: Partial<CityModelSettings>) {
  globalCitySettings = { ...globalCitySettings, ...settings };
  cityListeners.forEach(listener => listener(globalCitySettings));
}

export function subscribeToCityModelSettings(listener: (settings: CityModelSettings) => void) {
  cityListeners.add(listener);
  return () => { cityListeners.delete(listener); };
}

// Post Processing Settings
export function getPostProcessingSettings(): PostProcessingSettings {
  return globalPostProcessingSettings;
}

export function setPostProcessingSettings(settings: Partial<PostProcessingSettings>) {
  globalPostProcessingSettings = { ...globalPostProcessingSettings, ...settings };
  postProcessingListeners.forEach(listener => listener(globalPostProcessingSettings));
}

export function subscribeToPostProcessingSettings(listener: (settings: PostProcessingSettings) => void) {
  postProcessingListeners.add(listener);
  return () => { postProcessingListeners.delete(listener); };
}

// Mouse Interaction Settings
export function getMouseSettings(): MouseInteractionSettings {
  return globalMouseSettings;
}

export function setMouseSettings(settings: Partial<MouseInteractionSettings>) {
  globalMouseSettings = { ...globalMouseSettings, ...settings };
  mouseListeners.forEach(listener => listener(globalMouseSettings));
}

export function subscribeToMouseSettings(listener: (settings: MouseInteractionSettings) => void) {
  mouseListeners.add(listener);
  return () => { mouseListeners.delete(listener); };
}

// Wave Settings
export function getWaveSettings(): WaveSettings {
  return globalWaveSettings;
}

export function setWaveSettings(settings: Partial<WaveSettings>) {
  globalWaveSettings = { ...globalWaveSettings, ...settings };
  waveListeners.forEach(listener => listener(globalWaveSettings));
}

export function subscribeToWaveSettings(listener: (settings: WaveSettings) => void) {
  waveListeners.add(listener);
  return () => { waveListeners.delete(listener); };
}

type TabType = 'city' | 'postprocessing' | 'mouse' | 'wave';

// 디버그 UI 컴포넌트
export default function CityModelDebugUI() {
  const [citySettings, setCitySettings] = useState<CityModelSettings>(globalCitySettings);
  const [ppSettings, setPpSettings] = useState<PostProcessingSettings>(globalPostProcessingSettings);
  const [mouseSettings, setMouseSettingsState] = useState<MouseInteractionSettings>(globalMouseSettings);
  const [waveSettings, setWaveSettingsState] = useState<WaveSettings>(globalWaveSettings);
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('wave');

  useEffect(() => {
    const unsubCity = subscribeToCityModelSettings(setCitySettings);
    const unsubPp = subscribeToPostProcessingSettings(setPpSettings);
    const unsubMouse = subscribeToMouseSettings(setMouseSettingsState);
    const unsubWave = subscribeToWaveSettings(setWaveSettingsState);
    return () => {
      unsubCity();
      unsubPp();
      unsubMouse();
      unsubWave();
    };
  }, []);

  const handleCityChange = (key: keyof CityModelSettings, value: number) => {
    setCityModelSettings({ [key]: value });
  };

  const handlePpChange = (key: keyof PostProcessingSettings, value: number | boolean) => {
    setPostProcessingSettings({ [key]: value });
  };

  const handleMouseChange = (key: keyof MouseInteractionSettings, value: number | boolean) => {
    setMouseSettings({ [key]: value });
  };

  const handleWaveChange = (key: keyof WaveSettings, value: number) => {
    setWaveSettings({ [key]: value });
  };

  const handleReset = () => {
    if (activeTab === 'city') {
      setCityModelSettings(defaultCitySettings);
    } else if (activeTab === 'postprocessing') {
      setPostProcessingSettings(defaultPostProcessingSettings);
    } else if (activeTab === 'wave') {
      setWaveSettings(defaultWaveSettings);
    } else {
      setMouseSettings(defaultMouseSettings);
    }
  };

  const handleCopyToClipboard = () => {
    let code = '';
    if (activeTab === 'city') {
      code = `// City Model Settings
rotationX: ${citySettings.rotationX},
rotationY: ${citySettings.rotationY},
rotationZ: ${citySettings.rotationZ},
offsetY: ${citySettings.offsetY},
scale: ${citySettings.scale},`;
    } else if (activeTab === 'postprocessing') {
      code = `// Post Processing Settings
bloomEnabled: ${ppSettings.bloomEnabled},
bloomIntensity: ${ppSettings.bloomIntensity},
bloomThreshold: ${ppSettings.bloomThreshold},
bloomSmoothing: ${ppSettings.bloomSmoothing},
bloomLevels: ${ppSettings.bloomLevels},`;
    } else if (activeTab === 'wave') {
      code = `// Wave Animation Settings (물결 애니메이션)
// 카메라 위치
cameraX: ${waveSettings.cameraX},
cameraY: ${waveSettings.cameraY},
cameraZ: ${waveSettings.cameraZ},
cameraFov: ${waveSettings.cameraFov},

// 카메라 회전 (구도)
cameraRotX: ${waveSettings.cameraRotX},
cameraRotY: ${waveSettings.cameraRotY},
cameraRotZ: ${waveSettings.cameraRotZ},

// 카메라 시점 (LookAt)
lookAtX: ${waveSettings.lookAtX},
lookAtY: ${waveSettings.lookAtY},
lookAtZ: ${waveSettings.lookAtZ},

// 메인 파도
mainWaveSpeed: ${waveSettings.mainWaveSpeed},
mainWaveScale: ${waveSettings.mainWaveScale},
mainWaveHeight: ${waveSettings.mainWaveHeight},

// 크로스 파도
crossWaveSpeed: ${waveSettings.crossWaveSpeed},
crossWaveScale: ${waveSettings.crossWaveScale},
crossWaveHeight: ${waveSettings.crossWaveHeight},

// 대각선 파도
diagWaveSpeed: ${waveSettings.diagWaveSpeed},
diagWaveScale: ${waveSettings.diagWaveScale},
diagWaveHeight: ${waveSettings.diagWaveHeight},

// 잔물결
ripple1Speed: ${waveSettings.ripple1Speed},
ripple1Scale: ${waveSettings.ripple1Scale},
ripple1Height: ${waveSettings.ripple1Height},
ripple2Speed: ${waveSettings.ripple2Speed},
ripple2Scale: ${waveSettings.ripple2Scale},
ripple2Height: ${waveSettings.ripple2Height},

// 원형 파동
radialWaveSpeed: ${waveSettings.radialWaveSpeed},
radialWaveScale: ${waveSettings.radialWaveScale},
radialWaveHeight: ${waveSettings.radialWaveHeight},
radialWaveFalloff: ${waveSettings.radialWaveFalloff},

// 흔들림
swayXSpeed: ${waveSettings.swayXSpeed},
swayXScale: ${waveSettings.swayXScale},
swayXAmount: ${waveSettings.swayXAmount},
swayZSpeed: ${waveSettings.swayZSpeed},
swayZScale: ${waveSettings.swayZScale},
swayZAmount: ${waveSettings.swayZAmount},

// 부유
floatSpeed: ${waveSettings.floatSpeed},
floatAmount: ${waveSettings.floatAmount},

// 오브젝트 회전 (Wave 섹션)
objectRotX: ${waveSettings.objectRotX},
objectRotY: ${waveSettings.objectRotY},
objectRotZ: ${waveSettings.objectRotZ},
objectOffsetY: ${waveSettings.objectOffsetY},

// 전환 설정
disableTransitionSpin: ${waveSettings.disableTransitionSpin},`;
    } else {
      code = `// Mouse Interaction Settings
enabled: ${mouseSettings.enabled},
radius: ${mouseSettings.radius},
pushForce: ${mouseSettings.pushForce},
springStiffness: ${mouseSettings.springStiffness},
damping: ${mouseSettings.damping},
maxVelocity: ${mouseSettings.maxVelocity},
velocityBoostMultiplier: ${mouseSettings.velocityBoostMultiplier},`;
    }
    navigator.clipboard.writeText(code);
    alert('설정이 클립보드에 복사되었습니다!');
  };

  const tabStyle = (tab: TabType) => ({
    flex: 1,
    padding: '6px 8px',
    background: activeTab === tab ? '#4488ff' : '#333',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 10,
    fontWeight: activeTab === tab ? 'bold' : 'normal',
  } as React.CSSProperties);

  const sliderContainerStyle = { marginBottom: 10 };
  const labelStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: 2 } as React.CSSProperties;
  const valueStyle = { color: '#4af' };
  const inputStyle = { width: '100%' };

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#fff',
        padding: isOpen ? 16 : 8,
        borderRadius: 8,
        fontFamily: 'monospace',
        fontSize: 11,
        minWidth: isOpen ? 300 : 'auto',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: isOpen ? 12 : 0,
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ fontWeight: 'bold' }}>🎛️ Particle Debug Panel</span>
        <span>{isOpen ? '▼' : '▶'}</span>
      </div>

      {isOpen && (
        <>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
            <button style={tabStyle('wave')} onClick={() => setActiveTab('wave')}>
              🌊 Wave
            </button>
            <button style={tabStyle('city')} onClick={() => setActiveTab('city')}>
              🏙️ City
            </button>
            <button style={tabStyle('postprocessing')} onClick={() => setActiveTab('postprocessing')}>
              ✨ Bloom
            </button>
            <button style={tabStyle('mouse')} onClick={() => setActiveTab('mouse')}>
              🖱️ Mouse
            </button>
          </div>

          {/* City Model Tab */}
          {activeTab === 'city' && (
            <>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Rotation X</span>
                  <span style={valueStyle}>{citySettings.rotationX.toFixed(1)}°</span>
                </label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={citySettings.rotationX}
                  onChange={(e) => handleCityChange('rotationX', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Rotation Y</span>
                  <span style={valueStyle}>{citySettings.rotationY.toFixed(1)}°</span>
                </label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={citySettings.rotationY}
                  onChange={(e) => handleCityChange('rotationY', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Rotation Z</span>
                  <span style={valueStyle}>{citySettings.rotationZ.toFixed(1)}°</span>
                </label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={citySettings.rotationZ}
                  onChange={(e) => handleCityChange('rotationZ', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Offset Y</span>
                  <span style={valueStyle}>{citySettings.offsetY.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.05"
                  value={citySettings.offsetY}
                  onChange={(e) => handleCityChange('offsetY', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Scale</span>
                  <span style={valueStyle}>{citySettings.scale.toFixed(2)}x</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={citySettings.scale}
                  onChange={(e) => handleCityChange('scale', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
            </>
          )}

          {/* Post Processing Tab */}
          {activeTab === 'postprocessing' && (
            <>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={ppSettings.bloomEnabled}
                    onChange={(e) => handlePpChange('bloomEnabled', e.target.checked)}
                  />
                  <span>Bloom Enabled</span>
                </label>
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Intensity</span>
                  <span style={valueStyle}>{ppSettings.bloomIntensity.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.05"
                  value={ppSettings.bloomIntensity}
                  onChange={(e) => handlePpChange('bloomIntensity', parseFloat(e.target.value))}
                  style={inputStyle}
                  disabled={!ppSettings.bloomEnabled}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Threshold</span>
                  <span style={valueStyle}>{ppSettings.bloomThreshold.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={ppSettings.bloomThreshold}
                  onChange={(e) => handlePpChange('bloomThreshold', parseFloat(e.target.value))}
                  style={inputStyle}
                  disabled={!ppSettings.bloomEnabled}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Smoothing</span>
                  <span style={valueStyle}>{ppSettings.bloomSmoothing.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={ppSettings.bloomSmoothing}
                  onChange={(e) => handlePpChange('bloomSmoothing', parseFloat(e.target.value))}
                  style={inputStyle}
                  disabled={!ppSettings.bloomEnabled}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Levels</span>
                  <span style={valueStyle}>{ppSettings.bloomLevels}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={ppSettings.bloomLevels}
                  onChange={(e) => handlePpChange('bloomLevels', parseInt(e.target.value))}
                  style={inputStyle}
                  disabled={!ppSettings.bloomEnabled}
                />
              </div>
            </>
          )}

          {/* Mouse Interaction Tab */}
          {activeTab === 'mouse' && (
            <>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={mouseSettings.enabled}
                    onChange={(e) => handleMouseChange('enabled', e.target.checked)}
                  />
                  <span>Mouse Interaction Enabled</span>
                </label>
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Radius</span>
                  <span style={valueStyle}>{mouseSettings.radius.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.1"
                  value={mouseSettings.radius}
                  onChange={(e) => handleMouseChange('radius', parseFloat(e.target.value))}
                  style={inputStyle}
                  disabled={!mouseSettings.enabled}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Push Force</span>
                  <span style={valueStyle}>{mouseSettings.pushForce.toFixed(3)}</span>
                </label>
                <input
                  type="range"
                  min="0.001"
                  max="0.1"
                  step="0.001"
                  value={mouseSettings.pushForce}
                  onChange={(e) => handleMouseChange('pushForce', parseFloat(e.target.value))}
                  style={inputStyle}
                  disabled={!mouseSettings.enabled}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Spring Stiffness</span>
                  <span style={valueStyle}>{mouseSettings.springStiffness.toFixed(3)}</span>
                </label>
                <input
                  type="range"
                  min="0.001"
                  max="0.1"
                  step="0.001"
                  value={mouseSettings.springStiffness}
                  onChange={(e) => handleMouseChange('springStiffness', parseFloat(e.target.value))}
                  style={inputStyle}
                  disabled={!mouseSettings.enabled}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Damping</span>
                  <span style={valueStyle}>{mouseSettings.damping.toFixed(3)}</span>
                </label>
                <input
                  type="range"
                  min="0.8"
                  max="0.999"
                  step="0.001"
                  value={mouseSettings.damping}
                  onChange={(e) => handleMouseChange('damping', parseFloat(e.target.value))}
                  style={inputStyle}
                  disabled={!mouseSettings.enabled}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Max Velocity</span>
                  <span style={valueStyle}>{mouseSettings.maxVelocity.toFixed(3)}</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={mouseSettings.maxVelocity}
                  onChange={(e) => handleMouseChange('maxVelocity', parseFloat(e.target.value))}
                  style={inputStyle}
                  disabled={!mouseSettings.enabled}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Velocity Boost</span>
                  <span style={valueStyle}>{mouseSettings.velocityBoostMultiplier.toFixed(2)}x</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={mouseSettings.velocityBoostMultiplier}
                  onChange={(e) => handleMouseChange('velocityBoostMultiplier', parseFloat(e.target.value))}
                  style={inputStyle}
                  disabled={!mouseSettings.enabled}
                />
              </div>
            </>
          )}

          {/* 🌊 Wave Animation Tab */}
          {activeTab === 'wave' && (
            <>
              {/* 카메라 위치 섹션 */}
              <div style={{ marginBottom: 8, color: '#4af', fontWeight: 'bold', fontSize: 10 }}>
                📷 카메라 위치 (Camera Position)
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>X 위치 (좌/우)</span>
                  <span style={valueStyle}>{waveSettings.cameraX.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.1"
                  value={waveSettings.cameraX}
                  onChange={(e) => handleWaveChange('cameraX', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Y 위치 (위/아래)</span>
                  <span style={valueStyle}>{waveSettings.cameraY.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.1"
                  value={waveSettings.cameraY}
                  onChange={(e) => handleWaveChange('cameraY', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Z 거리 (앞/뒤)</span>
                  <span style={valueStyle}>{waveSettings.cameraZ.toFixed(1)}</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="15"
                  step="0.1"
                  value={waveSettings.cameraZ}
                  onChange={(e) => handleWaveChange('cameraZ', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>시야각 (FOV)</span>
                  <span style={valueStyle}>{waveSettings.cameraFov.toFixed(0)}°</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="120"
                  step="1"
                  value={waveSettings.cameraFov}
                  onChange={(e) => handleWaveChange('cameraFov', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* 카메라 회전 섹션 */}
              <div style={{ marginTop: 12, marginBottom: 8, color: '#4af', fontWeight: 'bold', fontSize: 10 }}>
                🎬 카메라 구도 (Camera Rotation)
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>틸트 (위/아래 각도)</span>
                  <span style={valueStyle}>{waveSettings.cameraRotX.toFixed(1)}°</span>
                </label>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  step="0.5"
                  value={waveSettings.cameraRotX}
                  onChange={(e) => handleWaveChange('cameraRotX', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>팬 (좌/우 각도)</span>
                  <span style={valueStyle}>{waveSettings.cameraRotY.toFixed(1)}°</span>
                </label>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  step="0.5"
                  value={waveSettings.cameraRotY}
                  onChange={(e) => handleWaveChange('cameraRotY', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>롤 (기울기)</span>
                  <span style={valueStyle}>{waveSettings.cameraRotZ.toFixed(1)}°</span>
                </label>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  step="0.5"
                  value={waveSettings.cameraRotZ}
                  onChange={(e) => handleWaveChange('cameraRotZ', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* 시점 설정 섹션 */}
              <div style={{ marginTop: 12, marginBottom: 8, color: '#4af', fontWeight: 'bold', fontSize: 10 }}>
                🎯 시점 (Look At)
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>시점 X (좌/우)</span>
                  <span style={valueStyle}>{waveSettings.lookAtX.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={waveSettings.lookAtX}
                  onChange={(e) => handleWaveChange('lookAtX', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>시점 Y (위/아래)</span>
                  <span style={valueStyle}>{waveSettings.lookAtY.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={waveSettings.lookAtY}
                  onChange={(e) => handleWaveChange('lookAtY', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>시점 Z (앞/뒤)</span>
                  <span style={valueStyle}>{waveSettings.lookAtZ.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={waveSettings.lookAtZ}
                  onChange={(e) => handleWaveChange('lookAtZ', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* 메인 파도 섹션 */}
              <div style={{ marginTop: 12, marginBottom: 8, color: '#4af', fontWeight: 'bold', fontSize: 10 }}>
                🌊 메인 파도 (Main Wave)
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>속도 (Speed)</span>
                  <span style={valueStyle}>{waveSettings.mainWaveSpeed.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="2"
                  step="0.05"
                  value={waveSettings.mainWaveSpeed}
                  onChange={(e) => handleWaveChange('mainWaveSpeed', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>밀도 (Scale)</span>
                  <span style={valueStyle}>{waveSettings.mainWaveScale.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.05"
                  value={waveSettings.mainWaveScale}
                  onChange={(e) => handleWaveChange('mainWaveScale', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>높이 (Height)</span>
                  <span style={valueStyle}>{waveSettings.mainWaveHeight.toFixed(3)}</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={waveSettings.mainWaveHeight}
                  onChange={(e) => handleWaveChange('mainWaveHeight', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* 크로스 파도 섹션 */}
              <div style={{ marginTop: 12, marginBottom: 8, color: '#4af', fontWeight: 'bold', fontSize: 10 }}>
                ↗️ 교차 파도 (Cross Wave)
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>속도 (Speed)</span>
                  <span style={valueStyle}>{waveSettings.crossWaveSpeed.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="2"
                  step="0.05"
                  value={waveSettings.crossWaveSpeed}
                  onChange={(e) => handleWaveChange('crossWaveSpeed', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>밀도 (Scale)</span>
                  <span style={valueStyle}>{waveSettings.crossWaveScale.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.05"
                  value={waveSettings.crossWaveScale}
                  onChange={(e) => handleWaveChange('crossWaveScale', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>높이 (Height)</span>
                  <span style={valueStyle}>{waveSettings.crossWaveHeight.toFixed(3)}</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={waveSettings.crossWaveHeight}
                  onChange={(e) => handleWaveChange('crossWaveHeight', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* 대각선 파도 섹션 */}
              <div style={{ marginTop: 12, marginBottom: 8, color: '#4af', fontWeight: 'bold', fontSize: 10 }}>
                ↘️ 대각선 파도 (Diagonal Wave)
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>속도 (Speed)</span>
                  <span style={valueStyle}>{waveSettings.diagWaveSpeed.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="2"
                  step="0.05"
                  value={waveSettings.diagWaveSpeed}
                  onChange={(e) => handleWaveChange('diagWaveSpeed', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>밀도 (Scale)</span>
                  <span style={valueStyle}>{waveSettings.diagWaveScale.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.05"
                  value={waveSettings.diagWaveScale}
                  onChange={(e) => handleWaveChange('diagWaveScale', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>높이 (Height)</span>
                  <span style={valueStyle}>{waveSettings.diagWaveHeight.toFixed(3)}</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.3"
                  step="0.01"
                  value={waveSettings.diagWaveHeight}
                  onChange={(e) => handleWaveChange('diagWaveHeight', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* 잔물결 섹션 */}
              <div style={{ marginTop: 12, marginBottom: 8, color: '#4af', fontWeight: 'bold', fontSize: 10 }}>
                〰️ 잔물결 (Ripples)
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>잔물결1 속도</span>
                  <span style={valueStyle}>{waveSettings.ripple1Speed.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.05"
                  value={waveSettings.ripple1Speed}
                  onChange={(e) => handleWaveChange('ripple1Speed', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>잔물결1 높이</span>
                  <span style={valueStyle}>{waveSettings.ripple1Height.toFixed(3)}</span>
                </label>
                <input
                  type="range"
                  min="0.001"
                  max="0.1"
                  step="0.001"
                  value={waveSettings.ripple1Height}
                  onChange={(e) => handleWaveChange('ripple1Height', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>잔물결2 속도</span>
                  <span style={valueStyle}>{waveSettings.ripple2Speed.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.05"
                  value={waveSettings.ripple2Speed}
                  onChange={(e) => handleWaveChange('ripple2Speed', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>잔물결2 높이</span>
                  <span style={valueStyle}>{waveSettings.ripple2Height.toFixed(3)}</span>
                </label>
                <input
                  type="range"
                  min="0.001"
                  max="0.1"
                  step="0.001"
                  value={waveSettings.ripple2Height}
                  onChange={(e) => handleWaveChange('ripple2Height', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* 원형 파동 섹션 */}
              <div style={{ marginTop: 12, marginBottom: 8, color: '#4af', fontWeight: 'bold', fontSize: 10 }}>
                ⭕ 원형 파동 (Radial Wave)
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>속도 (Speed)</span>
                  <span style={valueStyle}>{waveSettings.radialWaveSpeed.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.05"
                  value={waveSettings.radialWaveSpeed}
                  onChange={(e) => handleWaveChange('radialWaveSpeed', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>높이 (Height)</span>
                  <span style={valueStyle}>{waveSettings.radialWaveHeight.toFixed(3)}</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.2"
                  step="0.005"
                  value={waveSettings.radialWaveHeight}
                  onChange={(e) => handleWaveChange('radialWaveHeight', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>감쇠 (Falloff)</span>
                  <span style={valueStyle}>{waveSettings.radialWaveFalloff.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={waveSettings.radialWaveFalloff}
                  onChange={(e) => handleWaveChange('radialWaveFalloff', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* XZ 흔들림 섹션 */}
              <div style={{ marginTop: 12, marginBottom: 8, color: '#4af', fontWeight: 'bold', fontSize: 10 }}>
                ↔️ 수평 흔들림 (Sway)
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>X축 흔들림</span>
                  <span style={valueStyle}>{waveSettings.swayXAmount.toFixed(3)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.1"
                  step="0.001"
                  value={waveSettings.swayXAmount}
                  onChange={(e) => handleWaveChange('swayXAmount', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Z축 흔들림</span>
                  <span style={valueStyle}>{waveSettings.swayZAmount.toFixed(3)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.1"
                  step="0.001"
                  value={waveSettings.swayZAmount}
                  onChange={(e) => handleWaveChange('swayZAmount', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* 부유 효과 섹션 */}
              <div style={{ marginTop: 12, marginBottom: 8, color: '#4af', fontWeight: 'bold', fontSize: 10 }}>
                🎈 부유 효과 (Float)
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>속도 (Speed)</span>
                  <span style={valueStyle}>{waveSettings.floatSpeed.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="1"
                  step="0.05"
                  value={waveSettings.floatSpeed}
                  onChange={(e) => handleWaveChange('floatSpeed', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>부유량 (Amount)</span>
                  <span style={valueStyle}>{waveSettings.floatAmount.toFixed(3)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.1"
                  step="0.001"
                  value={waveSettings.floatAmount}
                  onChange={(e) => handleWaveChange('floatAmount', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* 오브젝트 회전 섹션 */}
              <div style={{ marginTop: 12, marginBottom: 8, color: '#f4a', fontWeight: 'bold', fontSize: 10 }}>
                🔄 오브젝트 회전 (Object Rotation)
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>X축 기울기 (Tilt)</span>
                  <span style={valueStyle}>{waveSettings.objectRotX.toFixed(1)}°</span>
                </label>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  step="1"
                  value={waveSettings.objectRotX}
                  onChange={(e) => handleWaveChange('objectRotX', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Y축 회전 (Pan)</span>
                  <span style={valueStyle}>{waveSettings.objectRotY.toFixed(1)}°</span>
                </label>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  step="1"
                  value={waveSettings.objectRotY}
                  onChange={(e) => handleWaveChange('objectRotY', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Z축 기울기 (Roll)</span>
                  <span style={valueStyle}>{waveSettings.objectRotZ.toFixed(1)}°</span>
                </label>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  step="1"
                  value={waveSettings.objectRotZ}
                  onChange={(e) => handleWaveChange('objectRotZ', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label style={labelStyle}>
                  <span>Y 오프셋 (Offset)</span>
                  <span style={valueStyle}>{waveSettings.objectOffsetY.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={waveSettings.objectOffsetY}
                  onChange={(e) => handleWaveChange('objectOffsetY', parseFloat(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* 전환 설정 섹션 */}
              <div style={{ marginTop: 12, marginBottom: 8, color: '#af4', fontWeight: 'bold', fontSize: 10 }}>
                ⚡ 전환 설정 (Transition)
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={waveSettings.disableTransitionSpin}
                    onChange={(e) => setWaveSettings({ disableTransitionSpin: e.target.checked })}
                  />
                  <span>형태 전환 시 회전 비활성화</span>
                </label>
              </div>
            </>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button
              onClick={handleReset}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: '#444',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 11,
              }}
            >
              Reset
            </button>
            <button
              onClick={handleCopyToClipboard}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: '#4488ff',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 11,
              }}
            >
              Copy Code
            </button>
          </div>
        </>
      )}
    </div>
  );
}
