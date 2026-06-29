import { motion } from "framer-motion";
import { scoreLabel } from "../../app/types/interview";

export function ScoreRing({ score }: { score: number }) {
  const pct = (score / 10) * 100;
  const stroke =
    score >= 6 ? "stroke-emerald-400" : score >= 4 ? "stroke-amber-400" : "stroke-destructive";
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-32 w-32">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} className="stroke-border/40 fill-none" strokeWidth="8" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          className={`fill-none ${stroke}`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - pct / 100) }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-foreground">
          {score}
          <span className="text-muted-foreground text-lg">/10</span>
        </div>
        <div
          className={`text-[10px] font-semibold tracking-widest ${
            score < 4 ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          {scoreLabel(score)}
        </div>
      </div>
    </div>
  );
}
