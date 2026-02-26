

export interface LogoBar {
  barClass: string;
}

export interface BrandInfo {
  logoBars: LogoBar[];
  logoText?: string;
  tagline?: string;
  description?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  id: number;
  heading: string;
  links: FooterLink[];
}

export interface SocialItem {
  id: number;
  icon: React.ReactNode;
  label: string;
  href: string;
}

export interface FooterBottom {
  copyright: string;
}