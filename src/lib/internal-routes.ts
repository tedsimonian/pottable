// Define the route paths separately
export const ROUTES = {
  home: "/",
  not_found: "/not-found",
  sign_in: "/sign-in",
  sign_up: "/sign-up",
  view_garden: "/gardens/:id",
  edit_garden: "/gardens/:id/edit",
} as const;

// Type for route names
export type RouteNames = keyof typeof ROUTES;
export type RoutePaths = (typeof ROUTES)[RouteNames];

// Type guard to ensure all routes are covered
type EnsureAllRoutes<T> = {
  [K in keyof typeof ROUTES]: K extends keyof T ? T[K] : never;
} & T;

type RouteParams = EnsureAllRoutes<{
  home: null;
  not_found: null;
  sign_in: null;
  sign_up: null;
  view_garden: { id: string };
  edit_garden: { id: string };
}>;

type RouteQueries = EnsureAllRoutes<{
  home: null;
  not_found: null;
  sign_in: { redirect_url?: string };
  sign_up: null;
  view_garden: null;
  edit_garden: null;
}>;

// Create the Routes type using the ROUTES keys
export type Routes = {
  [K in keyof typeof ROUTES]: {
    params: RouteParams[K];
    query?: RouteQueries[K];
  };
};

// Helper function to replace path parameters
const replacePath = (path: string, params: Record<string, string> | null) => {
  if (!params) return path;
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, value),
    path,
  );
};

/**
 * Get the internal route for the given route name and parameters
 *
 * @param routeName - The name of the route
 * @param params - The parameters for the route
 * @param query - The query parameters for the route
 * @example getInternalRoute("home", null) -> "/"
 * @example getInternalRoute("view_garden", { id: "1" }) -> "/gardens/1"
 * @returns The internal route
 */
export const getInternalRoute = <TRouteKey extends keyof Routes>(
  routeName: TRouteKey,
  params: Routes[TRouteKey]["params"],
  query?: Routes[TRouteKey]["query"],
): string => {
  // Get the base path from ROUTES
  let path = replacePath(
    ROUTES[routeName],
    params as Record<string, string> | null,
  );

  // Add query parameters if they exist
  if (query) {
    path += `?${Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&")}`;
  }

  return path;
};
