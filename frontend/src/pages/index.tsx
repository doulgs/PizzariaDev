import Head from "next/head";
import styles from "../styles/home.module.scss";
import logoImg from "../../public/logo.svg";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Head>
        <title>DevPizza - Faca sue Login</title>
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
          <a className={styles.text}>Nao possui uma conta? Cadastrar-se!</a>
        </div>
      </div>
    </>
  );
}
