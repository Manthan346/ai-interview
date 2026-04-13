import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        access_token?: string,
        id_token?: string,
        refresh_token?: string | undefined,
        provider_id?: string 


    }
    
}

declare module "next-auth" {
    interface Session {
        access_token?: string,
        id_token?: string,
        refresh_token?: string | undefined,
        provider_id?: string |undefined

    }
}