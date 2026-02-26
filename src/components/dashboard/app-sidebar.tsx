import { useNavigate, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
} from "../ui/sidebar"
import { sidebarNav, type SidebarNavItem } from "../../config/routes.config"
import BrandLogo from "../brandLogo"

const badgeStyles: Record<NonNullable<SidebarNavItem["badgeVariant"]>, string> = {
  default: "bg-muted text-muted-foreground",
  new:     "bg-blue-500/15 text-blue-500",
  alert:   "bg-red-500/15 text-red-500",
}

export function AppSidebar() {
  const navigate  = useNavigate()
  const { pathname } = useLocation()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 text-lg font-semibold overflow-hidden">
        <BrandLogo />
      </SidebarHeader>

      <SidebarContent>
        {sidebarNav.map(({ groupLabel, items }) => (
          <SidebarGroup key={groupLabel}>
            <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {items.map(({ label, path, icon: Icon, badge, badgeVariant = "default" }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      isActive={pathname === path}
                      onClick={() => navigate(path)}
                      tooltip={label}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{label}</span>

                      {badge && (
                        <SidebarMenuBadge
                          className={badgeStyles[badgeVariant]}
                        >
                          {badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 text-sm text-muted-foreground">
        © 2026
      </SidebarFooter>
    </Sidebar>
  )
}