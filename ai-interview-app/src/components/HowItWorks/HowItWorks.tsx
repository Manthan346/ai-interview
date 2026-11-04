import { CTA_COPY, SECTION_COPY, STEPS } from "./howItWorks.data";
import { styles } from "./howItWorks.styles";
import { useActiveStep } from "./useActiveStep";
import { SectionHeader } from "./SectionHeader";
import { ProgressBeam } from "./ProgressBeam";
import { StepRow } from "./StepRow";
import { CallToAction } from "./CallToAction";

interface HowItWorksProps {
  onStart?: () => void;
  onDemo?: () => void;
}

/** Container: wires content + scroll behaviour to presentational pieces. */
export function HowItWorks({ onStart, onDemo }: HowItWorksProps) {
  const { listRef, registerStep, activeIndex, focus, progress } = useActiveStep(STEPS.length);

  return (
    <section className={styles.section} aria-labelledby="hiw-heading">
      <div className={styles.inner}>
        <SectionHeader {...SECTION_COPY} />

        <div className={styles.listWrap}>
          <ProgressBeam progress={progress} />
          <ol className={styles.list} ref={listRef}>
            {STEPS.map((step, index) => (
              <StepRow
                key={step.id}
                step={step}
                number={index + 1}
                isActive={index === activeIndex}
                focus={focus[index] ?? 1}
                innerRef={registerStep(index)}
              />
            ))}
          </ol>
        </div>

        <CallToAction {...CTA_COPY} onStart={onStart} onDemo={onDemo} />
      </div>
    </section>
  );
}
