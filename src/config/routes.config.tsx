import { HomePage, DashboardPage } from "../shared";
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";
import {
  BookOpen,
  LayoutGrid,
  Rocket,
  Settings,
  FileText,
  ChevronDown,
} from "lucide-react";
import type { ReactElement, ComponentType } from "react";
import type { NavItem } from "../types/navbar.types";

export type RouteMeta = {
  name: string;
  path: `/${string}` | "/";
  element: ReactElement;
  layout?: ComponentType<{ children: ReactElement }>;
  showInMenu?: boolean;
};

export const routes: readonly RouteMeta[] = [
  {
    name: "Home",
    path: "/",
    element: <HomePage />,
    layout: MainLayout,
    showInMenu: true,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    element: <DashboardPage />,
    layout: DashboardLayout,
    showInMenu: true,
  },
] as const;

export const navigationRoutes = routes
  .filter((route) => route.showInMenu)
  .map(({ name, path }) => ({ name, path }));

export const navItems: NavItem[] = [
  {
    label: "Getting started",
    icon: BookOpen,
    dropdown: [
      {
        label: "Introduction",
        description: "What is Launch UI?",
        href: "/",
        icon: Rocket,
      },
      {
        label: "Installation",
        description: "How to install and set up",
        href: "/",
        icon: Settings,
      },
      {
        label: "Quick start",
        description: "Build your first component",
        href: "/",
        separator: true,
        icon: LayoutGrid,
      },
      {
        label: "Changelog",
        description: "What's new in v2.0",
        href: "/",
        icon: FileText,
      },
    ],
  },
  {
    label: "Components",
    icon: LayoutGrid,
    dropdown: [
      { label: "Buttons", href: "/", icon: Rocket },
      { label: "Cards", href: "/", icon: LayoutGrid },
      { label: "Navigation", href: "/", icon: Settings },
      { label: "Forms", href: "/", separator: true, icon: FileText },
      { label: "All Components →", href: "/", icon: ChevronDown },
    ],
  },
  {
    label: "Documentation",
    href: "/",
    icon: BookOpen,
  },
];