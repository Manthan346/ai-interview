import { Logo } from "../shared/Logo";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "../shared/icons";
import { FOOTER } from "./footer.data";
import { styles } from "./footer.styles";

const SOCIAL_ICONS = {
  twitter: TwitterIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
} as const;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Logo />
        <p className={styles.copy}>
          © {new Date().getFullYear()} {FOOTER.legal}
        </p>
        <div className={styles.socials}>
          {FOOTER.socials.map(({ id, label, href }) => {
            const Icon = SOCIAL_ICONS[id];
            return (
              <a key={id} href={href} className={styles.social} aria-label={label} target="_blank" rel="noreferrer">
                <Icon className={styles.socialIcon} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
