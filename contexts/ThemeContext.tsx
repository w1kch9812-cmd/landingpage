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
