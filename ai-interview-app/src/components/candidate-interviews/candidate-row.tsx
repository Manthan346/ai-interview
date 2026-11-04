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
      className="group relative grid grid-cols-12 items-center gap-4 overflow-hidden border-t border-border px-5 py-4 transition-colors hover:bg-muted/20 max-md:mx-3 max-md:my-3 max-md:gap-y-4 max-md:rounded-xl max-md:border max-md:p-4"
    >
      <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-foreground/10 to-transparent transition-transform duration-0 group-hover:duration-1000 group-hover:translate-x-[200%]" />

      <div className="col-span-12 flex items-center justify-between gap-3 md:col-span-4 md:justify-start">
        <div className="flex min-w-0 items-center gap-3">
          <CandidateAvatar name={candidate.candidateName} />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {candidate.candidateName}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {candidate.roleValue}
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <StatusBadge status={candidate.isCompleted} />
        </div>
      </div>
      <div className="col-span-6 text-sm text-foreground md:col-span-2">
        <div className="mb-1 text-xs text-muted-foreground md:hidden">Experience</div>
        {candidate.experienceValue}
      </div>
      <div className="hidden md:col-span-2 md:block">
        <StatusBadge status={candidate.isCompleted} />
      </div>
      <div className="col-span-6 md:col-span-2">
        <div className="mb-1 text-xs text-muted-foreground md:hidden">Created</div>
        <div className="text-sm text-foreground">{candidate.createdAt.slice(0,10)}</div>
        <div className="hidden text-[11px] text-muted-foreground md:block">
          Created by {candidate.createdBy ?? "System"}
        </div>
      </div>
      <div className="col-span-12 flex md:col-span-2 md:justify-end [&>button]:w-full [&>button]:justify-center md:[&>button]:w-auto">
        <CandidateActions status={candidate.isCompleted} onClick={()=>{
          router.push(`/dashboard/your-interviews/evaluation/${candidate.id}`)

        }} />
      </div>
    </motion.div>
  );
}
