import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedLayout from "./layout/ProtectedLayout";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./components/theme-provider";
import MyTasks from "./pages/MyTasks";
import { useEffect } from "react";
import { socket } from "./lib/socket";

const App = () => {

  useEffect(() => {
        socket.on("task:created", (task) => {
      console.log("🟢 Task created:", task);
    });

    socket.on("task:updated", (task) => {
      console.log("🟡 Task updated:", task);
    });

    socket.on("task:deleted", (taskId) => {
      console.log("🔴 Task deleted:", taskId);
    });

    return () => {
      socket.off("task:created")
      socket.off("task:updated")
      socket.off("task:deleted")
    }
  }, [])

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            }
          />

          <Route path="/my-tasks" element={<ProtectedLayout>
            <MyTasks/>
          </ProtectedLayout>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;
