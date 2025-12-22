import DashboardNavbar from "@/components/Dashboard/Navbar";
import AppSidebar from "@/components/Dashboard/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <AppSidebar />

      <div className="flex flex-col flex-1">
        <DashboardNavbar />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
};
export default DashboardLayout;
