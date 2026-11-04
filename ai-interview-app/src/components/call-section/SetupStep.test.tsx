import { Wifi, Volume2, Mic, Check, CheckCircle } from "lucide-react";

// Helper component for setup steps
function SetupStep({ Icon, label, status }: { Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; label: string; status: "pending" | "current" | "complete" }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border transition-all duration-300 animate-fade-in">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 ${
        status === "complete"
          ? "bg-green-100 text-green-600"
          : status === "current"
          ? "bg-primary/10 text-primary animate-pulse"
          : "bg-muted text-muted-foreground"
      }`}>
        {status === "complete" ? (
          <Check className="h-5 w-5" />
        ) : (
          <Icon className={status === "current" ? "animate-spin h-5 w-5" : "h-5 w-5"} />
        )}
      </div>
      <div className="flex-1 text-left">
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">
          {status === "complete" ? "Ready" : status === "current" ? "Connecting..." : "Waiting..."}
        </p>
      </div>
      {status === "complete" && (
        <CheckCircle className="h-5 w-5 text-green-500" />
      )}
    </div>
  );
}

// Test usage
const test = (
  <div>
    <SetupStep Icon={Wifi} label="WebSocket Connection" status="complete" />
    <SetupStep Icon={Volume2} label="Text-to-Speech (TTS)" status="current" />
    <SetupStep Icon={Mic} label="Speech-to-Text (STT)" status="pending" />
  </div>
);

export default test;