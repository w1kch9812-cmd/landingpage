'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  backgroundColor: string;
  setTheme: (theme: ThemeMode) => void;
  setBackgroundColor: (color: string) => void;
  transitionToColor: (color: string, duration?: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  // CSS 변수를 통한 배경색 관리 (body 인라인 스타일 제거)
  useEffect(() => {
    document.documentElement.style.setProperty('--dynamic-bg-color', backgroundColor);
  }, [backgroundColor]);

  const transitionToColor = useCallback((color: string) => {
    setBackgroundColor(color);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        backgroundColor,
        setTheme,
        setBackgroundColor,
        transitionToColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 색상 보간 유틸리티 함수
export function interpolateColor(color1: string, color2: string, progress: number): string {
  const parseRgb = (color: string) => {
    if (color.startsWith('rgb')) {
      const match = color.match(/\d+/g);
      return match ? match.map(Number) : [255, 255, 255];
    }
    // hex 색상 파싱
    const hex = color.replace('#', '');
    return [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16),
    ];
  };

  const [r1, g1, b1] = parseRgb(color1);
  const [r2, g2, b2] = parseRgb(color2);

  const r = Math.round(r1 + (r2 - r1) * progress);
  const g = Math.round(g1 + (g2 - g1) * progress);
  const b = Math.round(b1 + (b2 - b1) * progress);

  return `rgb(${r}, ${g}, ${b})`;
}
