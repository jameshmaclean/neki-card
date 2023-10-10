import { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle`
   * {
    margin: 0;
    padding:  0;
    box-sizing: border-box;
   }

   :focus {
    outline: 1px solid ${(props) => props.theme['green-300']};
   }

   body {
      height: 100vh;
      -webkit-font-smoothing: antialiased;
      color:${props => props.theme['gray-200']};
      background-color: ${props => props.theme['gray-800']};
   }

   body, button, textarea, input {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
   }
`