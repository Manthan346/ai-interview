"use client"
import { useEffect, useRef, useState } from "react";

interface Options {
  threshold?: number;
  /** Stay `true` after the first time the element is seen. */
  once?: boolean;
}

/** True while the referenced element is on screen. */
export function useInView<T extends Element>({ threshold = 0.3, once = false }: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}
