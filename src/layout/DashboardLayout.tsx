import type { ReactNode } from "react"
// import Sidebar from "../components/dashboard/Sidebar"

type Props = { children: ReactNode }

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <main className="flex-1">{children}</main>
    </div>
  )
}