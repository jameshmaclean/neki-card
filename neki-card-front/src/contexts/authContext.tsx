import { ReactNode, createContext, useState } from "react";
import { api } from "../services/api";
import axios, { AxiosError } from "axios";

type UserDTO = {
  id: string;
  email: string;
  token: string;
};

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  async function signIn(username: string, password: string) {
    try {
      const response = await api.post("/auth/signin", { username, password });
      localStorage.setItem("@NekiCard-USERDATA", JSON.stringify(response.data));
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          throw new Error("Usuário ou senha inválidos");
        } else {
          throw new Error("Falha na autenticação");
        }
      } else {
        throw new Error("Não foi possível se autenticar");
      }
    }
  }

  async function signOut() {
    setUser({} as UserDTO);
    localStorage.removeItem("@NekiCard-USERDATA");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
