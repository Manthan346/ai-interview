import { memo } from "react";
import { motion } from "framer-motion";
import { scoreLabel, scoreTone } from "../../app/types/interview";

export const QuestionScoreBadge = memo(function QuestionScoreBadge({ score }: { score: number }) {
  const tone = scoreTone(score);
  const pct = (score / 10) * 100;

  return (
    <div className="flex flex-col items-end gap-1.5 shrink-0">
      <div
        className={`flex items-baseline gap-1 rounded-full px-2.5 py-1 ring-1 ${tone.bg} ${tone.ring}`}
      >
        <span className={`text-sm font-bold ${tone.text}`}>{score}</span>
        <span className="text-[10px] text-muted-foreground">/10</span>
      </div>
      <div className="h-1 w-20 rounded-full bg-border/40 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${tone.bar}`}
        />
      </div>
      <span className={`text-[9px] font-bold tracking-widest ${tone.text}`}>
        {scoreLabel(score)}
      </span>
    </div>
  );
});
