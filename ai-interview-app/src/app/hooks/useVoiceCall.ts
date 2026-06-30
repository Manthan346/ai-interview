import { useState, useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { TranscriptProps, userTranscript } from "../types/interview";
import { useRouter } from "next/navigation";

export const useVoiceCall = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [conversation, setConversation] = useState<TranscriptProps>({});
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [isWebSocketDisconnected, SetisWebSocketDisconnected] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  
  // Audio detection refs
  const audioAnalyserRef = useRef<AnalyserNode | null>(null);
  const audioDataArrayRef = useRef<Uint8Array | null>(null);
  const isUserSpeakingRef = useRef<boolean>(false);
  const lastSpeechTimeRef = useRef<number>(0);
  const detectionLoopRef = useRef<number | null>(null);
  const isAudioPlayingRef = useRef<boolean>(false);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const router = useRouter();

  // Enhanced stop function that immediately stops all AI audio
  const stopAllAiAudio = () => {
    console.log("Stopping all AI audio...");
    audioSourcesRef.current.forEach((source) => {
      try {
        source.stop();
      } catch (_err) {
        // ignore already stopped sources
      }
      source.disconnect();
    });
    audioSourcesRef.current = [];
    nextStartTimeRef.current = 0;
    isAudioPlayingRef.current = false;
    setAiSpeaking(false);
    
    // Clear the check interval
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
  };

  // Audio detection function - more sensitive and responsive
  const detectUserSpeaking = (audioData: Uint8Array) => {
    // Calculate volume level (RMS)
    let sum = 0;
    for (let i = 0; i < audioData.length; i++) {
      const normalized = (audioData[i] as number) / 128 - 1;
      sum += normalized * normalized;
    }
    const rms = Math.sqrt(sum / audioData.length);
    
    // Lower threshold for better sensitivity
    const SPEECH_THRESHOLD = 0.100;
    // Shorter delay for faster response
    const SILENCE_DELAY = 300;
    
    const currentTime = Date.now();
    
    // Check if user is speaking
    if (rms > SPEECH_THRESHOLD) {
      // Update last speech time
      lastSpeechTimeRef.current = currentTime;
      
      // If user wasn't speaking before, they just started
      if (!isUserSpeakingRef.current) {
        console.log("🔴 User started speaking - RMS:", rms);
        isUserSpeakingRef.current = true;
        
        // IMMEDIATELY stop AI audio if it's playing
        if (isAudioPlayingRef.current || aiSpeaking) {
        
          stopAllAiAudio();
        }
      }
    } else {
      // Check if user has stopped speaking (silence for SILENCE_DELAY ms)
      if (isUserSpeakingRef.current && currentTime - lastSpeechTimeRef.current > SILENCE_DELAY) {
  
        isUserSpeakingRef.current = false;
      }
    }
  };

  // Initialize audio detection
  const initializeAudioDetection = (stream: MediaStream) => {
    // Use existing audio context or create new one
    const audioContext = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;
    
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256; // Smaller for faster response
    analyser.smoothingTimeConstant = 0.6; // Less smoothing for faster detection
    
    source.connect(analyser);
    
    audioAnalyserRef.current = analyser;
    audioDataArrayRef.current = new Uint8Array(analyser.fftSize);
    
    // Start detection loop
    if (detectionLoopRef.current) {
      cancelAnimationFrame(detectionLoopRef.current);
    }
    detectSpeechLoop();
  };

  // Speech detection loop - runs continuously
  const detectSpeechLoop = () => {
    if (!audioAnalyserRef.current || !audioDataArrayRef.current) {
      return;
    }
    
    const analyser = audioAnalyserRef.current;
    const dataArray = audioDataArrayRef.current;
    
    analyser.getByteTimeDomainData(dataArray as Uint8Array<ArrayBuffer>);
    detectUserSpeaking(dataArray);
    
    // Continue detection loop
    detectionLoopRef.current = requestAnimationFrame(detectSpeechLoop);
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0 && socketRef.current?.connected) {
      socketRef.current.emit("audio-chunk", event.data);
    }
  };

  const handleAudio = async () => {
    try {
      const isStartingRecording = !isMicOn;
      setIsMicOn(isStartingRecording);

      if (!mediaStreamRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        mediaStreamRef.current = stream;

        // Initialize audio detection when stream is created
        initializeAudioDetection(stream);

        const recorder = new MediaRecorder(stream, {
          mimeType: "audio/webm;codecs=opus",
        });

        recorder.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current = recorder;
      }

      const recorder = mediaRecorderRef.current;

      if (isStartingRecording) {
        // Stop AI audio when user starts recording
        stopAllAiAudio();
        setIsAiThinking(false);
        recorder?.start(100);
        
        // Reset user speaking state
        isUserSpeakingRef.current = false;
        
        // Start detection loop if not already running
        if (audioAnalyserRef.current && !detectionLoopRef.current) {
          detectSpeechLoop();
        }
      } else if (recorder?.state === "recording") {
        recorder.stop();
        setIsMicOn(false);
        
        // Stop audio detection
        isUserSpeakingRef.current = false;
        if (detectionLoopRef.current) {
          cancelAnimationFrame(detectionLoopRef.current);
          detectionLoopRef.current = null;
        }
        if (checkIntervalRef.current) {
          clearInterval(checkIntervalRef.current);
          checkIntervalRef.current = null;
        }
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
    
    // Cleanup audio detection
    if (audioAnalyserRef.current) {
      audioAnalyserRef.current = null;
    }
    if (detectionLoopRef.current) {
      cancelAnimationFrame(detectionLoopRef.current);
      detectionLoopRef.current = null;
    }
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
    
    stopAllAiAudio();
    setIsAiThinking(false);
    socketRef.current?.disconnect();
  };

  // Function to monitor user speaking during AI playback
  const startMonitoringUserSpeech = () => {
    // Clear any existing interval
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
    
    // Start new interval to check if user starts speaking during playback
    checkIntervalRef.current = setInterval(() => {
      if (isUserSpeakingRef.current && isAudioPlayingRef.current) {
        console.log("⏹️ User started speaking during playback - stopping audio");
        stopAllAiAudio();
      }
    }, 100);
  };

  useEffect(() => {
    const socket = io("http://localhost:3001", {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setIsSocketConnected(true);
    });

    socket.on("transcript", (data: userTranscript) => {
      console.log("Transcript:", data);
      if (data) {
        setConversation((userconvo) => ({ ...userconvo, userText: data.text }));
      }
    });

    socket.on("ai-thinking", () => {
      setIsAiThinking(true);
    });

    socket.on("audio-response-start", (data: string) => {
      setConversation((aiConvo) => ({ ...aiConvo, aiText: data }));
      stopAllAiAudio();
      setIsAiThinking(false);
    });

    socket.on("interview-ended", (data) => {
      setTimeout(() => {
        const RP = router.push(`/dashboard/your-interviews/evaluation/${data.interviewId}`);
        console.log(RP);
      }, 10000);
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

      // CRITICAL: Check if user is currently speaking before playing AI audio
      if (isUserSpeakingRef.current) {
        console.log("⏭️ Skipping AI audio playback - User is speaking");
        return;
      }

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
        audioSourcesRef.current.push(source);

        // Mark that AI audio is playing
        isAudioPlayingRef.current = true;
        setAiSpeaking(true);
        setIsAiThinking(false);

        // Start monitoring for user speech during playback
        startMonitoringUserSpeech();

        source.onended = () => {
          audioSourcesRef.current = audioSourcesRef.current.filter((item) => item !== source);
          if (!audioSourcesRef.current.length) {
            isAudioPlayingRef.current = false;
            setAiSpeaking(false);
            // Clear the monitoring interval when audio ends
            if (checkIntervalRef.current) {
              clearInterval(checkIntervalRef.current);
              checkIntervalRef.current = null;
            }
          }
        };

      } catch (err) {
        console.error("Audio playback error:", err);
        // Clear monitoring on error
        if (checkIntervalRef.current) {
          clearInterval(checkIntervalRef.current);
          checkIntervalRef.current = null;
        }
      }
    });

    socket.on("connect_error", (err) => {
      console.log(err.message);
      setErrorMsg(err.message);
    });

    socket.on("error-message", (msg) => {
      console.log("Socket error:", msg.message);
      setErrorMsg(msg.message);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      SetisWebSocketDisconnected(true);
    });

    return () => {
      socket.disconnect();
      // Cleanup
      if (detectionLoopRef.current) {
        cancelAnimationFrame(detectionLoopRef.current);
        detectionLoopRef.current = null;
      }
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
      stopAllAiAudio();
    };
  }, []);

  return {
    isMicOn,
    isCallActive,
    aiSpeaking,
    isAiThinking,
    handleAudio,
    handleEndCall,
    conversation,
    errorMsg,
    isWebSocketDisconnected,
    isSocketConnected,
  };
};