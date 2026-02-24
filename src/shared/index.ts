import { lazy } from "react"
import NavbarComponent from "../components/Navbar"

export const HomePage = lazy(() => import("../pages/Home"))
export const DashboardPage = lazy(() => import("../pages/Dashboard"))

export default NavbarComponent;
export const Footer = lazy(() => import("../components/Footer"))