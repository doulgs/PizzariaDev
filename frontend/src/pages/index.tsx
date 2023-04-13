import Head from "next/head";
import styles from "../styles/home.module.scss";
import logoImg from "../../public/logo.svg";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>DevPizza - Faça seu Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo" />

        <div className={styles.login}>
          <form>
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
