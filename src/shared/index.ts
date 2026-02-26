import { lazy } from "react";
export const HomePage = lazy(() => import("../pages/home"));
export const DashboardPage = lazy(() => import("../pages/dashboard"));

export { default as DashboardLayout } from "../layout/dashboardLayout";
export { default as MainLayout } from "../layout/mainLayout";

export const DashboardHeader = lazy(
  () => import("../components/dashboard/dashboar-header"),
);
export const DataChart = lazy(
  () => import("../components/dashboard/data-chart"),
);
export const tablePage = lazy(
  () => import("../components/dashboard/table/page"),
);

export const TestimonialsSection = lazy(
  () => import("../components/homepage/testimonial-card"),
);

export { default as Navbar } from "../components/navbar/navbar";
export { default as HeroSection } from "../components/homepage/hero";
export { default as Footer } from "../components/footer";
export { default as FeaturedCard } from "../components/homepage/feature-card";
