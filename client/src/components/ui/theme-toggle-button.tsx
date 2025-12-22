import { Moon, Sun } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StartPosition =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface ThemeToggleButtonProps {
  theme?: "light" | "dark";
  showLabel?: boolean;
  start?: StartPosition;
  className?: string;
  onClick?: () => void;
}

export const ThemeToggleButton = ({
  theme = "light",
  showLabel = false,
  start = "center",
  className,
  onClick,
}: ThemeToggleButtonProps) => {
  const handleClick = useCallback(() => {
    const styleId = `theme-transition-${Date.now()}`;
    const style = document.createElement("style");
    style.id = styleId;

    const positions = {
      center: "center",
      "top-left": "top left",
      "top-right": "top right",
      "bottom-left": "bottom left",
      "bottom-right": "bottom right",
    };

    const cx = start === "center" ? "50" : start.includes("left") ? "0" : "100";
    const cy = start === "center" ? "50" : start.includes("top") ? "0" : "100";

    style.textContent = `
      @supports (view-transition-name: root) {
        ::view-transition-old(root) {
          animation: none;
        }

        ::view-transition-new(root) {
          animation: circle-blur-expand 0.5s ease-out;
          transform-origin: ${positions[start]};
          filter: blur(0);
        }

        @keyframes circle-blur-expand {
          from {
            clip-path: circle(0% at ${cx}% ${cy}%);
            filter: blur(4px);
          }
          to {
            clip-path: circle(150% at ${cx}% ${cy}%);
            filter: blur(0);
          }
        }
      }
    `;

    document.head.appendChild(style);

    setTimeout(() => {
      style.remove();
    }, 1000);

    onClick?.();
  }, [onClick, start]);

  return (
    <Button
      variant="outline"
      size={showLabel ? "default" : "icon"}
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden transition-all",
        showLabel && "gap-2",
        className
      )}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}

      {showLabel && (
        <span className="text-sm">{theme === "light" ? "Light" : "Dark"}</span>
      )}
    </Button>
  );
};

export const useThemeTransition = () => {
  const startTransition = useCallback((updateFn: () => void) => {
    if ("startViewTransition" in document) {
      document.startViewTransition(updateFn);
    } else {
      updateFn();
    }
  }, []);
  return { startTransition };
};
