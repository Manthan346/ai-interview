"use client"
import { useEffect, useState } from "react";

/** Steps an index 0 → length-1 → 0 … on an interval (paused when disabled or reduced-motion). */
export function useCycle(length: number, intervalMs: number, enabled = true) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!enabled || reduceMotion || length < 2) return;

    const id = window.setInterval(() => setIndex((i) => (i + 1) % length), intervalMs);
    return () => window.clearInterval(id);
  }, [length, intervalMs, enabled]);

  return index;
}
