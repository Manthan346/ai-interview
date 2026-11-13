
import { NextResponse, type NextRequest } from "next/server"


const ACCESS_COOKIE = "accessToken"
const REFRESH_COOKIE = "refreshToken"

// check for  token expiry and validity
function isExpired(token: string): boolean {
  try {
    const part = token.split(".")[1]
    if (!part) return false
    const base64 = part.replace(/-/g, "+").replace(/_/g, "/")
    const payload = JSON.parse(atob(base64))
    if (typeof payload.exp !== "number") return false
    return payload.exp * 1000 < Date.now()
  } catch {
    return false
  }
}

function hasUsableToken(token?: string) {
  return !!token && !isExpired(token)
}

export function proxy(request: NextRequest) {
  const access = request.cookies.get(ACCESS_COOKIE)?.value
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value

  // const pathname = request.nextUrl.pathname
  // if ((pathname === "/" || pathname === "/signups") && hasUsableToken(access)) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url))
  // }

  // Allow dashboard access when either token is still usable.
  const loggedIn = hasUsableToken(access) || hasUsableToken(refresh)

  if (!loggedIn) {
    const signIn = new URL("/signups", request.url)
    // Login ke baad wapas isi page pe lane ke liye
    signIn.searchParams.set("next", request.nextUrl.pathname)
    return NextResponse.redirect(signIn)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/signups"],
}