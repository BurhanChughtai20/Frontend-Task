import type { ReactNode } from "react";
import { Navbar, Footer } from "../shared";

type Props = { children: ReactNode };

export default function MainLayout({ children }: Props) {
  return (
    <div className="max-w-7xl mx-auto relative">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}