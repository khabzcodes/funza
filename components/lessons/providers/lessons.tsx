'use client';

import * as React from 'react';

type LessonContextProps = {
  introduction?: string | null;
  conclusion?: string | null;
  setIntoduction: (introduction: string) => void;
  setConclusion: (conclusion: string) => void;
};

const LessonContext = React.createContext<LessonContextProps | null>(null);

export function useLesson() {
  const context = React.useContext(LessonContext);
  if (!context) {
    throw new Error('useLesson must be used within a LessonContext.');
  }

  return context;
}

export function LessionProvider({
  introduction,
  conclusion,
  setIntoduction,
  setConclusion,
  children
}: React.ComponentProps<'div'> & {
  introduction?: string | null;
  conclusion?: string | null;
  setIntoduction: (introduction: string) => void;
  setConclusion: (conclusion: string) => void;
}) {
  return (
    <LessonContext.Provider value={{ introduction, conclusion, setIntoduction, setConclusion }}>
      {children}
    </LessonContext.Provider>
  );
}