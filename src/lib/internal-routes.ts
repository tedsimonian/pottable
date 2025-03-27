type Routes = {
  home: {
    params?: null;
    query?: null;
  };
  not_found: {
    params?: null;
    query?: null;
  };
  sign_in: {
    params?: null;
    query?: {
      redirect_url?: string;
    };
  };
  onboarding: {
    params?: null;
    query?: null;
  };
  view_garden: {
    params: {
      id: string;
    };
    query?: null;
  };
  edit_garden: {
    params: {
      id: string;
    };
    query?: null;
  };
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
  let path = "";
  switch (routeName) {
    case "home":
      path = "/";
      break;
    case "not_found":
      path = "/not-found";
      break;
    case "sign_in":
      path = "/sign-in";
      break;
    case "onboarding":
      path = "/onboarding";
      break;
    case "view_garden":
      const { id } = params as { id: string };
      path = `/gardens/${id}`;
      break;
    case "edit_garden":
      const { id: editId } = params as {
        id: string;
      };
      path = `/gardens/${editId}/edit`;
      break;
    default:
      path = "/";
  }

  if (query) {
    path += `?${Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&")}`;
  }

  return path;
};
