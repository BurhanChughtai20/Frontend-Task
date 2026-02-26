import type { ReactNode } from "react"  
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "../components/dashboard/app-sidebar"

type Props = { children: ReactNode }

export default function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}