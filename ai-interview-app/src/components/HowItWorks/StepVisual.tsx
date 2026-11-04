import { motion } from "framer-motion";
import { SparklesIcon } from "./SparklesIcon";
import { styles } from "./howItWorks.styles";
import type { Step } from "./howItWorks.types";

type StepVisualProps = Pick<Step, "image" | "imageAlt" | "badge">;

/** Glass card on the right-hand side that frames the step screenshot. */
export function StepVisual({ image, imageAlt, badge }: StepVisualProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardFrame}>
        <img className={styles.cardImage} src={image} alt={imageAlt} loading="lazy" />
      </div>
      {badge && (
        <span className={styles.badge}>
          <SparklesIcon className={styles.badgeIcon} />
          {badge}
        </span>
      )}
    </div>
  );
}
