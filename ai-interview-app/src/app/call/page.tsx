"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, PhoneOff, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useVoiceCall } from "../hooks/useVoiceCall";

const Index = () => {

  const {isMicOn,
    isCallActive,
    aiSpeaking,
    handleAudio,
    handleEndCall} = useVoiceCall()


  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary sm:p-8">
      <div className="w-full max-w-8xl rounded-lg border border-border bg-background p-4 sm:p-8">

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mb-6 sm:mb-8">

          <div className="relative flex aspect-video items-center justify-center rounded-lg bg-secondary">
            <motion.div
              animate={
                aiSpeaking
                  ? { scale: [1, 1.15, 1], opacity: [1, 0.8, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 1, repeat: aiSpeaking ? Infinity : 0 }}
              className="h-20 w-20 sm:h-28 sm:w-28 rounded-full border-4 border-primary"
            />
            <span className="absolute bottom-3 left-3 text-sm font-medium text-secondary-foreground opacity-70">
              AI
            </span>
            {!isCallActive && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-secondary/80">
                <span className="text-secondary-foreground font-medium">Call Ended</span>
              </div>
            )}
          </div>

          {/* User Panel */}
          <div className="relative flex aspect-video items-center justify-center rounded-lg bg-secondary">
            {isMicOn && isCallActive && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute h-28 w-28 sm:h-36 sm:w-36 rounded-full border border-primary"
                />
                <motion.div
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  className="absolute h-28 w-28 sm:h-36 sm:w-36 rounded-full border border-primary"
                />
              </>
            )}
            <motion.div
              animate={isMicOn && isCallActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-primary"
            />
            <span className="absolute bottom-3 left-3 text-sm font-medium text-secondary-foreground opacity-70">
              User
            </span>
            {!isMicOn && (
              <div className="absolute top-3 right-3">
                <MicOff className="h-5 w-5 text-destructive" />
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={handleAudio}
            disabled={!isCallActive}
            className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 sm:px-5 sm:py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isMicOn ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            <span className="hidden sm:inline">Mic {isMicOn ? "On" : "Off"}</span>
          </button>

          <button
            onClick={handleEndCall}
            disabled={!isCallActive}
            className="flex items-center gap-2 rounded-lg bg-destructive px-4 py-2.5 sm:px-5 sm:py-3 text-sm font-medium text-destructive-foreground transition-colors hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <PhoneOff className="h-4 w-4" />
            <span className="hidden sm:inline">End Call</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;