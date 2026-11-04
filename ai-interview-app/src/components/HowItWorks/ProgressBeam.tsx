import type { CSSProperties } from "react";
import { styles } from "./howItWorks.styles";

interface ProgressBeamProps {
  /** 0 → 1 */
  progress: number;
}

/** Decorative vertical beam that fills as the viewer scrolls through the steps. */
export function ProgressBeam({ progress }: ProgressBeamProps) {
  return (
    <div className={styles.beam} aria-hidden="true">
      <div className={styles.beamFill} style={{ "--progress": progress } as CSSProperties} />
    </div>
  );
}
