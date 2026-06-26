import { Mic, MicOff } from "lucide-react";
import { motion } from "framer-motion";
import { ScaleIn } from "./motion-section";

interface ParticipantProps {
  name: string;
  subtitle: string;
  image: string;
  
  micOn?: boolean;
  showMicIcon?: boolean;
  speaking?: boolean;
  thinking?: boolean;
  delay?: number;
}

export function Participant({
  name,
  subtitle,
  image,
  
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
          className="avatar-ring relative rounded-full overflow-hidden w-32 h-32 md:w-56 md:h-56 bg-card"
        >
          <img
            src={image}
            alt={name}
            width={512}
            height={512}
            loading="lazy"
            className="w-full h-full object-cover"
          />
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
