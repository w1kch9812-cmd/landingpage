'use client';

import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

/**
 * FBX 파일에서 메쉬를 로드하고, 표면에서 균일하게 N개의 점을 샘플링
 */
export async function loadFBXPoints(url: string, count: number): Promise<Float32Array> {
  const loader = new FBXLoader();

  const fbx = await new Promise<THREE.Group>((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });

  // 모든 메쉬의 지오메트리를 수집
  const geometries: THREE.BufferGeometry[] = [];
  fbx.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const geo = mesh.geometry.clone();
      // 월드 변환 적용
      geo.applyMatrix4(mesh.matrixWorld);
      if (!geo.index) {
        geometries.push(geo);
      } else {
        // indexed geometry → non-indexed로 변환
        geometries.push(geo.toNonIndexed());
      }
    }
  });

  if (geometries.length === 0) {
    // fallback: 빈 결과
    return new Float32Array(count * 3);
  }

  // 모든 삼각형의 면적을 계산해서 면적 비례 샘플링
  interface TriData {
    a: THREE.Vector3;
    b: THREE.Vector3;
    c: THREE.Vector3;
    area: number;
  }

  const triangles: TriData[] = [];
  let totalArea = 0;

  for (const geo of geometries) {
    const pos = geo.attributes.position;
    const triCount = Math.floor(pos.count / 3);

    for (let i = 0; i < triCount; i++) {
      const a = new THREE.Vector3().fromBufferAttribute(pos, i * 3);
      const b = new THREE.Vector3().fromBufferAttribute(pos, i * 3 + 1);
      const c = new THREE.Vector3().fromBufferAttribute(pos, i * 3 + 2);

      const ab = new THREE.Vector3().subVectors(b, a);
      const ac = new THREE.Vector3().subVectors(c, a);
      const area = ab.cross(ac).length() * 0.5;

      if (area > 0) {
        triangles.push({ a, b, c, area });
        totalArea += area;
      }
    }
  }

  // 누적 분포 함수(CDF) 빌드
  const cdf = new Float64Array(triangles.length);
  let cumulative = 0;
  for (let i = 0; i < triangles.length; i++) {
    cumulative += triangles[i].area / totalArea;
    cdf[i] = cumulative;
  }

  // 바운딩 박스 계산 (정규화용)
  const bbox = new THREE.Box3();
  for (const geo of geometries) {
    geo.computeBoundingBox();
    if (geo.boundingBox) {
      bbox.union(geo.boundingBox);
    }
  }

  const center = new THREE.Vector3();
  bbox.getCenter(center);
  const size = new THREE.Vector3();
  bbox.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  // 최종 스케일: 화면에 적절한 크기로 맞춤 (약 ±2.5 범위)
  const scale = 5.0 / maxDim;

  // N개의 점을 면적 비례로 샘플링
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    // 면적 비례로 삼각형 선택 (이진 탐색)
    const r = Math.random();
    let triIdx = binarySearch(cdf, r);
    if (triIdx >= triangles.length) triIdx = triangles.length - 1;

    const tri = triangles[triIdx];

    // 삼각형 내 균일 랜덤 점 (바리센트릭 좌표)
    let u = Math.random();
    let v = Math.random();
    if (u + v > 1) {
      u = 1 - u;
      v = 1 - v;
    }

    const x = tri.a.x + u * (tri.b.x - tri.a.x) + v * (tri.c.x - tri.a.x);
    const y = tri.a.y + u * (tri.b.y - tri.a.y) + v * (tri.c.y - tri.a.y);
    const z = tri.a.z + u * (tri.b.z - tri.a.z) + v * (tri.c.z - tri.a.z);

    // 중앙 정렬 + 스케일 (좌표 그대로 유지, 카메라 각도로 시점 처리)
    positions[i * 3] = (x - center.x) * scale;
    positions[i * 3 + 1] = (y - center.y) * scale;
    positions[i * 3 + 2] = (z - center.z) * scale;
  }

  return positions;
}

function binarySearch(cdf: Float64Array, value: number): number {
  let low = 0;
  let high = cdf.length - 1;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (cdf[mid] < value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
