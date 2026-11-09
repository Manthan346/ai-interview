import type { ReactNode } from "react";
import { SparklesIcon } from "./icons";
import { sharedStyles as s } from "./shared.styles";

interface PillProps {
  children: ReactNode;
  /** Leading marker: a small dot, a sparkle icon, or nothing. */
  icon?: "dot" | "sparkle";
  size?: "md" | "sm";
}

export function Pill({ children, icon, size = "md" }: PillProps) {
  return (
    <span className={`${s.pillBase} ${size === "md" ? s.pillMd : s.pillSm}`}>
      {icon === "dot" && <span className={s.pillDot} />}
      {icon === "sparkle" && <SparklesIcon className={s.pillIcon} />}
      {children}
    </span>
  );
}
