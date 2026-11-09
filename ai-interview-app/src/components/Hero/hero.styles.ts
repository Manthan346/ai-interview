export const styles = {
  section:
    "relative isolate overflow-clip px-4 pb-16 pt-24 text-center font-[Inter,var(--font-sans)] text-foreground sm:px-6 sm:pb-20 sm:pt-28 md:pb-28 md:pt-40 " +
    // soft green glow behind the headline
    "before:pointer-events-none before:absolute before:left-1/2 before:top-0 before:-z-10 before:h-[36rem] before:w-[min(64rem,150vw)] before:-translate-x-1/2 " +
    "before:bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_10%,transparent),transparent)]",
  inner: "mx-auto flex w-full max-w-4xl flex-col items-center",
  title: "mt-7 max-w-full text-[clamp(1rem,calc(5.8vw+1.2px),3.9rem)] font-extrabold leading-[1.05] tracking-[-0.045em] sm:mt-8",
  titleLine: "block",
  firstTitleLine: "whitespace-nowrap",
  accent: "text-primary",
  subtitle: "mt-6 max-w-xl text-sm leading-relaxed text-foreground/50 sm:mt-7 sm:text-base md:text-lg",
  actions: "mt-8 flex w-full flex-row flex-nowrap items-center justify-center gap-2 sm:mt-10 sm:gap-3",
  primaryCta:
    "inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-primary px-2.5 py-3 text-[0.6875rem] font-semibold text-primary-foreground " +
    "shadow-[0_0_30px_color-mix(in_oklab,var(--primary)_35%,transparent)] transition hover:brightness-110 sm:flex-none sm:gap-2 sm:px-6 sm:py-3.5 sm:text-sm",
  primaryCtaIcon: "size-3.5 shrink-0 sm:size-4",
  secondaryCta:
    "inline-flex min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-xl border border-white/10 bg-white/5 px-2.5 py-3 text-[0.6875rem] font-semibold text-foreground transition hover:bg-white/10 sm:flex-none sm:px-6 sm:py-3.5 sm:text-sm",
  proof: "mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10",
  audienceBadge:
    "h-auto max-w-full gap-1.5 whitespace-normal border-primary/25 bg-primary/5 px-3 py-1.5 text-center text-[0.625rem] text-foreground/70 sm:text-xs [&>svg]:size-4 [&>svg]:shrink-0",
};
