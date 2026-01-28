'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface Scene3DState {
  activeScene: string | null;
  transitionProgress: number;
}

interface Scene3DContextType {
  state: Scene3DState;
  setActiveScene: (sceneId: string | null) => void;
  setTransitionProgress: (progress: number) => void;
}

const Scene3DContext = createContext<Scene3DContextType | undefined>(undefined);

export function Scene3DProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Scene3DState>({
    activeScene: null,
    transitionProgress: 0,
  });

  const setActiveScene = useCallback((sceneId: string | null) => {
    setState(prev => ({ ...prev, activeScene: sceneId }));
  }, []);

  const setTransitionProgress = useCallback((progress: number) => {
    setState(prev => ({ ...prev, transitionProgress: progress }));
  }, []);

  return (
    <Scene3DContext.Provider value={{ state, setActiveScene, setTransitionProgress }}>
      {children}
    </Scene3DContext.Provider>
  );
}

export function use3DScene() {
  const context = useContext(Scene3DContext);
  if (!context) {
    throw new Error('use3DScene must be used within Scene3DProvider');
  }
  return context;
}
