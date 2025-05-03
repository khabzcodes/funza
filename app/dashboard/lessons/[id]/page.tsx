'use client';
import { Icons } from '@/components/icons';
import { PageHeader } from '@/components/layout/page-header';
import { ConclusionCard } from '@/components/lessons/details/conclusion-card';
import { IntroductionCard } from '@/components/lessons/details/introduction-card';
import { SectionCard } from '@/components/lessons/details/section-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { generateAssessment } from '@/rpc/assessments';
import { getLesson } from '@/rpc/lessons';
import { Question } from '@/types/questions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => await generateAssessment(id),
    onSuccess: response => {
      toast.success(`Assessment generated: ${response}`);
      queryClient.invalidateQueries({
        queryKey: ['lesson', id],
      });
    },
    onError: error => {
      console.error('Error fetching lesson:', error);
    },
  });

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
  const questions = data.questions as Question[];

  return (
    <div className="grid gap-4">
      <PageHeader
        title={`${data?.subject}` || ''}
        description={`${data?.topic} - ${data.grade}` || ''}
      />
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <div className="flex flex-col space-y-2">
            <IntroductionCard title={introduction.title} description={introduction.description} />
            {sections.map((section, idx) => (
              <SectionCard key={idx} title={section.title} content={section.content} />
            ))}
            <ConclusionCard content={conclusion.content} />
          </div>
        </TabsContent>
        <TabsContent value="assessment">
          <div className="w-full flex justify-end">
            <Button size="sm" onClick={() => mutation.mutate(id)} disabled={mutation.isPending}>
              <Icons.squarePlus className="mr-2" />
              {mutation.isPending ? 'Generating...' : 'Generate Assessment'}
            </Button>
          </div>
          {questions?.map((question, idx) => (
            <div key={idx} className="w-full p-4 my-2 bg-gray-100 rounded-md">
              <p className="text-sm">
                {idx + 1}. {question.question}
              </p>
              <div className="flex flex-col gap-1 pl-6">
                {question.options.map(option => (
                  <div
                    key={`${question.question}-${option.id}`}
                    className={cn('text-xs', option.isCorrect && 'text-green-500')}
                  >
                    - {option.option}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
