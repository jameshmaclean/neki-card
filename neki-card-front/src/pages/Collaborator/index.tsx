import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppCard } from "../../components/AppCard/AppCard";
import { api } from "../../services/api";
import { userDTO } from "../Home/Home";
import { Container } from "./styles";

export function Collaborator() {
  const [user, setUser] = useState<userDTO>({});
  const { id } = useParams();

  async function fetchUserDetails() {
    const data = await api.get("/collaborators/collaborator/" + id);
    console.log(data);
    setUser(data.data);
  }
  useEffect(() => {
    fetchUserDetails();
    console.log(user);
  }, []);
  return (
    <Container>
      {user.id ? <AppCard user={user} /> : <h1>Não encontrado</h1>}
    </Container>
  );
}
