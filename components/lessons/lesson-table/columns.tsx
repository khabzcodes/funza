'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { LessonTableData } from '@/types/lesson';
import { redirect } from 'next/navigation';

export const columns: ColumnDef<LessonTableData>[] = [
  {
    accessorKey: 'subject',
    header: () => <div className="text-left font-bold">Subject</div>,
    cell: ({ row }) => {
      const subject = row.original.subject;
      const lessonId = row.original.id;
      return (
        <div
          className="text-left font-medium capitalize cursor-pointer"
          onClick={() => redirect(`/dashboard/lessons/${lessonId}`)}
        >
          {subject}
        </div>
      );
    },
  },
  {
    accessorKey: 'topic',
    header: () => <div className="text-left font-bold">Topic</div>,
    cell: ({ row }) => {
      const topic = row.original.topic;
      return <div className="text-left font-medium">{topic}</div>;
    },
  },
  {
    accessorKey: 'grade',
    header: () => <div className="text-left font-bold">Grade</div>,
    cell: ({ row }) => {
      const grade = row.original.grade || 'N/A'; // Add grade property with a default value if missing
      return <div className="text-left font-medium">{grade}</div>;
    },
  },
  {
    accessorKey: 'submittedAssessments',
    header: () => <div className="text-left font-black">Submitted Assessments</div>,
    cell: ({ row }) => {
      const submittedAssessments = row.original.submittedAssessments || 0;
      return <div className="text-left font-medium">{submittedAssessments}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="text-left font-bold">Created At</div>,
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      return <div className="text-left font-medium">{createdAt}</div>;
    },
  },
];
