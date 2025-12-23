import CreateTaskModal from "@/components/Dashboard/modals/CreateTaskModal";
import { TaskCard } from "@/components/Dashboard/TaskCard";
import { useGetUser } from "@/hooks/useAuth";
import DashboardLayout from "@/layout/DashboardLayout";

const Dashboard = () => {
  const { data } = useGetUser();

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
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </DashboardLayout>
  );
};
export default Dashboard;
