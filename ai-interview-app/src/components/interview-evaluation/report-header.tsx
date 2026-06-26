import { motion } from "framer-motion";
import { Download, Archive } from "lucide-react";
import { ScoreRing } from "./score-ring";
import { cardHover } from "../../app/types/interview";
import { chanceStyles, type InterviewData } from "../../app/types/interview";

interface Props {
  candidate: string;
  role: string;
  experience: string;
  date?: string;
  overallScore: number;
  selectionChances: InterviewData["selectionChances"];
  onDownload?: () => void;
  onArchive?: () => void;
}

export function ReportHeader({
  candidate,
  role,
  experience,
  date,
  overallScore,
  selectionChances,
  onDownload,
  onArchive,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-card p-8"
    >
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-4xl font-bold tracking-tight">{candidate}</h1>
            <span
              className={`text-[15px] font-bold tracking-widest px-2.5 py-1 rounded-md ${chanceStyles[selectionChances]}`}
            >
              SELECTION CHANCE: {selectionChances}
            </span>
          </div>
          <p className="text-muted-foreground">
            {role} <span className="mx-2">•</span> {experience}
            {date && (
              <>
                <span className="mx-2">•</span>
                {date}
              </>
            )}
          </p>
          <div className="flex gap-3 pt-2">
            
          </div>
        </div>
        <div className="flex flex-col items-center">
          <ScoreRing score={overallScore} />
          <div className="mt-2 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">
            ASSESSMENT SCORE
          </div>
        </div>
      </div>
    </motion.div>
  );
}
