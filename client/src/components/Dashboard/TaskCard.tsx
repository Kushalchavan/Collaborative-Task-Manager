import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

type TaskCardProps = {
  cardName: string;
  cardValue: number;
  cardIcon: React.ReactElement;
  cardDescription: string;
  showTrend?: boolean;
  varient?: "success" | "warning";
  className?: string;
};

export function TaskCard({
  cardName,
  cardIcon,
  cardValue,
  cardDescription,
  showTrend,
  className,
}: TaskCardProps) {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center text-muted-foreground">
        <CardTitle className={className}>{cardName}</CardTitle>
        <CardTitle className={className}>{cardIcon}</CardTitle>
      </CardHeader>
      <CardContent className={cn("text-2xl font-bold", className)}>
        {cardValue}
      </CardContent>
      <CardFooter>
        <p
          className={cn(
            "text-sm flex items-center gap-2 text-muted-foreground",
            showTrend ? "text-green-500" : "",
            className
          )}
        >
          {showTrend && <TrendingUp className="size-4" />} {cardDescription}
        </p>
      </CardFooter>
    </Card>
  );
}
