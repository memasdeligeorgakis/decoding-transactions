import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Namada Explorer</title>
        <meta name="description" content="Namada Ceremony" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Namada</h1>

        <Link href="/trusted-setup">Trusted Setup</Link>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
