import { BookOpen, LayoutGrid, Rocket, Settings, FileText, ChevronDown } from "lucide-react";
import type { NavItem } from "../../types/navbar.types";
import type { BrandInfo } from "../../types/footer";

export const BRAND_DATA: BrandInfo[] = [
  {
    logoBars: [
      { barClass: "w-1.5 h-5 rounded-full bg-orange-500" },
      { barClass: "w-1.5 h-3.5 rounded-full bg-orange-400" },
      { barClass: "w-1.5 h-2 rounded-full bg-orange-300" },
    ],
    logoText: "SiteLogo",
  },
];

export const navItems: NavItem[] = [
  {
    label: "Getting started",
    icon: BookOpen,
    dropdown: [
      { label: "Introduction", description: "What is Launch UI?", href: "#", icon: Rocket },
      { label: "Installation", description: "How to install and set up", href: "#", icon: Settings },
      { label: "Quick start", description: "Build your first component", href: "#", separator: true, icon: LayoutGrid },
      { label: "Changelog", description: "What's new in v2.0", href: "#", icon: FileText },
    ],
  },
  {
    label: "Components",
    icon: LayoutGrid,
    dropdown: [
      { label: "Buttons", href: "#", icon: Rocket },
      { label: "Cards", href: "#", icon: LayoutGrid },
      { label: "Navigation", href: "#", icon: Settings },
      { label: "Forms", href: "#", separator: true, icon: FileText },
      { label: "All Components →", href: "#", icon: ChevronDown },
    ],
  },
  {
    label: "Documentation",
    href: "#",
    icon: BookOpen,
  },
];