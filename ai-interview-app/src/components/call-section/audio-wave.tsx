import { motion } from "framer-motion";
import { ScaleIn } from "./motion-section";

const BARS = [0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8];

interface AudioWaveProps {
  active?: boolean;
}

export function AudioWave({ active }: AudioWaveProps) {
  if (!active) {
    return (
      <ScaleIn delay={0.3} className="flex items-center justify-center">
        <div className="flex items-center gap-1.5 h-20 md:h-24">
          {BARS.map((_, i) => (
            <span key={i} className="w-1.5 h-2 rounded-full bg-primary/30" />
          ))}
        </div>
      </ScaleIn>
    );
  }

  return (
    <ScaleIn delay={0.3} className="flex items-center justify-center">
      <div className="flex items-center gap-1.5 h-20 md:h-24">
        {BARS.map((h, i) => (
          <motion.span
            key={i}
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.12 }}
            style={{ height: `${h * 100}%` }}
            className="w-1.5 rounded-full bg-primary origin-center"
          />
        ))}
      </div>
    </ScaleIn>
  );
}
