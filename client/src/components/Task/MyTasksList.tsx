import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import UpdateTaskModal from "../Dashboard/modals/UpdateTaskModal";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  priority: "high" | "medium" | "low";
  dueDate?: string;
  project?: string;
};

type TaskListProps = {
  tasks: Task[];
  loading?: boolean;
};

// Task List with loading spinner
export default function MyTasksList({ tasks, loading }: TaskListProps) {
  if (loading) {
    return (
      <div className="p-4 w-full h-full flex justify-center items-center">
        <Spinner className="size-5" />
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        No tasks found
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-background">
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </div>
  );
}

// Task row
function TaskRow({ task }: { task: Task }) {
  const [completed, setCompleted] = useState(task.status === "done");

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b last:border-none transition">
      {/* Left */}
      <div className="flex items-start gap-3">
        <Checkbox
          className="mt-1"
          checked={completed}
          onCheckedChange={(checked) => setCompleted(checked === true)}
        />

        <div>
          <p
            className={`text-sm font-medium transition ${
              completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.title}
          </p>

          {task.project && (
            <p className="text-xs text-muted-foreground">{task.project}</p>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <PriorityBadge priority={task.priority} />

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {task.dueDate ? format(new Date(task.dueDate), "PP") : "No due date"}
        </div>

        <UpdateTaskModal task={task} />
      </div>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: "high" | "medium" | "low" }) {
  const styles = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-blue-100 text-blue-600",
  };

  return (
    <Badge
      variant="secondary"
      className={
        styles[priority.toLocaleLowerCase() as "high" | "medium" | "low"]
      }
    >
      {priority}
    </Badge>
  );
}
