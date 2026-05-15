type AskQuestionAction =  {
  action: "ASK_QUESTION";
  question: string;
};

type FollowUpAction = {
  action: "FOLLOW_UP";
  question: string;
};

type SaveAnswerAction = {
  action: "SAVE_ANSWER";
  userAnswerSummary: string;
  expectedAnswer: string;
  score: number;
  question: string
};

type EndInterviewAction =  {
  action: "END_INTERVIEW"; 
  overallScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  selectionChances: "LOW" | "MEDIUM" | "HIGH";
};

export type AIAction =
  | AskQuestionAction
  | FollowUpAction
  | SaveAnswerAction
  | EndInterviewAction;