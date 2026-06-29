"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { CandidatesTableHeader } from "./cadidate-table-header";
import { CandidateRow } from "./candidate-row";
import type { Candidate } from "../../app/types/interview";

interface Props {
  candidates: Candidate[];
  title?: string;
  subtitle?: string;
}

export function Candidates({
  candidates,
  title = "Candidates",
  subtitle = "Review every candidate, their status, and jump straight to the report.",
}: Props) {
  const completed = candidates.filter((c) => c.isCompleted).length;
  const cancelled = candidates.filter((c) => !c.isCompleted).length;

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
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold  text-foreground">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-muted-foreground">
          <span>{candidates.length} TOTAL</span>
          <span className="h-3 w-px bg-border" />
          <span className="text-emerald-400">{completed} COMPLETED</span>
          <span className="h-3 w-px bg-border" />
          <span className="text-destructive">{cancelled} CANCELLED</span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="relative">
          <CandidatesTableHeader />
          {candidates.length === 0 ? (
            <div className="border-t border-border p-10 text-center text-sm text-muted-foreground">
              No candidates yet.
            </div>
          ) : (
            candidates.map((c, i) => (
              <CandidateRow key={c.id} candidate={c} index={i} />
            ))
          )}
        </div>
      </div>
    </motion.section>
  );
}
