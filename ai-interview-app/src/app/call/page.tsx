"use client";


import { Mic, MicOff, PhoneOff, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useVoiceCall } from "../hooks/useVoiceCall";
import { CallScreen } from "@/components/call-section/call-screen";

const Index = () => {

 


  return (
   <div>
  
    
    <CallScreen />
   </div>
  );
};

export default Index;