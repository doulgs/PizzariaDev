import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import Router from "next/router";
import { api } from "../services/apiClient";
import { toast } from "react-toastify";

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (creadentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (creadentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};
type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProvaiderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    Router.push("/");
  } catch {
    console.log("Error ao deslogar");
  }
}

export function AuthProvider({ children }: AuthProvaiderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();
    if (token) {
      api.get("/me").then(response);
    }
  }, []);

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      //console.log(response.data);
      const { id, name, token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({
        id,
        name,
        email,
      });

      //passar o token para as proximas req
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      // redirecionar o user

      toast.success("Acesso consedido com sucesso");

      Router.push("/deshboard");
    } catch (err) {
      toast.error("Acesso negado");
      console.log("Erro ao acessar", err);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/users", { name, email, password });
      toast.success("Conta criada com sucesso");
      Router.push("/");
    } catch (err) {
      toast.error("Erro ao realizar o cadastro!");
      console.log("Erro ao cadastrar", err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
