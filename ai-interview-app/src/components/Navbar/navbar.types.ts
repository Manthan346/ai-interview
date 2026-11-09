export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarContent {
  links: NavLink[];
  loginLabel: string;
  loginHref: string;
  ctaLabel: string;
  ctaHref: string;
}
