import Head from 'next/head'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bem Vindo</title>
      </Head>
      <main className={styles.main}>
        <div>Olá Mundo, seja bem vindo Douglas</div>
      </main>
    </>
  )
}
