import { Spinner } from "@/components/ui/spinner";
import { useGetUser } from "../hooks/useAuth";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useGetUser();

  if (isLoading)
    return (
      <div className="w-srceen h-screen flex justify-center items-center">
        <Spinner className="size-6" />
      </div>
    );

  return <>{children}</>;
};
export default ProtectedLayout;
