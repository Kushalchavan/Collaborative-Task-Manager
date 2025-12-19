import { Navigate } from "react-router-dom";
import { useGetUser } from "../hooks/auth/useAuth";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { data, isError, isLoading } = useGetUser();

  if (isLoading) return <div>Loding...</div>;

  if (isError || !data?.user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
export default ProtectedLayout;
