'use client';

import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// 환경맵 설정
function EnvironmentSetup() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    const roomEnvironment = new RoomEnvironment();
    const envTexture = pmremGenerator.fromScene(roomEnvironment).texture;

    scene.environment = envTexture;
    // scene.background = envTexture; // 배경 투명하게 하려면 주석 처리
    // scene.backgroundBlurriness = 0.5;

    roomEnvironment.dispose();
    pmremGenerator.dispose();

    return () => {
      envTexture.dispose();
    };
  }, [gl, scene]);

  return null;
}

// 글래스 토러스
function GlassTorus({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
  rotationSpeed = [0.003, 0.005, 0.002] as [number, number, number],
  transmission = 1,
  thickness = 0.5,
  roughness = 0,
  ior = 1.5,
  dispersion = 1,
  iridescence = 1,
  iridescenceIOR = 1.3,
}: {
  position?: [number, number, number];
  scale?: number;
  rotationSpeed?: [number, number, number];
  transmission?: number;
  thickness?: number;
  roughness?: number;
  ior?: number;
  dispersion?: number;
  iridescence?: number;
  iridescenceIOR?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed[0];
      meshRef.current.rotation.y += rotationSpeed[1];
      meshRef.current.rotation.z += rotationSpeed[2];
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.4, 128, 256]} />
      <meshPhysicalMaterial
        // 투명 유리 기본
        color="#ffffff"
        transparent
        transmission={transmission}
        thickness={thickness}
        roughness={roughness}
        ior={ior}

        // 반사
        metalness={0}
        reflectivity={1}
        envMapIntensity={1}
        clearcoat={0}

        // 무지개빛 분산 (Dispersion) - 핵심!
        dispersion={dispersion}

        // 추가 무지개빛 (Iridescence)
        iridescence={iridescence}
        iridescenceIOR={iridescenceIOR}
        iridescenceThicknessRange={[100, 400]}

        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Scene({ settings }: { settings: any }) {
  return (
    <>
      <EnvironmentSetup />

      {/* 첫 번째 토러스 */}
      <GlassTorus
        position={[0, 0.8, 0]}
        scale={1.8}
        rotationSpeed={[0.002, 0.004, 0.001]}
        transmission={settings.transmission}
        thickness={settings.thickness}
        roughness={settings.roughness}
        ior={settings.ior}
        dispersion={settings.dispersion}
        iridescence={settings.iridescence}
        iridescenceIOR={settings.iridescenceIOR}
      />

      {/* 두 번째 토러스 */}
      <GlassTorus
        position={[0.3, -1, -0.5]}
        scale={1.5}
        rotationSpeed={[-0.003, -0.002, 0.002]}
        transmission={settings.transmission}
        thickness={settings.thickness}
        roughness={settings.roughness}
        ior={settings.ior}
        dispersion={settings.dispersion}
        iridescence={settings.iridescence}
        iridescenceIOR={settings.iridescenceIOR}
      />
    </>
  );
}

// 디버그 UI
function DebugUI({ settings, setSettings, show }: {
  settings: any;
  setSettings: (s: any) => void;
  show: boolean;
}) {
  if (!show) return null;

  const sliderStyle: React.CSSProperties = {
    width: '100%',
    marginTop: 4,
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 11,
    marginTop: 8,
  };

  return (
    <div style={{
      position: 'absolute',
      top: 10,
      right: 10,
      background: 'rgba(0,0,0,0.85)',
      color: '#fff',
      padding: 16,
      borderRadius: 8,
      fontFamily: 'monospace',
      fontSize: 12,
      width: 220,
      zIndex: 1000,
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: 12, borderBottom: '1px solid #444', paddingBottom: 8 }}>
        Glass Material
      </div>

      <div style={labelStyle}>
        <span>transmission</span>
        <span>{settings.transmission.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={settings.transmission}
        onChange={(e) => setSettings({ ...settings, transmission: parseFloat(e.target.value) })}
        style={sliderStyle}
      />

      <div style={labelStyle}>
        <span>thickness</span>
        <span>{settings.thickness.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min="0"
        max="2"
        step="0.01"
        value={settings.thickness}
        onChange={(e) => setSettings({ ...settings, thickness: parseFloat(e.target.value) })}
        style={sliderStyle}
      />

      <div style={labelStyle}>
        <span>roughness</span>
        <span>{settings.roughness.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={settings.roughness}
        onChange={(e) => setSettings({ ...settings, roughness: parseFloat(e.target.value) })}
        style={sliderStyle}
      />

      <div style={labelStyle}>
        <span>ior</span>
        <span>{settings.ior.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min="1"
        max="2.5"
        step="0.01"
        value={settings.ior}
        onChange={(e) => setSettings({ ...settings, ior: parseFloat(e.target.value) })}
        style={sliderStyle}
      />

      <div style={{ fontWeight: 'bold', marginTop: 16, marginBottom: 8, borderBottom: '1px solid #444', paddingBottom: 8 }}>
        Dispersion (무지개빛)
      </div>

      <div style={labelStyle}>
        <span>dispersion</span>
        <span>{settings.dispersion.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min="0"
        max="3"
        step="0.01"
        value={settings.dispersion}
        onChange={(e) => setSettings({ ...settings, dispersion: parseFloat(e.target.value) })}
        style={sliderStyle}
      />

      <div style={labelStyle}>
        <span>iridescence</span>
        <span>{settings.iridescence.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={settings.iridescence}
        onChange={(e) => setSettings({ ...settings, iridescence: parseFloat(e.target.value) })}
        style={sliderStyle}
      />

      <div style={labelStyle}>
        <span>iridescenceIOR</span>
        <span>{settings.iridescenceIOR.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min="1"
        max="2.5"
        step="0.01"
        value={settings.iridescenceIOR}
        onChange={(e) => setSettings({ ...settings, iridescenceIOR: parseFloat(e.target.value) })}
        style={sliderStyle}
      />

      <div style={{ marginTop: 16, fontSize: 10, color: '#888' }}>
        dispersion이 핵심 (r165+)
      </div>
    </div>
  );
}

export default function HeroScene() {
  const [shouldRender, setShouldRender] = useState(false);
  const [showDebug, setShowDebug] = useState(true); // 디버그 UI 표시

  const [settings, setSettings] = useState({
    transmission: 1,
    thickness: 0.2,      // 얇게
    roughness: 0,
    ior: 1.5,
    dispersion: 0.5,     // 적당한 분산
    iridescence: 0,      // 끄기 - 순수 dispersion만
    iridescenceIOR: 1.3,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 809.98px)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setShouldRender(!e.matches);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (!shouldRender) return null;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      inset: 0,
      zIndex: 5,
      pointerEvents: 'auto',
      background: '#000', // 검은 배경으로 효과 확인
    }}>
      {/* 디버그 UI 토글 버튼 */}
      <button
        onClick={() => setShowDebug(!showDebug)}
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 1001,
          padding: '6px 12px',
          background: showDebug ? '#0071ff' : '#333',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          fontSize: 11,
          fontFamily: 'monospace',
        }}
      >
        {showDebug ? 'Hide Debug' : 'Show Debug'}
      </button>

      <DebugUI settings={settings} setSettings={setSettings} show={showDebug} />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.NeutralToneMapping,
          toneMappingExposure: 1,
        }}
        style={{ background: 'transparent' }}
      >
        <Scene settings={settings} />
      </Canvas>
    </div>
  );
}
