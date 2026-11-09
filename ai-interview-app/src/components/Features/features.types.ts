export interface ChatMessage {
  id: string;
  from: "ai" | "user";
  text: string;
  /** If true the message is typed out live instead of shown in full. */
  typing?: boolean;
}

export interface LiveRoleplayContent {
  title: string;
  subtitle: string;
  badge: string;
  listeningLabel: string;
  messages: ChatMessage[];
}

export type MetricTone = "success" | "warning";

export interface FeedbackMetric {
  label: string;
  tag: string;
  tone: MetricTone;
}

export interface SemanticFeedbackContent {
  title: string;
  subtitle: string;
  score: number;
  maxScore: number;
  scoreCaption: string;
  metrics: FeedbackMetric[];
  quote: { before: string; highlight: string; after: string };
}

export type RoleIconName = "code" | "layers" | "nodes" | "calculator" | "flag";

export interface Role {
  id: string;
  name: string;
  skills: string;
  icon: RoleIconName;
}

export interface RoleBanksContent {
  title: string;
  subtitle: string;
  roles: Role[];
}

export interface EvaluationQuestion {
  id: string;
  label: string;
  text: string;
  expectedAnswer: string;
  score: number;
  maxScore: number;
  severity: string;
}

export interface EvaluationContent {
  title: string;
  subtitle: string;
  badge: string;
  expectedLabel: string;
  questions: EvaluationQuestion[];
}

export interface FeaturesContent {
  eyebrow: string;
  liveRoleplay: LiveRoleplayContent;
  semanticFeedback: SemanticFeedbackContent;
  roleBanks: RoleBanksContent;
  evaluation: EvaluationContent;
}
