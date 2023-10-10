import styled from "styled-components";
import header from "../../assets/header.svg"

export const Container = styled.div`
background-color: ${(props) => props.theme["gray-600"]};
display: flex;
width: 80%;
flex-direction: row;
padding: 0 10px;
padding-left: 0;
	border-radius: 14px;
`;

export const InfoContainer = styled.div`
  	display: flex;
	border-top: solid rgb(206, 206, 206) 1px;
	text-align: center;
`

export const Header = styled.header`
  background-image: url(${header});
  padding: 1rem;
	background-repeat: no-repeat;
	background-size: cover;
	text-align: center;
  width: 40%;
  display: flex;
  flex-direction: column;
	border-top-left-radius: 14px;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  position: relative;

  & span{
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const Avatar = styled.img`
	width: 250px;
  height: 250px;
  margin-bottom: 10px;
	border: solid ${(props) => props.theme["green-300"]} 4px;
	border-radius: 50%;

`

export const Title = styled.div`
  font-weight: bold;
	font-size: 2rem;
	text-align: center;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  flex-direction: column;
  background-color: ${(props) => props.theme["gray-700"]};

`
export const Text = styled.h1`
font-weight: bold;
font-family: "Roboto", sans-serif;
	font-size: 2.2rem;
	text-align: center;
  display: flex;
  flex-direction: column;
	padding-bottom: 10px;
`

export const FooterText = styled.h2`
  font-weight: normal;
	font-size: 1rem;
	text-align: center;
	letter-spacing: 1px;
	padding-bottom: 20px;
	line-height: 5px;
`
export const InfoItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 1rem;
  padding-bottom: 1rem;
  gap: 10px;
  justify-content: center;
`

export const Footer = styled.footer`
width: 100%;
  display: flex;
  flex-direction: column;
	border-top: solid ${(props) => props.theme["gray-600"]} 1px;
	text-align: center;
`

export const Detail = styled.span`
  font-size: 1rem;
  display: flex;
  width: 100%;
  justify-content: left;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`

export const IconContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 1rem;
`