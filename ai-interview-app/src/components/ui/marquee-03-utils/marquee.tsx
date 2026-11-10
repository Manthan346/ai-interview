"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./marquee.module.css";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        styles.viewport,
        vertical ? styles.vertical : styles.horizontal,
        pauseOnHover && styles.pauseOnHover,
        className,
      )}
      data-reverse={reverse || undefined}
    >
      <div className={styles.track}>
        <div className={styles.group}>{children}</div>
        <div className={styles.group} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
