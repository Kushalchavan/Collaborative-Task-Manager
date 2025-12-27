import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, PenBoxIcon } from "lucide-react";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { updateTaskSchema, type UpdateTaskInput } from "@/schemas/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateTask } from "@/hooks/useTask";
import DeleteTaskModal from "./DeleteTaskModal";
import { Spinner } from "@/components/ui/spinner";

type UpdateTaskModalProps = {
  task: {
    id: string;
    title: string;
    description?: string;
    status: "todo" | "in-progress" | "done";
    priority: "low" | "medium" | "high";
    dueDate?: string;
  };
};

export default function UpdateTaskModal({ task }: UpdateTaskModalProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { register, handleSubmit, control, reset } = useForm<UpdateTaskInput>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    },
  });
  const { mutate: updateTask, isPending } = useUpdateTask();

  // syncing values only when modal is open
  useEffect(() => {
    if (open) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
      });
    }
  }, [open, task, reset]);

  const onSubmit = (data: UpdateTaskInput) => {
    updateTask(
      {
        id: task.id,
        data: {
          ...data,
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <PenBoxIcon className=" size-4 cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Project + Status */}
          <div className="grid grid-cols-2 gap-2 ">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website Redesign</SelectItem>
                <SelectItem value="mobile">Mobile App</SelectItem>
              </SelectContent>
            </Select>

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">Todo</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Task title */}
          <div>
            <Input
              placeholder="e.g. Design new homepage hero section"
              {...register("title")}
            />
          </div>

          {/* Description */}
          <div>
            <Textarea
              placeholder="Add a detailed description..."
              {...register("description")}
            />
          </div>

          {/* Assignee + Due date + Priority */}
          <div className="flex justify-between items-center">
            {/* Assignee */}
            <Select>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <SelectValue placeholder="Assignee" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alex">Alex Morgan</SelectItem>
                <SelectItem value="john">John Doe</SelectItem>
              </SelectContent>
            </Select>

            {/* Due date */}
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => {
                const date = field.value ? new Date(field.value) : undefined;
                return (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PP") : "Select date"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) =>
                          field.onChange(d ? d.toISOString() : undefined)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                );
              }}
            />

            {/* Priority */}
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex justify-between pt-4">
            <div>
              <DeleteTaskModal
                taskId={task.id}
                onDeleted={() => setOpen(false)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button className="w-28" type="submit" disabled={isPending}>
                {isPending ? <Spinner className="size-4" /> : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
