"use client"
import { useEffect, useState } from "react";

interface Options {
  enabled?: boolean;
  /** ms per character */
  speed?: number;
  /** ms to hold the finished text before restarting */
  holdMs?: number;
}

/** Types `text` out character by character, holds, then loops. */
export function useTypewriter(text: string, { enabled = true, speed = 38, holdMs = 2600 }: Options = {}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setCount(0);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let typed = 0;

    const tick = () => {
      if (typed < text.length) {
        typed += 1;
        setCount(typed);
        timer = setTimeout(tick, speed);
      } else {
        timer = setTimeout(() => {
          typed = 0;
          setCount(0);
          timer = setTimeout(tick, speed * 8);
        }, holdMs);
      }
    };

    timer = setTimeout(tick, speed * 8);
    return () => clearTimeout(timer);
  }, [text, enabled, speed, holdMs]);

  return text.slice(0, count);
}
