import { lazy } from "react";
export const HomePage = lazy(() => import("../pages/Home"));
export const DashboardPage = lazy(() => import("../pages/Dashboard"));

export { default as DashboardLayout } from "../layout/dashboardLayout";
export { default as MainLayout } from "../layout/mainLayout";

export const DashboardHeader = lazy(
  () => import("../components/dashboard/dashboardHeader"),
);
export const DataChart = lazy(
  () => import("../components/dashboard/dataChart"),
);
export const tablePage = lazy(
  () => import("../components/dashboard/table/page"),
);

export const TestimonialsSection = lazy(
  () => import("../components/homepage/testimonialCard"),
);

export { default as Navbar } from "../components/navbar/Navbar";
export { default as HeroSection } from "../components/homepage/hero";
export { default as Footer } from "../components/footer";
export { default as FeaturedCard } from "../components/homepage/featureCard";
