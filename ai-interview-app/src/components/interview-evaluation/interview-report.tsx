import { ReportHeader } from "./report-header";
import { ExecutiveSummary } from "./executive-summary";
import { InsightList } from "./insite-lists";
import { RoadmapGrid } from "./roadmap-grid";
import { CandidatePerspective } from "./candidate-perspective";


import { InterviewData } from "@/app/types/interview";

export default function InterviewReport({ data }: { data: InterviewData }) {
  return (
    <div className=" min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-13xl py-1 space-y-6 px-1">
        <ReportHeader
          candidate={data.candidateName}
          role={data.roleValue}
          experience={data.experienceValue}
          date={data.date}
          overallScore={data.overallScore}
          selectionChances={data.selectionChances}
        />
        <ExecutiveSummary summary={data.summary} verdict={data.finalInterviewVerdict} />
        <div className="grid gap-6 md:grid-cols-2">
          <InsightList
            title="Observed Strengths"
            items={data.strengths}
            variant="positive"
            badge={`${data.strengths?.length} POINTS`}
            border="border-l-accent"
          />
          <InsightList
            title="Critical Weaknesses"
            items={data.weaknesses}
            variant="negative"
            badge="HIGH IMPACT"
            border="border-l-destructive"
          />
        </div>
        <RoadmapGrid items={data.improvements} />
        <CandidatePerspective text={data.candidatePerspective} />
      </div>
    </div>
  );
}
