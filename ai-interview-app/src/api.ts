import axios from "axios";

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