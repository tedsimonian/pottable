import { Flower2 } from "lucide-react";

type EmptyStateProps = {
  filter: string;
};

export const EmptyState = (props: EmptyStateProps) => {
  const { filter } = props;

  let message = "No garden tasks yet. Add your first task to get started!";

  if (filter === "completed") {
    message = "No completed tasks yet. Keep gardening!";
  } else if (filter === "active") {
    message = "No active tasks. Time to plan your next garden project!";
  } else if (filter === "low") {
    message =
      "No low priority tasks found. All your tasks might be more urgent!";
  } else if (filter === "medium") {
    message =
      "No medium priority tasks found. Add some regular maintenance tasks!";
  } else if (filter === "high") {
    message = "No high priority tasks found. Your garden is under control!";
  } else if (filter !== "all") {
    message = `No ${filter} tasks found. Add some to keep your garden thriving!`;
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted mb-4 rounded-full p-6">
        <Flower2 className="text-primary size-16" />
      </div>
      <h3 className="text-foreground mb-1 text-lg font-medium">
        Your garden awaits
      </h3>
      <p className="text-muted-foreground max-w-sm">{message}</p>
    </div>
  );
};
