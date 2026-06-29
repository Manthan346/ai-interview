import { CheckCircle2, XCircle } from "lucide-react";
import { statusStyles, type CandidateStatus } from "../../app/types/interview";

export function StatusBadge({ status }: { status: boolean }) {
  const Icon = status   ? CheckCircle2 : XCircle;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] font-bold tracking-widest ${status ? statusStyles.COMPLETED : statusStyles.CANCELLED}`}
    >
      <Icon className="h-3 w-3" />
      {status ? "COMPLETED" : "CANCELLED"}
    </span>
  );
}
