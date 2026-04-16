
import axios from "axios";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { getSession, useSession } from "next-auth/react";

const backend = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL ||  "http://localhost:3001",
    withCredentials: true,
   
    
})



export const sendIdToken = (token: string)  => {
    console.log("backend hit fro api ts", token)
   return backend.post("/v1/api/users/register",{
    
   }, {
        headers: {
            
            
            "authorization": `Bearer ${token}`,
            
            


        },
        
    })
}


backend.interceptors.request.use(async (config) => {
  const session = await getSession(); // reads from next-auth.session-token
  console.log("session ", session)
  
console.log("session token", session?.access_token)
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
    

  }

  return config;
});


backend.interceptors.response.use(
  res => res,
  async (error) => {
    if (error.response?.status === 401) {
     
    }
    return Promise.reject(error)
  }
)



export const username = () => {
    return backend.post("/v1/user/username")

}
