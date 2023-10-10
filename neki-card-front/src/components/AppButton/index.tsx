import { Button, Container } from "./styles";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  title: string;
  type?: "submit" | "button" | "reset" | undefined;
};

export function AppButton({
  variant = "primary",
  title,
  type = "submit",
  ...rest
}: Props) {
  return (
    <Container>
      <Button variant={variant} type={type} {...rest}>
        {title}
      </Button>
    </Container>
  );
}
