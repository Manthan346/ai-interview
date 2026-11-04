import { useCallback, useEffect, useRef, useState } from "react";
import type { RefCallback, RefObject } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

interface UseActiveStep {
  /** Attach to the element wrapping all steps. */
  listRef: RefObject<HTMLOListElement | null>;
  /** Ref callback factory — call with the step's index. */
  registerStep: (index: number) => RefCallback<HTMLLIElement>;
  /** Index of the step nearest the viewport centre. */
  activeIndex: number;
  /** Per-step visibility 0 (blurred/faded) → 1 (sharp). Steps fade as they leave through the top. */
  focus: number[];
  /** Scroll progress through the whole list, 0 → 1. */
  progress: number;
}

/** Scroll behaviour only — no markup, no styling. */
export function useActiveStep(stepCount: number): UseActiveStep {
  const listRef = useRef<HTMLOListElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const frame = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [focus, setFocus] = useState<number[]>(() => Array(stepCount).fill(1));

  const registerStep = useCallback(
    (index: number): RefCallback<HTMLLIElement> =>
      (node) => {
        stepRefs.current[index] = node;
      },
    [],
  );

  useEffect(() => {
    const measure = () => {
      const list = listRef.current;
      if (!list) return;

      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;

      let nearest = 0;
      let nearestDistance = Infinity;
      const nextFocus: number[] = [];

      stepRefs.current.forEach((node, index) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = index;
        }
        // Only steps that have scrolled *above* the centre fade out.
        const above = viewportCenter - center;
        nextFocus[index] = 1 - clamp((above - viewportHeight * 0.15) / (viewportHeight * 0.3), 0, 1);
      });

      setActiveIndex(nearest);
      setFocus(nextFocus);

      const listRect = list.getBoundingClientRect();
      setProgress(clamp((viewportCenter - listRect.top) / listRect.height, 0, 1));
    };

    const schedule = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return { listRef, registerStep, activeIndex, focus, progress };
}
