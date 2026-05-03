import { useState, useRef, useEffect } from "react";

import { io, Socket } from "socket.io-client";

export const useVoiceCall = () => {
  

  const [isMicOn, setIsMicOn] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);
  const [aiSpeaking, setAiSpeaking] = useState(false);

  const socketRef = useRef<Socket | null>(null);

  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const playNextInQueue = () => {
    if (audioQueueRef.current.length === 0) {
      isPlayingRef.current = false;
      setAiSpeaking(false);
      return;
    }

    isPlayingRef.current = true;
    setAiSpeaking(true);

    const url = audioQueueRef.current.shift()!;
    const audio = new Audio(url);

    audio.onended = () => {
      URL.revokeObjectURL(url);
      playNextInQueue();
    };

    audio.onerror = () => {
      URL.revokeObjectURL(url);
      playNextInQueue();
    };

    audio.play().catch(() => playNextInQueue());
  };

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
        recorder.start(250);
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

    socket.on("audio-response", (audioBuffer) => {
      const blob = new Blob([audioBuffer], {
        type: "audio/wav",
      });

      const url = URL.createObjectURL(blob);

      audioQueueRef.current.push(url);

      if (!isPlayingRef.current) {
        playNextInQueue();
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
    handleAudio,
    handleEndCall,
  };
};