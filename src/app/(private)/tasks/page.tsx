import { SectionHeading } from "~/components/common/section-heading";
import { MyTasks } from "~/components/tasks/my-tasks";

export default function TasksPage() {
  return (
    <div className="">
      <SectionHeading title="My Tasks" description="Manage your tasks" />
      <div className="mt-6">
        <MyTasks />
      </div>
    </div>
  );
}
