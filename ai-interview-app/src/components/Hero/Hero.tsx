"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRightIcon } from "../shared/icons";
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
            <AvatarGroup aria-label="Trusted by professionals and students">
              <Avatar>
                <AvatarImage src="/person1.jpg" alt="Professional" />
                <AvatarFallback>P1</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/person2.jpg" alt="Student" />
                <AvatarFallback>P2</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/person3.jpg" alt="Professional" />
                <AvatarFallback>P3</AvatarFallback>
              </Avatar>
            </AvatarGroup>
            <p className={styles.audienceText}>Trusted by 10k+ professionals and students</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
