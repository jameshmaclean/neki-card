import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
    &:focus-within label{
      transform: translate(0, 9px) scale(0.8);
  }
  & .Active{
    transform: translate(0, 9px) scale(0.8);
  }
  
  & span{
    font-size: 10px;
    position: absolute;
    top: 15px;
    color: ${(props) => props.theme["red-500"]};
    align-self: flex-end;
    margin-right: 10px;
  }

`
export const InputLabel = styled.label`
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 0 8px;
  color: ${(props) => props.theme["gray-200"]};
  pointer-events: none;
  position: absolute;
  bottom: 30px;
  transform: translate(0, 20px) scale(1.2);
  transform-origin: top left;
  transition: all 0.2s ease-out;
`

export const Input = styled.input`
  width: 100%;
  height: 40px; 

  color: ${(props) => props.theme["white"]};

  outline: 0;
  padding: 0 6px;
  padding-top: 10px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme["green-500"]};
  border-radius: 4px;
  background: ${(props) => props.theme["gray-700"]};
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;

  &::placeholder{
    font-size: 12px;
  }
   &:focus {
    outline: none;
      border-bottom: 2px solid ${(props) => props.theme["green-500"]};

  }
  &::-webkit-calendar-picker-indicator {
    background-color: ${(props) => props.theme["green-500"]}; 

  }

  &::-webkit-inner-spin-button {
    background-color: green;
  }
`
export const CustomFileInputLabel = styled.label`
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 0 8px;
  color: ${(props) => props.theme["gray-200"]};
  pointer-events: none;
  position: absolute;
  bottom: 40px;
  transform: translate(0, 20px) scale(1.2);
  transform-origin: top left;
  transition: all 0.2s ease-out;
`;

export const StyledFileInput = styled.input`
  width: 100%;
  height: 40px;

  color: ${(props) => props.theme["white"]};

  outline: 0;
  padding: 0 6px;
  padding-top: 10px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme["green-500"]};
  border-radius: 4px;
  background: ${(props) => props.theme["gray-700"]};
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
`;
