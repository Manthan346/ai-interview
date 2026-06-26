"use client"

import { aura, candidate } from "./data";
import { Participant } from "./participants";
import { AudioWave } from "./audio-wave";
import { Transcript } from "./transcript";
import { Controls } from "./controls";
import { useVoiceCall } from "../../app/hooks/useVoiceCall";
import { FadeUp } from "./motion-section";
import ErrorMessage from "../error-message/error-message";



export function CallScreen() {
  const { isMicOn, isCallActive, aiSpeaking, isAiThinking, handleAudio, handleEndCall, conversation, errorMsg } =
    useVoiceCall();

  const auraSubtitle = aiSpeaking
    ? "Responding..."
    : isAiThinking
      ? "Thinking..."
      : aura.status;

  const auraImage = typeof aura.image === "string" ? aura.image : aura.image.src;

  return (
    <main className="min-h-screen bg-background text-foreground mt-20 relative">
   
           {errorMsg && <ErrorMessage  errormsg={errorMsg}   /> } 
        
      <div className="max-w-full mx-auto px-3 md:px-8 py-8 md:py-14 flex flex-col gap-8 md:gap-10">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-10">
         
          <Participant
            name={aura.name}
            subtitle={auraSubtitle}
            image={auraImage}
          
            speaking={aiSpeaking}
            thinking={isAiThinking}
            delay={0.1}
          />
          <AudioWave active={aiSpeaking || isMicOn} />
          <Participant
            name={candidate.name}
            subtitle={candidate.role}
            image={auraImage}
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
                  Thank you for joining the session.
                </p>
              </div>
            </div>
          </FadeUp>
        )}
      </div>
   
    </main>
  );
}
