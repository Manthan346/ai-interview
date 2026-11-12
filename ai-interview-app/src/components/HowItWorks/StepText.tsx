import { styles } from "./howItWorks.styles";

interface StepTextProps {
  number: number;
  title: string;
  highlightedWord?: string;
  description: string;
}

export function StepText({ number, title, highlightedWord, description }: StepTextProps) {
  const highlightIndex = highlightedWord ? title.indexOf(highlightedWord) : -1;

  return (
    <div className={styles.text}>
      <div className={styles.numberRow}>
        <span className={styles.number} aria-hidden="true">
          {number}
        </span>
        <span className={styles.numberLine} aria-hidden="true" />
      </div>
      <h3 className={styles.stepTitle}>
        {highlightedWord && highlightIndex >= 0 ? (
          <>
            {title.slice(0, highlightIndex)}
            <span className="text-primary">{highlightedWord}</span>
            {title.slice(highlightIndex + highlightedWord.length)}
          </>
        ) : title}
      </h3>
      <p className={styles.stepDescription}>{description}</p>
    </div>
  );
}
