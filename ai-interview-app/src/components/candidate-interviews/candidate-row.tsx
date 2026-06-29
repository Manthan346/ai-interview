"use client";

import { motion } from "framer-motion";
import { CandidateAvatar } from "./candidate-avatar";
import { StatusBadge } from "./candidate-badge";
import { CandidateActions } from "./candidate-actions";
import { useRouter } from "next/navigation";
import type { Candidate } from "../../app/types/interview";

export function CandidateRow({
  candidate,
  index,
}: {
  candidate: Candidate;
  index: number;
}) {
  const router = useRouter()
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.04 + index * 0.04 }}
      className="group relative grid grid-cols-12 items-center gap-4 overflow-hidden border-t border-border px-5 py-4 transition-colors hover:bg-muted/20"
    >
      <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-foreground/10 to-transparent transition-transform duration-0 group-hover:duration-1000 group-hover:translate-x-[200%]" />

      <div className="col-span-12 md:col-span-4 flex items-center gap-3">
        <CandidateAvatar name={candidate.candidateName} />
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-foreground">
            {candidate.candidateName}
          </div>
          <div className="truncate text-xs text-muted-foreground">
            {candidate.role}
          </div>
        </div>
      </div>
      <div className="col-span-4 md:col-span-2 text-sm text-foreground">
        {candidate.experience}
      </div>
      <div className="col-span-4 md:col-span-2">
        <StatusBadge status={candidate.isCompleted} />
      </div>
      <div className="col-span-4 md:col-span-2">
        <div className="text-sm text-foreground">{candidate.createdAt}</div>
        <div className="text-[11px] text-muted-foreground">
          Created by {candidate.createdBy ?? "System"}
        </div>
      </div>
      <div className="col-span-12 md:col-span-2 flex md:justify-end">
        <CandidateActions status={candidate.isCompleted} onClick={()=>{
          router.push(`/dashboard/your-interviews/evaluation/${candidate.id}`)

        }} />
      </div>
    </motion.div>
  );
}
