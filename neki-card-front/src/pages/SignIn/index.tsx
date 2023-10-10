import { Container, InputContainer, Form } from "./styles";
import { AppButton } from "../../components/AppButton";
import { AppInput } from "../../components/AppInput";
import { AppHeader } from "../../components/AppHeader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";

import { Controller, useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

type FormDataProps = {
  username: string;
  password: string;
};
const signUpSchema = yup.object({
  username: yup
    .string()
    .email("Email inválido")
    .required("Informe o email")
    .matches(
      /.*@(neki(-it)?\.com\.br)$/i,
      "O Email deve ser do domínio @neki.com.br ou @neki-it.com.br"
    ),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos"),
});

export function SignIn() {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleSignIn(data: FormDataProps) {
    try {
      await signIn(data.username, data.password);
      navigate("/");
      reset();
    } catch (error) {
      toast(error.message, {
        type: "error",
        autoClose: 3000,
      });
    }
  }
  return (
    <Container>
      <AppHeader />
      <InputContainer>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit(handleSignIn)}>
          <Controller
            control={control}
            name="username"
            rules={{ required: "Informe o e-mail" }}
            render={({ field: { onChange, value } }) => (
              <AppInput
                placeholder="@neki.com.br ou @neki-it.com.br"
                label="E-mail"
                errorMessage={errors.username?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <AppInput
                placeholder="Mínimo de 6 dígitos"
                errorMessage={errors.password?.message}
                label="Senha"
                onChange={onChange}
                value={value}
                type="password"
              />
            )}
          />

          <AppButton variant="primary" title="Entrar" type="submit" />
        </Form>
      </InputContainer>
      <ToastContainer
        position="top-center"
        autoClose={50}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Container>
  );
}
