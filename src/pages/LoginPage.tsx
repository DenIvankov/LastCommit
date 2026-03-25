import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandApple, IconBrandGoogle, IconBrandX } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { z } from "zod";

import { useAuth } from "@/shared/auth";

const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isHydrating } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (!isHydrating && isAuthenticated) {
    return <Navigate to="/Home" replace />;
  }

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setSubmitError(null);
      await login(values);

      const fromPath =
        typeof location.state === "object" &&
        location.state !== null &&
        "from" in location.state &&
        typeof location.state.from === "object" &&
        location.state.from !== null &&
        "pathname" in location.state.from &&
        typeof location.state.from.pathname === "string"
          ? location.state.from.pathname
          : "/Home";

      navigate(fromPath, { replace: true });
    } catch {
      setSubmitError("Login failed. Please check email and password.");
    }
  };

  return (
    <div className="min-h-screen theme-surface flex items-center justify-center px-4">
      <div className="w-full max-w-[980px] grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-center">
        <div className="hidden md:flex items-center justify-center">
          <IconBrandX size={320} stroke={1.2} />
        </div>

        <div className="w-full max-w-[420px] mx-auto">
          <div className="mb-8 md:hidden">
            <IconBrandX size={48} stroke={1.5} />
          </div>

          <h1 className="text-[56px] leading-[1.05] font-extrabold tracking-tight">
            Happening now
          </h1>
          <p className="mt-2 text-[32px] leading-tight font-bold">Sign in to X</p>

          <div className="mt-8 space-y-3">
            <button
              type="button"
              className="w-full h-11 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <IconBrandGoogle size={18} />
              Sign in with Google
            </button>
            <button
              type="button"
              className="w-full h-11 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <IconBrandApple size={18} />
              Sign in with Apple
            </button>
          </div>

          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
            <span className="text-sm text-neutral-500 dark:text-neutral-400">or</span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <input
                type="email"
                placeholder="Email"
                autoComplete="email"
                {...register("email")}
                className="w-full h-14 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 text-[17px] outline-none focus:border-sky-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                {...register("password")}
                className="w-full h-14 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 text-[17px] outline-none focus:border-sky-500"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {submitError && <p className="text-sm text-red-500">{submitError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-full bg-black text-white dark:bg-white dark:text-black text-[15px] font-bold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-[15px] text-neutral-600 dark:text-neutral-400">
            Don&apos;t have an account?{" "}
            <Link className="text-sky-500 hover:underline" to="/register">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
