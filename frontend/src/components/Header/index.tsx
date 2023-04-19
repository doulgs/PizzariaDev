import { useContext } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import logoImg from "../../../public/logo.svg";
import { AuthContext } from "../../context/AuthContext";

export function Header() {
  const { signOut } = useContext(AuthContext);
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image
            className={styles.img}
            src={logoImg}
            alt="logo"
            width={190}
            height={60}
          />
        </Link>

        <nav className={styles.menuNav}>
          <Link legacyBehavior href="/category">
            <a>Nova Categoria</a>
          </Link>

          <Link legacyBehavior href="/product">
            <a>Novo Produto</a>
          </Link>

          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
