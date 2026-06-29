import { motion } from "framer-motion";
import { FileText, Eye } from "lucide-react";
import type { CandidateStatus } from "../../app/types/interview";

export function CandidateActions({
  status,
  onClick,
}: {
  status: boolean;
  onClick?: () => void;
}) {
  
  const Icon = status ? FileText : Eye;
  const label = status ? "View Report" : "View Details";

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted/40 transition-colors"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </motion.button>
  );
}
