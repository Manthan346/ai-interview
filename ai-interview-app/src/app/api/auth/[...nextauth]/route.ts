import { sendIdToken } from "@/api";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";



export const GoogleAuth: NextAuthOptions = {
    


    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
        async signIn({ account, profile, }) {

            if (!profile?.email || !account?.id_token) {
                console.log("cannot find email please login again")
                return false
            }

           
        //   const res=  await sendIdToken(account.id_token)
        //   console.log(res.data)
              
     
            


      console.log("account",account,"profile",profile)
            
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },

        async jwt({ token, account, }) {
            if (account) {
                 token.access_token = account?.access_token
            token.id_token = account?.id_token
            token.refresh_token = account?.refresh_token
            token.provider_id = account?.providerAccountId
            console.log("token ",token)
             console.log("account",account)
                
            }
           


            return token
        },
        async session({ session, token }) {
            session.access_token = token?.access_token
            session.id_token = token?.id_token
            session.refresh_token = token?.refresh_token
            session.provider_id = token?.provider_id
            console.log("session",session)





            return session
        },

        
        

    },
    pages: {
        signIn: '/signIn'
    },
}



const handlers = NextAuth(GoogleAuth)

export {handlers as GET , handlers as POST}
