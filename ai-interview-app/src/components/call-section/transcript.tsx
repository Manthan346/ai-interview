import { FadeUp } from "./motion-section";

import { TranscriptProps } from "@/app/types/interview";

export function Transcript({
  userText,
  aiText,
}: TranscriptProps) {
  return (
    <FadeUp delay={0.5}>
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-border bg-card/90 p-4 md:p-6 shadow-2xl backdrop-blur-xl">
        
        <div className="space-y-4 text-sm md:text-base leading-relaxed">
          
          {/* AI Message */}
          <div className="flex items-start gap-3">
            <span className="mt-1 text-xs font-bold uppercase tracking-wider text-primary">
              AI
            </span>

            <div className="rounded-xl bg-muted px-4 py-3 text-foreground w-full">
              <p>{aiText }</p>
            </div>
          </div>

          {/* User Message */}
          <div className="flex items-start gap-3 justify-end">
            <div className="rounded-xl bg-primary/10 px-4 py-3 text-foreground max-w-[80%]">
              <p>{userText}</p>
            </div>

            <span className="mt-1 text-xs font-bold uppercase tracking-wider text-primary">
              User
            </span>
          </div>

        </div>
      </div>
    </FadeUp>
  );
}