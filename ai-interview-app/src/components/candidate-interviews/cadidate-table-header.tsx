export function CandidatesTableHeader() {
  return (
    <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 text-[10px] font-bold tracking-widest text-muted-foreground">
      <div className="col-span-4">CANDIDATE DETAILS</div>
      <div className="col-span-2">EXPERIENCE</div>
      <div className="col-span-2">STATUS</div>
      <div className="col-span-2">CREATED</div>
      <div className="col-span-2 text-right">ACTIONS</div>
    </div>
  );
}
