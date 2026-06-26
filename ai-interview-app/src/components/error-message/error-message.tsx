type ErrorMessageProps = {
  errormsg: string;
};

export default function ErrorMessage({
  errormsg,
}: ErrorMessageProps) {
  return (
    <div className="mx-auto mb-4 w-full max-w-2xl rounded-2xl border border-destructive/20 bg-card/95 p-4 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-300 md:p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive shadow-sm">
          <span className="text-base font-semibold">!</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-destructive/90">
              Alert
            </p>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <p className="text-xs text-muted-foreground">Session notice</p>
          </div>

          <h3 className="mt-1 text-base font-semibold text-foreground">
            We hit a problem
          </h3>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {errormsg}
          </p>
        </div>
      </div>
    </div>
  );
}