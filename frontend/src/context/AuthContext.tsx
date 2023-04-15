import { createContext, ReactNode, useState } from "react";

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (creadentials: SignInProps) => Promise<void>;
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

type AuthProvaiderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProvaiderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    console.log(email);
    console.log(password);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
