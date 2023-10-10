import { Controller, useForm } from "react-hook-form";
import { AppButton } from "../../components/AppButton";
import { AppHeader } from "../../components/AppHeader";
import { AppInput } from "../../components/AppInput";
import { Container, InputContainer, Form } from "./styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { format, parse } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userDTO } from "../Home/Home";

type FormDataProps = {
  email: string;
  fullName: string;
  socialName?: string;
  telephone?: string;
  birthDate: string;
  photo: File;
  linkedin?: string;
  facebook?: string;
  gitHub?: string;
  instagram?: string;
};

const signUpSchema = yup.object({
  fullName: yup.string().required("O Nome completo é obrigatório"),
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

  photo: yup.mixed().nullable() as yup.MixedSchema<File>,

  linkedin: yup.string(),

  facebook: yup.string(),

  gitHub: yup.string(),

  instagram: yup.string(),
});

export function EditCollaborator() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<userDTO>({} as userDTO);

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
      facebook: "",
      gitHub: "",
      instagram: "",
      linkedin: "",
      fullName: "",
      photo: undefined,
      socialName: "",
      telephone: "",
    },
  });

  useEffect(() => {
    async function fetchUserDetails() {
      const response = await api.get("/collaborators/collaborator/" + id);
      const user = response.data;

      console.log(user.birthDate);
      const parts = user.birthDate.split("-");
      const date = new Date(parts[2], parts[1] - 1, parts[0]);
      const dateFormatted = format(date, "dd/MM/yyyy");
      user.birthDate = dateFormatted;

      setUser(user);
      reset({
        email: user.email,
        birthDate: user.birthDate,
        facebook: user.facebook,
        gitHub: user.gitHub,
        instagram: user.instagram,
        linkedin: user.linkedin,
        fullName: user.fullName,
        photo: undefined,
        socialName: user.socialName,
        telephone: user.telephone,
      });
    }

    fetchUserDetails();
  }, [id, reset]);

  async function editUserDetails(data: FormDataProps) {
    const register = toast.loading("Enviando dados");
    try {
      setIsLoading(true);
      const parsedDate = parse(data.birthDate, "dd/MM/yyyy", new Date());
      const formattedDate = format(parsedDate, "yyyy-MM-dd");
      const collaborator = {
        email: data.email,
        birthDate: formattedDate,
        facebook: data.facebook,
        gitHub: data.gitHub,
        fullName: data.fullName,
        instagram: data.instagram,
        linkedin: data.linkedin,
        socialName: data.socialName,
        telephone: data.telephone,
      };
      if (data.photo) {
        api.put(`/updateAvatar/${user.email}`, data.photo);
      }
      api.put(`/collaborators/collaborator/${user.id}`, collaborator);
      console.log(collaborator);
      toast.update(register, {
        render: "Cadastrado com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      reset();
    } catch (err) {
      console.log(err);
      toast.update(register, {
        render: `${err.response.data.field}: ${err.response.data.message}`,
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
        <Form onSubmit={handleSubmit(editUserDetails)}>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Informe o e-mail" }}
            render={({ field: { onChange, value } }) => (
              <AppInput
                disabled
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
            name="fullName"
            render={({ field: { onChange, value } }) => (
              <AppInput
                placeholder="João Silva"
                label="Nome"
                errorMessage={errors.fullName?.message}
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
            name="gitHub"
            render={({ field: { onChange, value } }) => (
              <AppInput
                placeholder="github.com/"
                label="Github"
                errorMessage={errors.gitHub?.message}
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
          <AppButton title="Editar" type="submit" disabled={isLoading} />
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
