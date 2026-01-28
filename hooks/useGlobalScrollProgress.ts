'use client';

import { useEffect, useRef } from 'react';

export interface ScrollState {
  currentIndex: number;
  nextIndex: number;
  transition: number;
}

interface UseGlobalScrollProgressOptions {
  sectionIds: string[];
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

export function useGlobalScrollProgressRef({
  sectionIds,
}: UseGlobalScrollProgressOptions): React.MutableRefObject<ScrollState> {
  const stateRef = useRef<ScrollState>({
    currentIndex: 0,
    nextIndex: 1,
    transition: 0,
  });

  useEffect(() => {
    const holdRatio = 0.1; // 더 부드러운 전환을 위해 낮춤

    const compute = () => {
      const viewportCenter = window.innerHeight / 2;

      const centers: number[] = [];
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) {
          centers.push(Infinity);
          continue;
        }
        const rect = el.getBoundingClientRect();
        centers.push(rect.top + rect.height / 2);
      }

      let rawProgress = 0;

      if (viewportCenter <= centers[0]) {
        rawProgress = 0;
      } else if (viewportCenter >= centers[centers.length - 1]) {
        rawProgress = centers.length - 1;
      } else {
        for (let i = 0; i < centers.length - 1; i++) {
          if (viewportCenter >= centers[i] && viewportCenter < centers[i + 1]) {
            const linearT = (viewportCenter - centers[i]) / (centers[i + 1] - centers[i]);

            let mappedT: number;
            if (i === 0) {
              mappedT = smoothstep(linearT);
            } else if (linearT <= holdRatio) {
              mappedT = 0;
            } else if (linearT >= 1 - holdRatio) {
              mappedT = 1;
            } else {
              const normalized = (linearT - holdRatio) / (1 - 2 * holdRatio);
              mappedT = smoothstep(normalized);
            }

            rawProgress = i + mappedT;
            break;
          }
        }
      }

      const currentIndex = Math.max(0, Math.min(Math.floor(rawProgress), sectionIds.length - 2));
      const transition = Math.max(0, Math.min(1, rawProgress - currentIndex));
      const nextIndex = Math.min(currentIndex + 1, sectionIds.length - 1);

      stateRef.current.currentIndex = currentIndex;
      stateRef.current.nextIndex = nextIndex;
      stateRef.current.transition = transition;
    };

    // 초기 계산
    compute();

    // scroll 이벤트에서만 계산 (passive로 성능 확보)
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute, { passive: true });

    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, [sectionIds]);

  return stateRef;
}
