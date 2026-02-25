
export type FooterLink = {
  label: string
  href: string
  icon?: React.ElementType
}

export type FooterSection = {
  title: string
  links: FooterLink[]
}