import { motion, useReducedMotion } from "framer-motion";
import { SparklesIcon } from "./SparklesIcon";
import { styles } from "./howItWorks.styles";
import type { Step } from "./howItWorks.types";

interface StepVisualProps {
  stepId: Step["id"];
  isActive: boolean;
  badge?: string;
}

const roles = ["Frontend Engineer", "Product Manager", "Data Analyst", "UX Researcher"];
const metrics = [
  { label: "Clarity", score: "Excellent", value: 84 },
  { label: "Relevance", score: "High", value: 68 },
  { label: "Confidence", score: "Improving", value: 52 },
];
const questions = [
  { title: "What is a closure in JavaScript?", score: "9/10" },
  { title: "How do you manage state in React?", score: "8/10" },
];
const waveform = [12, 20, 10, 26, 16, 30, 13, 22, 9, 18, 27, 12, 21, 14, 25, 10];

function PanelHeader({ title, badge }: { title: string; badge: string }) {
  return (
    <div className={styles.previewHeader}>
      <span className="flex items-center gap-2 font-semibold text-foreground">
        <SparklesIcon className="size-3 text-primary" />
        {title}
      </span>
      <span className={styles.previewStatus}>
        <span className="size-1.5 rounded-full bg-current" />
        {badge}
      </span>
    </div>
  );
}

function SetupPanel({ isActive, reduceMotion }: { isActive: boolean; reduceMotion: boolean }) {
  return (
    <div className={styles.previewCanvas}>
      <PanelHeader title="Interview Setup" badge="AI POWERED" />

      <div>
        <p className={styles.previewLabel}>SELECT ROLE</p>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {roles.map((role, index) => (
            <motion.div
              key={role}
              className={styles.roleOption}
              animate={
                !reduceMotion && isActive
                  ? { borderColor: index === 0 ? ["var(--border)", "var(--primary)", "var(--border)"] : "var(--border)" }
                  : undefined
              }
              transition={{ duration: 2.4, repeat: !reduceMotion && isActive ? Infinity : 0 }}
            >
              <span className="size-1.5 rounded-full bg-muted-foreground/50" />
              {role}
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <p className={styles.previewLabel}>EXPERIENCE LEVEL</p>
        <div className="mt-2 grid grid-cols-3 overflow-hidden rounded-lg border border-border bg-muted/30">
          {["Junior", "Mid-level", "Senior"].map((level, index) => (
            <span
              key={level}
              className={`${styles.experienceOption} ${index === 1 ? "bg-primary/20 text-foreground" : ""}`}
            >
              {level}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className={styles.previewLabel}>QUESTION DENSITY</p>
          <span className="text-[0.55rem] font-semibold text-primary">Standard · 12 questions</span>
        </div>
        <div className="relative mt-3 h-1 rounded-full bg-border">
          <motion.span
            className={styles.sliderTrack}
            animate={!reduceMotion && isActive ? { width: ["78%", "46%", "20%", "78%"] } : { width: "78%" }}
            transition={{ duration: 6, repeat: !reduceMotion && isActive ? Infinity : 0, ease: "easeInOut" }}
          />
          <motion.span
            className={styles.sliderKnob}
            animate={!reduceMotion && isActive ? { left: ["78%", "46%", "20%", "78%"] } : { left: "78%" }}
            transition={{ duration: 6, repeat: !reduceMotion && isActive ? Infinity : 0, ease: "easeInOut" }}
          />
        </div>
      </div>

      <motion.div
        className={styles.setupButton}
        animate={!reduceMotion && isActive ? { filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"] } : undefined}
        transition={{ duration: 2.4, repeat: !reduceMotion && isActive ? Infinity : 0 }}
      >
        <span aria-hidden="true">▶</span>
        Start Interview
      </motion.div>
    </div>
  );
}

function InterviewPanel({ isActive, reduceMotion }: { isActive: boolean; reduceMotion: boolean }) {
  return (
    <div className={styles.previewCanvas}>
      <PanelHeader title="Live Interview" badge="LIVE SESSION" />

      <div className={styles.chatMessages}>
        <motion.div
          className={styles.aiMessage}
          animate={{ opacity: isActive ? 1 : 0.75, y: isActive ? 0 : 4 }}
          transition={{ duration: 0.45 }}
        >
          <span className={styles.aiAvatar}><SparklesIcon className="size-3" /></span>
          <p>Welcome! Let&apos;s begin — walk me through your most recent React project.</p>
        </motion.div>

        <motion.div
          className={styles.userMessage}
          animate={{ opacity: isActive ? 1 : 0.7, y: isActive ? 0 : 4 }}
          transition={{ duration: 0.5, delay: isActive ? 0.4 : 0 }}
        >
          Sure — I led the migration of our dashboard to a modern component library.
        </motion.div>

        <motion.div
          className={styles.aiMessage}
          animate={{ opacity: isActive ? 1 : 0.65, y: isActive ? 0 : 4 }}
          transition={{ duration: 0.5, delay: isActive ? 0.8 : 0 }}
        >
          <span className={styles.aiAvatar}><SparklesIcon className="size-3" /></span>
          <p>Great context. How did you handle performance bottlenecks?</p>
        </motion.div>

        <div className={styles.typingBubble} aria-hidden="true">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="size-1.5 rounded-full bg-primary"
              animate={!reduceMotion && isActive ? { y: [0, -3, 0] } : undefined}
              transition={{
                duration: 0.65,
                delay: dot * 0.12,
                repeat: !reduceMotion && isActive ? Infinity : 0,
              }}
            />
          ))}
        </div>
      </div>

      <div className={styles.voiceInput}>
        <div className="flex h-5 items-center gap-1" aria-hidden="true">
          {waveform.map((height, index) => (
            <motion.span
              key={index}
              className="w-0.5 rounded-full bg-primary"
              animate={!reduceMotion && isActive ? { height: [height * 0.45, height, height * 0.6] } : { height: height * 0.55 }}
              transition={{
                duration: 0.65 + (index % 4) * 0.12,
                repeat: !reduceMotion && isActive ? Infinity : 0,
                repeatType: "mirror",
              }}
            />
          ))}
        </div>
        <span className="text-[0.58rem] text-muted-foreground">Listening — the AI adapts to your answers</span>
        <span className="ml-auto text-primary">●</span>
      </div>
    </div>
  );
}

function ReportPanel({ isActive }: { isActive: boolean }) {
  return (
    <div className={styles.previewCanvas}>
      <PanelHeader title="Your Report" badge="AUTO REVIEWED" />

      <div className={styles.reportSummary}>
        <div className={styles.scoreCircle}>
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90">
            <circle cx="50" cy="50" r="43" fill="none" stroke="var(--border)" strokeWidth="7" />
            <motion.circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke="url(#score-gradient)"
              strokeWidth="7"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="100"
              initial={false}
              animate={{ strokeDashoffset: isActive ? 16 : 100 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="score-gradient">
                <stop stopColor="var(--chart-2)" />
                <stop offset="1" stopColor="var(--primary)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">8.4<span className="text-[0.55rem] text-muted-foreground">/10</span></p>
            <p className="text-[0.42rem] uppercase tracking-[0.16em] text-muted-foreground">Overall</p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          {metrics.map((metric, index) => (
            <div key={metric.label} className={styles.metricRow}>
              <span className="text-[0.58rem] font-medium text-foreground/75">{metric.label}</span>
              <motion.span
                className="mx-2 h-1 flex-1 origin-left rounded-full bg-gradient-to-r from-chart-2 to-primary"
                initial={false}
                animate={{ scaleX: isActive ? metric.value / 100 : 0.35 }}
                transition={{ duration: 0.8, delay: isActive ? 0.2 + index * 0.15 : 0 }}
              />
              <span className={`${styles.metricBadge} ${index === 0 ? "text-chart-1" : index === 1 ? "text-chart-2" : "text-chart-3"}`}>
                {metric.score}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2">
        {questions.map((question, index) => (
          <motion.div
            key={question.title}
            className={styles.questionRow}
            animate={{
              borderColor: isActive && index === 0 ? "color-mix(in oklab, var(--primary) 55%, var(--border))" : "var(--border)",
              backgroundColor: isActive && index === 0 ? "color-mix(in oklab, var(--primary) 12%, var(--card))" : "var(--card)",
            }}
            transition={{ duration: 0.7, delay: isActive ? index * 0.3 : 0 }}
          >
            <span className="grid size-5 shrink-0 place-items-center rounded-md bg-muted text-[0.5rem] text-muted-foreground">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1 truncate text-[0.58rem] text-foreground/80">{question.title}</span>
            <span className={styles.questionScore}>{question.score}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** Animated product panel for the active How It Works step. */
export function StepVisual({ stepId, isActive, badge }: StepVisualProps) {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = Boolean(shouldReduceMotion);

  return (
    <div className={styles.card}>
      <div className={styles.cardFrame}>
        {stepId === "details" && <SetupPanel isActive={isActive} reduceMotion={reduceMotion} />}
        {stepId === "interview" && <InterviewPanel isActive={isActive} reduceMotion={reduceMotion} />}
        {stepId === "feedback" && <ReportPanel isActive={isActive} />}
      </div>
      {badge && (
        <span className={styles.badge}>
          <SparklesIcon className={styles.badgeIcon} />
          {badge}
        </span>
      )}
    </div>
  );
}
