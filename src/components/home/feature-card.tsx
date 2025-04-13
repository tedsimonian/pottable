import React from "react";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function FeatureCard(props: FeatureCardProps) {
  const { icon, title, description } = props;
  return (
    <div className="bg-primary/10 rounded-xl p-6 text-center">
      <div className="bg-background mb-4 inline-flex items-center justify-center rounded-full p-3">
        {icon}
      </div>
      <h3 className="text-primary mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
