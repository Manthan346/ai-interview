export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarContent {
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
}
