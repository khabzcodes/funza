import { baseRpcUrl } from '@/rpc/config';

const route = baseRpcUrl.assessments;

export const generateAssessment = async (lessonId: string) => {
  const response = await route.generate[':id'].$post({ param: { id: lessonId } });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error generating assessment: ${error}`);
  }
  const { runId } = await response.json();

  return runId;
};
