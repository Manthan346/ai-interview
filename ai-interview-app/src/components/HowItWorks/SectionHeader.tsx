import { styles } from "./howItWorks.styles";
import type { SectionCopy } from "./howItWorks.types";

export function SectionHeader({ title, subtitle }: SectionCopy) {
  return (
    <header className={styles.header}>
      <h2 id="hiw-heading" className={styles.title}>
        {title}
      </h2>
      <p className={styles.subtitle}>{subtitle}</p>
    </header>
  );
}
