import { FormEvent, useContext } from "react";
import Head from "next/head";
import styles from "../styles/home.module.scss";
import logoImg from "../../public/logo.svg";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import Link from "next/link";

import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    let data = {
      email: "teste@teste.com",
      password: "123123",
    };

    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>DevPizza - Faça seu Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder="Digite seu Email" type="text" />

            <Input placeholder="Digite sua Senha" type="password" />

            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>

          <Link legacyBehavior href="/signup">
            <a className={styles.text}>Nao possui uma conta? Cadastrar-se!</a>
          </Link>
        </div>
      </div>
    </>
  );
}
