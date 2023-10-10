import { useContext, useEffect, useState } from "react";
import { AppCard } from "../../components/AppCard/AppCard";
import { AppHeader } from "../../components/AppHeader";
import { AuthContext } from "../../contexts/authContext";
import { Container, ContentContainer, NavBar } from "./styles";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export type userDTO = {
  birthDate: string;
  facebook: string;
  fullName: string;
  id: string;
  email: string;
  gitHub: string;
  instagram: string;
  linkedin: string;
  photo: string;
  socialName: string;
  telephone: string;
};

export function Home() {
  const [users, setUsers] = useState<Array<userDTO>>([]);
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleCollaboratorRegister() {
    navigate("/newCollaborator");
  }
  async function fetchUsers() {
    const userData = localStorage.getItem("@NekiCard-USERDATA");
    if (userData) {
      const data = JSON.parse(userData);
      api.defaults.headers.common.Authorization = data.accessToken
        ? `Bearer ${data.accessToken}`
        : "";
      const response = await api.get("/collaborators");
      setUsers(response.data);
      console.log(response.data);
    }
  }
  async function handleDelete(id: string) {
    const newList = users.filter((user) => user.id != id);
    await api.delete("/collaborators/collaborator/" + id);
    setUsers(newList);
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <AppHeader />
      <Container>
        <NavBar>
          <li onClick={handleCollaboratorRegister}>
            Cadastrar novo colaborador
          </li>
          <li onClick={signOut}>Sair</li>
        </NavBar>
      </Container>
      <ContentContainer>
        {users.map((user) => {
          return (
            <AppCard user={user} key={user.id} handleDelete={handleDelete} />
          );
        })}
      </ContentContainer>
    </>
  );
}
