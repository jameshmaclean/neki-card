import { InputHTMLAttributes } from "react";
import {
  Container,
  CustomFileInputLabel,
  Input,
  InputLabel,
  StyledFileInput,
} from "./styles";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string | null;
  label: string;
  placeholder: string;
};

export function AppInput({
  placeholder,
  errorMessage = null,
  label,
  type,
  ...rest
}: Props) {
  return (
    <Container>
      {type === "file" ? (
        <>
          <StyledFileInput type="file" {...rest} />
          <CustomFileInputLabel
            htmlFor={rest.id || rest.name}
            className={"Active"}
          >
            {label}
          </CustomFileInputLabel>
        </>
      ) : (
        <>
          <Input type={type} placeholder={placeholder} {...rest} />
          <InputLabel htmlFor={rest.id || rest.name} className={"Active"}>
            {label}
          </InputLabel>
        </>
      )}
      {errorMessage && <span>{errorMessage}</span>}
    </Container>
  );
}
