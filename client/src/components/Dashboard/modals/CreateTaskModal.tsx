import { useState } from "react";
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
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { Spinner } from "@/components/ui/spinner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema, type CreateTaskInput } from "@/schemas/task.schema";
import { useCreateTask } from "@/hooks/useTask";
import { useUsers } from "@/hooks/useUsers";

export default function CreateTaskModal() {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState<boolean>(false);
  const { mutate, isPending } = useCreateTask();
  const { register, handleSubmit, control, reset } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
    },
  });
  const { data } = useUsers();
  const users = data?.data || [];

  const onSubmit = (data: CreateTaskInput) => {
    mutate(
      {
        ...data,
        dueDate: date?.toISOString(),
        
      },
      {
        onSuccess: () => {
          reset();
          setDate(undefined);
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog onOpenChange={(v) => !isPending && setOpen(v)} open={open}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Create Task
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Project + Status */}
          <div className="flex gap-3 ">
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

            <Controller
              name="assignedToId"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Assign to user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
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
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

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
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button className="w-28" type="submit" disabled={isPending}>
              {isPending ? <Spinner className="size-4" /> : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
