import type { ReactNode, Ref } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Pill } from "../shared/Pill";
import { styles } from "./features.styles";

interface FeatureCardProps {
  title: string;
  subtitle: string;
  /** Optional green pill in the top-right corner. */
  badge?: string;
  className?: string;
  cardRef?: Ref<HTMLElement>;
  animationDelay?: number;
  children: ReactNode;
}

/** Shared card shell: title, subtitle, optional badge, then the card body. */
export function FeatureCard({
  title,
  subtitle,
  badge,
  className = "",
  cardRef,
  animationDelay = 0,
  children,
}: FeatureCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      ref={cardRef}
      className={`${styles.card} ${className}`}
      initial={shouldReduceMotion ? false : { opacity: 0, filter: "blur(10px)", y: 24 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: shouldReduceMotion ? 0 : animationDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <header className={styles.cardHead}>
        <div>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardSubtitle}>{subtitle}</p>
        </div>
        {badge && (
          <Pill icon="dot" size="sm">
            {badge}
          </Pill>
        )}
      </header>
      {children}
    </motion.article>
  );
}
