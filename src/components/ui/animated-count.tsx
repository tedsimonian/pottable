import { useEffect } from "react";
import {
  animate,
  useMotionValue,
  motion,
  LazyMotion,
  domAnimation,
  useTransform,
  type Easing,
} from "motion/react";

type AnimatedCountProps = {
  value: number;
  animateProps?: {
    duration?: number;
    ease?: Easing;
  };
};

export const AnimatedCount = (props: AnimatedCountProps) => {
  const { value, animateProps } = props;
  const { duration = 5, ease = "circIn" } = animateProps ?? {};

  const startingValue = useMotionValue(0);

  const currentValue = useTransform(startingValue, (value) =>
    Math.round(value).toLocaleString(),
  );

  useEffect(() => {
    const controls = animate(startingValue, value, {
      duration,
      ease,
    });

    return () => controls.stop();
  }, [startingValue, value, duration, ease]);

  return (
    <LazyMotion features={domAnimation}>
      <motion.div>{currentValue}</motion.div>
    </LazyMotion>
  );
};
