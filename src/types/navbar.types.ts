import type { LucideIcon } from "lucide-react"

export interface NavDropdownItem {
  label: string
  description?: string
  href: string
  separator?: boolean
  icon?: LucideIcon
}

export interface NavItem {
  label: string
  href?: string
  dropdown?: NavDropdownItem[]
  icon?: LucideIcon
}

export interface DesktopNavItemProps {
  item: NavItem
}

export interface MobileSectionProps {
  item: NavItem
}