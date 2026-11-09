import { styles } from "./features.styles";

interface ScoreRingProps {
  value: number;
  max: number;
  caption: string;
}

const RADIUS = 66;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Circular score gauge. `value` can be animated by the parent. */
export function ScoreRing({ value, max, caption }: ScoreRingProps) {
  const offset = CIRCUMFERENCE * (1 - Math.min(value / max, 1));

  return (
    <div className={styles.ring} role="img" aria-label={`${caption}: ${value.toFixed(1)} out of ${max}`}>
      <svg className={styles.ringSvg} viewBox="0 0 160 160" aria-hidden="true">
        <circle className={styles.ringTrack} cx="80" cy="80" r={RADIUS} strokeWidth="10" />
        <circle
          className={styles.ringProgress}
          cx="80"
          cy="80"
          r={RADIUS}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <div className={styles.ringCenter}>
        <div className={styles.ringValue}>
          {value.toFixed(1)}
          <span className={styles.ringMax}>/{max}</span>
        </div>
        <div className={styles.ringCaption}>{caption}</div>
      </div>
    </div>
  );
}
