import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import styled from "styled-components";
import Input from "../../shared/Input";
import StylButton from "../../shared/StylButton";

const StyledForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  width: 200px;
`;

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

    repeatPassword: z.string().nonempty({ message: "Confirmation is required." }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Confirmation is not valid.",
    path: ["repeatPassword"],
  });

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const onSubmit = (e) => {
    // e.preventDefault();
    return console.log(e);
  };
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("username")}
        placeholder="Username*"
        error={errors?.username?.message}
      />
      <Input
        {...register("password")}
        placeholder="Password*"
        type="password"
        error={errors?.password?.message}
      />
      <Input
        {...register("repeatPassword")}
        placeholder="Reapeat password*"
        type="password"
        error={errors?.repeatPassword?.message}
      />
      <Input
        {...register("email")}
        placeholder="E-mail*"
        error={errors?.email?.message}
      />

      <StylButton onClick={handleSubmit(onSubmit)} type="submit">
        Sing In
      </StylButton>
      <button onClick={() => console.log("Errors: ", errors)} type="button">
        Pokaż błędy
      </button>
      <button type="submit">wyślij</button>
    </StyledForm>
  );
};

export default RegisterForm;
