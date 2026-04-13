"use client"
import Image from "next/image";
import NextAuth from "next-auth";
import { Sidebar } from "lucide-react";
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { DropdownMenu } from "radix-ui";
import AppSideBar from "@/components/sidebar/app-sidebar";


import {  useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { sendIdToken } from "@/api"
import { useEffect,useRef } from "react"
import { getToken } from "next-auth/jwt"
import { div } from "framer-motion/client";


export default  function Home() {
//   const {data: session} = useSession()
// const sendBackend = () => {
//   try {
//     sendIdToken(session?.id_token!)
//   } catch (error: any) {
//     console.log(error.message)
    
//   }
   
  
// }
// useEffect(() => {
//   sendBackend()
// }, [])


// if (!session?.id_token) {
//   return <div>Authenticating user please wait....</div>
  
// }


 
      
   
       
   

  return (
    
    <div className="">
    hello

    
     
     
    </div>
  );
}
