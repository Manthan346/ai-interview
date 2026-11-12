/** Styling only — Tailwind class strings grouped by card. */
export const styles = {
  section: "relative px-4 pb-20  text-foreground sm:px-6 sm:pb-32",
  header: "mb-8 flex justify-center sm:mb-10",
  grid: "mx-auto grid max-w-[62rem] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3",

  // ---- shared card shell ---------------------------------------------------
  card:
    "relative flex min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-white/8 bg-card/70 p-4 sm:rounded-[1.75rem] sm:p-5 " +
    "before:pointer-events-none before:absolute before:inset-x-10 before:-top-16 before:h-24 before:rounded-full before:blur-2xl " +
    "before:bg-[color-mix(in_oklab,var(--primary)_14%,transparent)]",
  cardTall: "lg:min-h-[28rem]",
  cardWide: "sm:col-span-2 lg:col-span-3 border-primary/30 shadow-[0_0_70px_-25px_color-mix(in_oklab,var(--primary)_45%,transparent)]",
  cardHead: "relative flex min-w-0 flex-col items-start justify-between gap-2 sm:flex-row sm:gap-3",
  cardTitle: "text-lg font-bold leading-tight tracking-tight",
  cardSubtitle: "mt-1 text-[0.6875rem] text-foreground/40",

  // ---- live roleplay -------------------------------------------------------
  chat: "relative mt-5 flex flex-1 flex-col gap-3",
  chatRowAi: "flex items-start gap-2",
  chatRowUser: "flex justify-end",
  chatAvatar: "grid size-[1.375rem] shrink-0 place-items-center rounded-md border border-primary/40 bg-primary/10 text-primary",
  chatAvatarIcon: "size-3",
  bubbleAi:
    "max-w-[85%] rounded-xl border border-white/8 bg-white/5 px-3 py-2 text-xs leading-snug text-foreground/90",
  bubbleUser:
    "max-w-[85%] rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-xs leading-snug text-foreground",
  caret: "ml-0.5 inline-block h-3 w-px animate-pulse bg-primary align-middle",
  listening:
    "relative mt-6 flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 " +
    "text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-foreground/40",
  waveform: "flex h-3.5 items-center gap-[3px]",
  waveBar: "h-full w-[2px] origin-center animate-wave rounded-full bg-primary",
  waveDelays: ["[animation-delay:0ms]", "[animation-delay:150ms]", "[animation-delay:300ms]", "[animation-delay:100ms]", "[animation-delay:250ms]", "[animation-delay:50ms]"],

  // ---- semantic feedback ---------------------------------------------------
  ring: "relative mx-auto mt-6 grid size-36 place-items-center",
  ringSvg: "absolute inset-0 size-full -rotate-90",
  ringTrack: "fill-none stroke-white/10",
  ringProgress:
    "fill-none stroke-primary [filter:drop-shadow(0_0_6px_color-mix(in_oklab,var(--primary)_70%,transparent))]",
  ringCenter: "relative text-center",
  ringValue: "text-4xl font-extrabold leading-none tracking-tight",
  ringMax: "ml-0.5 text-xs font-normal text-foreground/40",
  ringCaption: "mt-1.5 text-[0.5rem] font-bold uppercase tracking-[0.18em] text-foreground/40",
  metrics: "relative mt-6 flex flex-col gap-2",
  metric:
    "flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-3 text-xs font-medium",
  tag: "rounded-full border px-2.5 py-0.5 text-[0.5625rem] font-bold uppercase tracking-wider",
  tagSuccess: "border-primary/40 bg-primary/10 text-primary",
  tagWarning: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  quote:
    "relative mt-0 rounded-xl border border-primary/25 bg-primary/5 px-3 py-2.5 text-[0.6875rem] italic leading-snug text-foreground/50",
  quoteHighlight: "font-bold text-primary",

  // ---- role banks ----------------------------------------------------------
  roles: "relative mt-5 flex flex-col gap-2.5",
  role:
    "group/role flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3 transition-all duration-500 " +
    "data-[active=true]:border-primary/50 data-[active=true]:bg-primary/10",
  roleIconBox:
    "grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-foreground/40 transition-colors duration-500 " +
    "group-data-[active=true]/role:border-primary/40 group-data-[active=true]/role:bg-primary/10 group-data-[active=true]/role:text-primary",
  roleIcon: "size-3.5",
  roleName: "text-[0.8125rem] font-bold leading-tight tracking-tight",
  roleSkills: "mt-0.5 text-[0.625rem] text-foreground/40",

  // ---- evaluation questions ------------------------------------------------
  questions: "relative mt-4 flex min-w-0 flex-col gap-2.5 sm:mt-5 sm:gap-3",
  question:
    "group/q grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] items-start gap-x-3 gap-y-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3 transition-all duration-500 " +
    "sm:grid-cols-[2rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4 sm:rounded-2xl sm:px-4 sm:py-4 " +
    "data-[active=true]:border-primary/50 data-[active=true]:bg-primary/10",
  questionIconBox:
    "grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-foreground/40 transition-colors duration-500 " +
    "group-data-[active=true]/q:border-primary/40 group-data-[active=true]/q:bg-primary/10 group-data-[active=true]/q:text-primary",
  questionIcon: "size-4",
  questionBody: "min-w-0",
  questionLabel: "text-[0.5625rem] font-bold uppercase tracking-[0.14em] text-primary",
  questionText: "mt-0.5 text-[0.8125rem] font-bold leading-snug",
  // grid-rows 0fr → 1fr animates the expected answer open without measuring height
  expected:
    "grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-data-[active=true]/q:grid-rows-[1fr] group-data-[active=true]/q:opacity-100",
  expectedInner: "overflow-hidden",
  expectedText: "pt-1.5 break-words text-[0.625rem] leading-snug text-foreground/40",
  expectedLabel: "mr-1 font-bold uppercase text-primary",
  scoreBox: "col-start-2 flex w-full min-w-0 items-center justify-between gap-3 sm:col-start-auto sm:w-auto sm:justify-end sm:gap-4",
  scoreChip: "rounded-md border border-red-400/30 bg-red-400/10 px-2 py-1 text-xs font-bold text-red-300",
  scoreMax: "ml-0.5 text-[0.5rem] font-normal italic",
  severity: "w-14 shrink-0",
  severityLabel: "text-[0.5rem] font-bold uppercase tracking-wider text-red-400",
  severityTrack: "mt-1 h-[3px] overflow-hidden rounded-full bg-white/10",
  severityFill: "h-full rounded-full bg-red-400",
};
