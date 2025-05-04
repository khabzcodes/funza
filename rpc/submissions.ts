import { baseRpcUrl } from '@/rpc/config';

const route = baseRpcUrl.submissions;

export const getStudentSubmissions = async () => {
  const response = await route.$get();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch submissions');
  }

  const { data } = await response.json();

  return data;
};

export const startAssessment = async (lessonId: string) => {
  const response = await route.startAssessment[':lessonId'].$post({
    param: { lessonId },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to start assessment');
  }

  const { data } = await response.json();
  return data;
};

export const getSubmission = async (id: string) => {
  const response = await route[':id'].$get({ param: { id } });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch submission');
  }

  const { data } = await response.json();

  return data;
};

export const submitAssessment = async (
  id: string,
  data: { question: string; answer: string; isCorrect: boolean }[]
) => {
  const response = await route[':id'].submit.$post({ param: { id }, json: data });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit assessment');
  }

  const { data: submission } = await response.json();

  return submission;
};
