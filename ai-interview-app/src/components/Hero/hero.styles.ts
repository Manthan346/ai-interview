import { sharedStyles } from "../shared/shared.styles";

export const styles = {
  section:
    "relative isolate overflow-clip px-4 pb-16 pt-24 text-center  text-foreground sm:px-6 sm:pb-20 sm:pt-28 md:pb-28 md:pt-40 " +
    // soft green glow behind the headline
    "before:pointer-events-none before:absolute before:left-1/2 before:top-0 before:-z-10 before:h-[36rem] before:w-[min(64rem,150vw)] before:-translate-x-1/2 " +
    "before:bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_10%,transparent),transparent)]",
  inner: "mx-auto flex w-full max-w-4xl flex-col items-center",
  title: "mt-7 max-w-full text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] sm:mt-8 sm:text-4xl md:text-5xl lg:text-6xl",
  titleLine: "block",
  firstTitleLine: "whitespace-normal sm:whitespace-nowrap",
  accent: "text-primary",
  subtitle: "mt-5 max-w-xl text-base leading-relaxed text-foreground/60 sm:mt-7 sm:text-lg md:text-lg",
  actions: "mt-8 flex w-full flex-row flex-nowrap items-center justify-center gap-2 sm:mt-10 sm:gap-3",
  primaryCta:
    `${sharedStyles.primaryCta} min-w-0 flex-1 px-2.5 py-3 text-[0.6875rem] ` +
    "sm:flex-none sm:px-6 sm:py-3.5 sm:text-sm",
  primaryCtaIcon: "size-3.5 shrink-0 sm:size-4",
  secondaryCta:
    "inline-flex min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-xl border border-white/10 bg-white/5 px-2.5 py-3 text-[0.6875rem] font-semibold text-foreground transition hover:bg-white/10 sm:flex-none sm:px-6 sm:py-3.5 sm:text-sm",
  proof: "mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10",
  audienceText: "text-sm text-foreground/70 sm:text-base",
};
