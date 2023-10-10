import { Container, Header } from "./styles";
import logo from "../../assets/logo.png";
export function AppHeader() {
  return (
    <Container>
      <Header>
        <img src={logo} alt="Logo neki" />
        <h1>NekiCard</h1>
      </Header>
    </Container>
  );
}
