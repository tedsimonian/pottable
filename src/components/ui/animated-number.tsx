"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

type AnimatedNumberProps = {
  value: number;
  animateProps?: {
    mass?: number;
    stiffness?: number;
    damping?: number;
  };
};

export const AnimatedNumber = (props: AnimatedNumberProps) => {
  const { value, animateProps } = props;
  const { mass = 0.8, stiffness = 75, damping = 15 } = animateProps ?? {};

  const spring = useSpring(value, { mass, stiffness, damping });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString(),
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
};
