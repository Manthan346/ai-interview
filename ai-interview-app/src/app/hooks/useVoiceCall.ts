import { useState, useRef, useEffect } from "react";

import { io, Socket } from "socket.io-client";

export const useVoiceCall = () => {
  

  const [isMicOn, setIsMicOn] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const socketRef = useRef<Socket | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioProcessorRef = useRef<ScriptProcessorNode | null>(null);

  const handleAudio = async () => {
    try {
      if (!isMicOn) {
        // Turning ON the microphone
        if (!mediaStreamRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });

          mediaStreamRef.current = stream;

          const context = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
          audioContextRef.current = context;

          const source = context.createMediaStreamSource(stream);
          const processor = context.createScriptProcessor(4096, 1, 1);
          audioProcessorRef.current = processor;

          processor.onaudioprocess = (event) => {
            if (socketRef.current?.connected) {
              const audioData = event.inputBuffer.getChannelData(0);
              const pcmData = new Int16Array(audioData.length);

              // Convert float32 to int16
              for (let i = 0; i < audioData.length; i++) {
                const s = Math.max(-1, Math.min(1, audioData[i]));
                pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
              }

              socketRef.current.emit("audio-chunk", Buffer.from(pcmData.buffer));
            }
          };

          source.connect(processor);
          processor.connect(context.destination);
        }
        if (audioProcessorRef.current) {
          audioProcessorRef.current.connect(audioContextRef.current!.destination);
        }
        setIsMicOn(true);
      } else {
        // Turning OFF the microphone
        if (audioProcessorRef.current) {
          audioProcessorRef.current.disconnect();
        }
        setIsMicOn(false);
      }
    } catch (error) {
      console.log("Mic error:", error);
    }
  };

  const handleEndCall = () => {
    setIsCallActive(false);

    if (audioProcessorRef.current) {
      audioProcessorRef.current.disconnect();
    }

    mediaStreamRef.current
      ?.getTracks()
      .forEach((track) => track.stop());

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    nextStartTimeRef.current = 0;
    setAiSpeaking(false);
    setIsAiThinking(false);

    socketRef.current?.disconnect();
  };

  useEffect(() => {
   

    const socket = io("http://localhost:3001", {
      transports: ["websocket"],
     
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("transcript", (data) => {
      console.log("Transcript:", data);
    });

    socket.on("ai-thinking", () => {
      setIsAiThinking(true);
    });

    socket.on("audio-response", (audioData) => {
      const context = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = context;

      try {
        const arrayBuffer = audioData instanceof ArrayBuffer ? audioData : new Uint8Array(audioData).buffer;
        
        // Deepgram linear16 is 16-bit signed integer PCM
        const int16Array = new Int16Array(arrayBuffer);
        const float32Array = new Float32Array(int16Array.length);

        // Web Audio API uses Float32 between -1.0 and 1.0
        for (let i = 0; i < int16Array.length; i++) { 
          float32Array[i] = int16Array[i] / 32768.0;
        }

        // Create an AudioBuffer (1 channel, sample rate 24000)
        const audioBuffer = context.createBuffer(1, float32Array.length, 24000);
        audioBuffer.getChannelData(0).set(float32Array);

        const source = context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(context.destination);

        // Schedule exactly
        let startTime = nextStartTimeRef.current;
        if (startTime < context.currentTime) {
          startTime = context.currentTime + 0.1; // buffer slightly
        }

        source.start(startTime);
        nextStartTimeRef.current = startTime + audioBuffer.duration;

        setAiSpeaking(true);
        setIsAiThinking(false);
        
        // When this specific chunk ends, check if it was the last scheduled one
        source.onended = () => {
          if (context.currentTime >= nextStartTimeRef.current - 0.1) {
            setAiSpeaking(false);
          }
        };
      } catch (err) {
        console.error("Audio playback error:", err);
      }
    });

    socket.on("error-message", (msg) => {
      console.log("Socket error:", msg);
      setIsAiThinking(false);
    });

    socket.on("clear-audio", () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
        nextStartTimeRef.current = 0;
        setAiSpeaking(false);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    isMicOn,
    isCallActive,
    aiSpeaking,
    isAiThinking,
    handleAudio,
    handleEndCall,
  };
};