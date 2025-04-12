import { Separator } from "../ui/separator";

type SectionHeadingProps = {
  title: string;
  description: string;
  actions?: React.ReactNode;
};

export const SectionHeading = (props: SectionHeadingProps) => {
  const { title, description, actions } = props;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {actions && <div className="mt-3 flex sm:mt-0 sm:ml-4">{actions}</div>}
      </div>
      <Separator />
    </div>
  );
};
