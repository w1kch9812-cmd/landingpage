/**
 * 3D 파티클 형태 좌표 데이터 생성 유틸리티
 * 각 형태는 N개의 점(x, y, z)으로 표현됨
 */

export type ShapeType =
  | 'city' | 'info' | 'gear' | 'steps' | 'chart'
  | 'lock' | 'building' | 'star' | 'network'
  | 'coin' | 'megaphone' | 'question' | 'envelope'
  | 'cluster' | 'blackhole' | 'wave';

// 건물 데이터 타입
export interface BuildingData {
  cx: number;
  cz: number;
  w: number;
  d: number;
  h: number;
}

// 조감도 회전 상수
const CITY_COS_X = 0.766; // cos(40°)
const CITY_SIN_X = 0.643; // sin(40°)
const CITY_COS_Y = 0.906; // cos(25°)
const CITY_SIN_Y = 0.423; // sin(25°)
const CITY_SCALE = 2.8;
const CITY_OFFSET_Y = -0.5;
const CITY_DEPTH_SCALE = 0.5;

// 조감도 회전 변환 함수
function transformCityPoint(lx: number, ly: number, lz: number): [number, number, number] {
  // Y축 회전
  const rx1 = lx * CITY_COS_Y + lz * CITY_SIN_Y;
  const rz1 = -lx * CITY_SIN_Y + lz * CITY_COS_Y;
  // X축 회전 (위에서 내려다보기)
  const ry1 = ly * CITY_COS_X - rz1 * CITY_SIN_X;
  const rz2 = ly * CITY_SIN_X + rz1 * CITY_COS_X;

  return [rx1 * CITY_SCALE, ry1 * CITY_SCALE + CITY_OFFSET_Y, rz2 * CITY_DEPTH_SCALE];
}

// 시드 기반 난수 생성기 (일관된 건물 배치용)
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// 도시 건물 데이터 생성 (시드 기반으로 일관된 결과)
export function generateCityBuildings(seed: number = 12345): BuildingData[] {
  const random = seededRandom(seed);
  const gridSize = 8;
  const blockSpacing = 0.55;
  const gap = 0.08;
  const buildings: BuildingData[] = [];

  for (let gx = 0; gx < gridSize; gx++) {
    for (let gz = 0; gz < gridSize; gz++) {
      const cx = (gx - gridSize / 2 + 0.5) * blockSpacing;
      const cz = (gz - gridSize / 2 + 0.5) * blockSpacing;

      const distFromCenter = Math.sqrt(cx * cx + cz * cz);
      const maxDist = (gridSize / 2) * blockSpacing;
      const heightFactor = 1.0 - (distFromCenter / maxDist) * 0.7;

      const numBuildings = random() > 0.3 ? 2 : 1;
      for (let b = 0; b < numBuildings; b++) {
        const bw = (blockSpacing - gap) * (numBuildings === 1 ? 0.85 : 0.42);
        const bd = (blockSpacing - gap) * (0.6 + random() * 0.25);
        const bh = (0.3 + random() * 1.2) * heightFactor;
        const ox = numBuildings === 2 ? (b === 0 ? -0.12 : 0.12) : 0;
        buildings.push({ cx: cx + ox, cz, w: bw, d: bd, h: bh });
      }
    }
  }

  return buildings;
}

// 건물 와이어프레임 라인 데이터 생성
export function generateCityWireframe(buildings: BuildingData[]): Float32Array {
  // 각 건물당 12개의 엣지 (박스형), 각 엣지당 2개의 점, 각 점당 3개의 좌표
  const linesPerBuilding = 12;
  const positions = new Float32Array(buildings.length * linesPerBuilding * 2 * 3);
  let idx = 0;

  for (const bld of buildings) {
    // 건물의 8개 꼭짓점 (로컬 좌표)
    const hw = bld.w / 2;
    const hd = bld.d / 2;
    const vertices = [
      // 바닥면 4개
      [bld.cx - hw, 0, bld.cz - hd],
      [bld.cx + hw, 0, bld.cz - hd],
      [bld.cx + hw, 0, bld.cz + hd],
      [bld.cx - hw, 0, bld.cz + hd],
      // 윗면 4개
      [bld.cx - hw, bld.h, bld.cz - hd],
      [bld.cx + hw, bld.h, bld.cz - hd],
      [bld.cx + hw, bld.h, bld.cz + hd],
      [bld.cx - hw, bld.h, bld.cz + hd],
    ];

    // 12개의 엣지 (바닥 4개, 윗면 4개, 수직 4개)
    const edges = [
      // 바닥면
      [0, 1], [1, 2], [2, 3], [3, 0],
      // 윗면
      [4, 5], [5, 6], [6, 7], [7, 4],
      // 수직
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];

    for (const [a, b] of edges) {
      const p1 = transformCityPoint(vertices[a][0], vertices[a][1], vertices[a][2]);
      const p2 = transformCityPoint(vertices[b][0], vertices[b][1], vertices[b][2]);

      positions[idx++] = p1[0];
      positions[idx++] = p1[1];
      positions[idx++] = p1[2];
      positions[idx++] = p2[0];
      positions[idx++] = p2[1];
      positions[idx++] = p2[2];
    }
  }

  return positions;
}

export const shapeGenerators: Record<ShapeType, (count: number) => Float32Array> = {
  city: generateCityPositions,
  info: generateInfoPositions,
  gear: generateGearPositions,
  steps: generateStepsPositions,
  chart: generateChartPositions,
  lock: generateLockPositions,
  building: generateBuildingPositions,
  star: generateStarPositions,
  network: generateNetworkPositions,
  coin: generateCoinPositions,
  megaphone: generateMegaphonePositions,
  question: generateQuestionPositions,
  envelope: generateEnvelopePositions,
  cluster: generateClusterPositions,
  blackhole: generateBlackholePositions,
  wave: generateWavePositions,
};

// 박스 표면의 랜덤 점 생성
function randomPointOnBox(
  w: number, h: number, d: number,
  cx = 0, cy = 0, cz = 0
): [number, number, number] {
  const totalArea = 2 * (w * h + w * d + h * d);
  const r = Math.random() * totalArea;

  let x: number, y: number, z: number;

  if (r < w * h * 2) {
    // 앞/뒤 면
    x = (Math.random() - 0.5) * w;
    y = (Math.random() - 0.5) * h;
    z = r < w * h ? d / 2 : -d / 2;
  } else if (r < w * h * 2 + w * d * 2) {
    // 위/아래 면
    x = (Math.random() - 0.5) * w;
    y = r < w * h * 2 + w * d ? h / 2 : -h / 2;
    z = (Math.random() - 0.5) * d;
  } else {
    // 좌/우 면
    x = r < totalArea - h * d ? w / 2 : -w / 2;
    y = (Math.random() - 0.5) * h;
    z = (Math.random() - 0.5) * d;
  }

  return [x + cx, y + cy, z + cz];
}

// 노이즈 추가
function addNoise(pos: [number, number, number], amount: number): [number, number, number] {
  return [
    pos[0] + (Math.random() - 0.5) * amount,
    pos[1] + (Math.random() - 0.5) * amount,
    pos[2] + (Math.random() - 0.5) * amount,
  ];
}

/**
 * 자물쇠 형태 점 생성
 * - 상단: 반원형 고리
 * - 하단: 직사각형 몸체
 * - 키홀: 원형 + 슬릿
 */
export function generateLockPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  const shackleCount = Math.floor(count * 0.35);
  const bodyCount = Math.floor(count * 0.50);
  const keyholeCount = count - shackleCount - bodyCount;

  let idx = 0;

  // 고리 (Shackle) - 반원 아치
  const shackleR = 1.0;       // 반원 반경
  const shackleThick = 0.25;  // 고리 두께
  const shackleTop = 0.8;     // 몸체 상단으로부터의 높이

  for (let i = 0; i < shackleCount; i++) {
    const angle = Math.random() * Math.PI; // 0 ~ PI (반원)
    const r = shackleR + (Math.random() - 0.5) * shackleThick;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r + shackleTop;
    const z = (Math.random() - 0.5) * shackleThick;

    const pos = addNoise([x, y, z], 0.02);
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  // 몸체 (Body) - 직사각형
  const bodyW = 2.4;
  const bodyH = 2.0;
  const bodyD = 0.6;
  const bodyCenterY = -0.2;

  for (let i = 0; i < bodyCount; i++) {
    const pos = addNoise(
      randomPointOnBox(bodyW, bodyH, bodyD, 0, bodyCenterY, 0),
      0.02
    );
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  // 키홀 (Keyhole) - 원 + 아래 슬릿
  const keyholeY = bodyCenterY + 0.1;
  const keyholeCircleR = 0.25;

  for (let i = 0; i < keyholeCount; i++) {
    let x: number, y: number, z: number;

    if (i < keyholeCount * 0.6) {
      // 원형 부분
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * keyholeCircleR;
      x = Math.cos(angle) * r;
      y = Math.sin(angle) * r + keyholeY;
      z = bodyD / 2 + 0.05;
    } else {
      // 슬릿 부분
      x = (Math.random() - 0.5) * 0.12;
      y = keyholeY - keyholeCircleR - Math.random() * 0.5;
      z = bodyD / 2 + 0.05;
    }

    const pos = addNoise([x, y, z], 0.01);
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  return positions;
}

/**
 * 건물 형태 점 생성
 * - 본체: 직육면체
 * - 지붕: 상단 슬래브
 * - 창문: 격자 패턴
 * - 문: 하단 중앙
 */
export function generateBuildingPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  const mainCount = Math.floor(count * 0.55);
  const roofCount = Math.floor(count * 0.15);
  const windowCount = Math.floor(count * 0.25);
  const doorCount = count - mainCount - roofCount - windowCount;

  let idx = 0;

  // 본체 - 직육면체
  const mainW = 2.2;
  const mainH = 2.8;
  const mainD = 1.2;
  const mainCenterY = 0.0;

  for (let i = 0; i < mainCount; i++) {
    const pos = addNoise(
      randomPointOnBox(mainW, mainH, mainD, 0, mainCenterY, 0),
      0.02
    );
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  // 지붕 - 상단 슬래브
  const roofW = 2.6;
  const roofH = 0.3;
  const roofD = 1.5;
  const roofY = mainCenterY + mainH / 2 + roofH / 2;

  for (let i = 0; i < roofCount; i++) {
    const pos = addNoise(
      randomPointOnBox(roofW, roofH, roofD, 0, roofY, 0),
      0.02
    );
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  // 창문 - 4열 3행 격자
  const windowW = 0.3;
  const windowH = 0.4;
  const windowCols = 4;
  const windowRows = 3;
  const windowSpacingX = mainW / (windowCols + 1);
  const windowSpacingY = (mainH - 0.8) / (windowRows + 1);
  const windowsPerSlot = Math.floor(windowCount / (windowCols * windowRows));

  for (let row = 0; row < windowRows; row++) {
    for (let col = 0; col < windowCols; col++) {
      const wx = -mainW / 2 + windowSpacingX * (col + 1);
      const wy = mainCenterY + mainH / 2 - 0.4 - windowSpacingY * (row + 1);
      const wz = mainD / 2 + 0.05;

      const slotCount = (row === windowRows - 1 && col === windowCols - 1)
        ? windowCount - windowsPerSlot * (windowCols * windowRows - 1)
        : windowsPerSlot;

      for (let i = 0; i < slotCount; i++) {
        const x = wx + (Math.random() - 0.5) * windowW;
        const y = wy + (Math.random() - 0.5) * windowH;
        const z = wz + Math.random() * 0.02;

        const pos = addNoise([x, y, z], 0.01);
        positions[idx++] = pos[0];
        positions[idx++] = pos[1];
        positions[idx++] = pos[2];
      }
    }
  }

  // 문 - 하단 중앙
  const doorW = 0.5;
  const doorH = 0.8;
  const doorY = mainCenterY - mainH / 2 + doorH / 2;

  for (let i = 0; i < doorCount; i++) {
    const x = (Math.random() - 0.5) * doorW;
    const y = doorY + (Math.random() - 0.5) * doorH;
    const z = mainD / 2 + 0.05;

    const pos = addNoise([x, y, z], 0.01);
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  return positions;
}

/**
 * 도시 형태 점 생성 - Placeholder
 * 실제 데이터는 GlobalParticle3D에서 FBX 모델 로드 후 교체됨
 * 초기 로딩 시 임시로 사용되는 간단한 구 형태
 */
export function generateCityPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const radius = 2.0;

  for (let i = 0; i < count; i++) {
    // 구면 랜덤 분포 (FBX 로드 전 임시 표시용)
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.random() * radius;

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return positions;
}

/**
 * 정보 문서 형태 (InfoSection)
 */
export function generateInfoPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const outlineCount = Math.floor(count * 0.5);
  const lineCount = count - outlineCount;
  let idx = 0;

  const docW = 2.0;
  const docH = 2.8;
  const docD = 0.1;

  for (let i = 0; i < outlineCount; i++) {
    const pos = addNoise(randomPointOnBox(docW, docH, docD, 0, 0, 0), 0.02);
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  const lineRows = 6;
  const linesPerRow = Math.floor(lineCount / lineRows);
  for (let row = 0; row < lineRows; row++) {
    const actualLines = row === lineRows - 1 ? lineCount - linesPerRow * (lineRows - 1) : linesPerRow;
    const lineY = docH / 2 - 0.5 - row * 0.35;
    const lineW = 1.2 + Math.random() * 0.4;
    for (let i = 0; i < actualLines; i++) {
      positions[idx++] = -lineW / 2 + Math.random() * lineW;
      positions[idx++] = lineY + (Math.random() - 0.5) * 0.08;
      positions[idx++] = docD / 2 + 0.02;
    }
  }

  return positions;
}

/**
 * 톱니바퀴 (Features)
 */
export function generateGearPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const toothCount = 8;
  const outerR = 1.8;
  const innerR = 1.3;
  const holeR = 0.5;
  const depth = 0.4;
  let idx = 0;

  for (let i = 0; i < count; i++) {
    let x: number, y: number, z: number;
    const section = Math.random();

    if (section < 0.15) {
      const angle = Math.random() * Math.PI * 2;
      const r = holeR + (Math.random() - 0.5) * 0.1;
      x = Math.cos(angle) * r;
      y = Math.sin(angle) * r;
      z = (Math.random() - 0.5) * depth;
    } else if (section < 0.5) {
      const angle = Math.random() * Math.PI * 2;
      const r = holeR + 0.1 + Math.random() * (innerR - holeR - 0.1);
      x = Math.cos(angle) * r;
      y = Math.sin(angle) * r;
      z = (Math.random() > 0.5 ? 1 : -1) * depth / 2;
    } else {
      const toothIdx = Math.floor(Math.random() * toothCount);
      const toothAngle = (toothIdx / toothCount) * Math.PI * 2;
      const toothWidth = (Math.PI * 2) / toothCount * 0.4;
      const angle = toothAngle + (Math.random() - 0.5) * toothWidth;
      const r = innerR + Math.random() * (outerR - innerR);
      x = Math.cos(angle) * r;
      y = Math.sin(angle) * r;
      z = (Math.random() - 0.5) * depth;
    }

    const pos = addNoise([x, y, z], 0.02);
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  return positions;
}

/**
 * 계단식 스텝 (HowItWorks)
 */
export function generateStepsPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const steps = 4;
  const stepW = 1.2;
  const stepH = 0.5;
  const stepD = 0.8;
  const perStep = Math.floor(count / steps);
  let idx = 0;

  for (let s = 0; s < steps; s++) {
    const actualCount = s === steps - 1 ? count - perStep * (steps - 1) : perStep;
    const sx = -1.5 + s * 1.0;
    const sy = -1.0 + s * 0.7;

    for (let i = 0; i < actualCount; i++) {
      const pos = addNoise(
        randomPointOnBox(stepW, stepH, stepD, sx, sy, 0),
        0.02
      );
      positions[idx++] = pos[0];
      positions[idx++] = pos[1];
      positions[idx++] = pos[2];
    }
  }

  return positions;
}

/**
 * 바 차트 (Metrics)
 */
export function generateChartPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const bars = [0.4, 0.7, 0.55, 0.9, 0.75, 0.85];
  const barW = 0.35;
  const barD = 0.3;
  const maxH = 3.0;
  const totalWeight = bars.reduce((s, h) => s + h, 0);
  let idx = 0;

  for (let b = 0; b < bars.length; b++) {
    const barH = bars[b] * maxH;
    const bCount = Math.floor(count * (bars[b] / totalWeight));
    const actualCount = b === bars.length - 1 ? count - idx / 3 : bCount;
    const bx = -1.4 + b * 0.6;
    const by = -1.5 + barH / 2;

    for (let i = 0; i < actualCount && idx < count * 3; i++) {
      const pos = addNoise(
        randomPointOnBox(barW, barH, barD, bx, by, 0),
        0.02
      );
      positions[idx++] = pos[0];
      positions[idx++] = pos[1];
      positions[idx++] = pos[2];
    }
  }

  return positions;
}

/**
 * 별 형태 (Testimonials)
 */
export function generateStarPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const points = 5;
  const outerR = 1.8;
  const innerR = 0.8;
  const depth = 0.3;
  let idx = 0;

  for (let i = 0; i < count; i++) {
    const pointIdx = Math.floor(Math.random() * points * 2);
    const angle1 = (pointIdx / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    const angle2 = ((pointIdx + 1) / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    const r1 = pointIdx % 2 === 0 ? outerR : innerR;
    const r2 = pointIdx % 2 === 0 ? innerR : outerR;

    const t = Math.random();
    const x = Math.cos(angle1) * r1 * (1 - t) + Math.cos(angle2) * r2 * t;
    const y = Math.sin(angle1) * r1 * (1 - t) + Math.sin(angle2) * r2 * t;
    const z = (Math.random() - 0.5) * depth;

    const pos = addNoise([x, y, z], 0.03);
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  return positions;
}

/**
 * 네트워크 노드 (Partners)
 */
export function generateNetworkPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const nodeCount = 7;
  const nodes: [number, number, number][] = [];

  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;
    const r = 1.2 + Math.random() * 0.5;
    nodes.push([Math.cos(angle) * r, Math.sin(angle) * r, (Math.random() - 0.5) * 0.4]);
  }
  nodes.push([0, 0, 0]);

  const nodeParticles = Math.floor(count * 0.4);
  const edgeParticles = count - nodeParticles;
  let idx = 0;

  const perNode = Math.floor(nodeParticles / nodes.length);
  for (let n = 0; n < nodes.length; n++) {
    const actualCount = n === nodes.length - 1 ? nodeParticles - perNode * (nodes.length - 1) : perNode;
    for (let i = 0; i < actualCount; i++) {
      const a1 = Math.random() * Math.PI * 2;
      const a2 = Math.random() * Math.PI;
      const r = 0.25 * Math.random();
      positions[idx++] = nodes[n][0] + Math.sin(a2) * Math.cos(a1) * r;
      positions[idx++] = nodes[n][1] + Math.sin(a2) * Math.sin(a1) * r;
      positions[idx++] = nodes[n][2] + Math.cos(a2) * r;
    }
  }

  const edges: [number, number][] = [];
  for (let i = 0; i < nodeCount; i++) {
    edges.push([i, nodes.length - 1]);
    edges.push([i, (i + 1) % nodeCount]);
  }
  const perEdge = Math.floor(edgeParticles / edges.length);

  for (let e = 0; e < edges.length && idx < count * 3; e++) {
    const actualCount = e === edges.length - 1 ? count - idx / 3 : perEdge;
    const [a, b] = edges[e];
    for (let i = 0; i < actualCount && idx < count * 3; i++) {
      const t = Math.random();
      const pos = addNoise([
        nodes[a][0] * (1 - t) + nodes[b][0] * t,
        nodes[a][1] * (1 - t) + nodes[b][1] * t,
        nodes[a][2] * (1 - t) + nodes[b][2] * t,
      ], 0.03);
      positions[idx++] = pos[0];
      positions[idx++] = pos[1];
      positions[idx++] = pos[2];
    }
  }

  return positions;
}

/**
 * 코인 (Pricing)
 */
export function generateCoinPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const radius = 1.5;
  const thickness = 0.3;
  const edgeCount = Math.floor(count * 0.4);
  const faceCount = Math.floor(count * 0.4);
  const symbolCount = count - edgeCount - faceCount;
  let idx = 0;

  for (let i = 0; i < edgeCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const pos = addNoise([
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      (Math.random() - 0.5) * thickness,
    ], 0.02);
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  for (let i = 0; i < faceCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * radius;
    const pos = addNoise([
      Math.cos(angle) * r,
      Math.sin(angle) * r,
      (i % 2 === 0 ? 1 : -1) * thickness / 2,
    ], 0.02);
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  for (let i = 0; i < symbolCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 0.4 + Math.random() * 0.3;
    positions[idx++] = Math.cos(angle) * r;
    positions[idx++] = Math.sin(angle) * r;
    positions[idx++] = thickness / 2 + 0.02;
  }

  return positions;
}

/**
 * 메가폰 (Request/CTA)
 */
export function generateMegaphonePositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const bellCount = Math.floor(count * 0.6);
  const handleCount = Math.floor(count * 0.25);
  const waveCount = count - bellCount - handleCount;
  let idx = 0;

  for (let i = 0; i < bellCount; i++) {
    const t = Math.random();
    const r = 0.2 + t * 1.2;
    const angle = Math.random() * Math.PI * 2;
    const pos = addNoise([
      -1.0 + t * 2.5,
      Math.cos(angle) * r,
      Math.sin(angle) * r * 0.3,
    ], 0.02);
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  for (let i = 0; i < handleCount; i++) {
    const pos = addNoise(randomPointOnBox(0.6, 0.3, 0.3, -1.3, -0.3, 0), 0.02);
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  for (let i = 0; i < waveCount; i++) {
    const waveIdx = Math.floor(Math.random() * 3);
    const r = 1.6 + waveIdx * 0.4;
    const angle = (Math.random() - 0.5) * Math.PI * 0.6;
    const pos = addNoise([
      1.5 + Math.cos(angle) * (r - 1.6) * 0.3,
      Math.sin(angle) * r * 0.5,
      (Math.random() - 0.5) * 0.2,
    ], 0.03);
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  return positions;
}

/**
 * 물음표 (FAQ)
 */
export function generateQuestionPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const curveCount = Math.floor(count * 0.7);
  const stemCount = Math.floor(count * 0.15);
  const dotCount = count - curveCount - stemCount;
  let idx = 0;

  const curveR = 0.8;
  for (let i = 0; i < curveCount; i++) {
    const angle = Math.random() * Math.PI * 1.5 - Math.PI * 0.25;
    const r = curveR + (Math.random() - 0.5) * 0.2;
    const pos = addNoise([
      Math.cos(angle) * r,
      Math.sin(angle) * r + 0.8,
      (Math.random() - 0.5) * 0.2,
    ], 0.02);
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  for (let i = 0; i < stemCount; i++) {
    positions[idx++] = (Math.random() - 0.5) * 0.15;
    positions[idx++] = -0.2 + Math.random() * 0.6;
    positions[idx++] = (Math.random() - 0.5) * 0.15;
  }

  for (let i = 0; i < dotCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.2;
    positions[idx++] = Math.cos(angle) * r;
    positions[idx++] = -0.8 + Math.sin(angle) * r;
    positions[idx++] = (Math.random() - 0.5) * 0.15;
  }

  return positions;
}

/**
 * 봉투 (ContactForm)
 */
export function generateEnvelopePositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const bodyCount = Math.floor(count * 0.6);
  const flapCount = Math.floor(count * 0.25);
  const lineCount = count - bodyCount - flapCount;
  let idx = 0;

  const envW = 2.8;
  const envH = 1.8;
  const envD = 0.15;

  for (let i = 0; i < bodyCount; i++) {
    const pos = addNoise(randomPointOnBox(envW, envH, envD, 0, 0, 0), 0.02);
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  for (let i = 0; i < flapCount; i++) {
    const t = Math.random();
    const s = Math.random();
    const x1 = -envW / 2, y1 = envH / 2;
    const x2 = envW / 2, y2 = envH / 2;
    const x3 = 0, y3 = -0.2;
    const sqrtT = Math.sqrt(t);
    positions[idx++] = (1 - sqrtT) * x1 + sqrtT * (1 - s) * x2 + sqrtT * s * x3;
    positions[idx++] = (1 - sqrtT) * y1 + sqrtT * (1 - s) * y2 + sqrtT * s * y3;
    positions[idx++] = envD / 2 + 0.02;
  }

  for (let i = 0; i < lineCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 0.3 + Math.random() * 0.1;
    positions[idx++] = Math.cos(angle) * r;
    positions[idx++] = Math.sin(angle) * r - 0.3;
    positions[idx++] = envD / 2 + 0.03;
  }

  return positions;
}

/**
 * 클러스터 - 모든 파티클이 작은 점으로 모여있음
 * 완전히 같은 점이면 블룸으로 인해 과도하게 밝아지므로
 * 아주 작은 반경(0.02)으로 분포
 */
export function generateClusterPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const radius = 0.02; // 매우 작은 반경 - 점처럼 보임

  for (let i = 0; i < count; i++) {
    // 구면 랜덤 분포
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.random() * radius;

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return positions;
}

/**
 * 블랙홀/소용돌이 형태 - 중심으로 빨려들어가는 나선 패턴
 * 여러 정보가 하나로 모이는 느낌을 표현
 */
export function generateBlackholePositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  // 3개의 나선 팔 (spiral arms)
  const numArms = 3;
  const maxRadius = 2.0;
  const centerDensity = 0.25; // 중앙 밀집 파티클 비율
  const armDensity = 0.55;    // 나선팔 파티클 비율
  const diskDensity = 0.20;   // 배경 디스크 파티클 비율

  const centerCount = Math.floor(count * centerDensity);
  const armCount = Math.floor(count * armDensity);
  const diskCount = count - centerCount - armCount;

  let idx = 0;

  // 1. 중앙 밀집 영역 (블랙홀 코어) - 강하게 압축된 구 형태
  for (let i = 0; i < centerCount; i++) {
    // 중앙에 가까울수록 밀도가 높은 분포
    const u = Math.random();
    const r = Math.pow(u, 2.5) * 0.4; // 제곱근 분포로 중앙 밀집
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    // 약간 납작한 구 형태
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta) * 0.6;
    const z = r * Math.cos(phi) * 0.3;

    const pos = addNoise([x, y, z], 0.01);
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  // 2. 나선 팔 (Spiral Arms) - 중심으로 빨려들어가는 형태
  const particlesPerArm = Math.floor(armCount / numArms);
  for (let arm = 0; arm < numArms; arm++) {
    const armOffset = (arm / numArms) * Math.PI * 2;
    const actualCount = arm === numArms - 1
      ? armCount - particlesPerArm * (numArms - 1)
      : particlesPerArm;

    for (let i = 0; i < actualCount; i++) {
      // 나선 매개변수 (바깥에서 안쪽으로)
      const t = Math.random(); // 0 = 바깥, 1 = 중앙
      const r = maxRadius * (1 - Math.pow(t, 0.7)); // 바깥쪽이 더 넓게

      // 나선 각도: 안쪽으로 갈수록 더 많이 회전
      const spiralTurns = 1.5; // 나선 회전 수
      const angle = armOffset + t * spiralTurns * Math.PI * 2;

      // 팔의 두께 (안쪽으로 갈수록 좁아짐)
      const armWidth = 0.3 * (1 - t * 0.7);
      const widthOffset = (Math.random() - 0.5) * armWidth;

      const x = Math.cos(angle) * (r + widthOffset);
      const y = Math.sin(angle) * (r + widthOffset);
      // Z축: 디스크 형태이므로 얇게
      const z = (Math.random() - 0.5) * 0.15 * (1 - t);

      const pos = addNoise([x, y, z], 0.02);
      positions[idx++] = pos[0];
      positions[idx++] = pos[1];
      positions[idx++] = pos[2];
    }
  }

  // 3. 배경 디스크 - 전체적인 원반 형태
  for (let i = 0; i < diskCount; i++) {
    const r = Math.sqrt(Math.random()) * maxRadius; // 균일한 면적 분포
    const angle = Math.random() * Math.PI * 2;

    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    const z = (Math.random() - 0.5) * 0.1;

    const pos = addNoise([x, y, z], 0.03);
    positions[idx++] = pos[0];
    positions[idx++] = pos[1];
    positions[idx++] = pos[2];
  }

  return positions;
}

/**
 * 물결 형태 - 넓고 우아한 평면
 * 화면을 가득 채우는 크기, 애니메이션에서 부드러운 물결 효과
 */
export function generateWavePositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  // 더 넓은 평면 영역 (화면을 가득 채움)
  const width = 10.0;
  const depth = 7.0;

  for (let i = 0; i < count; i++) {
    // 균일한 평면 분포
    const x = (Math.random() - 0.5) * width;
    const z = (Math.random() - 0.5) * depth;
    const y = 0;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  return positions;
}
