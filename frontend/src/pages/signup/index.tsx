import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/home.module.scss";
import logoImg from "../../../public/logo.svg";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import { AuthContext } from "../../context/AuthContext";

import Link from "next/link";

import { toast } from "react-toastify";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();
    if (name === "" || email === "" || password === "") {
      return toast.warning("Preencha todos os campos");
    }
    setLoading(true);

    let data = {
      name,
      email,
      password,
    };

    signUp(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Faça seu Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="logo"
          style={{ width: "80%", height: "100%" }}
        />

        <div className={styles.login}>
          <h1>Criando sua Conta</h1>

          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Digite seu Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Digite sua Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>

          <Link legacyBehavior href="/">
            <a className={styles.text}>já possui uma conta? Faça Login!</a>
          </Link>
        </div>
      </div>
    </>
  );
}
