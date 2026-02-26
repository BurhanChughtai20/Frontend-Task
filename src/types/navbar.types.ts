import type { ComponentType } from "react";

export interface DropdownItem {
  label: string;
  href: string;
  description?: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  separator?: boolean;
}

export interface NavItem {
  label: string;
  href?: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  dropdown?: DropdownItem[];
}

export interface NavTw {
  nav: string;
  inner: string;
  desktopNav: string;
  mobileMenuBtn: string;
  authGroup: string;
  signInBtn: string;
  getStartedBtn: string;
  mobilePanel: string;
  mobileNavItem: string;
  mobileDivider: string;
  mobileAuthGroup: string;
  mobileSignIn: string;
  mobileGetStarted: string;
  navItemBase: string;
}

export interface DesktopNavItemProps {
  item: NavItem;
  tw: NavTw;
}

export interface MobileSectionProps {
  item: NavItem;
  tw: NavTw;
  onClose: () => void;
}