'use client';
import { AssessmentCard } from '@/components/assessments/assessment-card';
import { Icons } from '@/components/icons';
import { PageHeader } from '@/components/layout/page-header';
import { getLessons } from '@/rpc/lessons';
import { getStudentSubmissions } from '@/rpc/submissions';
import { useQueries } from '@tanstack/react-query';

export default function AssessmentsPage() {
  const [
    { data: lessons, isPending: loadingLessons },
    { data: submissions, isPending: loadingSubmissions },
  ] = useQueries({
    queries: [
      {
        queryFn: () => getLessons(),
        queryKey: ['lessons'],
      },
      {
        queryKey: ['student-submissions'],
        queryFn: () => getStudentSubmissions(),
      },
    ],
  });

  if (loadingLessons || loadingSubmissions || !lessons || !submissions) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Icons.spinner className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Assessments" description="" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson, idx) => {
          const isSubmitted = submissions.some(submission => submission.lessonId === lesson.id);
          const submission = submissions.find(submission => submission.lessonId === lesson.id);

          return (
            <AssessmentCard
              id={submission?.id}
              lessonId={lesson.id}
              key={idx}
              subject={lesson.subject}
              topic={lesson.topic}
              isSubmitted={isSubmitted}
            />
          );
        })}
      </div>
    </div>
  );
}
