import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ThemeToggleButton,
  useThemeTransition,
} from "../ui/theme-toggle-button";
import { useTheme } from "../theme-provider";
import { useCallback } from "react";

const navItems = ["Dashboard", "My Tasks", "Team", "Settings"];

export default function DashboardNavbar() {
  const { theme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();

  const handleThemeToggle = useCallback(() => {
    startTransition(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    });
  }, [theme, setTheme, startTransition]);

  return (
    <header className="h-16 w-full border-b bg-background px-6 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-6">
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Button
              key={item}
              variant={item === "Dashboard" ? "secondary" : "ghost"}
              size="sm"
              className="text-sm"
            >
              {item}
            </Button>
          ))}
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <ThemeToggleButton
          theme={theme === "dark" ? "dark" : "light"}
          onClick={handleThemeToggle}
          start="top-right"
        />

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
