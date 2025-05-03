'use client';
import { PageHeader } from "@/components/layout/page-header";
import { learnerColumns } from "@/components/lessons/lesson-table/columns";
import { LessonDataTable } from "@/components/lessons/lesson-table/table";
import { getLessons } from "@/rpc/lessons";
import { useQuery } from "@tanstack/react-query";

export default function LearnPage() {
  const { isLoading, data } = useQuery({
    queryKey: ['lessons'],
    queryFn: async () => getLessons(),
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Lessons" description="Choose a lesson." />
      <div className="flex flex-col gap-2">
        {isLoading && <p>Loading...</p>}
        <LessonDataTable
          columns={learnerColumns}
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
    </div>
  );
}
