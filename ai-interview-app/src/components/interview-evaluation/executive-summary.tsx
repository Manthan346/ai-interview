import { motion } from "framer-motion";
import { FileText, ShieldCheck, Quote } from "lucide-react";
import { cardHover } from "../../app/types/interview";

export function ExecutiveSummary({
  summary,
  verdict,
}: {
  summary: string;
  verdict: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      {...cardHover}
      className="
        group relative overflow-hidden
        rounded-3xl
        border border-border/50
        bg-gradient-to-br from-card via-card to-muted/20
        p-6
        shadow-sm
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-xl
        hover:border-primary/30
        cursor-pointer
      "
    >
      {/* Animated light sweep */}
      <div
        className="
          absolute inset-0
          -translate-x-full
          skew-x-12
          bg-gradient-to-r
          from-transparent
          via-foreground/10
          to-transparent
          transition-transform
          duration-1000
          group-hover:translate-x-[200%]
        "
      />

      {/* Glow */}
      <div
        className="
          absolute -top-24 left-1/2
          h-48 w-48
          -translate-x-1/2
          rounded-full
          bg-primary/10
          blur-3xl
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
        "
      />

      {/* Top accent line */}
      <div
        className="
          absolute inset-x-0 top-0 h-px
          bg-gradient-to-r
          from-transparent
          via-primary/60
          to-transparent
        "
      />

      <div className="relative z-10 flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
          <FileText className="h-5 w-5 text-primary" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Interview Analysis
          </p>
          <h2 className="font-semibold text-lg">
            Executive Summary
          </h2>
        </div>
      </div>

      <div className="relative z-10 pl-6 border-l-2 border-primary/30">
        <Quote className="absolute -left-3 top-0 h-5 w-5 rounded-full bg-card text-primary p-0.5" />

        <p className="italic text-md leading-8 text-foreground">
          "{summary}"
        </p>
      </div>

      <div
        className="
          relative z-10 mt-6
          rounded-2xl
          border border-border/50
          bg-background/50
          backdrop-blur-sm
          p-5
          transition-all duration-300
          group-hover:border-primary/20
        "
      >
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="h-4 w-4 text-primary" />

          <span className="text-[11px] font-bold tracking-[0.25em] text-muted-foreground">
            FINAL VERDICT
          </span>
        </div>

        <p className="text-md pading-7 text-foreground">
          {verdict}
        </p>
      </div>
    </motion.section>
  );
}