export interface InterviewData {
  candidateName: string;
  role: string;
  experience: string;
  overallScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  selectionChances: 'HIGH' | 'MEDIUM' | 'LOW';
  finalInterviewVerdict: string;
  candidatePerspective: string;
  date?: string;
}


export interface InterviewQuestion {
  id: string;
  question: string;
  interviewId?: string;
  expectedAnswer?: string[] | null;
  score?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface userTranscript {
  final?: boolean
  text?: string
  type?: string

}

export interface TranscriptProps {
  userText?: string;
  aiText?: string;
};


export const chanceStyles: Record<InterviewData["selectionChances"], string> = {
  HIGH: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
  MEDIUM: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30",
  LOW: "bg-destructive/15 text-destructive ring-1 ring-destructive/40",
};

export const scoreLabel = (s: number) =>
  s >= 8 ? "EXCELLENT" : s >= 6 ? "STRONG" : s >= 4 ? "AVERAGE" : "CRITICAL";

export const cardHover = {
  whileHover: {
    y: -4,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};



export const scoreTone = (s: number) => {
  if (s >= 8)
    return {
      text: "text-emerald-400",
      ring: "ring-emerald-500/30",
      bg: "bg-emerald-500/10",
      bar: "bg-emerald-400",
    };
  if (s >= 6)
    return {
      text: "text-emerald-300",
      ring: "ring-emerald-500/20",
      bg: "bg-emerald-500/10",
      bar: "bg-emerald-300",
    };
  if (s >= 4)
    return {
      text: "text-amber-400",
      ring: "ring-amber-500/30",
      bg: "bg-amber-500/10",
      bar: "bg-amber-400",
    };
  return {
    text: "text-destructive",
    ring: "ring-destructive/40",
    bg: "bg-destructive/10",
    bar: "bg-destructive",
  };
};