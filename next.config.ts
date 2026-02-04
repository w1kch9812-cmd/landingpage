import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 번들 최적화
  experimental: {
    // 최적화된 패키지 임포트
    optimizePackageImports: ['framer-motion', 'gsap', '@phosphor-icons/react'],
  },

  // 이미지 최적화
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // 빌드 시 소스맵 비활성화 (프로덕션)
  productionBrowserSourceMaps: false,

  // 컴파일러 옵션
  compiler: {
    // 프로덕션에서 console.log 제거
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
