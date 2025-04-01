import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

import {
  getInternalRoute,
  ROUTES,
  type RoutePaths,
} from "./lib/internal-routes";

const authRoutes: Array<RoutePaths> = [ROUTES.sign_in, ROUTES.sign_up];

export default async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(pathName as RoutePaths);

  const sessionCookie = getSessionCookie(request, {
    // Optionally pass config if cookie name or prefix is customized in auth config.
    cookieName: "session_token",
    cookiePrefix: "better-auth",
  });

  if (!sessionCookie && !isAuthRoute) {
    const signInPath = getInternalRoute("sign_in", null, {
      redirect_url: encodeURIComponent(pathName),
    });
    return NextResponse.redirect(new URL(signInPath, request.url));
  }

  if (sessionCookie && isAuthRoute) {
    const dashboardPath = getInternalRoute("dashboard", null);
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - ingest (analytics)
     * - favicon.ico (favicon file)
     * - sitemap.xml (sitemap)
     * - robots.txt (robots file)
     */
    "/((?!api|_next/static|_next/image|ingest|favicon.ico|sitemap.xml|robots.txt).*)",
    "/",
  ],
};
