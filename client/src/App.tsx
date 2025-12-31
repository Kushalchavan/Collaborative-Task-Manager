import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedLayout from "./layout/ProtectedLayout";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./components/theme-provider";
import MyTasks from "./pages/MyTasks";
import { useSocketTasks } from "./hooks/useSocketTasks";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  useSocketTasks();

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

          <Route
            path="/my-tasks"
            element={
              <ProtectedLayout>
                <MyTasks />
              </ProtectedLayout>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster richColors/>
    </ThemeProvider>
  );
};
export default App;
