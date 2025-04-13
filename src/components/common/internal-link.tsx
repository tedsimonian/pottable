import Link from "next/link";

import { getInternalRoute, type Routes } from "~/lib/internal-routes";

export type InternalLinkPath = keyof Routes;

type InternalLinkProps<TPath extends InternalLinkPath> = {
  path: TPath;
  params: Routes[TPath]["params"];
  query?: Routes[TPath]["query"];
  className?: string;
  children: React.ReactNode;
};

export const InternalLink = <TPath extends InternalLinkPath>(
  props: InternalLinkProps<TPath>,
) => {
  const { path, params, query, children, className } = props;

  const href = getInternalRoute(path, params, query);
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
};
