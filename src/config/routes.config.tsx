import { HomePage, DashboardPage } from "../shared";
import MainLayout from "../layout/mainLayout";
import DashboardLayout from "../layout/dashboardLayout";
import {
  BookOpen,
  LayoutGrid,
  Rocket,
  Settings,
  FileText,
  ChevronDown,
  Home,
  BarChart2,
  Users,
  ShieldCheck,
  Bell,
  CreditCard,
  type LucideIcon,
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

export interface SidebarNavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  badge?: string;
  badgeVariant?: "default" | "new" | "alert";
}

export interface SidebarGroup {
  groupLabel: string;
  items: SidebarNavItem[];
}

export const sidebarNav: SidebarGroup[] = [
  {
    groupLabel: "Overview",
    items: [
      { label: "Home",      path: routeMap.home,      icon: Home },
      { label: "Dashboard", path: routeMap.dashboard, icon: BarChart2, badge: "New", badgeVariant: "new" },
    ],
  },
  {
    groupLabel: "Manage",
    items: [
      { label: "Users",    path: routeMap.home, icon: Users },
      { label: "Billing",  path: routeMap.home, icon: CreditCard, badge: "3", badgeVariant: "alert" },
      { label: "Security", path: routeMap.home, icon: ShieldCheck },
    ],
  },
  {
    groupLabel: "System",
    items: [
      { label: "Notifications", path: routeMap.home, icon: Bell, badge: "5", badgeVariant: "default" },
      { label: "Settings",      path: routeMap.home, icon: Settings },
    ],
  },
];

export const navItems: NavItem[] = [
  {
    label: "Getting started",
    icon: BookOpen,
    dropdown: [
      { label: "Introduction", description: "What is Launch UI?",          href: routeMap.home, icon: Rocket    },
      { label: "Installation",  description: "How to install and set up",  href: routeMap.home, icon: Settings  },
      { label: "Quick start",   description: "Build your first component", href: routeMap.home, separator: true, icon: LayoutGrid },
      { label: "Changelog",     description: "What's new in v2.0",         href: routeMap.home, icon: FileText  },
    ],
  },
  {
    label: "Components",
    icon: LayoutGrid,
    dropdown: [
      { label: "Buttons",          href: routeMap.home, icon: Rocket     },
      { label: "Cards",            href: routeMap.home, icon: LayoutGrid },
      { label: "Navigation",       href: routeMap.home, icon: Settings   },
      { label: "Forms",            href: routeMap.home, separator: true, icon: FileText    },
      { label: "All Components →", href: routeMap.home, icon: ChevronDown },
    ],
  },
  {
    label: "Documentation",
    href: routeMap.home,
    icon: BookOpen,
  },
];