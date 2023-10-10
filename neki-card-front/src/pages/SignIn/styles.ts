import styled from "styled-components"

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  width: 50%;
  min-width: 500px;
  height: 80vh;
  background-color: ${(props) => props.theme["gray-700"]};
  border-radius: 5px;
`

export const InputContainer = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  max-width: 100%;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & h1{
    color: ${(props) => props.theme["green-500"]};
    font-family: "Roboto";
    margin-bottom: 2rem;
  }
`
export const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

`
export const Form = styled.form`
  width: 100%;
`


