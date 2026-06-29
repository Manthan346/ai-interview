export function CandidateAvatar({ name }: { name: string }) {
  const initial = (name?.trim()?.[0] ?? "?").toUpperCase();
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 text-sm font-semibold text-primary">
      {initial}
    </div>
  );
}
