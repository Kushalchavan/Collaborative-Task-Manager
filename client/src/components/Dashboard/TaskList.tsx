import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import { useGetTask } from "@/hooks/useTask";
import { format } from "date-fns";
import UpdateTaskModal from "./modals/UpdateTaskModal";
import { useState } from "react";

type Task = {
  id: string;
  title: string;
  descripion?: string;
  status: "todo" | "in-progress" | "done";
  priority: "high" | "medium" | "low";
  dueDate?: string;
  project?: string;
};

export default function TaskList() {
  const { data } = useGetTask();

  if (!data || data.data.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        No Tasks yet
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-background">
      {data.data.map((task: Task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </div>
  );
}

function TaskRow({ task }: { task: Task }) {
  const [completed, setCompleted] = useState<boolean>(false);
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 border-b last:border-none transition`}
    >
      {/* Left */}
      <div className="flex items-start gap-3">
        <Checkbox
          className="mt-1"
          checked={completed}
          onCheckedChange={(checked) => setCompleted(checked === true)}
        />

        <div>
          <p
            className={`text-sm font-medium ${
              completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.title}
          </p>

          <p className="text-xs text-muted-foreground">{task.project}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <PriorityBadge priority={task.priority} />

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {task.dueDate ? format(new Date(task.dueDate), "PP") : "No due date"}
        </div>

        <div className="flex -space-x-2">
          <Avatar className="h-6 w-6 border">
            <AvatarImage src="https://i.pravatar.cc/40" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Avatar className="h-6 w-6 border">
            <AvatarImage src="https://i.pravatar.cc/41" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>

        <div>
          <UpdateTaskModal task={task} />
        </div>
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
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
}
