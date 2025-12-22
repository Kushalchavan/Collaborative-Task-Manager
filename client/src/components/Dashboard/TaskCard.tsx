import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Layers } from "lucide-react";

export function TaskCard() {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center text-muted-foreground">
        <CardTitle>Total Task</CardTitle>
        <CardTitle>
          <Layers />
        </CardTitle>
      </CardHeader>
      <CardContent className="text-2xl font-bold">34</CardContent>
      <CardFooter>
        <p className="text-sm"> +12% from last week</p>
      </CardFooter>
    </Card>
  );
}
