"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAVBAR } from "./navbar.data";
import { styles } from "./navbar.styles";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          href="#home"
          className={styles.logo}
          aria-label="Auxiliam AI home"
          onClick={closeMobileMenu}
        >
          <Image
            src="/logo/AuxiliamAI.png"
            alt=""
            width={36}
            height={36}
            priority
            className={styles.logoImage}
          />
          <span className="truncate">Auxiliam AI</span>
        </Link>

        <nav className={styles.links} aria-label="Primary">
          {NAVBAR.links.map((link) => (
            <a key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href={NAVBAR.ctaHref} className={styles.cta}>
            {NAVBAR.ctaLabel}
          </Link>
          <button
            type="button"
            className={styles.menuToggle}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            className={styles.mobileMenu}
            aria-label="Mobile primary"
          >
            {NAVBAR.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.mobileLink}
                onClick={closeMobileMenu}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
