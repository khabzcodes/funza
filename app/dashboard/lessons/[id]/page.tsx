'use client';
import React from 'react';

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  return <div>{id}</div>;
}
