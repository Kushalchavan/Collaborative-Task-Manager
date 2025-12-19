import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedLayout from "./layout/ProtectedLayout";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
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
      </Routes>
    </BrowserRouter>
  );
};
export default App;
