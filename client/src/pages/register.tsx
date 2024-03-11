import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { registerUser } from "../requests/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

type RegisterType = z.infer<typeof RegisterSchema>;

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
  });
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation<
    { accessToken: string },
    Error,
    RegisterType,
    unknown
  >({
    mutationFn: ({ username, email, password }) =>
      registerUser(username, email, password),
    onSuccess: () => {
      toast.success("User created successfully");
      navigate("/login");
    },
    onError: (error) => {
      if (error.message.includes("409")) {
        toast.error("Username or email already exists");
        return;
      } else {
        console.error(error.message);
      }
    },
  });

  const onSubmit = (data: RegisterType) => {
    mutate(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <h1 className="text-3xl font-bold mb-5">Register</h1>
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
          {...register("email")}
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("password")}
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button variant={"contained"} type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Register"}
        </Button>
      </form>
      <div className="mt-5">
        I already have an account{" "}
        <a href="/login" className="underline text-blue-500">
          login
        </a>{" "}
        here.
      </div>
    </div>
  );
};

export default Register;
