/** Styling for the small primitives reused across sections (Logo, Pill). */
export const sharedStyles = {
  logo: "inline-flex items-center gap-2.5",
  logoMark: "grid size-7 place-items-center rounded-lg bg-primary text-white shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_40%,transparent)]",
  logoIcon: "size-4",
  logoText: "text-lg font-bold tracking-tight text-foreground",

  pillBase:
    "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-primary/30 bg-primary/10 font-bold uppercase text-primary",
  pillMd: "px-3 py-1 text-[0.625rem] tracking-[0.16em]",
  pillSm: "px-2.5 py-0.5 text-[0.5625rem] tracking-wider",
  pillDot: "size-1.5 rounded-full bg-primary",
  pillIcon: "size-3",
};
