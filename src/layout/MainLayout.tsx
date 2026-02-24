import type { ReactNode } from "react"
import NavbarComponent, { Footer } from "../shared/index"

type Props = { children: ReactNode }

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <NavbarComponent />
      <main>{children}</main>
      <Footer />
    </div>
  )
}