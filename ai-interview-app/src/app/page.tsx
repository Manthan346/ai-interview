"use client"
import Image from "next/image";
import NextAuth from "next-auth";
import { Sidebar } from "lucide-react";
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { DropdownMenu } from "radix-ui";
import AppSideBar from "@/components/sidebar/app-sidebar";


import {  useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { sendIdToken, username } from "@/api"
import { useEffect,useRef } from "react"
import { getToken } from "next-auth/jwt"
import { div } from "framer-motion/client";


export default  function Home() {
const {data: session} = useSession()
username()


 
      
   
       
   

  return (
    
    <div className="">
    hello

    
     
     
    </div>
  );
}
