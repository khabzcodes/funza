export interface AssessmentResults {
  results: {
    assessment_question_generator: AssessmentSection;
    assessment_conclusion_generator: AssessmentSection;
  };
}

export interface AssessmentSection {
  status: 'success' | 'failure'; // Adjust if other statuses are possible
  output: {
    questions: Question[];
  };
}

export interface Question {
  question: string;
  options: Option[];
  answer: string; // The id of the correct answer
}

export interface Option {
  id: string; // Typically "a", "b", "c", "d"
  option: string;
  isCorrect: boolean;
}
