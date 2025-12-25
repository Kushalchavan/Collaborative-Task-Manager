import ActivityPanel from "@/components/Task/ActivityPanel";
import TasksFilters from "@/components/Task/TaskFilters";
import TasksGroup from "@/components/Task/TasksGrounp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/layout/DashboardLayout";

const MyTasks = () => {
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
                <span className="size-3 bg-green-400 rounded-full mr-1 animate-pulse"/> Live updates
              </Badge>
              <Button>+ Add Task</Button>
            </div>
          </div>

          <TasksFilters />

          <TasksGroup title="Today" />
          <TasksGroup title="Upcoming" />
        </div>

        {/* Right */}
        <ActivityPanel />
      </div>
    </DashboardLayout>
  );
};

export default MyTasks;
