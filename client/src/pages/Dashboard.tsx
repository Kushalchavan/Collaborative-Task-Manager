import { TaskCard } from "@/components/Dashboard/TaskCard";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layout/DashboardLayout";
import { Plus } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-2 justify-center">
          <h2 className="font-semibold">👋🏻 Hello {}</h2>
          <span className="text-xs text-muted-foreground">Here's what's happening in your workspace today.</span>
        </div>

        <Button><Plus/> Create Task</Button>
      </div>

      <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-7">
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
      </div>
    </DashboardLayout>
  );
};
export default Dashboard;
