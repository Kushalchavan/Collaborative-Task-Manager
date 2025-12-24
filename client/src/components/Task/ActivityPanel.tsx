import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ActivityPanel() {
  return (
    <Card className="w-80 p-4 bg-muted/20 border-border">
      <h3 className="font-semibold mb-3">
        Activity & notifications
      </h3>

      <div className="space-y-3 text-sm">
        <ActivityItem
          title="You were assigned to 'Fix navigation bug on mobile'"
          meta="From Sarah • Mobile App • Just now"
          label="Assigned to you"
        />

        <ActivityItem
          title="Priority changed to High on 'Update landing page copy'"
          meta="By Alex • Q4 Marketing • 10s ago"
          label="Priority"
        />

        <ActivityItem
          title="Status updated to In progress on 'Design new auth flow'"
          meta="By you • Website Redesign • 1m ago"
          label="Status"
        />
      </div>
    </Card>
  );
}

function ActivityItem({
  title,
  meta,
  label,
}: {
  title: string;
  meta: string;
  label: string;
}) {
  return (
    <div className="rounded-lg p-3 border border-border bg-background">
      <Badge variant="outline" className="mb-1">
        {label}
      </Badge>
      <p className="text-sm">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">
        {meta}
      </p>
    </div>
  );
}
