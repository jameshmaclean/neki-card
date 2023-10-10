import { GlobalStyle } from "./styles/Global";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { AppRoutes } from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthContextProvider>
        <BrowserRouter>
          <AppRoutes />
          <GlobalStyle />
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
