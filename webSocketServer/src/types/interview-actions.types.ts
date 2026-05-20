type AskQuestionAction =  {
  action: "ASK_QUESTION";
  question: string;
  nextQuestion: string
};

type FollowUpAction = {
  action: "FOLLOW_UP";
  question: string;
};

export type QuestionEvaluation = {
  question: string;
  userAnswerSummary: string;
  expectedAnswer: string;
  score: number;
  feedback: string;
  whatWasMissing: string;
  whatInterviewersWouldThink: string;
  betterAnswerOutline: string;
};

type EndInterviewAction =  {
  action: "END_INTERVIEW";
  questionEvaluations: QuestionEvaluation[]; 
  overallScore: number;
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
  | FollowUpAction
  | EndInterviewAction;