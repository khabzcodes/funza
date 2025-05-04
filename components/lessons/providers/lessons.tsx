'use client';

import * as React from 'react';

type LessonContextProps = {
  title?: string | undefined | null;
  setTitle: (title: string) => void;
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
  title,
  setTitle,
  children
}: React.ComponentProps<'div'> & {
  title?: string | undefined | null;
  setTitle: (title: string) => void;
}) {
  return (
    <LessonContext.Provider value={{ title, setTitle }}>
      {children}
    </LessonContext.Provider>
  );
}