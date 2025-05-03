'use client';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useState } from 'react';
import { CreateLessonPlanDialog } from '@/components/lesson-plans/create-lesson-plan/create-lesson-plan-dialog';

export default function LessonPlans() {
  const [isOpenCreateLesson, setIsOpenCreateLesson] = useState(false);
  return (
    <div>
      <PageHeader title="Lesson Plans" description="Create and manage lesson plans">
        <Button size="sm" onClick={() => setIsOpenCreateLesson(!isOpenCreateLesson)}>
          <Icons.squarePlus />
          Create lesson plan
        </Button>
      </PageHeader>
      <CreateLessonPlanDialog open={isOpenCreateLesson} onOpenChange={setIsOpenCreateLesson} />
    </div>
  );
}
