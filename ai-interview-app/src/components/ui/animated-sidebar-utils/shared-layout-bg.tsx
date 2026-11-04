"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { JSX, RefAttributes } from "react";

interface SharedLayoutBgProps
  extends Omit<HTMLMotionProps<"div">, "as">,
    RefAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements | React.ElementType;
  inset?: number;
  pillClassName?: string;
  pillContainerClassName?: string;
}

export function SharedLayoutBg({
  as = "div",
  inset = 0,
  pillClassName,
  pillContainerClassName,
  className,
  ...props
}: SharedLayoutBgProps) {
  const Comp = as as React.ElementType;

  return (
    <motion.div
      {...(props as Record<string, unknown>)}
      data-slot="shared-layout-bg"
      className={cn("overflow-hidden relative", className)}
    >
      <div
        className={cn("absolute inset-0 pointer-events-none", pillContainerClassName)}
      >
        <div
          className={cn(
            "absolute inset-0 bg-background",
            inset === 0 ? "inset-0" : `inset-${inset}`,
            pillClassName,
          )}
        />
      </div>
      <Comp className={cn(className)} />
    </motion.div>
  );
}
