import CreateTaskModal from "@/components/Dashboard/modals/CreateTaskModal";
import { TaskCard } from "@/components/Dashboard/TaskCard";
import TaskList from "@/components/Dashboard/TaskList";
import { useGetUser } from "@/hooks/useAuth";
import { useGetTask } from "@/hooks/useTask";
import DashboardLayout from "@/layout/DashboardLayout";
import { isBefore, startOfDay } from "date-fns";
import { CircleAlert, CircleCheckBig, Clock, Layers } from "lucide-react";

type Task = {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
};

const Dashboard = () => {
  const { data } = useGetUser();
  const { data: taskResponse } = useGetTask();

  const tasks: Task[] = taskResponse?.data ?? [];
  const totalTask = tasks.length;

  const completedTasks = tasks.filter(
    (task: Task) => task.status === "done"
  ).length;

  const inProgressTasks = tasks.filter(
    (task: Task) => task.status === "in-progress"
  ).length;

  const overdueTasks = tasks.filter(
    (task: Task) =>
      task.dueDate &&
      task.status !== "done" &&
      isBefore(new Date(task.dueDate), startOfDay(new Date()))
  ).length;

  return (
    <DashboardLayout>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-2 justify-center">
          <h2 className="font-semibold">👋🏻 Hello {data?.user?.name}</h2>
          <span className="text-xs text-muted-foreground">
            Here's what's happening in your workspace today.
          </span>
        </div>
        <CreateTaskModal />
      </div>

      <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-7">
        <TaskCard
          cardName="Total Task"
          cardIcon={<Layers />}
          cardValue={totalTask}
          cardDescription="+12% from last week"
          showTrend
        />

        <TaskCard
          cardName="Completed"
          cardValue={completedTasks}
          cardIcon={<CircleCheckBig />}
          cardDescription="+4 this week"
          showTrend
        />

        <TaskCard
          cardName="In Progress"
          cardValue={inProgressTasks}
          cardIcon={<Clock />}
          cardDescription="Same as yesterday"
        />

        <TaskCard
          cardName="Overdue"
          cardIcon={<CircleAlert />}
          cardValue={overdueTasks}
          cardDescription="Action needed"
          className="text-red-500/70"
        />
      </div>

      <div className="mt-8">
        <h5 className="text-sm mb-3">Recent Tasks</h5>
        <TaskList />
      </div>
    </DashboardLayout>
  );
};
export default Dashboard;
