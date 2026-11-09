import { Logo } from "../shared/Logo";
import { NAVBAR } from "./navbar.data";
import { styles } from "./navbar.styles";

export function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo />

        <nav className={styles.links} aria-label="Primary">
          {NAVBAR.links.map((link) => (
            <a key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href={NAVBAR.loginHref} className={styles.login}>
            {NAVBAR.loginLabel}
          </a>
          <a href={NAVBAR.ctaHref} className={styles.cta}>
            {NAVBAR.ctaLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
