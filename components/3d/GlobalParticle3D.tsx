'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { useGlobalScrollProgressRef } from '@/hooks/useGlobalScrollProgress';
import { shapeGenerators, ShapeType } from './shapes';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { getCityModelSettings, subscribeToCityModelSettings, CityModelSettings } from './CityModelDebugUI';

interface SectionConfig {
  id: string;
  shape: ShapeType;
  position: { x: number; y: number };
  scale: number;
  opacity: number;
  anchorId?: string; // DOM 요소 ID를 기준으로 위치를 계산할 경우
}

// 모든 섹션에 대한 파티클 설정
// 순서: page.tsx의 섹션 순서와 일치해야 함
// position: 화면 중앙 기준 (x: 50 = 중앙, y: 50 = 중앙)
// CoreFeatures 섹션은 4개의 서브섹션으로 분리 (각 항목별 다른 shape)
const sectionConfigs: SectionConfig[] = [
  { id: 'section-hero',         shape: 'wave',      position: { x: 50, y: 50 }, scale: 1.0, opacity: 0.95 },
  { id: 'section-partners',     shape: 'wave',      position: { x: 50, y: 50 }, scale: 0.9, opacity: 0.9 },
  { id: 'section-data-count',   shape: 'wave',      position: { x: 50, y: 50 }, scale: 0.85, opacity: 0.85 },
  { id: 'section-community',    shape: 'chart',     position: { x: 50, y: 50 }, scale: 0.65, opacity: 0.8 },
  // CoreFeatures 서브섹션들 (anchorId로 particleAnchor 위치 참조)
  { id: 'section-corefeature-1', shape: 'gear',    position: { x: 50, y: 50 }, scale: 0.6, opacity: 0.85, anchorId: 'corefeatures-particle-anchor' }, // 제조 현장 맞춤 필터 - 톱니바퀴
  { id: 'section-corefeature-2', shape: 'city',    position: { x: 50, y: 50 }, scale: 0.6, opacity: 0.85, anchorId: 'corefeatures-particle-anchor' }, // 물류/입지 최적화 - 도시
  { id: 'section-corefeature-3', shape: 'chart',   position: { x: 50, y: 50 }, scale: 0.6, opacity: 0.85, anchorId: 'corefeatures-particle-anchor' }, // 실거래가 통계 - 차트
  { id: 'section-corefeature-4', shape: 'network', position: { x: 50, y: 50 }, scale: 0.6, opacity: 0.85, anchorId: 'corefeatures-particle-anchor' }, // 스마트 매칭 - 네트워크
  { id: 'section-private-listing', shape: 'lock',   position: { x: 50, y: 50 }, scale: 0.7, opacity: 0.85 },
  { id: 'section-testimonials', shape: 'info',      position: { x: 50, y: 50 }, scale: 0.6, opacity: 0.7 },
  { id: 'section-faq',          shape: 'megaphone', position: { x: 50, y: 50 }, scale: 0.6, opacity: 0.7 },
  // section-launch-notify는 Spline 배경을 사용하므로 파티클 제외
];

const sectionIds = sectionConfigs.map(c => c.id);

function getParticleCount(): number {
  if (typeof window === 'undefined') return 50000;
  const width = window.innerWidth;
  if (width <= 768) return 20000;
  if (width <= 1024) return 30000;
  return 50000;
}

function getBaseCount(): number {
  if (typeof window === 'undefined') return 5000;
  const width = window.innerWidth;
  if (width <= 768) return 3000;
  if (width <= 1024) return 4000;
  return 5000;
}

function createCircleTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

interface ShapeEntry {
  positions: Float32Array;
  alphas: Float32Array;
}

interface MouseState {
  x: number;
  y: number;
  vx: number;  // X 속도
  vy: number;  // Y 속도
  active: boolean;
}

interface ParticlesInnerProps {
  shapeDataRef: React.MutableRefObject<Record<ShapeType, ShapeEntry>>;
  scrollStateRef: React.MutableRefObject<{ currentIndex: number; nextIndex: number; transition: number }>;
  particleCount: number;
  mouseRef: React.MutableRefObject<MouseState>;
}

const vertexShader = /* glsl */ `
  attribute float aAlpha;
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;
  varying float vAlpha;
  varying vec3 vColor;
  varying float vDepth;
  uniform float uBaseSize;
  uniform float uScale;
  uniform float uGlobalOpacity;
  uniform float uTime;

  void main() {
    // Twinkle: 더 다양한 반짝임 패턴
    float twinkle1 = sin(uTime * 2.5 + aPhase * 6.2831);
    float twinkle2 = sin(uTime * 4.0 + aPhase * 12.566);
    float twinkle = 0.75 + 0.2 * twinkle1 + 0.05 * twinkle2;

    vAlpha = aAlpha * uGlobalOpacity * twinkle;
    vColor = aColor;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mvPosition.z;

    // 거리에 따른 크기 조절 (가까울수록 더 크게)
    float distanceFactor = clamp(5.0 / -mvPosition.z, 0.5, 2.0);
    gl_PointSize = uBaseSize * aSize * distanceFactor * (uScale / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  varying float vAlpha;
  varying vec3 vColor;
  varying float vDepth;

  void main() {
    vec4 texColor = texture2D(uMap, gl_PointCoord);
    if (texColor.a < 0.01) discard;

    // 부드러운 가장자리 (glow 효과)
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center) * 2.0;
    float glow = 1.0 - smoothstep(0.3, 1.0, dist);

    // 깊이에 따른 색상 변화 (멀수록 더 푸르게)
    vec3 depthTint = mix(vColor, vColor * vec3(0.8, 0.9, 1.1), clamp(vDepth * 0.1, 0.0, 0.3));

    gl_FragColor = vec4(depthTint * glow, texColor.a * vAlpha * glow);
  }
`;

// WebGL 리소스 정리 컴포넌트
function CleanupOnUnmount() {
  const { gl, scene } = useThree();

  useEffect(() => {
    return () => {
      // 씬의 모든 객체 정리
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry?.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(mat => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      // WebGL 컨텍스트 정리
      gl.dispose();
    };
  }, [gl, scene]);

  return null;
}

// 절제된 카메라 패럴랙스 - 미세한 위치 이동만
interface SmoothCameraProps {
  mouseRef: React.MutableRefObject<MouseState>;
}

function SmoothCamera({ mouseRef }: SmoothCameraProps) {
  const { camera } = useThree();
  const currentRef = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const mouse = mouseRef.current;

    // 목표: 마우스 방향으로 아주 미세하게만 이동 (거의 느끼지 못할 정도)
    const targetX = mouse.active ? mouse.x * 0.02 : 0;
    const targetY = mouse.active ? mouse.y * 0.012 : 0;

    // 매우 부드럽고 느린 보간
    currentRef.current.x += (targetX - currentRef.current.x) * 0.01;
    currentRef.current.y += (targetY - currentRef.current.y) * 0.01;

    // 카메라 적용 (위치만, 회전 없음)
    camera.position.x = currentRef.current.x;
    camera.position.y = currentRef.current.y;
  });

  return null;
}

function MorphingParticlesInner({ shapeDataRef, scrollStateRef, particleCount, mouseRef }: ParticlesInnerProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const modelRotationRef = useRef<THREE.Group>(null); // 디버그용 회전 그룹
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const circleTextureRef = useRef<THREE.Texture | null>(null);
  const prevStateRef = useRef({ currentIndex: 0, transition: 0 });
  const debugSettingsRef = useRef<CityModelSettings>(getCityModelSettings());

  // 파티클 물리 시뮬레이션 (위치 오프셋 + 속도)
  const particleOffsetsRef = useRef<Float32Array | null>(null);
  const particleVelocitiesRef = useRef<Float32Array | null>(null);

  // 디버그 설정 구독
  useEffect(() => {
    const unsubscribe = subscribeToCityModelSettings((settings) => {
      debugSettingsRef.current = settings;
    });
    return () => { unsubscribe(); };
  }, []);

  // 텍스처 생성 및 정리
  if (!circleTextureRef.current) {
    circleTextureRef.current = createCircleTexture();
  }
  const circleTexture = circleTextureRef.current;


  const { initialPositions, initialAlphas, particleSizes, particleColors, particlePhases } = useMemo(() => {
    const firstShape = sectionConfigs[0].shape;
    const entry = shapeDataRef.current[firstShape];
    // 파티클별 랜덤 크기 (0.2 ~ 3.0 범위로 더 다양하게)
    const sizes = new Float32Array(particleCount);
    // 파티클별 색상: 파랑 → 보라 → 청록 그라데이션
    const colors = new Float32Array(particleCount * 3);
    // 파티클별 반짝임 위상 (0~1 랜덤)
    const phases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // 크기: 대부분 작고 일부만 큰 파티클 (더 자연스러운 분포)
      const sizeRand = Math.random();
      sizes[i] = sizeRand < 0.7 ? 0.3 + sizeRand * 1.2 : 1.5 + (sizeRand - 0.7) * 5.0;

      // 색상: 밝은 하늘색 → 파란색 → 청록색 그라데이션 (생동감 있는 블루 계열)
      const colorT = Math.random();
      if (colorT < 0.4) {
        // 밝은 하늘색 (Sky Blue)
        const t = colorT / 0.4;
        colors[i * 3] = 0.2 + t * 0.15;     // R: 0.2 → 0.35
        colors[i * 3 + 1] = 0.6 + t * 0.15; // G: 0.6 → 0.75
        colors[i * 3 + 2] = 0.9 + t * 0.1;  // B: 0.9 → 1.0
      } else if (colorT < 0.75) {
        // 선명한 파란색 (Vivid Blue)
        const t = (colorT - 0.4) / 0.35;
        colors[i * 3] = 0.1 + t * 0.1;      // R: 0.1 → 0.2
        colors[i * 3 + 1] = 0.4 + t * 0.2;  // G: 0.4 → 0.6
        colors[i * 3 + 2] = 0.85 + t * 0.15; // B: 0.85 → 1.0
      } else {
        // 청록색 (Cyan/Teal)
        const t = (colorT - 0.75) / 0.25;
        colors[i * 3] = 0.1 + t * 0.15;     // R: 0.1 → 0.25
        colors[i * 3 + 1] = 0.7 + t * 0.2;  // G: 0.7 → 0.9
        colors[i * 3 + 2] = 0.85 + t * 0.1; // B: 0.85 → 0.95
      }

      // 밝기 변주 (밝게 유지)
      const brightness = 0.85 + Math.random() * 0.15;
      colors[i * 3] *= brightness;
      colors[i * 3 + 1] *= brightness;
      colors[i * 3 + 2] *= brightness;

      phases[i] = Math.random();
    }
    return {
      initialPositions: new Float32Array(entry.positions),
      initialAlphas: new Float32Array(entry.alphas),
      particleSizes: sizes,
      particleColors: colors,
      particlePhases: phases,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particleCount]);

  // 파티클 오프셋 및 속도 초기화
  if (!particleOffsetsRef.current || particleOffsetsRef.current.length !== particleCount * 3) {
    particleOffsetsRef.current = new Float32Array(particleCount * 3);
    particleVelocitiesRef.current = new Float32Array(particleCount * 3);
  }

  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  if (!shaderMaterialRef.current) {
    shaderMaterialRef.current = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uBaseSize: { value: 0.025 },
        uScale: { value: 1.0 },
        uGlobalOpacity: { value: 1.0 },
        uMap: { value: circleTexture },
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
    });
  }
  const shaderMaterial = shaderMaterialRef.current;

  // 컴포넌트 언마운트 시 리소스 정리
  useEffect(() => {
    return () => {
      if (circleTextureRef.current) {
        circleTextureRef.current.dispose();
        circleTextureRef.current = null;
      }
      if (shaderMaterialRef.current) {
        shaderMaterialRef.current.dispose();
        shaderMaterialRef.current = null;
      }
      if (pointsRef.current?.geometry) {
        pointsRef.current.geometry.dispose();
      }
    };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !groupRef.current || !modelRotationRef.current) return;

    // uniforms 업데이트
    if (materialRef.current) {
      const { height } = state.size;
      const dpr = state.gl.getPixelRatio();
      materialRef.current.uniforms.uScale.value = height * 0.5 * dpr;
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }

    const shapeData = shapeDataRef.current;
    const { currentIndex, nextIndex, transition } = scrollStateRef.current;
    const currentConfig = sectionConfigs[currentIndex];
    const nextConfig = sectionConfigs[nextIndex];
    if (!currentConfig || !nextConfig) return;

    const p = transition;
    const prev = prevStateRef.current;
    const time = state.clock.elapsedTime;
    const baseCount = getBaseCount();

    // 스크롤 모드
    const shapeA = shapeData[currentConfig.shape];
    const shapeB = shapeData[nextConfig.shape];

    // 스크롤 중 감지: transition이 0이나 1이 아닌 중간값일 때
    const isTransitioning = p > 0.01 && p < 0.99;

    const geometry = pointsRef.current.geometry;
    const positions = geometry.attributes.position.array as Float32Array;
    const alphas = geometry.attributes.aAlpha.array as Float32Array;
    const phases = geometry.attributes.aPhase.array as Float32Array;

    // 스크롤 전환 중일 때만 노이즈 적용
    const transitionNoise = isTransitioning ? Math.sin(p * Math.PI) * 0.08 : 0;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // 기본 위치 (현재 셰이프 → 다음 셰이프 보간)
      let x = shapeA.positions[i3] + (shapeB.positions[i3] - shapeA.positions[i3]) * p;
      let y = shapeA.positions[i3 + 1] + (shapeB.positions[i3 + 1] - shapeA.positions[i3 + 1]) * p;
      let z = shapeA.positions[i3 + 2] + (shapeB.positions[i3 + 2] - shapeA.positions[i3 + 2]) * p;

      // 가시 파티클에만 움직임 적용
      if (i < baseCount) {
        const phase = phases[i];
        const seed = i * 0.1;

        // wave 셰이프 여부 확인 (현재 또는 다음이 wave인 경우)
        const isWaveShape = currentConfig.shape === 'wave' || nextConfig.shape === 'wave';
        const waveFactor = currentConfig.shape === 'wave' && nextConfig.shape === 'wave'
          ? 1.0
          : currentConfig.shape === 'wave'
            ? 1 - p
            : nextConfig.shape === 'wave'
              ? p
              : 0;

        if (isWaveShape && waveFactor > 0.01) {
          // 🌊 우아하고 섬세한 물결 애니메이션
          const wf = waveFactor;

          // 기본 위치 저장 (물결 계산용)
          const baseX = x;
          const baseZ = z;

          // === 주요 파도 (Primary Waves) - 부드럽고 큰 물결 ===
          // 1. 메인 파도: 느린 X축 방향 이동
          const mainWave = Math.sin(time * 0.4 + baseX * 0.6) * 0.18;

          // 2. 크로스 파도: 느린 Z축 방향 이동 (부드러운 간섭)
          const crossWave = Math.sin(time * 0.3 + baseZ * 0.5 + 1.0) * 0.12;

          // 3. 대각선 파도: 아주 느린 대각선 이동
          const diagWave = Math.sin(time * 0.25 + (baseX + baseZ) * 0.4) * 0.08;

          // === 세부 물결 (Secondary Ripples) - 미세한 잔물결 ===
          // 4. 고주파 잔물결 (매우 미세하게)
          const ripple1 = Math.sin(time * 0.8 + baseX * 1.2 + phase * 6.28) * 0.025;
          const ripple2 = Math.cos(time * 0.7 + baseZ * 1.0 + phase * 3.14) * 0.02;

          // 5. 중심에서 퍼지는 원형 파동 (은은하게)
          const dist = Math.sqrt(baseX * baseX + baseZ * baseZ);
          const radialWave = Math.sin(time * 0.5 - dist * 0.5) * 0.05 * Math.max(0, 1 - dist * 0.1);

          // === Y축 물결 합성 ===
          const totalWave = (mainWave + crossWave + diagWave + ripple1 + ripple2 + radialWave) * wf;
          y += totalWave;

          // === X, Z축 미세 움직임 (아주 살짝만) ===
          const swayX = Math.cos(time * 0.35 + baseZ * 0.4) * 0.015 * wf;
          const swayZ = Math.sin(time * 0.3 + baseX * 0.4) * 0.015 * wf;
          x += swayX;
          z += swayZ;

          // === 파티클 개별 부유 효과 (은은하게) ===
          const floatOffset = Math.sin(time * 0.2 + phase * 6.28) * 0.01 * wf;
          y += floatOffset;

        } else {
          // 기존 일반 셰이프 애니메이션
          const waveStrength = 0.025;
          const waveX = Math.sin(time * 0.5 + x * 2.0 + phase * 6.28) * waveStrength;
          const waveY = Math.cos(time * 0.4 + y * 2.0 + phase * 6.28) * waveStrength;
          const waveZ = Math.sin(time * 0.3 + (x + y) * 1.5) * waveStrength * 0.8;

          // 소용돌이 효과
          const dist = Math.sqrt(x * x + y * y);
          const swirlStrength = 0.02 * Math.max(0, 1 - dist * 0.5);
          const swirlAngle = time * 0.3 + phase * 3.14;
          const swirlX = Math.cos(swirlAngle) * swirlStrength * y;
          const swirlY = -Math.sin(swirlAngle) * swirlStrength * x;

          // 깊이감 있는 z축 움직임
          const depthPulse = Math.sin(time * 0.6 + phase * 6.28) * 0.03;

          x += waveX + swirlX;
          y += waveY + swirlY;
          z += waveZ + depthPulse;
        }

        // 스크롤 전환 중 추가 노이즈
        if (transitionNoise > 0.001) {
          const explosionFactor = transitionNoise * 1.5;
          x += Math.sin(time * 2.5 + seed) * explosionFactor;
          y += Math.cos(time * 2.0 + seed * 1.3) * explosionFactor;
          z += Math.sin(time * 2.2 + seed * 0.7) * explosionFactor * 0.7;
        }
      }

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      alphas[i] = shapeA.alphas[i] + (shapeB.alphas[i] - shapeA.alphas[i]) * p;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.aAlpha.needsUpdate = true;

    // Scale 계산 (나중에 디버그 스케일과 함께 적용)
    const currentScale = currentConfig.scale;
    const nextScale = nextConfig.scale;
    const targetScale = currentScale + (nextScale - currentScale) * p;

    // Opacity 업데이트
    if (materialRef.current) {
      materialRef.current.uniforms.uGlobalOpacity.value =
        currentConfig.opacity + (nextConfig.opacity - currentConfig.opacity) * p;
    }

    prev.currentIndex = currentIndex;
    prev.transition = p;

    // 위치 계산
    const cam = state.camera as THREE.PerspectiveCamera;
    const aspect = state.size.width / state.size.height;
    const vFov = (cam.fov * Math.PI) / 180;
    const halfHeight = Math.tan(vFov / 2) * cam.position.z;
    const halfWidth = halfHeight * aspect;

    // anchorId가 있으면 해당 DOM 요소 위치 기준, 없으면 config.position 사용
    const getPositionFromConfig = (config: SectionConfig) => {
      if (config.anchorId) {
        const anchor = document.getElementById(config.anchorId);
        if (anchor) {
          const rect = anchor.getBoundingClientRect();
          // DOM 좌표를 3D 공간 좌표로 변환
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const ndcX = (centerX / window.innerWidth) * 2 - 1;
          const ndcY = -((centerY / window.innerHeight) * 2 - 1);
          return {
            x: ndcX * halfWidth,
            y: ndcY * halfHeight,
          };
        }
      }
      // 기본: config.position 사용 (화면 % 기준)
      return {
        x: ((config.position.x - 50) / 50) * halfWidth,
        y: ((50 - config.position.y) / 50) * halfHeight,
      };
    };

    const posA = getPositionFromConfig(currentConfig);
    const posB = getPositionFromConfig(nextConfig);
    const groupX = posA.x + (posB.x - posA.x) * p;
    const groupY = posA.y + (posB.y - posA.y) * p;
    groupRef.current.position.x = groupX;
    groupRef.current.position.y = groupY;

    // 디버그 설정 적용 (city shape일 때만)
    const debug = debugSettingsRef.current;
    const degToRad = Math.PI / 180;
    const isCurrentCity = currentConfig.shape === 'city';
    const isNextCity = nextConfig.shape === 'city';

    // city shape 비율 계산 (0: city 아님, 1: city만)
    let cityFactor = 0;
    if (isCurrentCity && isNextCity) {
      cityFactor = 1;
    } else if (isCurrentCity) {
      cityFactor = 1 - p;
    } else if (isNextCity) {
      cityFactor = p;
    }

    // 디버그 회전 (city일 때만 적용)
    modelRotationRef.current.rotation.x = debug.rotationX * degToRad * cityFactor;
    modelRotationRef.current.rotation.y = debug.rotationY * degToRad * cityFactor;
    modelRotationRef.current.rotation.z = debug.rotationZ * degToRad * cityFactor;

    // 디버그 스케일 적용 (city일 때만 적용, 아니면 1)
    const debugScale = 1 + (debug.scale - 1) * cityFactor;
    pointsRef.current.scale.setScalar(targetScale * debugScale);

    // Y 오프셋 적용 (city일 때만 적용)
    groupRef.current.position.y = groupY + debug.offsetY * cityFactor;

    // 애니메이션 회전 (스핀)
    const spinAngle = (state.clock.elapsedTime * 0.12) % (Math.PI * 2);
    groupRef.current.rotation.x = 0;
    groupRef.current.rotation.y = 0;
    pointsRef.current.rotation.y = spinAngle;

    // 🖱️ 고급 마우스 인터랙션 - 스프링 물리 시뮬레이션
    const offsets = particleOffsetsRef.current;
    const velocities = particleVelocitiesRef.current;
    if (!offsets || !velocities) return;

    // Three.js 행렬 활용: points의 월드 변환 행렬
    pointsRef.current.updateMatrixWorld();
    const worldMatrix = pointsRef.current.matrixWorld;
    const invMatrix = worldMatrix.clone().invert();

    // 마우스 월드 좌표를 로컬 좌표로 변환
    const mouse = mouseRef.current;
    const mouseWorld = new THREE.Vector3(mouse.x, mouse.y, 0);
    const mouseLocal = mouseWorld.clone().applyMatrix4(invMatrix);

    // 마우스 속도 (관성 효과용)
    const mouseSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

    // 물리 파라미터 - 섬세하고 우아한 인터랙션
    const mouseRadius = 1.5 / targetScale;           // 영향 반경 (약간 작게)
    const mouseRadiusSq = mouseRadius * mouseRadius;
    const pushForce = 0.025;                         // 부드러운 밀어내는 힘
    const velocityBoost = Math.min(mouseSpeed * 1, 0.04); // 속도 기반 추가 힘 (약하게)
    const springStiffness = 0.015;                   // 스프링 강성 (천천히 복귀)
    const damping = 0.96;                            // 감쇠 (더 오래 유지)
    const maxVelocity = 0.12;                        // 최대 속도 (제한적)

    for (let i = 0; i < baseCount; i++) {
      const i3 = i * 3;

      // 현재 속도
      let vx = velocities[i3];
      let vy = velocities[i3 + 1];
      let vz = velocities[i3 + 2];

      // 현재 오프셋
      let ox = offsets[i3];
      let oy = offsets[i3 + 1];
      let oz = offsets[i3 + 2];

      // 마우스가 활성화된 경우 밀어내기 힘 적용
      if (mouse.active) {
        const px = positions[i3] - ox; // 원래 위치
        const py = positions[i3 + 1] - oy;

        const dx = px - mouseLocal.x;
        const dy = py - mouseLocal.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < mouseRadiusSq && distSq > 0.0001) {
          const dist = Math.sqrt(distSq);
          const falloff = 1 - (dist / mouseRadius);
          const forceMagnitude = (pushForce + velocityBoost) * falloff * falloff; // 부드러운 감쇠

          // 속도에 힘 추가 (방향 벡터 * 힘)
          vx += (dx / dist) * forceMagnitude;
          vy += (dy / dist) * forceMagnitude;
          vz += (oz > 0 ? 1 : -1) * forceMagnitude * 0.3;
        }
      }

      // 스프링 복원력: 원점으로 돌아가려는 힘
      vx -= ox * springStiffness;
      vy -= oy * springStiffness;
      vz -= oz * springStiffness;

      // 감쇠 적용 (공기 저항처럼 서서히 멈춤)
      vx *= damping;
      vy *= damping;
      vz *= damping;

      // 최대 속도 제한
      const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
      if (speed > maxVelocity) {
        const scale = maxVelocity / speed;
        vx *= scale;
        vy *= scale;
        vz *= scale;
      }

      // 속도로 위치 업데이트
      ox += vx;
      oy += vy;
      oz += vz;

      // 매우 작은 움직임 정리
      if (Math.abs(vx) < 0.00001 && Math.abs(ox) < 0.0001) { vx = 0; ox = 0; }
      if (Math.abs(vy) < 0.00001 && Math.abs(oy) < 0.0001) { vy = 0; oy = 0; }
      if (Math.abs(vz) < 0.00001 && Math.abs(oz) < 0.0001) { vz = 0; oz = 0; }

      // 저장
      velocities[i3] = vx;
      velocities[i3 + 1] = vy;
      velocities[i3 + 2] = vz;
      offsets[i3] = ox;
      offsets[i3 + 1] = oy;
      offsets[i3 + 2] = oz;

      // 실제 위치에 오프셋 적용
      positions[i3] += ox;
      positions[i3 + 1] += oy;
      positions[i3 + 2] += oz;
    }

    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <group ref={modelRotationRef}>
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[initialPositions, 3]}
            />
            <bufferAttribute
              attach="attributes-aAlpha"
              args={[initialAlphas, 1]}
            />
            <bufferAttribute
              attach="attributes-aSize"
              args={[particleSizes, 1]}
            />
            <bufferAttribute
              attach="attributes-aColor"
              args={[particleColors, 3]}
            />
            <bufferAttribute
              attach="attributes-aPhase"
              args={[particlePhases, 1]}
            />
          </bufferGeometry>
          <primitive object={shaderMaterial} ref={materialRef} attach="material" />
        </points>
      </group>
    </group>
  );
}


// FBX 모델 데이터를 공유하기 위한 전역 캐시
interface FBXModelData {
  edgesPositions: Float32Array;
  surfacePositions: Float32Array; // 메시 표면 샘플링 포인트
  normalizeParams: { centerX: number; centerY: number; centerZ: number; scale: number };
}

let cachedFBXData: FBXModelData | null = null;
let fbxLoadPromise: Promise<FBXModelData> | null = null;

// FBX 모델 로드 및 데이터 추출 (한 번만 실행)
function loadFBXModel(): Promise<FBXModelData> {
  if (cachedFBXData) {
    return Promise.resolve(cachedFBXData);
  }
  if (fbxLoadPromise) {
    return fbxLoadPromise;
  }

  fbxLoadPromise = new Promise((resolve) => {
    const loader = new FBXLoader();
    loader.load('/models/city.fbx', (fbx) => {
      const allEdges: Float32Array[] = [];
      const allSurfacePoints: number[] = [];

      // 먼저 바운딩 박스 계산
      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;
      let minZ = Infinity, maxZ = -Infinity;

      fbx.traverse((child) => {
        if (child instanceof THREE.Mesh && child.geometry) {
          child.updateMatrixWorld();
          const worldMatrix = child.matrixWorld;
          const positions = child.geometry.attributes.position.array as Float32Array;

          for (let i = 0; i < positions.length; i += 3) {
            const vertex = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
            vertex.applyMatrix4(worldMatrix);
            minX = Math.min(minX, vertex.x);
            maxX = Math.max(maxX, vertex.x);
            minY = Math.min(minY, vertex.y);
            maxY = Math.max(maxY, vertex.y);
            minZ = Math.min(minZ, vertex.z);
            maxZ = Math.max(maxZ, vertex.z);
          }
        }
      });

      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;
      const centerZ = (minZ + maxZ) / 2;
      const maxDim = Math.max(maxX - minX, maxY - minY, maxZ - minZ);
      const normalizeScale = 4.0 / maxDim;

      // 엣지 및 표면 포인트 추출
      fbx.traverse((child) => {
        if (child instanceof THREE.Mesh && child.geometry) {
          child.updateMatrixWorld();
          const worldMatrix = child.matrixWorld;

          // 엣지 추출
          const edges = new THREE.EdgesGeometry(child.geometry, 15);
          const edgePositions = edges.attributes.position.array as Float32Array;
          const transformedEdges = new Float32Array(edgePositions.length);

          for (let i = 0; i < edgePositions.length; i += 3) {
            const vertex = new THREE.Vector3(edgePositions[i], edgePositions[i + 1], edgePositions[i + 2]);
            vertex.applyMatrix4(worldMatrix);
            transformedEdges[i] = (vertex.x - centerX) * normalizeScale;
            transformedEdges[i + 1] = (vertex.y - centerY) * normalizeScale;
            transformedEdges[i + 2] = (vertex.z - centerZ) * normalizeScale;
          }
          allEdges.push(transformedEdges);

          // 메시 표면 샘플링 (삼각형 면적 기반)
          const geometry = child.geometry;
          const posAttr = geometry.attributes.position;
          const index = geometry.index;

          if (index) {
            // 인덱스가 있는 경우
            for (let i = 0; i < index.count; i += 3) {
              const a = index.getX(i);
              const b = index.getX(i + 1);
              const c = index.getX(i + 2);

              const vA = new THREE.Vector3().fromBufferAttribute(posAttr, a).applyMatrix4(worldMatrix);
              const vB = new THREE.Vector3().fromBufferAttribute(posAttr, b).applyMatrix4(worldMatrix);
              const vC = new THREE.Vector3().fromBufferAttribute(posAttr, c).applyMatrix4(worldMatrix);

              // 삼각형 면적에 비례하여 샘플 수 결정
              const ab = vB.clone().sub(vA);
              const ac = vC.clone().sub(vA);
              const area = ab.cross(ac).length() * 0.5;
              const samples = Math.max(1, Math.floor(area * normalizeScale * normalizeScale * 50));

              for (let s = 0; s < samples; s++) {
                // 삼각형 내 랜덤 점 (barycentric coordinates)
                let r1 = Math.random();
                let r2 = Math.random();
                if (r1 + r2 > 1) {
                  r1 = 1 - r1;
                  r2 = 1 - r2;
                }
                const point = vA.clone()
                  .add(ab.clone().multiplyScalar(r1))
                  .add(ac.clone().multiplyScalar(r2));

                allSurfacePoints.push(
                  (point.x - centerX) * normalizeScale,
                  (point.y - centerY) * normalizeScale,
                  (point.z - centerZ) * normalizeScale
                );
              }
            }
          } else {
            // 인덱스가 없는 경우 (각 3개 정점이 삼각형)
            for (let i = 0; i < posAttr.count; i += 3) {
              const vA = new THREE.Vector3().fromBufferAttribute(posAttr, i).applyMatrix4(worldMatrix);
              const vB = new THREE.Vector3().fromBufferAttribute(posAttr, i + 1).applyMatrix4(worldMatrix);
              const vC = new THREE.Vector3().fromBufferAttribute(posAttr, i + 2).applyMatrix4(worldMatrix);

              const ab = vB.clone().sub(vA);
              const ac = vC.clone().sub(vA);
              const area = ab.cross(ac).length() * 0.5;
              const samples = Math.max(1, Math.floor(area * normalizeScale * normalizeScale * 50));

              for (let s = 0; s < samples; s++) {
                let r1 = Math.random();
                let r2 = Math.random();
                if (r1 + r2 > 1) {
                  r1 = 1 - r1;
                  r2 = 1 - r2;
                }
                const point = vA.clone()
                  .add(ab.clone().multiplyScalar(r1))
                  .add(ac.clone().multiplyScalar(r2));

                allSurfacePoints.push(
                  (point.x - centerX) * normalizeScale,
                  (point.y - centerY) * normalizeScale,
                  (point.z - centerZ) * normalizeScale
                );
              }
            }
          }
        }
      });

      // 엣지 병합
      const totalEdgeLength = allEdges.reduce((sum, arr) => sum + arr.length, 0);
      const mergedEdges = new Float32Array(totalEdgeLength);
      let offset = 0;
      for (const arr of allEdges) {
        mergedEdges.set(arr, offset);
        offset += arr.length;
      }

      cachedFBXData = {
        edgesPositions: mergedEdges,
        surfacePositions: new Float32Array(allSurfacePoints),
        normalizeParams: { centerX, centerY, centerZ, scale: normalizeScale }
      };

      resolve(cachedFBXData);
    });
  });

  return fbxLoadPromise;
}

// 도시 와이어프레임 컴포넌트 - city.fbx 실제 모델 사용
interface CityWireframeProps {
  scrollStateRef: React.MutableRefObject<{ currentIndex: number; nextIndex: number; transition: number }>;
}

function CityWireframe({ scrollStateRef }: CityWireframeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.Group>(null);
  const modelRotationRef = useRef<THREE.Group>(null); // 디버그용 회전 그룹
  const [edgesGeometry, setEdgesGeometry] = useState<THREE.BufferGeometry | null>(null);
  const materialRef = useRef<THREE.LineBasicMaterial | null>(null);
  const debugSettingsRef = useRef<CityModelSettings>(getCityModelSettings());

  // 디버그 설정 구독
  useEffect(() => {
    const unsubscribe = subscribeToCityModelSettings((settings) => {
      debugSettingsRef.current = settings;
    });
    return () => { unsubscribe(); };
  }, []);

  // FBX 모델 로드 및 엣지 추출
  useEffect(() => {
    loadFBXModel().then((data) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(data.edgesPositions, 3));
      setEdgesGeometry(geometry);
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !wireframeRef.current || !materialRef.current || !modelRotationRef.current) return;

    const { currentIndex, nextIndex, transition } = scrollStateRef.current;
    const currentConfig = sectionConfigs[currentIndex];
    const nextConfig = sectionConfigs[nextIndex];
    if (!currentConfig || !nextConfig) return;

    // city shape일 때만 보이도록 opacity 조절
    const isCurrentCity = currentConfig.shape === 'city';
    const isNextCity = nextConfig.shape === 'city';

    let targetOpacity = 0;
    if (isCurrentCity && isNextCity) {
      targetOpacity = 0.25;
    } else if (isCurrentCity) {
      targetOpacity = 0.25 * (1 - transition);
    } else if (isNextCity) {
      targetOpacity = 0.25 * transition;
    }

    materialRef.current.opacity = targetOpacity;

    // 디버그 설정 적용
    const debug = debugSettingsRef.current;
    const degToRad = Math.PI / 180;

    // city shape 비율 계산 (와이어프레임은 city일 때만 보이므로 cityFactor 사용)
    let cityFactor = 0;
    if (isCurrentCity && isNextCity) {
      cityFactor = 1;
    } else if (isCurrentCity) {
      cityFactor = 1 - transition;
    } else if (isNextCity) {
      cityFactor = transition;
    }

    // 파티클과 동일한 위치/스케일 적용 + 디버그 스케일
    const p = transition;
    const currentScale = currentConfig.scale;
    const nextScale = nextConfig.scale;
    const debugScale = 1 + (debug.scale - 1) * cityFactor;
    const targetScale = (currentScale + (nextScale - currentScale) * p) * debugScale;
    wireframeRef.current.scale.setScalar(targetScale);

    // 위치 계산 (파티클과 동일) + 디버그 오프셋
    const cam = state.camera as THREE.PerspectiveCamera;
    const aspect = state.size.width / state.size.height;
    const vFov = (cam.fov * Math.PI) / 180;
    const halfHeight = Math.tan(vFov / 2) * cam.position.z;
    const halfWidth = halfHeight * aspect;

    const getPositionFromConfig = (config: SectionConfig) => {
      if (config.anchorId) {
        const anchor = document.getElementById(config.anchorId);
        if (anchor) {
          const rect = anchor.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const ndcX = (centerX / window.innerWidth) * 2 - 1;
          const ndcY = -((centerY / window.innerHeight) * 2 - 1);
          return { x: ndcX * halfWidth, y: ndcY * halfHeight };
        }
      }
      return {
        x: ((config.position.x - 50) / 50) * halfWidth,
        y: ((50 - config.position.y) / 50) * halfHeight,
      };
    };

    const posA = getPositionFromConfig(currentConfig);
    const posB = getPositionFromConfig(nextConfig);
    groupRef.current.position.x = posA.x + (posB.x - posA.x) * p;
    groupRef.current.position.y = posA.y + (posB.y - posA.y) * p + debug.offsetY * cityFactor;

    // 디버그 회전 (city일 때만 적용)
    modelRotationRef.current.rotation.x = debug.rotationX * degToRad * cityFactor;
    modelRotationRef.current.rotation.y = debug.rotationY * degToRad * cityFactor;
    modelRotationRef.current.rotation.z = debug.rotationZ * degToRad * cityFactor;

    // 애니메이션 회전 (스핀)
    const spinAngle = (state.clock.elapsedTime * 0.12) % (Math.PI * 2);
    wireframeRef.current.rotation.y = spinAngle;
  });

  if (!edgesGeometry) return null;

  return (
    <group ref={groupRef}>
      <group ref={modelRotationRef}>
        <group ref={wireframeRef}>
          <lineSegments geometry={edgesGeometry}>
            <lineBasicMaterial
              ref={materialRef}
              color={0x1a3a6e}
              transparent
              opacity={0}
            />
          </lineSegments>
        </group>
      </group>
    </group>
  );
}

interface GlobalParticle3DProps {
  onReady?: () => void;
}

export default function GlobalParticle3D({ onReady }: GlobalParticle3DProps) {
  const [particleCount] = useState(getParticleCount);
  const scrollStateRef = useGlobalScrollProgressRef({ sectionIds });
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  // 마우스 위치 및 속도 추적
  const mouseRef = useRef<MouseState>({ x: 0, y: 0, vx: 0, vy: 0, active: false });

  // 마우스 이벤트 리스너
  useEffect(() => {
    // 카메라 설정과 일치하는 좌표 변환
    const cameraZ = 5.5;
    const fov = 50;
    const vFov = (fov * Math.PI) / 180;

    let lastX = 0;
    let lastY = 0;
    let lastTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      // 화면 좌표를 3D 공간 좌표로 변환 (카메라 FOV 기반)
      const aspect = window.innerWidth / window.innerHeight;
      const halfHeight = Math.tan(vFov / 2) * cameraZ;
      const halfWidth = halfHeight * aspect;

      // -1 ~ 1로 정규화 후 실제 3D 공간 좌표로 변환
      const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      const ndcY = -((e.clientY / window.innerHeight) * 2 - 1);

      const x = ndcX * halfWidth;
      const y = ndcY * halfHeight;

      // 속도 계산 (시간 기반)
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1) / 16.67; // 60fps 기준 정규화
      const vx = (x - lastX) / dt;
      const vy = (y - lastY) / dt;

      lastX = x;
      lastY = y;
      lastTime = now;

      mouseRef.current = { x, y, vx, vy, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.vx = 0;
      mouseRef.current.vy = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const shapeDataRef = useRef<Record<ShapeType, ShapeEntry>>({} as Record<ShapeType, ShapeEntry>);
  const prevCountRef = useRef<number>(-1);

  // FBX 모델 로드 후 city shape 데이터 업데이트
  // 핵심: 와이어프레임의 엣지 좌표를 파티클 위치로 직접 사용 → 완벽한 동기화
  useEffect(() => {
    loadFBXModel().then((fbxData) => {
      const baseCount = getBaseCount();
      const edgePoints = fbxData.edgesPositions; // 와이어프레임과 동일한 좌표 사용!

      const positions = new Float32Array(particleCount * 3);

      // 엣지 포인트에서 파티클 위치 샘플링 (선 위에 파티클 배치)
      const numEdgePoints = edgePoints.length / 3;
      for (let i = 0; i < baseCount; i++) {
        // 두 엣지 포인트 사이를 보간하여 선 위에 파티클 배치
        const edgeIdx = Math.floor(Math.random() * (numEdgePoints / 2)) * 2; // 라인 세그먼트 선택
        const t = Math.random(); // 선 위의 위치 (0~1)

        const p1Idx = edgeIdx * 3;
        const p2Idx = (edgeIdx + 1) * 3;

        // 두 점 사이를 보간
        positions[i * 3] = edgePoints[p1Idx] + (edgePoints[p2Idx] - edgePoints[p1Idx]) * t;
        positions[i * 3 + 1] = edgePoints[p1Idx + 1] + (edgePoints[p2Idx + 1] - edgePoints[p1Idx + 1]) * t;
        positions[i * 3 + 2] = edgePoints[p1Idx + 2] + (edgePoints[p2Idx + 2] - edgePoints[p1Idx + 2]) * t;
      }

      // 초과분: 화면 밖 구면 랜덤 분포
      for (let i = baseCount; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 20 + Math.random() * 20;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }

      const alphas = new Float32Array(particleCount);
      for (let i = 0; i < baseCount; i++) {
        alphas[i] = 1.0;
      }
      for (let i = baseCount; i < particleCount; i++) {
        alphas[i] = 0;
      }

      // city shape 데이터 업데이트
      if (shapeDataRef.current.city) {
        shapeDataRef.current.city = { positions, alphas };
      }
    });
  }, [particleCount]);

  if (prevCountRef.current !== particleCount) {
    prevCountRef.current = particleCount;
    const baseCount = getBaseCount();
    const data: Record<ShapeType, ShapeEntry> = {} as Record<ShapeType, ShapeEntry>;
    const usedShapes = new Set(sectionConfigs.map(c => c.shape));

    for (const shape of usedShapes) {
      const basePositions = shapeGenerators[shape](baseCount);
      const positions = new Float32Array(particleCount * 3);
      positions.set(basePositions);
      // 초과분: 화면 밖 구면 랜덤 분포 (반지름 20~40)
      // 카메라 z=5.5, FOV=50이면 가시 범위는 약 ±2.6 단위
      // 반지름 20 이상이면 화면 밖으로 확실히 벗어남
      for (let i = baseCount; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 20 + Math.random() * 20; // 20 ~ 40 범위
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      const alphas = new Float32Array(particleCount);
      for (let i = 0; i < baseCount; i++) {
        alphas[i] = 1.0;
      }
      // 초과 파티클은 완전히 투명하게 (배경에 보이지 않도록)
      for (let i = baseCount; i < particleCount; i++) {
        alphas[i] = 0;
      }
      data[shape] = { positions, alphas };
    }
    shapeDataRef.current = data;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
        frameloop="always"
        onCreated={() => {
          // 첫 프레임 렌더링 후 ready 콜백 호출
          requestAnimationFrame(() => {
            onReadyRef.current?.();
          });
        }}
      >
        <CleanupOnUnmount />
        <SmoothCamera mouseRef={mouseRef} />
        <MorphingParticlesInner
          shapeDataRef={shapeDataRef}
          scrollStateRef={scrollStateRef}
          particleCount={particleCount}
          mouseRef={mouseRef}
        />
        <CityWireframe scrollStateRef={scrollStateRef} />
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            mipmapBlur
            levels={3}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
