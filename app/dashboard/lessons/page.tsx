'use client';
import { Icons } from '@/components/icons';
import { PageHeader } from '@/components/layout/page-header';
import { CreateLessonDialog } from '@/components/lessons/create-lesson/create-lesson-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function LessonsPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <PageHeader title="Lessons" description="Manage your lessons.">
        <Button size="sm" onClick={() => setOpen(true)}>
          <Icons.squarePlus />
          Create Lesson
        </Button>
      </PageHeader>
      <CreateLessonDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
