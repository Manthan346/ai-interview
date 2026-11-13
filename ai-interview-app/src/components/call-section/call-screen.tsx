"use client"

import { aura, candidate } from "./data";
import { Participant } from "./participants";
import { AudioWave } from "./audio-wave";
import { Transcript } from "./transcript";
import { Controls } from "./controls";
import { useVoiceCall } from "../../app/hooks/useVoiceCall";
import { FadeUp } from "./motion-section";
import ErrorMessage from "../error-message/error-message";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, Mic, MicOff, CheckCircle, AlertCircle, Wifi, Volume2, Check, Loader } from "lucide-react";

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

export function CallScreen() {
  const { isMicOn, isCallActive, aiSpeaking, isAiThinking, handleAudio, handleEndCall, conversation, errorMsg, isSocketConnected, isWebSocketDisconnected, isTtsReady, isSttReady, isSetupComplete, setupStatus } =
    useVoiceCall();
  const router = useRouter()

  // Debug logging for setup states
  useEffect(() => {
    console.log('CallScreen setup states:', {
      isSocketConnected,
      isTtsReady,
      isSttReady,
      isSetupComplete,
      setupStatus
    });
  }, [isSocketConnected, isTtsReady, isSttReady, isSetupComplete, setupStatus]);


  const auraSubtitle = aiSpeaking
    ? "Responding..."
    : isAiThinking
      ? "Thinking..."
      : aura.status;

  // Show setup progress while services are initializing
  if (!isSetupComplete) {
    return (
      <main className="min-h-screen bg-background text-foreground mt-20 relative">
        <div className="max-w-full mx-auto px-3 md:px-8 py-8 md:py-14 flex flex-col gap-8 md:gap-10 items-center justify-center min-h-[60vh]">

          {/* Setup Progress Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <Loader2 className="h-4 w-4 animate-spin" />
              Initializing Interview
            </div>
            <h1 className="text-3xl font-bold text-foreground mt-4">Setting up AI Interview</h1>
            <p className="text-muted-foreground mt-2">Please wait while we connect all services...</p>
          </div>

          {/* Setup Steps */}
          <div className="w-full max-w-md space-y-4">
            <SetupStep
              Icon={Wifi}
              label="Connecting to AI "
              status={isSocketConnected ? "complete" : setupStatus === "socket_connected" ? "current" : "pending"}
            />
            <SetupStep
              Icon={Volume2}
              label="AI is reading your details"
              status={isTtsReady ? "complete" : setupStatus === "tts_ready" ? "current" : "pending"}
            />
            <SetupStep
              Icon={Mic}
              label="Completing setup"
              status={isSttReady ? "complete" : setupStatus === "stt_ready" ? "current" : "pending"}
            />
          </div>

          {/* Error Display */}
          {errorMsg && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{errorMsg}</span>
            </div>
          )}

          {/* Status Message */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Status: <span className="font-medium capitalize">{setupStatus.replace(/_/g, ' ')}</span></p>
          </div>
        </div>
      </main>
    );
  }

  // Show setup progress while services are initializing
  if (!isSetupComplete) {
    return (
      <main className="min-h-screen bg-background text-foreground mt-20 relative">
        <div className="max-w-full mx-auto px-3 md:px-8 py-8 md:py-14 flex flex-col gap-8 md:gap-10 items-center justify-center min-h-[60vh]">

          {/* Setup Progress Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <Loader2 className="h-4 w-4 animate-spin" />
              Initializing Interview
            </div>
            <h1 className="text-3xl font-bold text-foreground mt-4">Setting up AI Interview</h1>
            <p className="text-muted-foreground mt-2">Please wait while we connect all services...</p>
          </div>

          {/* Setup Steps */}
          <div className="w-full max-w-md space-y-4">
            <SetupStep
              Icon={Wifi}
              label="WebSocket Connection"
              status={isSocketConnected ? "complete" : setupStatus === "socket_connected" ? "current" : "pending"}
            />
            <SetupStep
              Icon={Volume2}
              label="Text-to-Speech (TTS)"
              status={isTtsReady ? "complete" : setupStatus === "tts_ready" ? "current" : "pending"}
            />
            <SetupStep
              Icon={Mic}
              label="Speech-to-Text (STT)"
              status={isSttReady ? "complete" : setupStatus === "stt_ready" ? "current" : "pending"}
            />
          </div>

          {/* Error Display */}
          {errorMsg && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{errorMsg}</span>
            </div>
          )}

          {/* Status Message */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Status: <span className="font-medium capitalize">{setupStatus.replace(/_/g, ' ')}</span></p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground mt-20 relative">

           {errorMsg && <ErrorMessage  errormsg={errorMsg}   /> }

      <div className="max-w-full mx-auto px-3 md:px-8 py-8 md:py-14 flex flex-col gap-8 md:gap-10">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-10">

          <Participant
            name={aura.name}
            subtitle={auraSubtitle}
            kind="ai"
            speaking={aiSpeaking}
            thinking={isAiThinking}
            delay={0.1}
          />
          <AudioWave active={aiSpeaking || isMicOn} />
          <Participant
            name={candidate.name}
            subtitle={candidate.role}
            kind="candidate"
            showMicIcon
            micOn={isMicOn && isCallActive}
            delay={0.2}
          />
        </div>

        <Transcript userText={conversation.userText} aiText={conversation.aiText} />

        <Controls
          isMicOn={isMicOn}
          isCallActive={isCallActive}
          onToggleMic={handleAudio}
          onEndCall={handleEndCall}
        />

        {!isCallActive && (
          <FadeUp>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md">
              <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-2xl">
                <h3 className="text-2xl font-semibold text-card-foreground">Call Ended</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thank you for joining the session. you will be redirected to dashboard
                </p>
              </div>
            </div>
          </FadeUp>
        )}
      </div>

    </main>
  );
}