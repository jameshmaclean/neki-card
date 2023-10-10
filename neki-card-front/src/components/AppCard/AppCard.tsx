import { useContext } from "react";
import {
  Container,
  Header,
  Title,
  Text,
  InfoItem,
  Avatar,
  Detail,
  IconContainer,
} from "./styles";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineNumber,
} from "react-icons/ai";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { AppCardProps } from "./AppCard";

export function AppCard({ user, handleDelete }: AppCardProps) {
  const authenticatedUser = useContext(AuthContext);
  const navigate = useNavigate();
  const avatarUrl =
    user && user.photo
      ? `http://localhost:8080/api/collaborators/avatar/${user.photo}`
      : "";

  function handleEditCollaborator(id: string) {
    navigate(`/edit/${id}`);
  }

  async function handleDeleteCollaborator(id: string) {
    if (handleDelete) {
      await handleDelete(id);
    }
  }

  return (
    <>
      <Container>
        <Header>
          <Avatar src={avatarUrl} />
          {authenticatedUser.user.id && (
            <IconContainer>
              <AiFillEdit
                size={24}
                onClick={() => handleEditCollaborator(user.id)}
              />
              <AiFillDelete
                size={24}
                onClick={() => handleDeleteCollaborator(user.id)}
              />
            </IconContainer>
          )}
          <Text>{user.fullName}</Text>
          <Detail>Nome social: {user.socialName}</Detail>
        </Header>
        <InfoItem>
          <Title>
            Informações pessoais
            <Detail>
              <AiOutlineNumber size={24} />
              ID Funcionário: {user.id}
            </Detail>
            <Detail>
              <AiOutlineMail size={24} />
              {user.email}
            </Detail>
            <Detail>
              <LiaBirthdayCakeSolid size={24} />
              {user.birthDate}
            </Detail>
            <Detail>
              <BsFillTelephoneFill size={24} />
              {user.telephone}
            </Detail>
          </Title>
          <Title>
            Redes Sociais
            <Detail>
              <AiFillLinkedin size={24} /> {user.linkedin}
            </Detail>
            <Detail>
              <AiFillGithub size={24} />
              {user.gitHub}
            </Detail>
            <Detail>
              <AiOutlineInstagram size={24} />
              {user.instagram}
            </Detail>
            <Detail>
              <AiOutlineFacebook size={24} />
              {user.facebook}
            </Detail>
          </Title>
        </InfoItem>
      </Container>
    </>
  );
}
