import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"


export async function middleware(req: NextRequest) {
  const token = await getToken({req})
  const accessToken = token!.access_token
  

  console.log("backend Token:", accessToken)

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}