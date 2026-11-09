"use client"
import { useCountUp } from "@/app/hooks/useCountUp";
import { useInView } from "@/app/hooks/useInView";
import { FeatureCard } from "./FeatureCard";
import { ScoreRing } from "./ScoreRing";
import { styles } from "./features.styles";
import type { SemanticFeedbackContent } from "./features.types";

export function SemanticFeedbackCard({
  title,
  subtitle,
  score,
  maxScore,
  scoreCaption,
  metrics,
  quote,
}: SemanticFeedbackContent) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.4 });
  const animatedScore = useCountUp(score, { enabled: inView });

  return (
    <FeatureCard title={title} subtitle={subtitle} cardRef={ref} className={styles.cardTall} animationDelay={0.2}>
      <ScoreRing value={animatedScore} max={maxScore} caption={scoreCaption} />

      <ul className={styles.metrics}>
        {metrics.map(({ label, tag, tone }) => (
          <li key={label} className={styles.metric}>
            {label}
            <span className={`${styles.tag} ${tone === "success" ? styles.tagSuccess : styles.tagWarning}`}>{tag}</span>
          </li>
        ))}
        <li className={styles.quote}>
          {quote.before}
          <span className={styles.quoteHighlight}>{quote.highlight}</span>
          {quote.after}
        </li>
      </ul>
    </FeatureCard>
  );
}
