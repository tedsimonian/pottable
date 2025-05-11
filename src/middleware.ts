import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

import {
  getInternalRoute,
  ROUTES,
  type RoutePaths,
} from "./lib/internal-routes";

const authRoutes: Array<RoutePaths> = [ROUTES.sign_in, ROUTES.sign_up];
const privateRoutes: Array<RoutePaths> = [
  ROUTES.dashboard,
  ROUTES.view_garden,
  ROUTES.view_calendar,
  ROUTES.view_tasks,
  ROUTES.view_achievements,
  ROUTES.view_plant_catalog,
  ROUTES.view_garden_guide,
  ROUTES.create_garden,
  ROUTES.edit_garden,
  ROUTES.view_containers,
  ROUTES.view_container,
  ROUTES.edit_container,
  ROUTES.create_container,
];

export default async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(pathName as RoutePaths);
  const isPrivateRoute = privateRoutes.some((route) =>
    pathName.startsWith(route),
  );

  const sessionCookie = getSessionCookie(request);

  // Allow public access to home page and other public routes
  if (!isPrivateRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  // Handle authentication routes
  if (isAuthRoute && sessionCookie) {
    const dashboardPath = getInternalRoute("dashboard", null);
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  // Handle private routes without authentication
  if (isPrivateRoute && !sessionCookie) {
    const signInPath = getInternalRoute("sign_in", null, {
      redirect_url: encodeURIComponent(pathName),
    });
    return NextResponse.redirect(new URL(signInPath, request.url));
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
    // Private routes
    "/dashboard/:path",
    "/gardens/:path",
  ],
};
