import { HomePage, DashboardPage } from "../shared"
import MainLayout from "../layout/MainLayout"
import DashboardLayout from "../layout/DashboardLayout"
import type { ReactElement, ComponentType } from "react"

export type RouteMeta = {
  name: string
  path: `/${string}` | "/"
  element: ReactElement
  layout?: ComponentType<{ children: ReactElement }>
  showInMenu?: boolean
}

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
] as const

export const navigationRoutes = routes
  .filter((route) => route.showInMenu)
  .map(({ name, path }) => ({ name, path }))