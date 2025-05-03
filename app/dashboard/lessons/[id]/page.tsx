'use client';
import { Icons } from '@/components/icons';
import { PageHeader } from '@/components/layout/page-header';
import { ConclusionCard } from '@/components/lessons/details/conclusion-card';
import { IntroductionCard } from '@/components/lessons/details/introduction-card';
import { SectionCard } from '@/components/lessons/details/section-card';
import { getLesson } from '@/rpc/lessons';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const { data, isPending } = useQuery({
    queryKey: ['lesson', id],
    queryFn: async () => await getLesson(id),
  });

  if (isPending || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Icons.spinner className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  const introduction = data.introduction as { title: string; description: string };
  const sections = data.sections as { title: string; content: string }[];
  const conclusion = data.conclusion as { content: string };

  return (
    <div className="grid gap-4">
      <PageHeader
        title={`${data?.subject} - ${data?.grade} - ${data?.topic}` || ''}
        description="Manage your lessons"
      />
      <div className="flex flex-col space-y-2">
        <IntroductionCard title={introduction.title} description={introduction.description} />
        {sections.map((section, idx) => (
          <SectionCard key={idx} title={section.title} content={section.content} />
        ))}
        <ConclusionCard content={conclusion.content} />
      </div>
    </div>
  );
}
