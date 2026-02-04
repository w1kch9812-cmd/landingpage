'use client';

import React from 'react';
import Lottie from 'lottie-react';

const checkAnimationData = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: "Check",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Check",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ind: 0,
              ty: "sh",
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0]],
                  v: [[-18, 0], [-6, 12], [18, -12]],
                  c: false
                }
              },
              nm: "Path"
            },
            {
              ty: "st",
              c: { a: 0, k: [0, 0.443, 1, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 6 },
              lc: 2,
              lj: 2,
              nm: "Stroke"
            },
            {
              ty: "tm",
              s: { a: 0, k: 0 },
              e: {
                a: 1,
                k: [
                  { i: { x: [0.2], y: [1] }, o: { x: [0.8], y: [0] }, t: 15, s: [0] },
                  { t: 45, s: [100] }
                ]
              },
              o: { a: 0, k: 0 },
              m: 1,
              nm: "Trim"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ],
          nm: "Check Group"
        }
      ],
      ip: 0,
      op: 60,
      st: 0
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { i: { x: [0.2, 0.2, 0.2], y: [1, 1, 1] }, o: { x: [0.8, 0.8, 0.8], y: [0, 0, 0] }, t: 0, s: [0, 0, 100] },
            { t: 20, s: [100, 100, 100] }
          ]
        }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [70, 70] },
              p: { a: 0, k: [0, 0] },
              nm: "Ellipse"
            },
            {
              ty: "st",
              c: { a: 0, k: [0, 0.443, 1, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 4 },
              lc: 2,
              lj: 2,
              nm: "Stroke"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ],
          nm: "Circle Group"
        }
      ],
      ip: 0,
      op: 60,
      st: 0
    }
  ]
};

interface CheckAnimationProps {
  size?: number;
  className?: string;
}

export default function CheckAnimation({ size = 80, className }: CheckAnimationProps) {
  return (
    <Lottie
      animationData={checkAnimationData}
      loop={false}
      autoplay={true}
      style={{ width: size, height: size }}
      className={className}
    />
  );
}
