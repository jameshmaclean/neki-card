import styled from "styled-components";

export const Container = styled.div`
    margin: 10px auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5rem;
    width: 100%;
    min-width: 500px;
    border-radius: 5px;
`
export const NavBar = styled.ul`
  display: flex;
  padding: 10px;
  flex-direction: row;
  width: 100%;
  list-style: none;
  justify-content: center;
  gap: 2rem;
  color: ${(props) => props.theme["green-500"]};
  font-weight: 900;
  font-size: 0.5rem;

  & li{
    cursor: pointer;
    :hover{
      opacity: 0.8;
    }
  }
`

export const ContentContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme["gray-800"]};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  gap: 1rem;
  margin: 0 auto;
  padding: 10px;
`