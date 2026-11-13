import { Bot, Mic, MicOff, Sparkles, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { ScaleIn } from "./motion-section";

interface ParticipantProps {
  name: string;
  subtitle: string;
  kind: "ai" | "candidate";
  micOn?: boolean;
  showMicIcon?: boolean;
  speaking?: boolean;
  thinking?: boolean;
  delay?: number;
}

export function Participant({
  name,
  subtitle,
  kind,
  micOn,
  showMicIcon,
  speaking,
  thinking,
  delay = 0,
}: ParticipantProps) {
  const active = speaking || thinking || micOn;

  return (
    <ScaleIn delay={delay} className="flex flex-col items-center">
      <div className="relative">
        {active && (
          <>
            <motion.span
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-primary"
            />
            <motion.span
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }}
              className="absolute inset-0 rounded-full border border-primary"
            />
          </>
        )}

        <motion.div
          animate={
            speaking
              ? { scale: [1, 1.04, 1] }
              : thinking
                ? { scale: [0.98, 1.02, 0.98] }
                : { scale: 1 }
          }
          transition={{ duration: speaking ? 1 : 1.5, repeat: speaking || thinking ? Infinity : 0 }}
          className={`relative grid size-32 place-items-center overflow-hidden rounded-full border md:size-56 ${
            kind === "ai"
              ? "border-primary/35 bg-gradient-to-br from-primary/15 via-background to-cyan-400/10 shadow-[0_0_48px_-16px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
              : "border-border bg-gradient-to-br from-secondary via-card to-muted shadow-lg"
          }`}
        >
          {kind === "ai" ? (
            <div
              role="img"
              aria-label="AI interviewer"
              className="relative grid size-[78%] place-items-center rounded-full border border-primary/25 bg-background/45"
            >
              <span className="absolute inset-3 rounded-full border border-primary/15" />
              <Bot className="size-12 text-primary md:size-20" strokeWidth={1.4} />
              <Sparkles className="absolute right-3 top-3 size-4 text-primary md:right-5 md:top-5 md:size-5" />
              <span className="absolute bottom-2 rounded-full border border-primary/30 bg-background/90 px-2 py-0.5 text-[0.55rem] font-bold tracking-[0.2em] text-primary md:bottom-3 md:text-xs">
                AI
              </span>
            </div>
          ) : (
            <div
              role="img"
              aria-label="Candidate"
              className="grid size-[78%] place-items-center rounded-full border border-border/70 bg-background/50"
            >
              <UserRound
                className="size-16 text-foreground/75 md:size-24"
                strokeWidth={1.2}
              />
            </div>
          )}
        </motion.div>

        

        {showMicIcon && (
          <span
            className={`absolute bottom-2 right-2 w-9 h-9 rounded-full flex items-center justify-center shadow-lg ring-4 ring-background ${
              micOn ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground"
            }`}
          >
            {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </span>
        )}
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-lg md:text-2xl font-semibold text-foreground">{name}</h2>
        <p className="text-xs md:text-sm text-muted-foreground mt-1 min-h-5 wrap-break-words">{subtitle}</p>
      </div>
    </ScaleIn>
  );
}
