import { type NextRequest, NextResponse } from "next/server";
import { type Session } from "~/server/auth";
import { betterFetch } from "@better-fetch/fetch";
import {
  getInternalRoute,
  ROUTES,
  type RoutePaths,
} from "./lib/internal-routes";
import { ROLES } from "./permissions";

// Type-safe route paths
const authRoutes: Array<RoutePaths> = [ROUTES.sign_in, ROUTES.sign_up];

const adminRoutes: Array<RoutePaths> = [ROUTES.admin];

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const homePath = getInternalRoute("home", null);

  const isAuthRoute = authRoutes.includes(pathName as RoutePaths);
  const isAdminRoute = adminRoutes.includes(pathName as RoutePaths);

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
    if (isAuthRoute) {
      return NextResponse.next();
    }

    const signInPath = getInternalRoute("sign_in", null, {
      redirect_url: encodeURIComponent(pathName),
    });
    return NextResponse.redirect(new URL(signInPath, request.url));
  }

  if (isAuthRoute) {
    const searchParams = new URLSearchParams(request.nextUrl.search);
    const redirectUrl = searchParams.get("redirect_url");

    if (redirectUrl) {
      return NextResponse.redirect(
        new URL(decodeURIComponent(redirectUrl), request.url),
      );
    }

    return NextResponse.redirect(new URL(homePath, request.url));
  }

  if (isAdminRoute) {
    const isAdmin = session.user.role === ROLES.ADMIN;

    if (!isAdmin) {
      return NextResponse.redirect(new URL(homePath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|$).*)",
  ],
};
