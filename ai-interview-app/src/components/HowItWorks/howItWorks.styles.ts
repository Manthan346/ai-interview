/**
 * Styling only — Tailwind class strings grouped by element.
 * Base colours resolve to the theme tokens in src/index.css
 * (bg-background, text-foreground, border-border, primary/accent for the beam);
 * violet is the accent used for the badge + card glow, as in the reference video.
 */
// fades a step's content as it scrolls away; the card background stays opaque so the beam never shows through
const fade = "opacity-[calc(0.25_+_0.75_*_var(--focus,1))] transition-opacity duration-200 ease-out";

export const styles = {
  section:
    "relative isolate overflow-clip bg-background px-6 pb-40 pt-28 font-[Inter,var(--font-sans)] text-foreground",
  inner: "mx-auto max-w-[61rem]",

  // ---- header --------------------------------------------------------------
  header: "mb-20 flex flex-col items-center gap-7 text-center",
  eyebrow:
    "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-foreground/55",
  title: "text-5xl font-extrabold leading-none tracking-[-0.045em] md:text-[4rem]",
  subtitle: "max-w-[34rem] text-base leading-[1.6] text-foreground/45 md:text-[1.0625rem]",

  // ---- timeline beam (threads behind the cards, centred) -------------------
  listWrap: "relative",
  beam: "pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden w-0.5 -translate-x-1/2 md:block",
  beamFill:
    "absolute inset-0 origin-top scale-y-(--progress) transition-transform duration-150 ease-linear " +
    "bg-linear-to-b from-transparent via-cyan-400 to-primary " +
    "shadow-[0_0_14px_1px_color-mix(in_oklab,var(--color-cyan-400)_45%,transparent)]",
  list: "relative z-10 flex flex-col",

  // ---- step row ------------------------------------------------------------
  // group/step lets children react to data-active; --focus (0..1) drives blur/fade
  step:
    "group/step grid grid-cols-1 items-start gap-x-12 gap-y-10 pb-28 last:pb-0 md:grid-cols-[3fr_5fr] " +
    "blur-[calc((1_-_var(--focus,1))_*_6px)] transition-[filter] duration-200 ease-out",

  // ---- step text (left) ----------------------------------------------------
  text: `w-full ${fade}`,
  numberRow: "flex items-center gap-4",
  number:
    "grid size-8 shrink-0 place-items-center rounded-full border border-white/15 bg-background text-[0.8125rem] font-semibold text-foreground/50 " +
    "transition-all duration-500 " +
    "group-data-[active=true]/step:border-white/80 group-data-[active=true]/step:text-white " +
    "group-data-[active=true]/step:shadow-[0_0_18px_color-mix(in_oklab,var(--color-violet-500)_55%,transparent)]",
  numberLine: "h-px flex-1 bg-white/8",
  stepTitle: "mt-8 max-w-[22rem] text-4xl font-extrabold leading-none tracking-[-0.04em] md:text-[3rem]",
  stepDescription: "mt-6 max-w-[22rem] text-[0.9375rem] leading-6 text-foreground/45",

  // ---- glass card (right) --------------------------------------------------
  card:
    "relative aspect-[16/10] w-full rounded-[2rem] border border-white/10 p-3 " +
    "bg-card " +
    // violet glow behind the card
    "before:pointer-events-none before:absolute before:-inset-10 before:-z-10 before:rounded-full before:opacity-0 before:blur-2xl " +
    "before:bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-violet-500)_22%,transparent),transparent)] " +
    "before:transition-opacity before:duration-700 group-data-[active=true]/step:before:opacity-100 " +
    // gold→cyan hairline on the bottom edge
    "after:pointer-events-none after:absolute after:inset-x-16 after:bottom-0 after:h-px after:opacity-0 " +
    "after:bg-[linear-gradient(90deg,transparent,rgb(251_191_36/0.7),rgb(34_211_238/0.7),transparent)] " +
    "after:transition-opacity after:duration-700 group-data-[active=true]/step:after:opacity-100",
  cardFrame: `size-full overflow-hidden rounded-[1.4rem] ${fade}`,
  cardImage: "block size-full object-contain",
  badge:
    "absolute right-6 top-5 inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-500/15 px-3 py-1.5 " +
    "text-xs font-semibold text-violet-200 backdrop-blur-md",
  badgeIcon: "size-3.5 text-violet-400",

  // ---- call to action ------------------------------------------------------
  cta: "relative mt-32 flex flex-col items-center text-center " +
    "before:pointer-events-none before:absolute before:left-1/2 before:top-1/2 before:-z-10 before:h-[28rem] before:w-[44rem] " +
    "before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:blur-3xl " +
    "before:bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-indigo-500)_14%,transparent),transparent)]",
  ctaTitle: "max-w-[36rem] text-5xl font-extrabold leading-[1.05] tracking-[-0.045em] md:text-[3.5rem]",
  ctaSubtitle: "mt-7 max-w-[34rem] text-base leading-[1.6] text-foreground/45 md:text-[1.0625rem]",
  ctaActions: "mt-10 flex flex-wrap items-center justify-center gap-3",
  ctaPrimary:
    "inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[0.9375rem] font-semibold text-black " +
    "transition hover:bg-white/90",
  ctaSecondary:
    "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-[0.9375rem] font-semibold text-white/60 " +
    "transition hover:bg-white/10 hover:text-white",
  ctaIcon: "size-4",
};
