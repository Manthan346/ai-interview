import type { NavbarContent } from "./navbar.types";

export const NAVBAR: NavbarContent = {
  links: [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },

    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "/contact" },
    { label: "Reviews", href: "#success-stories" },
  ],
  ctaLabel: "Get Started",
  ctaHref: "/signups",
};
