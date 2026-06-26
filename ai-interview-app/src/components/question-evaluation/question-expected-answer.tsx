import { memo } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  answer?: string[] | null;
  id: string;
}

export const QuestionExpectedAnswer = memo(function QuestionExpectedAnswer({ answer, id }: Props) {
  const safeAnswer = Array.isArray(answer) ? answer : [];

  return (
    <Accordion type="single" collapsible className="mt-4">
      <AccordionItem
        value={id}
        className="rounded-xl border border-border/60 bg-background/40 px-4 border-b"
      >
        <AccordionTrigger className="py-3 hover:no-underline">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[11px] font-bold tracking-widest text-foreground">
                VIEW EXPECTED ANSWER
              </span>
            </div>
           
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {safeAnswer.length > 0 ? (
            <ul className="space-y-2 pt-1">
              {safeAnswer.map((line, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  whileHover={{ x: 3 }}
                  className="flex gap-2 text-sm text-muted-foreground leading-relaxed"
                >
                  <span className="text-emerald-400/70 mt-0.5">▸</span>
                  <span>{line.replace(/^[-\s]+/, "")}</span>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="pt-1 text-sm text-muted-foreground">No expected answer available.</p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
});
