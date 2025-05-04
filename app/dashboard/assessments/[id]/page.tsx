'use client';

import { Icons } from '@/components/icons';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getLessons } from '@/rpc/lessons';
import { getSubmission, submitAssessment } from '@/rpc/submissions';
import { Question } from '@/types/questions';
import { useMutation, useQueries } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface AssessmentPageInnerProps {
  questions: Question[];
  responses: Array<{ question: string; answer: string; isCorrect: boolean }>;
  setResponses: React.Dispatch<
    React.SetStateAction<
      {
        question: string;
        answer: string;
        isCorrect: boolean;
      }[]
    >
  >;
  onResponseChange: (question: string, value: string, isCorrect: boolean) => void;
  onSubmit: () => Promise<void>;
}

function AssessmentPageInner({
  questions,
  responses,
  setResponses,
  onResponseChange,
  onSubmit,
}: AssessmentPageInnerProps) {
  useEffect(() => {
    // Initialize responses state with empty answers for each question
    const initialResponses = questions.map(question => ({
      question: question.question,
      answer: '',
      isCorrect: false,
    }));
    setResponses(initialResponses);
  }, []);
  return (
    <>
      {questions?.map((question, idx) => (
        <div key={idx} className="w-full p-4 my-2 bg-gray-100 rounded-md">
          <p className="text-sm">
            {idx + 1}. {question.question}
          </p>
          <RadioGroup
            className="mt-4"
            onValueChange={value => {
              const selectedOption = question.options.find(option => option.id === value);
              onResponseChange(question.question, value, selectedOption?.isCorrect || false);
            }}
            value={responses[idx]?.answer || ''}
          >
            {question.options.map(option => (
              <div
                key={`${question.question}-${option.id}`}
                className="flex items-center space-x-2"
              >
                <RadioGroupItem value={option.id} id={`${option.id}`} />
                <Label htmlFor={`${option.id}`}>{option.option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
      <Button type="button" className="mt-4" onClick={onSubmit}>
        Submit Assessment
      </Button>
    </>
  );
}

export default function AssessmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const mutation = useMutation({
    mutationFn: (data: { question: string; answer: string; isCorrect: boolean }[]) =>
      submitAssessment(id, data),
    onSuccess: () => {
      redirect('/dashboard/assessments');
    },
  });

  const [
    { data: lessons, isPending: loadingLessons },
    { data: submission, isPending: loadingSubmission },
  ] = useQueries({
    queries: [
      {
        queryFn: () => getLessons(),
        queryKey: ['lessons'],
      },
      {
        queryKey: ['submission'],
        queryFn: () => getSubmission(id),
      },
    ],
  });

  // State to store form responses
  const [responses, setResponses] = useState<
    Array<{ question: string; answer: string; isCorrect: boolean }>
  >([]);

  if (loadingLessons || loadingSubmission || !lessons || !submission) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Icons.spinner className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  const lesson = lessons?.find(lesson => lesson.id === submission.lessonId);

  const questions = lesson?.questions as unknown as Question[];

  // Handle change for any radio selection
  const handleResponseChange = (question: string, value: string, isCorrect: boolean) => {
    setResponses(prev => {
      const updatedResponses = [...prev];
      const index = updatedResponses.findIndex(response => response.question === question);
      if (index !== -1) {
        updatedResponses[index].answer = value;
        updatedResponses[index].isCorrect = isCorrect;
      } else {
        updatedResponses.push({ question, answer: value, isCorrect });
      }
      return updatedResponses;
    });
  };

  const handleSubmit = async () => {
    await mutation.mutateAsync(responses);
    // Implement your submission logic here
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title={`${lesson?.subject} ${lesson?.topic} Assessment` || ''} description="" />\
      <AssessmentPageInner
        questions={questions}
        responses={responses}
        setResponses={setResponses}
        onResponseChange={handleResponseChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
