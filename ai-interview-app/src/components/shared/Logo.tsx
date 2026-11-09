import { SparklesIcon } from "./icons";
import { sharedStyles as s } from "./shared.styles";

export function Logo({ href = "#" }: { href?: string }) {
  return (
    <a href={href} className={s.logo} aria-label="AceAI home">
      <span className={s.logoMark}>
        <SparklesIcon className={s.logoIcon} />
      </span>
      <span className={s.logoText}>AceAI</span>
    </a>
  );
}
