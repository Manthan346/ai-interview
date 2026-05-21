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

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);


  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0 && socketRef.current?.connected) {
      socketRef.current.emit("audio-chunk", event.data);
    }
  };

  const handleAudio = async () => {
    try {
      setIsMicOn((prev) => !prev);

      if (!mediaStreamRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        mediaStreamRef.current = stream;

        const recorder = new MediaRecorder(stream, {
          mimeType: "audio/webm;codecs=opus",
        });

        recorder.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current = recorder;
      }

      const recorder = mediaRecorderRef.current;

      if (recorder?.state === "inactive") {
        recorder.start(100);
      } else if (recorder?.state === "recording") {
        recorder.stop();
      }
    } catch (error) {
      console.log("Mic error:", error);
    }
  };

  const handleEndCall = () => {
    setIsCallActive(false);

    mediaRecorderRef.current?.stop();

    mediaStreamRef.current
      ?.getTracks()
      .forEach((track) => track.stop());

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
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

    const pcm16ToFloat32 = (buffer: ArrayBuffer) => {
      const view = new DataView(buffer);
      const length = buffer.byteLength / 2;
      const float32 = new Float32Array(length);

      for (let i = 0; i < length; i += 1) {
        float32[i] = view.getInt16(i * 2, true) / 32768;
      }

      return float32;
    };

    socket.on("audio-response", async (message) => {
      const { audioData, sampleRate = 24000, channels = 1 } = message as {
        audioData: ArrayBuffer | ArrayBufferView;
        sampleRate?: number;
        channels?: number;
      };

      const context = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = context;

      try {
        await context.resume();

        const arrayBuffer = audioData instanceof ArrayBuffer ? audioData : ((audioData as ArrayBufferView).buffer as ArrayBuffer);
        const float32Array = pcm16ToFloat32(arrayBuffer);

        const channelCount = Math.max(1, channels);
        const frameCount = float32Array.length / channelCount;
        const audioBufferObj = context.createBuffer(channelCount, frameCount, sampleRate);

        if (channelCount === 1) {
          audioBufferObj.copyToChannel(float32Array, 0, 0);
        } else {
          for (let channel = 0; channel < channelCount; channel += 1) {
            const channelData = audioBufferObj.getChannelData(channel);
            let offset = channel;
            for (let i = 0; i < frameCount; i += 1) {
              channelData[i] = float32Array[offset];
              offset += channelCount;
            }
          }
        }

        const source = context.createBufferSource();
        source.buffer = audioBufferObj;
        source.connect(context.destination);

        const currentTime = context.currentTime;
        const startTime = Math.max(nextStartTimeRef.current, currentTime + 0.05);
        source.start(startTime);
        nextStartTimeRef.current = startTime + audioBufferObj.duration;

        setAiSpeaking(true);
        setIsAiThinking(false);

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