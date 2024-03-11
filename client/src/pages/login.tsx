import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { login } from "../requests/auth";
import { useMutation } from "@tanstack/react-query";
import { setToken } from "../lib/token";
import { useUserContext } from "../context/user-context";

const LoginSchema = z.object({
  username: z.string(),
  password: z.string().min(3).max(20),
});

type LoginType = z.infer<typeof LoginSchema>;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate, isPending, isError } = useMutation<
    { accessToken: string },
    Error,
    LoginType,
    unknown
  >({
    mutationFn: ({ username, password }) => login(username, password),
    onSuccess: (data) => {
      setToken(data.accessToken);
      window.location.href = "/";
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const onSubmit = (data: LoginType) => {
    mutate(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <h1 className="text-3xl font-bold mb-5">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5 min-w-[300px]"
      >
        <TextField
          {...register("username")}
          label="Username"
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          {...register("password")}
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        {isError && (
          <div className="text-red-500">
            {"Username or password is incorrect"}
          </div>
        )}
        <Button variant={"contained"} type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Login"}
        </Button>
      </form>
      <div className="mt-5">
        If you don't have an account,{" "}
        <a href="/register" className="underline text-blue-500">
          register
        </a>{" "}
        here.
      </div>
    </div>
  );
};

export default Login;
