import { ArrowRightIcon } from "./ArrowRightIcon";
import { styles } from "./howItWorks.styles";
import type { CtaCopy } from "./howItWorks.types";

interface CallToActionProps extends CtaCopy {
  onStart?: () => void;
}

export function CallToAction({
  title,
  subtitle,
  primaryLabel,
  onStart,
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
      </div>
    </div>
  );
}
