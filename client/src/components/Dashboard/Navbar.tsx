import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ThemeToggleButton,
  useThemeTransition,
} from "../ui/theme-toggle-button";
import { useTheme } from "../theme-provider";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "My Tasks", path: "/my-tasks" },
  { label: "Team", path: "/team" },
  { label: "Settings", path: "/settings" },
];

export default function DashboardNavbar() {
  const { theme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: logoutUser, isPending } = useLogout();

  const handleThemeToggle = useCallback(() => {
    startTransition(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    });
  }, [theme, setTheme, startTransition]);

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <header className="h-16 border-b bg-background px-6 flex items-center justify-between fixed left-64 right-0">
      <div className="flex items-center gap-6">
        {/* Left */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Button
                key={item.label}
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className="text-sm"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <ThemeToggleButton
          theme={theme === "dark" ? "dark" : "light"}
          onClick={handleThemeToggle}
          start="top-right"
        />

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isPending}
              className="text-red-500 focus:text-red-500"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
