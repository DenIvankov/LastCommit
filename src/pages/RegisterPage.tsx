import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconBrandApple,
  IconBrandGoogle,
  IconBrandX,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { authStore } from "@/shared/auth/authStore";
import { registerSchema, type RegisterFormValues } from "@/shared/schemas";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = authStore();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setSubmitError(null);
      await registerUser(values);
      navigate("/Home", { replace: true });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try another email.";
      setSubmitError(errorMessage);
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
            Join X today
          </h1>
          <p className="mt-2 text-[32px] leading-tight font-bold">
            Create your account
          </p>

          <div className="mt-8 space-y-3">
            <button
              type="button"
              className="w-full h-11 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <IconBrandGoogle size={18} />
              Sign up with Google
            </button>
            <button
              type="button"
              className="w-full h-11 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <IconBrandApple size={18} />
              Sign up with Apple
            </button>
          </div>

          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              or
            </span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
          </div>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div>
              <input
                type="text"
                placeholder="Name"
                autoComplete="name"
                {...register("name")}
                className="w-full h-14 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 text-[17px] outline-none focus:border-sky-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                autoComplete="email"
                {...register("email")}
                className="w-full h-14 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 text-[17px] outline-none focus:border-sky-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                {...register("password")}
                className="w-full h-14 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 text-[17px] outline-none focus:border-sky-500"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {submitError && (
              <p className="text-sm text-red-500">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full h-11 rounded-full bg-black text-white dark:bg-white dark:text-black text-[15px] font-bold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting || isLoading
                ? "Creating account..."
                : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-[15px] text-neutral-600 dark:text-neutral-400">
            Already have an account?{" "}
            <Link className="text-sky-500 hover:underline" to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
