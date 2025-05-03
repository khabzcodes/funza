'use client';
import { getLesson } from '@/rpc/lessons';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const { data, isPending } = useQuery({
    queryKey: ['lesson', id],
    queryFn: async () => await getLesson(id),
  });

  return <div>{id}</div>;
}
