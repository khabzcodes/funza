'use client';
import { Icons } from '@/components/icons';
import { PageHeader } from '@/components/layout/page-header';
import { CreateLessonDialog } from '@/components/lessons/create-lesson/create-lesson-dialog';
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {!isLoading &&
            data?.map(lesson => (
              <div
                key={lesson.id}
                className="flex items-center justify-between p-4 border rounded-md"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Icons.book className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold capitalize">{lesson.subject}</h3>
                    <p className="text-sm text-muted-foreground">{lesson.subject}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <CreateLessonDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
