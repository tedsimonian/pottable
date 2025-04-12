type FallbackProps = {
  shouldShow: boolean;
  children: React.ReactNode;
  fallback: React.ReactNode;
};

export const Fallback = (props: FallbackProps) => {
  const { children, fallback, shouldShow } = props;

  if (shouldShow) {
    return children;
  }

  return fallback;
};
