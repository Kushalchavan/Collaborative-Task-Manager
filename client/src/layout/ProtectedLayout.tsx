import { useGetUser } from "../hooks/auth/useAuth";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useGetUser();

  if (isLoading) return <div>Loding...</div>;

  return <>{children}</>;
};
export default ProtectedLayout;
