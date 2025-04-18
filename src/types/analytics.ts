export type VALID_ANALYTIC_EVENTS = {
  "image uploaded": {
    url: string;
    userId: string;
  };
  "user registered": {
    name: string;
    email: string;
    login_type: "social";
    provider: string;
  };
  "user signed in": {
    name: string;
    email: string;
    login_type: "social";
    provider: string;
  };
  "user signed out": null | undefined;
};
