import { NextResponse, type NextRequest } from "next/server"

const backendUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"

async function validateSession(cookieHeader: string) {
  return fetch(new URL("/api/v1/auth/validate", backendUrl), {
    headers: { cookie: cookieHeader },
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  })
}

function mergeCookies(existingCookie: string, setCookies: string[]) {
  const cookies = new Map<string, string>()

  for (const cookie of existingCookie.split(";")) {
    const separator = cookie.indexOf("=")
    if (separator > 0) {
      cookies.set(cookie.slice(0, separator).trim(), cookie.slice(separator + 1).trim())
    }
  }

  for (const setCookie of setCookies) {
    const pair = setCookie.split(";", 1)[0]
    const separator = pair.indexOf("=")
    if (separator > 0) {
      cookies.set(pair.slice(0, separator).trim(), pair.slice(separator + 1).trim())
    }
  }

  return [...cookies.entries()]
    .map(([name, value]) => `${name}=${value}`)
    .join("; ")
}

function forwardSetCookies(response: NextResponse, setCookies: string[]) {
  for (const setCookie of setCookies) {
    response.headers.append("Set-Cookie", setCookie)
  }
  return response
}

function redirectToSignIn(request: NextRequest, setCookies: string[] = []) {
  return forwardSetCookies(
    NextResponse.redirect(new URL("/signups", request.url)),
    setCookies,
  )
}

function authServiceUnavailable(error: unknown) {
  console.error("Could not verify the dashboard session with the auth backend:", error)
  return NextResponse.json(
    { error: "Unable to verify your session. Please try again." },
    { status: 503 },
  )
}

export async function proxy(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") ?? ""

  try {
    const validation = await validateSession(cookieHeader)
    if (validation.ok) {
      return NextResponse.next()
    }
    if (validation.status !== 401) {
      return authServiceUnavailable(
        `Session validation returned ${validation.status}`,
      )
    }

    const refresh = await fetch(new URL("/api/v1/auth/refresh", backendUrl), {
      method: "POST",
      headers: { cookie: cookieHeader },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    })
    if (!refresh.ok) {
      if (refresh.status >= 500) {
        return authServiceUnavailable(`Token refresh returned ${refresh.status}`)
      }
      return redirectToSignIn(request)
    }

    const setCookies = refresh.headers.getSetCookie()
    const refreshedCookie = mergeCookies(cookieHeader, setCookies)
    const refreshedValidation = await validateSession(refreshedCookie)

    if (refreshedValidation.ok) {
      return forwardSetCookies(NextResponse.next(), setCookies)
    }
    if (refreshedValidation.status === 401) {
      return redirectToSignIn(request, setCookies)
    }
    return forwardSetCookies(
      authServiceUnavailable(
        `Refreshed session validation returned ${refreshedValidation.status}`,
      ),
      setCookies,
    )
  } catch (error) {
    return authServiceUnavailable(error)
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
