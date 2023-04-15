import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/home.module.scss";
import logoImg from "../../../public/logo.svg";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import Link from "next/link";

export default function SignUp() {
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

          <form>
            <Input placeholder="Digite seu Nome" type="text" />

            <Input placeholder="Digite seu Email" type="text" />

            <Input placeholder="Digite sua Senha" type="password" />

            <Button type="submit" loading={false}>
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
