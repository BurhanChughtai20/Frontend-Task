import type { ReactNode } from "react";
import { Navbar, Footer } from "../shared";

type Props = { children: ReactNode };

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}