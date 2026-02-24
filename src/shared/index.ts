import { lazy } from "react";

export const HomePage = lazy(() => import("../pages/Home"));
export const DashboardPage = lazy(() => import("../pages/Dashboard"));

export { default as Navbar } from "../components/Navbar";
export const Footer = lazy(() => import("../components/Footer"));

export { default as HeroSection } from "../components/homepage/Hero";
export const FeaturedCard = lazy(() => import("../components/homepage/FeatureCard"));