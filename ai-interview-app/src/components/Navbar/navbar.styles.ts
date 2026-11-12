export const styles = {
  header: "absolute inset-x-0 top-0 z-50 bg-transparent",
  inner: "relative mx-auto flex h-[4.5rem] max-w-[80rem] items-center justify-between px-3 sm:px-6 lg:px-8",
  logo: "inline-flex min-w-0 shrink-0 items-center gap-1.5 text-base font-bold tracking-tight text-foreground sm:gap-2 sm:text-lg",
  logoImage: "size-8 shrink-0 object-contain sm:size-9",
  links: "absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 md:flex lg:gap-7",
  link: "whitespace-nowrap rounded-sm text-sm font-medium text-foreground/75 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  actions: "flex shrink-0 items-center gap-2 sm:gap-3",
  cta: "inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_30%,transparent)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-4 sm:py-2.5 sm:text-sm",
  menuToggle: "inline-flex size-9 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden",
  mobileMenu: "absolute left-0 right-0 top-[calc(100%-0.25rem)] flex flex-col gap-1 rounded-2xl border border-border bg-background/95 p-3 shadow-xl backdrop-blur-xl md:hidden",
  mobileLink: "rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary",
};
