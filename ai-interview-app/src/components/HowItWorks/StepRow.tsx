import type { CSSProperties, RefCallback } from "react";
import { StepText } from "./StepText";
import { StepVisual } from "./StepVisual";
import { styles } from "./howItWorks.styles";
import type { Step } from "./howItWorks.types";

interface StepRowProps {
  step: Step;
  number: number;
  isActive: boolean;
  /** 0 → 1 visibility, exposed to CSS as --focus. */
  focus: number;
  innerRef: RefCallback<HTMLLIElement>;
}

export function StepRow({ step, number, isActive, focus, innerRef }: StepRowProps) {
  return (
    <li
      ref={innerRef}
      className={styles.step}
      data-active={isActive}
      style={{ "--focus": focus } as CSSProperties}
    >
      <StepText number={number} title={step.title} description={step.description} />
      <StepVisual stepId={step.id} isActive={isActive} badge={step.badge} />
    </li>
  );
}
