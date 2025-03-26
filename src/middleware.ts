import { type NextRequest, NextResponse } from "next/server";
import { type Session } from "~/server/auth";
import { betterFetch } from "@better-fetch/fetch";

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") ?? "", // Forward the cookies from the request
      },
    },
  );

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /sign-in
     * 2. /api/auth (to allow auth endpoints to work)
     * 3. /_next (to allow static files)
     * 4. /favicon.ico, /sitemap.xml, /robots.txt (common public files)
     */
    "/((?!sign-in|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
