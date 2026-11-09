"use client"
import { HelpCircleIcon } from "../shared/icons";
import { useCycle } from "@/app/hooks/useCycle";
import { useInView } from "@/app/hooks/useInView";
import { FeatureCard } from "./FeatureCard";
import { styles } from "./features.styles";
import type { EvaluationContent } from "./features.types";

export function EvaluationCard({ title, subtitle, badge, expectedLabel, questions }: EvaluationContent) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.3 });
  const activeIndex = useCycle(questions.length, 3000, inView);

  return (
    <FeatureCard title={title} subtitle={subtitle} badge={badge} cardRef={ref} className={styles.cardWide} animationDelay={0.5}>
      <ul className={styles.questions}>
        {questions.map((q, index) => (
          <li key={q.id} className={styles.question} data-active={index === activeIndex}>
            <span className={styles.questionIconBox}>
              <HelpCircleIcon className={styles.questionIcon} />
            </span>

            <div className={styles.questionBody}>
              <p className={styles.questionLabel}>{q.label}</p>
              <p className={styles.questionText}>{q.text}</p>
              <div className={styles.expected}>
                <div className={styles.expectedInner}>
                  <p className={styles.expectedText}>
                    <span className={styles.expectedLabel}>{expectedLabel}</span>
                    {q.expectedAnswer}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.scoreBox}>
              <span className={styles.scoreChip}>
                {q.score}
                <span className={styles.scoreMax}>/{q.maxScore}</span>
              </span>
              <div className={styles.severity}>
                <p className={styles.severityLabel}>{q.severity}</p>
                <div className={styles.severityTrack}>
                  <div className={styles.severityFill} style={{ width: `${(q.score / q.maxScore) * 100}%` }} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </FeatureCard>
  );
}
