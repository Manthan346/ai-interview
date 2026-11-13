"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EvaluationCard } from "./EvaluationCard";
import { LiveRoleplayCard } from "./LiveRoleplayCard";
import { RoleBanksCard } from "./RoleBanksCard";
import { SemanticFeedbackCard } from "./SemanticFeedbackCard";
import { FEATURES } from "./features.data";
import { styles } from "./features.styles";

/** Auxiliam AI feature highlights. */
export function Features() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="features" className={styles.section} aria-labelledby="features-heading">
      <motion.h2
        id="features-heading"
        className={styles.header}
        initial={shouldReduceMotion ? false : { opacity: 0, filter: "blur(10px)", y: 10 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Why Auxiliam AI?
      </motion.h2>

      <div className={styles.grid}>
        <LiveRoleplayCard {...FEATURES.liveRoleplay} />
        <SemanticFeedbackCard {...FEATURES.semanticFeedback} />
        <RoleBanksCard {...FEATURES.roleBanks} />
        <EvaluationCard {...FEATURES.evaluation} />
      </div>
    </section>
  );
}
