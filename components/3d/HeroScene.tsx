'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function HeroScene() {
  const [shouldRender, setShouldRender] = useState(false);

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
    <>
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js"
        type="module"
        strategy="afterInteractive"
      />
      <div style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        zIndex: 5,
        pointerEvents: 'auto'
      }}>
        {/* @ts-expect-error */}
        <spline-viewer
          url="/spline/scene.splinecode"
          events-target="global"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </>
  );
}
