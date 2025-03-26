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
  start: {
    params?: null;
    query?: null;
  };
  dashboard: {
    params?: null;
    query?: null;
  };
  dashboard_projects: {
    params?: null;
    query?: null;
  };
  dashboard_backed: {
    params?: null;
    query?: null;
  };
  dashboard_votes: {
    params?: null;
    query?: null;
  };
  dashboard_settings: {
    params?: null;
    query?: null;
  };
  view_project: {
    params: {
      id: string;
      slug: string;
    };
    query?: null;
  };
  edit_project: {
    params: {
      id: string;
      slug: string;
    };
    query?: null;
  };
};

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
    case "start":
      path = "/start";
      break;
    case "not_found":
      path = "/not-found";
      break;
    case "sign_in":
      path = "/sign-in";
      break;
    case "dashboard":
      path = "/dashboard";
      break;
    case "dashboard_projects":
      path = "/dashboard/projects";
      break;
    case "dashboard_backed":
      path = "/dashboard/backed";
      break;
    case "dashboard_votes":
      path = "/dashboard/votes";
      break;
    case "dashboard_settings":
      path = "/dashboard/settings";
      break;
    case "view_project":
      const { id, slug } = params as { id: string; slug: string };
      path = `/projects/${id}/${slug}`;
      break;
    case "edit_project":
      const { id: editId, slug: editSlug } = params as {
        id: string;
        slug: string;
      };
      path = `/dashboard/projects/${editId}/${editSlug}/edit`;
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
