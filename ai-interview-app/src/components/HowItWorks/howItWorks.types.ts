export interface Step {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Optional floating pill on the card (e.g. "Interview configured"). */
  badge?: string;
}

export interface SectionCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface CtaCopy {
  title: string;
  subtitle: string;
  primaryLabel: string;
  secondaryLabel: string;
}
