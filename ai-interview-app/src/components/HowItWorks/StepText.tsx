import { styles } from "./howItWorks.styles";

interface StepTextProps {
  number: number;
  title: string;
  description: string;
}

export function StepText({ number, title, description }: StepTextProps) {
  return (
    <div className={styles.text}>
      <div className={styles.numberRow}>
        <span className={styles.number} aria-hidden="true">
          {number}
        </span>
        <span className={styles.numberLine} aria-hidden="true" />
      </div>
      <h3 className={styles.stepTitle}>{title}</h3>
      <p className={styles.stepDescription}>{description}</p>
    </div>
  );
}
