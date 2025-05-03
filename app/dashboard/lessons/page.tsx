'use client';
import { Icons } from '@/components/icons';
import { PageHeader } from '@/components/layout/page-header';
import { CreateLessonDialog } from '@/components/lessons/create-lesson/create-lesson-dialog';
import { columns } from '@/components/lessons/lesson-table/columns';
import { LessonDataTable } from '@/components/lessons/lesson-table/table';
import { Button } from '@/components/ui/button';
import { getLessons } from '@/rpc/lessons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function LessonsPage() {
  const [open, setOpen] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ['lessons'],
    queryFn: async () => getLessons(),
  });
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Lessons" description="Manage your lessons.">
        <Button size="sm" onClick={() => setOpen(true)}>
          <Icons.squarePlus />
          Create Lesson
        </Button>
      </PageHeader>
      <div className="flex flex-col gap-2">
        {isLoading && <p>Loading...</p>}
        {!isLoading && data?.length === 0 && <p>No lessons found.</p>}
        <LessonDataTable
          columns={columns}
          data={
            data?.map(lesson => ({
              id: lesson.id,
              subject: lesson.subject,
              topic: lesson.topic,
              grade: lesson.grade || 'N/A', // Add grade property with a default value if missing
              submittedAssessments: 0,
              createdAt: lesson.createdAt || '', // Ensure createdAt is a string
            })) || []
          }
        />
      </div>
      <CreateLessonDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
