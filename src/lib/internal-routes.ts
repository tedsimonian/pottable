// Define the route paths separately
export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  not_found: "/not-found",
  // Auth routes
  sign_in: "/sign-in",
  sign_up: "/sign-up",
  // Garden routes
  view_all_gardens: "/gardens",
  view_garden: "/gardens/:id",
  edit_garden: "/gardens/:id/edit",
  create_garden: "/gardens/new",
  // Container routes
  view_containers: "/gardens/:id/containers",
  view_container: "/gardens/:id/containers/:containerId",
  edit_container: "/gardens/:id/containers/:containerId/edit",
  create_container: "/gardens/:id/containers/create",
  // Calendar routes
  view_calendar: "/calendar",
  // Task routes
  view_tasks: "/tasks",
  // Achievement routes
  view_achievements: "/achievements",
  // Tool routes
  view_plant_catalog: "/plant-catalog",
  view_garden_guide: "/garden-guide",
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
  dashboard: null;
  not_found: null;
  // Auth routes
  sign_in: null;
  sign_up: null;
  // Garden routes
  view_all_gardens: null;
  view_garden: { id: string };
  edit_garden: { id: string };
  create_garden: null;
  // Container routes
  view_containers: { gardenId: string };
  view_container: { gardenId: string; containerId: string };
  edit_container: { gardenId: string; containerId: string };
  create_container: { gardenId: string };
  // Calendar routes
  view_calendar: null;
  // Task routes
  view_tasks: null;
  // Achievement routes
  view_achievements: null;
  // Tool routes
  view_plant_catalog: null;
  view_garden_guide: null;
}>;

type RouteQueries = EnsureAllRoutes<{
  home: null;
  dashboard: null;
  not_found: null;
  // Auth routes
  sign_in: { redirect_url?: string };
  sign_up: null;
  // Garden routes
  view_all_gardens: null;
  view_garden: null;
  edit_garden: null;
  create_garden: null;
  // Container routes
  view_containers: { gardenId: string };
  view_container: { gardenId: string; containerId: string };
  edit_container: { gardenId: string; containerId: string };
  create_container: { gardenId: string };
  // Calendar routes
  view_calendar: null;
  // Task routes
  view_tasks: null;
  // Achievement routes
  view_achievements: null;
  // Tool routes
  view_plant_catalog: null;
  view_garden_guide: null;
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
