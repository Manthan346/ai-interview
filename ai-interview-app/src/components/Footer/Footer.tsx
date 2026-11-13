import Image from "next/image";
import Link from "next/link";
import SplitText from "@/components/ui/SplitText";
import { FOOTER } from "./footer.data";
import { styles } from "./footer.styles";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <nav className={styles.links} aria-label="Footer">
            <a href="#how-it-works" className={styles.link}>
              How It Works
            </a>
            <a href="#features" className={styles.link}>
              Features
            </a>
            <Link href="/privacy" className={styles.link}>
              Privacy
            </Link>
            <Link href="/terms" className={styles.link}>
              Terms
            </Link>
          </nav>
        </div>

        <div className={styles.brand}>
          <Image
            src="/logo/AuxiliamAI.png"
            alt=""
            width={96}
            height={96}
            className={styles.logo}
          />
          <SplitText
            text="Auxiliam AI"
            className={styles.name}
            tag="span"
            effect="rise"
            splitType="chars"
            trigger="view"
            staggerFrom="center"
            hoverEffect="lift"
          />
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {FOOTER.legal}
          </p>
          <div className="flex items-center gap-4">
            <a className={styles.email} href={`mailto:${FOOTER.email}`}>
              {FOOTER.email}
            </a>
            <a
              href={FOOTER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="rounded-sm transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Image
                src="/logo/linkedin.jpg"
                alt=""
                width={24}
                height={24}
                className="size-5 object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
