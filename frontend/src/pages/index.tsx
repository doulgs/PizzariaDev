import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import styles from "../styles/home.module.scss";
import logoImg from "../../public/logo.svg";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";
import { canSSRGuest } from "@/utils/canSSRGuest";
export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === "" || password === "") {
      return toast.warning("Prencha todos os campos");
    }

    setLoading(true);

    let data = {
      email,
      password,
    };

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>DevPizza - Faça seu Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="logo"
          className={styles.img}
          // style={{ width: "80%", height: "100%" }}
        />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
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

//Verifica se esta logado e faz o redireccion
export const getServerSideProps = canSSRGuest(async (ctx) => {
  return { props: {} };
});
