import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import type { Task } from "./MyTasksList";

const TaskRow = ({ task }: { task: Task }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b last:border-none hover:bg-muted/40">
      <div className="flex items-start gap-3">
        <Checkbox className="mt-1" />

        <div>
          <p className="text-sm font-medium">{task.title}</p>
          <Badge variant="secondary" className="mt-1">
            {task.project}
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <PriorityBadge value={task.priority} />

        <div className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {task.dueDate}
        </div>
      </div>
    </div>
  );
};

export default TaskRow;

function PriorityBadge({ value }: { value: Task["priority"] }) {
  const map = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-blue-100 text-blue-600",
  };

  return (
    <Badge className={map[value]}>
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </Badge>
  );
}
