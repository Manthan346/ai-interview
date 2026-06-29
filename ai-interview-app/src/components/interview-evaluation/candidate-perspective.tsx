
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { cardHover } from "../../app/types/interview";

export function CandidatePerspective({ text }: { text: string }) {
  return (
   
   <motion.section
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  {...cardHover}
  className="
    group relative overflow-hidden rounded-3xl
    border border-border/50
    bg-card
    p-7
    shadow-sm
    transition-all duration-500
    hover:-translate-y-1
    hover:shadow-xl
    hover:border-accent/30
    cursor-pointer
  "
>
  {/* Animated light sweep */}
  <div
    className="
      absolute inset-0
      -translate-x-full
      bg-linear-to-r
      from-transparent
      via-foreground/10
      to-transparent
      skew-x-12
      transition-transform
      duration-1000
      group-hover:translate-x-[200%]
    "
  />

  {/* Top glow */}
  <div
    className="
      absolute -top-20 left-1/2
      h-40 w-40
      -translate-x-1/2
      rounded-full
      bg-accent/10
      blur-3xl
      opacity-0
      transition-opacity duration-500
      group-hover:opacity-100
    "
  />

  <div className="relative z-10 flex items-center gap-3 mb-5">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
      <User className="h-5 w-5 text-accent" />
    </div>

    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        Feedback Analysis
      </p>
      <h3 className="font-semibold">
        Candidate Perspective
      </h3>
    </div>
  </div>

  <p className="relative z-10 text-base leading-8 text-muted-foreground">
    {text}
  </p>
</motion.section>
  
  );
}
