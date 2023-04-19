import { FormEvent, useState } from "react";
import Head from "next/head";
import styles from "./styles.module.scss";
import { Header } from "../../components/Header";
import { toast } from "react-toastify";

import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Category() {
  const [name, setName] = useState("");

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === "") {
      return toast.warn("Preencha o campo");
    }

    const apiClient = setupAPIClient();
    await apiClient.post("/category", {
      name: name,
    });

    toast.success("Categoria cadastrada com sucesso!");
    setName("");
  }

  return (
    <>
      <Head>
        <title>Category - DevPizza</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <h1>Cadastrar Categorias</h1>

        <form className={styles.form} onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Digite o nome da categoria "
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className={styles.buttonAdd} type="submit">
            Cadastrar
          </button>
        </form>
      </main>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
