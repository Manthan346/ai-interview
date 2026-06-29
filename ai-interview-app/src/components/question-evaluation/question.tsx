import { motion } from "framer-motion";
import { ListChecks } from "lucide-react";
import type { InterviewQuestion } from "../../app/types/interview";
import { QuestionCard } from "./question-card";

interface Props {
  questions: InterviewQuestion[];
  title?: string;
  subtitle?: string;
}

export function Questions({
  questions,
  title = "Interview Questions",
  subtitle = "Review each question, the candidate's score, and the expected answer.",
}: Props) {
  if (!questions?.length) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
        No questions available for this interview.
      </div>
    );
  }

  const avg =
    questions.reduce((sum, q) => sum + (q.score ?? 0), 0) / questions.length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
            <ListChecks className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold italic text-foreground">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-muted-foreground">
          <span>{questions.length} QUESTIONS</span>
          <span className="h-3 w-px bg-border" />
          <span>AVG {avg.toFixed(1)}/10</span>
        </div>
      </div>

      <div className="grid gap-4">
        {questions.map((q, i) => (
          <QuestionCard key={q.id} question={q} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
