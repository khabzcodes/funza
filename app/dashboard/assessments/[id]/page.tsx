'use client';

import React from 'react';

export default function AssessmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Assessment ID: {id}</h1>
    </div>
  );
}
