type AskQuestionAction =  {
  action: "ASK_QUESTION";
  question: string;
  nextQuestion: string
};

type FollowUpAction = {
  action: "FOLLOW_UP";
  question: string;
};

export type CantContiueAction = {
  action: "CANT_CONTINUE",
  question: string
}

export type QuestionEvaluation = {
  question: string;

  expectedAnswer: string[];
  score: number;
 
};

type EndInterviewAction =  {
  action: "END_INTERVIEW";
  questionEvaluations: QuestionEvaluation[]; 
  overallScore: number;
  question: string
  summary: string;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  finalInterviewVerdict: string
  candidatePerspective: string
  selectionChances: "LOW" | "MEDIUM" | "HIGH";
};

export type AIAction =
  | AskQuestionAction
  | CantContiueAction
  | FollowUpAction
  | EndInterviewAction
  ;