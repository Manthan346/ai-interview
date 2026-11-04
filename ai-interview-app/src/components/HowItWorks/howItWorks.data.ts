/**
 * Content only — no markup, no styling, no behaviour.
 * Edit copy / swap images here without touching any component.
 */
import detailsImage from "../../../public/step-1-details.png";
import interviewImage from "../../../public/step-2-interview.png";
import feedbackImage from "../../../public/step-3-feedback.png";
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
    image: detailsImage.src,
    imageAlt: "Configure your AI interview",
    badge: "Interview configured",
  },
  {
    id: "interview",
    title: "Have a Real Conversation",
    description:
      "Enter a realistic interview experience where AI asks questions based on your selected role and adapts in real-time.",
    image: interviewImage.src,
    imageAlt: "Live AI interview conversation",
  },
  {
    id: "feedback",
    title: "Review Your Report",
    description:
      "Once complete, review a detailed AI-generated report and understand exactly where you excelled and where to improve.",
    image: feedbackImage.src,
    imageAlt: "Detailed AI interview report",
  },
];
