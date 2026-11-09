"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PREVIEW } from "./productPreview.data";
import { styles } from "./productPreview.styles";

/** Browser-window mockup showing the live interview screen. */
export function ProductPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [12, 0]);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Product preview">
      <div className={styles.glow} aria-hidden="true" />
      <motion.div
        className={styles.frame}
        style={{
          rotateX,
          transformPerspective: 1200,
          transformOrigin: "center bottom",
        }}
      >
        <div className={styles.bar}>
          <div className={styles.dots} aria-hidden="true">
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
          <span className={styles.url}>{PREVIEW.url}</span>
        </div>
        <img className={styles.image} src={PREVIEW.image} alt={PREVIEW.imageAlt} />
      </motion.div>
    </section>
  );
}
