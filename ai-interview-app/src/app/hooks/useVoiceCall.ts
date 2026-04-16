import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

export   const  useVoiceCall = () => {
  let accessToken: string = ""
  const session = useSession()
  if(session.status === "authenticated"){
    accessToken = session.data.access_token || ""
    
  }
  
 
 console.log("access token", )
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);
  const [aiSpeaking, setAiSpeaking] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null);

  function playNextInQueue() {
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
  }

  function handleDataAvailable(event: BlobEvent) {
    if (event.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(event.data);
    }
  }

  const handleAudio = async () => {
    try {
      setIsMicOn((prev) => !prev);

      if (!mediaStreamRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
    } catch (err) {
      console.log("Mic error:", err);
    }
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    mediaRecorderRef.current?.stop();
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    wsRef.current?.close();  
  };

  useEffect(() => {
    
    const socket = new WebSocket(`ws://localhost:3001?token=${accessToken}`
     );
    socket.binaryType = "arraybuffer";

    socket.onopen = () => {
      wsRef.current = socket;
    };

    socket.onmessage = (message) => {
      if (typeof message.data === "string") {
        console.log("Transcript:", JSON.parse(message.data));
        return;
      }

      if (message.data.byteLength <= 44) return;

      const blob = new Blob([message.data], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);

      audioQueueRef.current.push(url);

      if (!isPlayingRef.current) {
        playNextInQueue();
      }
    };

    return () => socket.close();
  }, []);

  return {
    isMicOn,
    isCallActive,
    aiSpeaking,
    handleAudio,
    handleEndCall,
  };
};