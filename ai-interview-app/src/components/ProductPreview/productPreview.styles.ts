export const styles = {
  section: "relative isolate px-4 pb-20 font-[Inter,var(--font-sans)] sm:px-6 sm:pb-32",
  glow:
    "pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[30rem] max-w-4xl blur-3xl " +
    "bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_14%,transparent),transparent)]",
  frame:
    "mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-card " +
    "shadow-[0_24px_72px_-24px_color-mix(in_oklab,var(--primary)_30%,transparent)] sm:rounded-2xl " +
    "sm:shadow-[0_40px_120px_-30px_color-mix(in_oklab,var(--primary)_30%,transparent)]",
  bar: "relative flex h-8 items-center border-b border-white/8 bg-white/[0.03] px-3 sm:h-9 sm:px-4",
  dots: "flex gap-1",
  dot: "size-2 rounded-full bg-white/15 sm:size-2.5",
  url: "absolute left-1/2 max-w-[calc(100%-5rem)] -translate-x-1/2 truncate rounded-md bg-white/5 px-3 py-0.5 text-[0.5625rem] text-foreground/40 sm:px-10 sm:text-[0.625rem]",
  image: "block aspect-[2/1] w-full object-cover object-center sm:aspect-auto sm:object-contain",
};
