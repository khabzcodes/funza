'use client';
import { Icons } from '@/components/icons';
import { PageHeader } from '@/components/layout/page-header';
import { ConclusionCard } from '@/components/lessons/details/conclusion-card';
import { IntroductionCard } from '@/components/lessons/details/introduction-card';
import { SectionCard } from '@/components/lessons/details/section-card';
import { useLesson } from '@/components/lessons/providers/lessons';
import { Button } from '@/components/ui/button';
import { getLesson } from '@/rpc/lessons';
import { useQuery } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { setConclusion, setIntoduction } = useLesson();
  const { id } = React.use(params);

  const { data, isPending } = useQuery({
    queryKey: ['lesson', id],
    queryFn: async () => await getLesson(id),
  });

  useEffect(() => {
    if (!data) return;
    const introduction = data.introduction as { title: string; description: string };
    const conclusion = data.conclusion as { content: string };

    setIntoduction(introduction?.description);
    setConclusion(conclusion.content);
  }, [data, setIntoduction, setConclusion]);

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
        title={`${data?.subject}` || ''}
        description={`${data?.topic} - ${data.grade}` || ''}
      >
        <Button size="sm" className='cursor-pointer' onClick={() => redirect(`/dashboard/assessmemnts/${data?.id}`)}>
          <Icons.squarePlus />
          Start Assessment
        </Button>
      </PageHeader>
      <div className="flex flex-col space-y-2">
        <IntroductionCard title={introduction.title} description={introduction.description} />
        {sections.map((section, idx) => (
          <SectionCard key={idx} title={section.title} content={section.content} />
        ))}
        <ConclusionCard content={conclusion.content} />
      </div>
    </div>
  )
}