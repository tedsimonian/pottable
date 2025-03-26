export type VALID_ANALYTIC_EVENTS = {
  "Image Uploaded": {
    url: string;
    userId: string;
  };
  "User Registered": {
    name: string;
    email: string;
    provider: string;
  };
  "User Signed In": {
    name: string;
    email: string;
    provider: string;
  };
  "User Signed Out": null | undefined;
};
