import { socket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useSocketTasks = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onTaskChange = () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    };

    socket.on("task:created", onTaskChange);
    socket.on("task:updated", onTaskChange);
    socket.on("task:deleted", onTaskChange);

    return () => {
      socket.off("task:created", onTaskChange);
      socket.off("task:updated", onTaskChange);
      socket.off("task:deleted", onTaskChange);
    };
  }, [queryClient]);
};
