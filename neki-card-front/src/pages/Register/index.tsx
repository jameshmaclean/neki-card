import { Controller, useForm } from "react-hook-form";
import { AppButton } from "../../components/AppButton";
import { AppHeader } from "../../components/AppHeader";
import { AppInput } from "../../components/AppInput";
import { Container, InputContainer, Form } from "./styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { format, parse } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";

type FormDataProps = {
  email: string;
  name: string;
  socialName?: string | "Não informado";
  telephone?: string | "Não informado";
  birthDate: string;
  photo: File;
  linkedin?: string | "Não informado";
  facebook?: string | "Não informado";
  github?: string | "Não informado";
  instagram?: string | "Não informado";
};

const signUpSchema = yup.object({
  name: yup.string().required("O Nome completo é obrigatório"),

  socialName: yup.string(),

  email: yup
    .string()
    .email("Email inválido")
    .required("O Email é obrigatório")
    .matches(
      /.*@(neki(-it)?\.com\.br)$/i,
      "O Email deve ser do domínio @neki.com.br ou @neki-it.com.br"
    ),

  telephone: yup.string(),

  birthDate: yup
    .string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "A Data de Nascimento deve estar no formato dd/mm/yyyy"
    )
    .required("A Data de Nascimento é obrigatória"),

  photo: yup.mixed().required("A Foto é obrigatória") as yup.MixedSchema<File>,

  linkedin: yup.string(),

  facebook: yup.string(),

  github: yup.string(),

  instagram: yup.string(),
});

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: "",
      birthDate: "",
      name: "",
      photo: undefined,
    },
  });

  async function handleSubmitData(data: FormDataProps) {
    const register = toast.loading("Enviando dados");
    try {
      setIsLoading(true);
      const parsedDate = parse(data.birthDate, "dd/MM/yyyy", new Date());
      const formattedDate = format(parsedDate, "yyyy-MM-dd");
      const collaborator = {
        email: data.email,
        birthDate: formattedDate,
        facebook: data.facebook || "Não informado",
        gitHub: data.github || "Não informado",
        fullName: data.name,
        instagram: data.instagram || "Não informado",
        linkedin: data.linkedin || "Não informado",
        socialName: data.socialName || "Não informado",
        telephone: data.telephone || "Não informado",
      };
      const encodedEmail = encodeURIComponent(data.email);
      const response = await api.post("/collaborators/register", collaborator);
      if (response.status == 201) {
        const formData = new FormData();
        if (data.photo) {
          formData.append("photo", data.photo);
          await api.post(
            `/collaborators/registerAvatar/${encodedEmail}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
      }
      toast.update(register, {
        render: "Cadastrado com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      reset();
    } catch (AxiosError) {
      toast.update(register, {
        render: `${AxiosError.response.data}`,
        autoClose: 1000,
        type: "error",
        isLoading: false,
      });
    } finally {
      setIsLoading(false);
    }
  }
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  return (
    <Container>
      <AppHeader />
      <h1>Cadastrar novo colaborador</h1>
      <InputContainer>
        <Form onSubmit={handleSubmit(handleSubmitData)}>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Informe o e-mail" }}
            render={({ field: { onChange, value } }) => (
              <AppInput
                placeholder="@neki.com.br ou @neki-it.com.br"
                label="E-mail"
                errorMessage={errors.email?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <AppInput
                placeholder="João Silva"
                label="Nome"
                errorMessage={errors.name?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="socialName"
            render={({ field: { onChange, value } }) => (
              <AppInput
                placeholder="Nome social"
                label="Nome social"
                errorMessage={errors.socialName?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="telephone"
            render={({ field: { onChange, value } }) => (
              <AppInput
                placeholder="21998558754"
                label="Telefone"
                errorMessage={errors.telephone?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="birthDate"
            render={({ field: { onChange, value } }) => (
              <AppInput
                placeholder="dd/mm/yyyy"
                label="Data de Nascimento"
                errorMessage={errors.birthDate?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="photo"
            render={({ field: { onChange } }) => (
              <AppInput
                type="file"
                placeholder="Imagem do avatar"
                label="Foto"
                errorMessage={errors.photo?.message?.toString()}
                onChange={(e) => {
                  const selectedFile = e.target.files && e.target.files[0];
                  if (selectedFile) {
                    onChange(selectedFile);
                    handleFileChange(selectedFile);
                  }
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="linkedin"
            render={({ field: { onChange, value } }) => (
              <AppInput
                placeholder="linkedin.com/in/"
                label="Linkedin"
                errorMessage={errors.linkedin?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="facebook"
            render={({ field: { onChange, value } }) => (
              <AppInput
                placeholder="facebook.com/"
                label="Facebook"
                errorMessage={errors.facebook?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="github"
            render={({ field: { onChange, value } }) => (
              <AppInput
                placeholder="github.com/"
                label="Github"
                errorMessage={errors.github?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="instagram"
            render={({ field: { onChange, value } }) => (
              <AppInput
                placeholder="instagram.com/"
                label="Instagram"
                errorMessage={errors.instagram?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <AppButton title="Cadastrar" type="submit" disabled={isLoading} />
          <AppButton
            variant="secondary"
            title="Voltar para a tela inicial"
            onClick={() => navigate("/")}
          />
        </Form>
      </InputContainer>
      <ToastContainer
        position="top-center"
        autoClose={10}
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
