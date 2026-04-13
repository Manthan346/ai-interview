"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Mic, MicOff, PhoneOff, Send } from "lucide-react";
import { motion } from "framer-motion";


const Index = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(true);
  const [aiSpeaking, setAiSpeaking] = useState(false);
   const wsRef = useRef<WebSocket>(null);

  const recorderChunks = useRef<Blob[]>([]);
const mediaRecorderRef = useRef<MediaRecorder | null>(null);
const mediaStreamRef = useRef<MediaStream | null>(null);

  function handleDataAvailable(event: any) {
    console.log("data-available");
    if (event.data.size > 0) {
      recorderChunks.current.push(event.data);
      console.log(recorderChunks);
      if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(event.data); //  send instantly
            console.log("chunk sent");
          }
      
      

    }
  }

 const handleAudio = async () => {
  try {
    setIsMicOn((prev) => !prev);
  
    if (!mediaStreamRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
  
      const recorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus"
      });
      mediaRecorderRef.current = recorder;
  
      recorder.ondataavailable = handleDataAvailable;
    }
  
    const recorder = mediaRecorderRef.current;
  
    if (recorder?.state === "inactive") {

      recorder.start(250);
      
      
    } else if (recorder?.state === "recording") {
      
      recorder.stop();
      console.log("recording stopped");
  
     
         
      
    }
  } catch (error: any) {
    console.log(error.message)
    
  }
};



  const handleEndCall = useCallback(() => {
    setIsCallActive(false);
    
  }, []);

  const handleSendResponse = useCallback(() => {
    setAiSpeaking(true);
    setTimeout(() => setAiSpeaking(false), 2000);
  }, []);

 


  useEffect(() => {
    const audioSocket = new WebSocket("ws://localhost:3001")
    audioSocket.binaryType = "arraybuffer"; 
      audioSocket.onopen= () => {
        console.log("connected to frontend")
        wsRef.current = audioSocket
       
      }
     audioSocket.onmessage = (message) => {
  // ✅ Handle transcript separately
  if (typeof message.data === "string") {
    const parsed = JSON.parse(message.data);
    console.log("Transcript:", parsed);
    return; // 🚨 VERY IMPORTANT
  }

  // ✅ Only audio reaches here
  const blob = new Blob([message.data], { type: "audio/wav" });

  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);

  audio.play().catch(err => console.log("play error", err));
};


       return () => {
    audioSocket.close(); 
  };
   
      
      
  
      
     
  }, [])

  return (
    <div className="flex min-h-screen  items-center justify-center bg-secondary sm:p-8">
      <div className="w-full max-w-8xl rounded-lg border border-border bg-background p-4 sm:p-8">

        {/* Video Panels */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mb-6 sm:mb-8">

          {/* AI Panel */}
          <div className="relative flex aspect-video items-center justify-center rounded-lg bg-secondary">

            <motion.div
              animate={
                aiSpeaking
                  ? { scale: [1, 1.15, 1], opacity: [1, 0.8, 1] }
                  : { scale: 1 }
              }
              transition={{
                duration: 1,
                repeat: aiSpeaking ? Infinity : 0,
              }}
              className="h-20 w-20 sm:h-28 sm:w-28 rounded-full border-4 border-primary"
            />

            <span className="absolute bottom-3 left-3 text-sm font-medium text-secondary-foreground opacity-70">
              AI
            </span>

            {!isCallActive && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-secondary/80">
                <span className="text-secondary-foreground font-medium">
                  Call Ended
                </span>
              </div>
            )}
          </div>

          {/* User Panel */}
          <div className="relative flex aspect-video items-center justify-center rounded-lg bg-secondary">

            {/* Mic Wave Rings */}
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
              animate={
                isMicOn && isCallActive
                  ? { scale: [1, 1.08, 1] }
                  : { scale: 1 }
              }
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
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
            <span className="hidden sm:inline">
              Mic {isMicOn ? "On" : "Off"}
            </span>
          </button>

          <button
            onClick={handleEndCall}
            disabled={!isCallActive}
            className="flex items-center gap-2 rounded-lg bg-destructive px-4 py-2.5 sm:px-5 sm:py-3 text-sm font-medium text-destructive-foreground transition-colors hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <PhoneOff className="h-4 w-4" />
            <span className="hidden sm:inline">End Call</span>
          </button>

          <button
            onClick={handleSendResponse}
            disabled={!isCallActive}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 sm:px-5 sm:py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Send Response</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default Index