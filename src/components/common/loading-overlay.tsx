import { LoadingAnimation } from "./loading-animation";

type LoadingOverlayProps = {
  children: React.ReactNode;
};

export const LoadingOverlay = (props: LoadingOverlayProps) => {
  const { children } = props;

  return (
    <div className="bg-opacity-70 absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <LoadingAnimation />
      {children}
    </div>
  );
};
