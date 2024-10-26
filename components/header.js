import HeaderStyles from "../styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className={HeaderStyles.headerContainer}>
      <Link href="/" class={HeaderStyles.logoLink}>
        <Image
          src="/images/Logo.svg"
          alt="Text Lab"
          className={HeaderStyles.logo}
          width="80"
          height="80"
          loading="eager"
        />
      </Link>

      <nav className={HeaderStyles.nav}>
        <ul className={HeaderStyles.navList}>
          <li className={HeaderStyles.navItem}>
            <Link href="/articles" className={HeaderStyles.navLink}>
              Articles
            </Link>
          </li>
          <li className={HeaderStyles.navItem}>
            <Link href="/about" className={HeaderStyles.navLink}>
              About
            </Link>
          </li>
        </ul>
      </nav>

      <a
        href="https://www.linkedin.com/in/mandykerr"
        target="_blank"
        className={HeaderStyles.contactLink}
      >
        Contact
      </a>
    </header>
  );
}
