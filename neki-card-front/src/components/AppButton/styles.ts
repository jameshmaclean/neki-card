import styled, { css } from "styled-components";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger",
  disabled?: boolean,
}

export const Container = styled.div`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
 

`

export const Button = styled.button<ButtonProps>`
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  height: 2.5rem;
  font-size: 1.2rem;
  border: ${(props) => {
    switch (props.variant) {
      case "primary":
        return `none`;
      case "secondary":
        return `2px solid ${props.theme["green-700"]}`;
      case "danger":
        return "none"
    }
  }};
  &:hover {
    opacity: 0.9;
  }
  &:focus {
    outline: none;
  }
  &:active {
    opacity: 0.5;
  }
  
${(props) =>
    props.variant === "primary" &&
    props.disabled &&
    css`
      background-color: ${(props) => props.theme["gray-400"]};
      color: ${(props) => props.theme["gray-200"]};
      cursor: not-allowed;
    `};
  
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `};

  background-color: ${(props) => {
    switch (props.variant) {
      case "primary":
        return props.theme["green-500"];
      case "secondary":
        return "transparent";
      case "danger":
        return props.theme["red-500"];
      default:
        return props.theme["green-700"];
    }
  }};

  color: ${(props) => {
    switch (props.variant) {
      case "primary":
        return props.theme["white"];
      case "secondary":
        return props.theme["green-500"];
      case "danger":
        return props.theme["white"];
      default:
        return props.theme["white"];
    }
  }};
`;

