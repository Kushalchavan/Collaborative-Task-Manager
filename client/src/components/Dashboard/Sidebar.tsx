import {
  LayoutGrid,
  CheckCircle,
  Calendar,
  Clock,
  Flag,
  Plus,
  SquareCheckBig,
  Users,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useLocation, useNavigate } from "react-router-dom";

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-64 h-screen border-r bg-background px-4 py-4 fixed left-0 top-0">
      {/* Logo */}
      <div className="flex items-center gap-2 font-medium">
        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
          <SquareCheckBig className="size-4" />
        </div>
        FaskFlow
      </div>

      <Separator className="my-5" />

      <nav className="space-y-1">
        <SidebarItem
          icon={LayoutGrid}
          label="Dashboard"
          path="/dashboard"
          active={location.pathname === "/dashboard"}
          onClick={() => navigate("/dashboard")}
        />

        <SidebarItem
          icon={CheckCircle}
          label="My Tasks"
          active={location.pathname === "/my-tasks"}
          path="/my-tasks"
          onClick={() => navigate("/my-tasks")}
        />

        <SidebarItem
          icon={Users}
          label="Team"
          path="/team"
          active={location.pathname === "/team"}
          onClick={() => navigate("/team")}
        />

        <SidebarItem
          icon={Settings}
          label="Settings"
          path="/settings"
          active={location.pathname === "/settings"}
          onClick={() => navigate("/settings")}
        />
      </nav>

      <Separator className="my-4" />

      <p className="text-xs font-semibold uppercase text-muted-foreground px-2">
        Filters
      </p>
      <nav className="space-y-1 mt-3">
        <SidebarItem icon={Calendar} label="Today" />
        <SidebarItem icon={Clock} label="Upcoming" />
        <SidebarItem icon={Flag} label="Priority" />
      </nav>

      <Separator className="my-4" />

      {/* Projects */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold uppercase text-muted-foreground px-2">
          Projects
        </p>
        <Button variant="ghost" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <nav className="space-y-1">
        <ProjectItem color="bg-blue-500" label="Website Redesign" />
        <ProjectItem color="bg-green-500" label="Mobile App" />
        <ProjectItem color="bg-orange-500" label="Q4 Marketing" />
        <ProjectItem color="bg-purple-500" label="Internal Tools" />
      </nav>
    </aside>
  );
}

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  path?: string;
  active?: boolean;
  onClick?: () => void;
};

function SidebarItem({ icon: Icon, label, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition
        ${
          active
            ? "bg-primary/10 text-primary font-medium"
            : "text-muted-foreground hover:bg-muted"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4" />
        {label}
      </div>
    </button>
  );
}

function ProjectItem({ color, label }: { color: string; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </button>
  );
}
