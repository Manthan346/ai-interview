import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cardHover } from "../../app/types/interview";

interface Props {
  title: string;
  items: string[];
  variant: "positive" | "negative";
  badge?: string;
  border: "border-l-success" | "border-l-destructive"
}

export function InsightList({ title, items = [], variant, badge, border }: Props) {
  const isPositive = variant === "positive";
  const Icon: LucideIcon = isPositive ? CheckCircle2 : XCircle;
  const color = isPositive ? "text-emerald-400" : "text-destructive";
  const fromX = isPositive ? -16 : 16;
  const hoverX = isPositive ? 4 : -4;

  return (
    <motion.section
      initial={{ opacity: 0, x: fromX }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      {...cardHover}
      className={`rounded-2xl border-l-4 border-1 hover:cursor-pointer ${border} bg-card p-6`}
    >
      <div className="flex items-center  justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${color}`} />
          <h3 className="font-semibold italic">{title}</h3>
        </div>
        {badge && (
          <span className={`text-[10px] font-bold tracking-widest ${color}`}>{badge}</span>
        )}
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -fromX / 1.6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            whileHover={{ x: hoverX }}
            className="flex gap-3 text-sm  text-muted-foreground"
          >
            <Icon className={`h-4 w-4 ${color} mt-0.5 shrink-0`} />
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
