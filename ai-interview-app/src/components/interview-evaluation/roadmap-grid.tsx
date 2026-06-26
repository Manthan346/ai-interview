import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Props {
  items: string[];
}

export function RoadmapGrid({ items = [] }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="rounded-2xl hover:cursor-pointer border  bg-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="font-semibold italic">Recommended Roadmap</h3>
        </div>
        <span className="text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
          CURATED IMPROVEMENT PATH
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
        {items.map((item, i) => (
          <RoadmapCard key={i} index={i} item={item} />
        ))}
      </div>
    </motion.section>
  );
}

function RoadmapCard({ index, item }: { index: number; item: string }) {
  const [titleRaw, ...rest] = item.split(":");
  const hasTitle = rest.length > 0;
  const title = hasTitle ? titleRaw : `Step ${index + 1}`;
  const desc = hasTitle ? rest.join(":").trim() : item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 + index * 0.06 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative rounded-xl border-l-4 border-1  bg-background/40 p-5 border-l-primary overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-accent/5 transition-colors" />
      <div className="relative">
        <div className="text-[10px] font-bold tracking-widest text-primary mb-2">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="font-semibold mb-1.5">{title}</div>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}
