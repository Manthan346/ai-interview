"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Mic, PhoneOff } from "lucide-react";
import { useRef } from "react";
import { PREVIEW } from "./productPreview.data";
import { styles } from "./productPreview.styles";

/** Browser-window mockup showing the live interview screen. */
export function ProductPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [12, 0]);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Product preview">
      <div className={styles.glow} aria-hidden="true" />
      <motion.div
        className={`${styles.frame} hidden sm:block`}
        style={{
          rotateX,
          transformPerspective: 1200,
          transformOrigin: "center bottom",
        }}
      >
        <div className={styles.bar}>
          <div className={styles.dots} aria-hidden="true">
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
          <span className={styles.url}>{PREVIEW.url}</span>
        </div>
        <img className={styles.image} src={PREVIEW.image} alt={PREVIEW.imageAlt} />
      </motion.div>
      <motion.div
        className={`${styles.mobileFrame} sm:hidden`}
        style={{
          rotateX,
          transformPerspective: 1200,
          transformOrigin: "center bottom",
        }}
        aria-label="Mobile interview dashboard preview"
      >
        <div className={styles.mobileHeader}>
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400" />
            LIVE INTERVIEW
          </span>
          <span className="text-foreground/50">12:48</span>
        </div>

        <div className={styles.mobileParticipants}>
          <div className={styles.mobileParticipant}>
            <img className={styles.mobileAvatar} src="/aura-ai.jpg" alt="AI interviewer" />
            <div className="min-w-0">
              <p className="text-sm font-semibold">AI Interviewer</p>
              <p className="mt-1 text-xs text-foreground/50">Listening</p>
            </div>
          </div>
          <div className={styles.mobileParticipant}>
            <img className={styles.mobileAvatar} src="/candidate.jpg" alt="Candidate" />
            <div className="min-w-0">
              <p className="text-sm font-semibold">Alex Chen</p>
              <p className="mt-1 text-xs text-foreground/50">You</p>
            </div>
          </div>
        </div>

        <div className={styles.mobileWave} aria-hidden="true">
          {[16, 25, 34, 22, 38, 27, 16, 30, 20, 34, 24, 14].map((height, index) => (
            <span key={index} className="w-1.5 rounded-full bg-emerald-400" style={{ height }} />
          ))}
        </div>

        <div className={styles.mobileTranscript}>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Interviewer
            </p>
            <p className="rounded-xl bg-white/[0.07] px-4 py-3 text-sm leading-relaxed text-foreground/90">
              How would you explain the event loop in JavaScript?
            </p>
          </div>
          <div className="mt-5">
            <p className="mb-2 text-right text-xs font-semibold uppercase tracking-wider text-foreground/45">
              Your answer
            </p>
            <p className="rounded-xl bg-emerald-400/10 px-4 py-3 text-sm leading-relaxed text-emerald-100">
              It handles asynchronous operations without blocking the main thread.
            </p>
          </div>
        </div>

        <div className={styles.mobileControls} aria-hidden="true">
          <div className="flex flex-col items-center gap-1.5 text-[10px] font-semibold tracking-wider text-emerald-400">
            <span className="grid size-11 place-items-center rounded-full bg-emerald-400 text-slate-950">
              <Mic className="size-5" />
            </span>
            MUTE
          </div>
          <div className="flex flex-col items-center gap-1.5 text-[10px] font-semibold tracking-wider text-rose-400">
            <span className="grid size-11 place-items-center rounded-full bg-rose-500 text-white">
              <PhoneOff className="size-5" />
            </span>
            LEAVE
          </div>
        </div>
      </motion.div>
    </section>
  );
}
