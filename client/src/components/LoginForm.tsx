import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginInput } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "./ui/spinner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to login your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...form.register("email")}
          />
          <FieldDescription className="text-destructive">
            {form.formState.errors.email?.message}
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" {...form.register("password")} />
          <FieldDescription className="text-destructive">
            {form.formState.errors.password?.message}
          </FieldDescription>
        </Field>

        <Field>
          <Button type="submit">
            {isPending ? <Spinner className="size-5" /> : "Login"}
          </Button>
        </Field>
        <FieldDescription className="px-6 text-center">
          Don't have an account? <a href="/register">Register</a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
