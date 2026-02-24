import { lazy } from "react";
export const HomePage = lazy(() => import("../pages/Home"));
export const DashboardPage = lazy(() => import("../pages/Dashboard"));

export { default as DashboardLayout } from "../layout/DashboardLayout";
export { default as MainLayout } from "../layout/MainLayout";

export const DashboardHeader = lazy(() => import("../components/dashboard/DashboardHeader"));
export const DataChart = lazy(() => import("../components/dashboard/DataChart"));
export const tablePage = lazy(() => import("../components/dashboard/table/Page"));

export { default as Navbar } from "../components/Navbar";
export { default as HeroSection } from "../components/homepage/Hero";
export { default as Footer } from "../components/Footer";
export { default as FeaturedCard } from "../components/homepage/FeatureCard";