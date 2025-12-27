import CreateTaskModal from "@/components/Dashboard/modals/CreateTaskModal";
import ActivityPanel from "@/components/Task/ActivityPanel";
import MyTasksList from "@/components/Task/MyTasksList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetTask } from "@/hooks/useTask";
import DashboardLayout from "@/layout/DashboardLayout";
import { useMemo, useState } from "react";

type StatusFilter = "todo" | "in-progress" | "done" | "all";
type PriorityFilter = "low" | "medium" | "high" | "all";
type SortOrder = "dueDate-asc" | "dueDate-desc";

const MyTasks = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [priority, setPriority] = useState<PriorityFilter>("all");
  const [sort, setSort] = useState<SortOrder>("dueDate-asc");
  const { data, isLoading } = useGetTask();
  const tasks = data?.data ?? [];

  const filteredTask = useMemo(() => {
    let result = [...tasks];

    // Search filtering
    if (search) {
      result = result.filter((task) =>
        task.filter.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status Filtering
    if (status !== "all") {
      result = result.filter((task) => task.status === status);
    }

    // Priority filter
    if (priority !== "all") {
      result = result.filter((task) => task.priority === priority);
    }

    // sorting due date
    result.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      const aTime = new Date(a.dueDate).getTime();
      const bTime = new Date(b.dueDate).getTime();

      return sort === "dueDate-asc" ? aTime - bTime : bTime - aTime;
    });

    return result;
  }, [tasks, search, status, priority, sort]);

  return (
    <DashboardLayout>
      <div className="flex gap-6">
        {/* Left */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold flex items-center gap-2">
                My Tasks
              </h1>

              <Tabs defaultValue="assigned" className="mt-3">
                <TabsList>
                  <TabsTrigger value="assigned">Assigned to me</TabsTrigger>
                  <TabsTrigger value="created">Created by me</TabsTrigger>
                  <TabsTrigger value="overdue">Overdue</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1">
                <span className="size-3 bg-green-400 rounded-full mr-1 animate-pulse" />{" "}
                Live updates
              </Badge>
              <CreateTaskModal />
            </div>
          </div>

          {/* Task filtering */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-3">
              {/* Searching */}
              <Input
                placeholder="Filter by name..."
                className="w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* Status */}
              <Select
                value={status}
                onValueChange={(val) => setStatus(val as StatusFilter)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>

              {/* Priority */}
              <Select
                value={priority}
                onValueChange={(val) => setPriority(val as PriorityFilter)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              onClick={() =>
                setSort((prev) =>
                  prev === "dueDate-asc" ? "dueDate-desc" : "dueDate-asc"
                )
              }
            >
              Due date {sort === "dueDate-asc" ? "↑" : "↓"}
            </Button>
          </div>

          {/* Task list */}
          <MyTasksList tasks={filteredTask} loading={isLoading} />
        </div>

        {/* Right */}
        <ActivityPanel />
      </div>
    </DashboardLayout>
  );
};

export default MyTasks;
