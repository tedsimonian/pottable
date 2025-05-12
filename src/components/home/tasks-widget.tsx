import { CheckCircle2, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const TasksWidget = () => {
  const tasks = [
    { id: 1, title: "Water tomato plants", dueDate: "Today" },
    { id: 2, title: "Harvest basil leaves", dueDate: "Tomorrow" },
    { id: 3, title: "Add fertilizer to roses", dueDate: "Apr 15" },
    { id: 4, title: "Prune fruit trees", dueDate: "Apr 18" },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          {"Upcoming Tasks"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start">
              <div className="mr-2 h-5 w-5 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{task.title}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="mr-1 h-3 w-3" />
                  {task.dueDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
