import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { MessageCircleQuestion } from "lucide-react";
import { cardHover, type InterviewQuestion } from "../../app/types/interview";
import { QuestionScoreBadge } from "./question-score";
import { QuestionExpectedAnswer } from "./question-expected-answer";

interface Props {
  question: InterviewQuestion;
  index: number;
}

export const QuestionCard = memo(function QuestionCard({ question, index }: Props) {
  const transitionProps = useMemo(
    () => ({ duration: 0.45, delay: 0.05 + index * 0.06 }),
    [index],
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitionProps}
      {...cardHover}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-colors pointer-events-none" />
      <div className="relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
              <MessageCircleQuestion className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="mb-1 text-sm tracking-wide font-bold  text-primary">
                QUESTION {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-base font-semibold leading-snug text-foreground">
                {question.question}
              </h3>
            </div>
          </div>
          <div className="sm:pt-1">
            <QuestionScoreBadge score={question.score ?? 0} />
          </div>
        </div>

        <div className="mt-4">
          <QuestionExpectedAnswer id={question.id} answer={question.expectedAnswer} />
        </div>
      </div>
    </motion.article>
  );
});
