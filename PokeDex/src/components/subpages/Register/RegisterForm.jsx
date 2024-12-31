import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { enqueueSnackbar } from "notistack";
import styled from "styled-components";

import useRegisterUser from "../../../hooks/useRegisterUser";
import { LoginContext } from "../../../context";
import { StyledButton, StyledInput } from "../../shared";

const StyledForm = styled.form(({ theme }) => ({
  padding: "10px 5px",
  display: "flex",
  flexFlow: "column nowrap",
  gap: "10px",
  minWidth: "450px",
  borderRadius: "0.5rem",
  border: `5px double ${theme.colors.border}`,
}));

const registerSchema = z
  .object({
    id: z.string(),
    username: z
      .string()
      .min(3, { message: "Username is too short." })
      .nonempty({ message: "Username is required." }),

    email: z
      .string()
      .email({ message: "Email is incorrect." })
      .nonempty({ message: "Email is required." }),

    password: z
      .string()
      .min(8, { message: "The password must contain at least 8 character." })
      .regex(/[A-Z]/, {
        message: "The password must contain at least one uppercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain a special character.",
      })
      .nonempty({ message: "Password is required." }),

    repeatPassword: z
      .string()
      .nonempty({ message: "Confirmation is required." }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Confirmation is not valid.",
    path: ["repeatPassword"],
  });

const RegisterForm = () => {
  const { registerUser, loading, error } = useRegisterUser();
  const { logIn } = useContext(LoginContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      id: "",
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = async (e) => {
    // e.preventDefault();
    const result = await registerUser(e);
    if (result) {
      enqueueSnackbar("User registered successfully. Automatically logged in", {
        variant: "success",
      });

      localStorage.setItem("user", e.username);
      logIn();
      reset();
    } else {
      enqueueSnackbar(error, { variant: "error" });
    }
  };
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledInput
        register={register}
        name="username"
        label="Username"
        placeholder="Username"
        error={!!errors.username}
        helperText={errors.username ? errors.username.message : ""}
        autoComplete="name"
      />
      <StyledInput
        register={register}
        name="password"
        label="Password"
        placeholder="Password"
        type="password"
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ""}
        autoComplete="new-password"
      />
      <StyledInput
        register={register}
        name="repeatPassword"
        label="Repeat password"
        placeholder="Repeat password"
        type="password"
        error={!!errors.repeatPassword}
        helperText={errors.repeatPassword ? errors.repeatPassword.message : ""}
        autoComplete="new-password"
      />
      <StyledInput
        register={register}
        name="email"
        label="E-mail"
        placeholder="E-mail"
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
        autoComplete="email"
      />

      <StyledButton type="submit">
        {loading ? "Checking..." : "Sign In"}
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
