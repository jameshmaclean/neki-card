import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme["gray-800"]};
  border-bottom: 1px solid ${(props) => props.theme["gray-700"]};
  box-shadow: 0px 0px 30px #0000001A;

    margin: 10px auto;
    display: flex;
  padding: 1rem;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5rem;
    width: 100%;
    border-radius: 5px;
  img{
    height: 90%;
  }
`
export const Header = styled.header`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  justify-content: center;
  color: ${(props) => props.theme["green-500"]};
  font-weight: 500;
  font-size: 2rem;
  gap: 30px;
  h1{
    user-select: none;
  }
`