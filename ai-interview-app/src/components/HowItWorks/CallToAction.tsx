import { ArrowRightIcon } from "./ArrowRightIcon";
import { styles } from "./howItWorks.styles";
import type { CtaCopy } from "./howItWorks.types";

interface CallToActionProps extends CtaCopy {
  onStart?: () => void;
  onDemo?: () => void;
}

export function CallToAction({
  title,
  subtitle,
  primaryLabel,
  secondaryLabel,
  onStart,
  onDemo,
}: CallToActionProps) {
  return (
    <div className={styles.cta}>
      <h2 className={styles.ctaTitle}>{title}</h2>
      <p className={styles.ctaSubtitle}>{subtitle}</p>
      <div className={styles.ctaActions}>
        <button type="button" className={styles.ctaPrimary} onClick={onStart}>
          {primaryLabel}
          <ArrowRightIcon className={styles.ctaIcon} />
        </button>
        <button type="button" className={styles.ctaSecondary} onClick={onDemo}>
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
}
