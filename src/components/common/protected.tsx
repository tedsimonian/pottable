import React from "react";
import { headers } from "next/headers";

import { auth } from "~/server/auth";

type ChildComponent = React.FC<{
  children: React.ReactNode;
}>;

interface SubComponents {
  Authenticated: ChildComponent;
  Unauthenticated: ChildComponent;
}

type ProtectedComponent = ChildComponent & SubComponents;

const Unauthenticated: ChildComponent = async (props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return null;
};

const Authenticated: ChildComponent = async (props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return null;
};

export const Protected: ProtectedComponent = (props) => (
  <React.Fragment>{props.children}</React.Fragment>
);

Protected.Authenticated = Authenticated;
Protected.Unauthenticated = Unauthenticated;
