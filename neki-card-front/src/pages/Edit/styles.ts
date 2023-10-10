import styled from "styled-components";



export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
  width: 80%;
  min-width: 500px;
  background-color: ${(props) => props.theme["gray-700"]};
  border-radius: 5px;
    & h1{
    font-weight: 900;
    color: ${(props) => props.theme["green-700"]};
  }
`
export const Form = styled.form`
  width: 75%;
  min-width: 75%;
`


export const InputContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 100%;
  gap: 0.5rem;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  & h1{
    color: ${(props) => props.theme["green-300"]};
    font-family: "Roboto";
  }
`