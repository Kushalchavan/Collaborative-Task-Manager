import TaskRow from "./TaskRow";

const mockTasks = [
  {
    id: "1",
    title: "Update landing page copy for Q4 campaign",
    project: "Q4 Marketing",
    priority: "high",
    due: "Today",
  },
  {
    id: "2",
    title: "Review Q3 financial reports",
    project: "Internal Tools",
    priority: "medium",
    due: "Today",
  },
];

export default function TasksGroup({ title }: { title: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground mb-2">
        {title}
      </h3>

      <div className="rounded-xl border bg-background">
        {mockTasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
