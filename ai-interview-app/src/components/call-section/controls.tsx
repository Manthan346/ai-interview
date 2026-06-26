import { Mic, MicOff, Volume2, PhoneOff } from "lucide-react";
import { FadeUp } from "./motion-section";

interface CtlProps {
  icon: React.ReactNode;
  label: string;
  variant?: "default" | "danger" | "active";
  large?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

function Ctl({ icon, label, variant = "default", large, disabled, onClick }: CtlProps) {
  const size = large ? "w-14 h-14 md:w-16 md:h-16" : "w-10 h-10 md:w-12 md:h-12";
  const bg =
    variant === "danger"
      ? "bg-destructive text-destructive-foreground"
      : variant === "active"
        ? "bg-primary text-primary-foreground"
        : "bg-card text-foreground border border-border hover:bg-muted";
  const labelColor =
    variant === "danger"
      ? "text-destructive"
      : variant === "active"
        ? "text-primary"
        : "text-muted-foreground";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex flex-col items-center gap-1.5 group disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <span className={`ctl-btn ${size} ${bg} rounded-full flex items-center justify-center shadow-lg`}>
        {icon}
      </span>
      <span className={`text-[9px] md:text-[10px] tracking-[0.18em] font-semibold ${labelColor}`}>{label}</span>
    </button>
  );
}

interface ControlsProps {
  isMicOn: boolean;
  isCallActive: boolean;
  onToggleMic: () => void;
  onEndCall: () => void;
}

export function Controls({ isMicOn, isCallActive, onToggleMic, onEndCall }: ControlsProps) {
  return (
    <FadeUp delay={0.7}>
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
        <Ctl
          icon={isMicOn ? <Mic className="w-5 h-5z" /> : <MicOff className="w-5 h-5" />}
          label={isMicOn ? "MUTE" : "UNMUTE"}
          variant={isMicOn ? "active" : "default"}
          onClick={onToggleMic}
          disabled={!isCallActive}
        />
        <Ctl
          icon={<PhoneOff className="w-6 h-6" />}
          label="LEAVE SESSION"
          variant="danger"
          large
          onClick={onEndCall}
          disabled={!isCallActive}
        />
     
      </div>
    </FadeUp>
  );
}
