/** Content only — edit copy, scores, roles and questions here. */
import type { FeaturesContent } from "./features.types";

export const FEATURES: FeaturesContent = {
  liveRoleplay: {
    title: "Live Roleplay",
    subtitle: "Real-time adaptive AI interviewer",
    badge: "Live session",
    listeningLabel: "Listening for response…",
    messages: [
      { id: "m1", from: "ai", text: "Welcome! Let's start with your background in React and system design." },
      { id: "m2", from: "user", text: "I've spent 4 years building scalable UIs using atomic design…" },
      {
        id: "m3",
        from: "ai",
        text: "That's a solid start. Given your experience with atomic design, how do you keep state isolated across components?",
        typing: true,
      },
    ],
  },

  semanticFeedback: {
    title: "Semantic Feedback",
    subtitle: "Instant report & behavioral insights",
    score: 8.4,
    maxScore: 10,
    scoreCaption: "Overall score",
    metrics: [
      { label: "Technical Accuracy", tag: "Excellent", tone: "success" },
      { label: "Communication Clarity", tag: "High", tone: "success" },
      { label: "Pacing & Structure", tag: "Improving", tone: "warning" },
    ],
    quote: { before: "“Demonstrated strong mastery of ", highlight: "concurrency", after: " patterns…”" },
  },

  roleBanks: {
    title: "Role-Specific Banks",
    subtitle: "10,000+ curated industry tracks",
    roles: [
      { id: "frontend", name: "Frontend Engineer", skills: "React, Tailwind, System Design", icon: "code" },
      { id: "backend", name: "Backend Architect", skills: "Node, SQL, Microservices", icon: "layers" },
      { id: "pm", name: "Product Manager", skills: "Strategy, Roadmap, Metrics", icon: "nodes" },
      { id: "accountant", name: "Accountant", skills: "Audit, Tax, Financial Reporting", icon: "calculator" },
      { id: "sales", name: "Sales Manager", skills: "Pipeline, Negotiation, CRM", icon: "flag" },
    ],
  },

  evaluation: {
    title: "Evaluation Questions",
    subtitle: "Review each question, its score, and the expected answer.",
    badge: "Auto review",
    expectedLabel: "Expected answer:",
    questions: [
      {
        id: "q1",
        label: "Question 01",
        text: "Can you explain what a function is in programming and why it's useful?",
        expectedAnswer: "Stores a reusable block of code · runs only when called · avoids repetition and keeps logic organized",
        score: 3,
        maxScore: 10,
        severity: "Critical",
      },
      {
        id: "q2",
        label: "Question 02",
        text: "Can you explain what a loop does in programming and when you might choose a for loop over a while loop?",
        expectedAnswer: "Repeats a block of code · for loops when iterations are known · while loops for condition-based repetition",
        score: 2,
        maxScore: 10,
        severity: "Critical",
      },
      {
        id: "q3",
        label: "Question 03",
        text: "Can you explain what an array is in programming and a situation where it would be a good choice to use one?",
        expectedAnswer: "Stores multiple values in one ordered collection · accessed by index · ideal for lists of similar items",
        score: 2,
        maxScore: 10,
        severity: "Critical",
      },
    ],
  },
};
