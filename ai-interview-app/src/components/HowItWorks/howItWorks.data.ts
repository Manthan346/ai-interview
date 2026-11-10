/**
 * Content only — no markup, no styling, no behaviour.
 * Edit copy / swap images here without touching any component.
 */
import type { CtaCopy, SectionCopy, Step } from "./howItWorks.types";

export const CTA_COPY: CtaCopy = {
  title: "Ready to Put Your Skills to the Test?",
  subtitle:
    "Start an AI-powered interview and discover where you can improve before your next big opportunity.",
  primaryLabel: "Start Your Interview",
  secondaryLabel: "View Demo",
};

export const SECTION_COPY: SectionCopy = {
  eyebrow: "How it works",
  title: "From Setup to Feedback",
  subtitle:
    "Configure your interview, have a realistic conversation with AI, and get detailed insights into every answer.",
};

export const STEPS: Step[] = [
  {
    id: "details",
    title: "Tell AI About Your Interview",
    description:
      "Before starting, configure your interview in a few simple steps. Select roles, experience levels, and question density.",
   
  },
  {
    id: "interview",
    title: "Have a Real Conversation",
    description:
      "Enter a realistic interview experience where AI asks questions based on your selected role and adapts in real-time.",
  },
  {
    id: "feedback",
    title: "Review Your Report",
    description:
      "Once complete, review a detailed AI-generated report and understand exactly where you excelled and where to improve.",
  },
];
