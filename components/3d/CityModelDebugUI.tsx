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

// 기본값
const defaultSettings: CityModelSettings = {
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  offsetY: -2,
  scale: 5,
};

// 전역 상태 (리액트 외부에서도 접근 가능)
let globalSettings: CityModelSettings = { ...defaultSettings };
let listeners: Set<(settings: CityModelSettings) => void> = new Set();

export function getCityModelSettings(): CityModelSettings {
  return globalSettings;
}

export function setCityModelSettings(settings: Partial<CityModelSettings>) {
  globalSettings = { ...globalSettings, ...settings };
  listeners.forEach(listener => listener(globalSettings));
}

export function subscribeToCityModelSettings(listener: (settings: CityModelSettings) => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

// 디버그 UI 컴포넌트
export default function CityModelDebugUI() {
  const [settings, setSettings] = useState<CityModelSettings>(globalSettings);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToCityModelSettings(setSettings);
    return unsubscribe;
  }, []);

  const handleChange = (key: keyof CityModelSettings, value: number) => {
    setCityModelSettings({ [key]: value });
  };

  const handleReset = () => {
    setCityModelSettings(defaultSettings);
  };

  const handleCopyToClipboard = () => {
    const code = `// City Model Settings
rotationX: ${settings.rotationX},
rotationY: ${settings.rotationY},
rotationZ: ${settings.rotationZ},
offsetY: ${settings.offsetY},
scale: ${settings.scale},`;
    navigator.clipboard.writeText(code);
    alert('설정이 클립보드에 복사되었습니다!');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.85)',
        color: '#fff',
        padding: isOpen ? 16 : 8,
        borderRadius: 8,
        fontFamily: 'monospace',
        fontSize: 12,
        minWidth: isOpen ? 280 : 'auto',
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
        <span style={{ fontWeight: 'bold' }}>🏙️ City Model Settings</span>
        <span>{isOpen ? '▼' : '▶'}</span>
      </div>

      {isOpen && (
        <>
          {/* Rotation X */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Rotation X (도)</span>
              <span style={{ color: '#4af' }}>{settings.rotationX.toFixed(1)}°</span>
            </label>
            <input
              type="range"
              min="-180"
              max="180"
              step="1"
              value={settings.rotationX}
              onChange={(e) => handleChange('rotationX', parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Rotation Y */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Rotation Y (도)</span>
              <span style={{ color: '#4af' }}>{settings.rotationY.toFixed(1)}°</span>
            </label>
            <input
              type="range"
              min="-180"
              max="180"
              step="1"
              value={settings.rotationY}
              onChange={(e) => handleChange('rotationY', parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Rotation Z */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Rotation Z (도)</span>
              <span style={{ color: '#4af' }}>{settings.rotationZ.toFixed(1)}°</span>
            </label>
            <input
              type="range"
              min="-180"
              max="180"
              step="1"
              value={settings.rotationZ}
              onChange={(e) => handleChange('rotationZ', parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Offset Y */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Offset Y</span>
              <span style={{ color: '#4af' }}>{settings.offsetY.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.05"
              value={settings.offsetY}
              onChange={(e) => handleChange('offsetY', parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Scale */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Scale</span>
              <span style={{ color: '#4af' }}>{settings.scale.toFixed(2)}x</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.05"
              value={settings.scale}
              onChange={(e) => handleChange('scale', parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
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
              }}
            >
              Copy Code
            </button>
          </div>

          {/* Current Values */}
          <div
            style={{
              marginTop: 12,
              padding: 8,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 4,
              fontSize: 10,
            }}
          >
            <div>rotationX: {settings.rotationX}</div>
            <div>rotationY: {settings.rotationY}</div>
            <div>rotationZ: {settings.rotationZ}</div>
            <div>offsetY: {settings.offsetY}</div>
            <div>scale: {settings.scale}</div>
          </div>
        </>
      )}
    </div>
  );
}
