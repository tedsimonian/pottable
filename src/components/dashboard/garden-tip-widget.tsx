import React from "react";
import { motion } from "motion/react";
import { Lightbulb, Leaf } from "lucide-react";

type Tip = {
  title: string;
  content: string;
};

const generateRandomTip = () => {
  const tips = [
    {
      title: "Tip 1",
      content:
        "Content 1 really long content, probably just to test out the font-accent",
    },
    {
      title: "Tip 2",
      content:
        "Content 2 really long content, probably just to test out the font-accent",
    },
    {
      title: "Tip 3",
      content:
        "Content 3 really long content, probably just to test out the font-accent",
    },
  ];

  const randomIndex = Math.floor(Math.random() * tips.length);
  return tips[randomIndex] as Tip;
};

export const GardenTipWidget = () => {
  const { title, content } = generateRandomTip();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="from-primary/10 to-primary/5 border-primary/20 relative mb-6 overflow-hidden rounded-xl border bg-gradient-to-br p-6 backdrop-blur-sm"
    >
      {/* Decorative leaves */}
      <div className="text-primary/10 absolute -top-6 -right-6 rotate-45 transform">
        <svg className="h-20 w-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10.5C7 8.01 9.01 6 11.5 6S16 8.01 16 10.5c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-.76c-1.81-1.27-3-3.36-3-5.74z" />
          <path d="M15 2c0 1.66-1.34 3-3 3S9 3.66 9 2s1.34-3 3-3 3 1.34 3 3z" />
        </svg>
      </div>
      <div className="text-primary/10 absolute -bottom-6 -left-6 rotate-12 transform">
        <svg className="h-20 w-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10.5C7 8.01 9.01 6 11.5 6S16 8.01 16 10.5c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-.76c-1.81-1.27-3-3.36-3-5.74z" />
          <path d="M15 2c0 1.66-1.34 3-3 3S9 3.66 9 2s1.34-3 3-3 3 1.34 3 3z" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mr-6 md:mb-0">
          <div className="bg-primary/20 border-primary/30 flex h-16 w-16 items-center justify-center rounded-full border shadow-inner">
            <Lightbulb className="text-primary h-7 w-7 drop-shadow-sm" />
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center">
            <h3 className="font-display text-primary text-lg font-bold">
              {title}
            </h3>
            <Leaf className="text-primary animate-bounce-slow ml-2 h-4 w-4" />
          </div>
          <p className="text-neutral-earth text-opacity-90 font-[Caveat]">
            {content}
          </p>
        </div>
      </div>
    </motion.section>
  );
};
