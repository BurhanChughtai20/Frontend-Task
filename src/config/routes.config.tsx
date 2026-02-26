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
import type { NavItem } from "../types/navbar.types";
import type { RouteMeta } from "../types/route.type";

export const routes = [
  {
    id: "home",
    name: "Home",
    path: "/",
    element: <HomePage />,
    layout: MainLayout,
    showInMenu: true,
  },
  {
    id: "dashboard",
    name: "Dashboard",
    path: "/dashboard",
    element: <DashboardPage />,
    layout: DashboardLayout,
    showInMenu: true,
  },
] as const satisfies readonly RouteMeta[];

export const navigationRoutes = routes
  .filter((route) => route.showInMenu)
  .map(({ name, path }) => ({ name, path }));

export const routeMap = Object.fromEntries(
  routes.map((route) => [route.id, route.path])
) as Record<(typeof routes)[number]["id"], string>;

export const navItems: NavItem[] = [
  {
    label: "Getting started",
    icon: BookOpen,
    dropdown: [
      {
        label: "Introduction",
        description: "What is Launch UI?",
        href: routeMap.home,
        icon: Rocket,
      },
      {
        label: "Installation",
        description: "How to install and set up",
        href: routeMap.home,
        icon: Settings,
      },
      {
        label: "Quick start",
        description: "Build your first component",
        href: routeMap.home,
        separator: true,
        icon: LayoutGrid,
      },
      {
        label: "Changelog",
        description: "What's new in v2.0",
        href: routeMap.home,
        icon: FileText,
      },
    ],
  },
  {
    label: "Components",
    icon: LayoutGrid,
    dropdown: [
      { label: "Buttons", href: routeMap.home, icon: Rocket },
      { label: "Cards", href: routeMap.home, icon: LayoutGrid },
      { label: "Navigation", href: routeMap.home, icon: Settings },
      { label: "Forms", href: routeMap.home, separator: true, icon: FileText },
      { label: "All Components →", href: routeMap.home, icon: ChevronDown },
    ],
  },
  {
    label: "Documentation",
    href: routeMap.home,
    icon: BookOpen,
  },
];