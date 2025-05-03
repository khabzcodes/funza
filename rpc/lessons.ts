import { baseRpcUrl } from '@/rpc/config';
import { CreateLessonFormInput } from '@/validations/lesson';

const route = baseRpcUrl.lessons;

export const createLesson = async (data: CreateLessonFormInput) => {
  const response = await route.$post({ json: data });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error creating lesson: ${error.message}`);
  }

  const { data: lesson } = await response.json();

  return lesson;
};

export const getLessons = async () => {
  const response = await route.$get();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error fetching lessons: ${error.message}`);
  }

  const { data: lessons } = await response.json();
  return lessons;
};

export const getLesson = async (id: string) => {
  const response = await route[':id'].$get({ param: { id } });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error fetching lesson: ${error.message}`);
  }
  const { data: lesson } = await response.json();
  return lesson;
};
