export interface WorkflowLessonResponse {
  results: {
    introduction_generator: GeneratorOutput;
    sections_generator: SectionsGeneratorOutput;
    conclusion_generator: ConclusionGeneratorOutput;
  };
  activePaths: Record<string, unknown>;
  timestamp: number;
  runId: string;
}

interface GeneratorOutput {
  status: 'success' | 'failure';
  output: {
    title: string;
    description: string;
  };
}

interface SectionsGeneratorOutput {
  status: 'success' | 'failure';
  output: {
    sections: Section[];
  };
}

interface ConclusionGeneratorOutput {
  status: 'success' | 'failure';
  output: {
    introduction: {
      title: string;
      description: string;
    };
    sections: {
      sections: Section[];
    };
    conclusion: {
      content: string;
    };
  };
}

interface Section {
  title: string;
  content: string;
}
