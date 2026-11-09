"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Pill } from "../shared/Pill";
import { ArrowRightIcon } from "../shared/icons";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { HERO } from "./hero.data";
import { styles } from "./hero.styles";

const reveal = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

const sequence = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.3,
    },
  },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Pill icon="sparkle">{HERO.badge}</Pill>

        <motion.div
          className="flex w-full flex-col items-center"
          variants={sequence}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
        >
          <motion.h1 className={styles.title} variants={reveal}>
            <span className={`${styles.titleLine} ${styles.firstTitleLine}`}>{HERO.headlineLine1}</span>
            <span className={styles.titleLine}>
              {HERO.headlineLine2Prefix}
              <span className={styles.accent}>{HERO.headlineAccent}</span>
            </span>
          </motion.h1>

          <motion.p className={styles.subtitle} variants={reveal}>
            {HERO.subtitle}
          </motion.p>

          <motion.div className={styles.actions} variants={reveal}>
            <a href={HERO.primaryCta.href} className={styles.primaryCta}>
              {HERO.primaryCta.label}
              <ArrowRightIcon className={styles.primaryCtaIcon} />
            </a>
            <a href={HERO.secondaryCta.href} className={styles.secondaryCta}>
              {HERO.secondaryCta.label}
            </a>
          </motion.div>

          <motion.div className={styles.proof} variants={reveal}>
            <AvatarGroup aria-label="Students and professionals">
              <Avatar size="sm">
                <AvatarImage src="/candidate.jpg" alt="Student" />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarImage src="/aura-ai.jpg" alt="Professional" />
                <AvatarFallback>PR</AvatarFallback>
              </Avatar>
            </AvatarGroup>
            <Badge variant="outline" className={styles.audienceBadge}>
              {HERO.audienceLabel}
            </Badge>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
