import { type ElementType, type ComponentPropsWithoutRef, Fragment } from "react"
import type { TextData } from "../types/dynamicText"

type DynamicContentData =
  | string
  | TextData
  | Array<string | TextData>
  | undefined
  | null

interface DynamicContentProps<T extends ElementType> {
  as?: T
  data?: DynamicContentData
  className?: string
}
const defaultClasses: Record<string, string> = {
  h1:   "text-fluid-h1 font-extrabold text-foreground",
  h2:   "text-fluid-h2 font-bold text-foreground",
  h3:   "text-fluid-h3 font-semibold text-foreground",
  h4:   "text-fluid-h4 font-semibold text-foreground",
  h5:   "text-fluid-h5 font-medium text-foreground",
  h6:   "text-fluid-h6 font-medium text-foreground",
  p:    "text-fluid-p font-normal text-muted-foreground",
  span: "text-fluid-p font-normal text-muted-foreground inline",
}

export const DynamicContent = <T extends ElementType = "p">({
  as,
  data,
  className = "",
  ...props
}: DynamicContentProps<T> &
  Omit<ComponentPropsWithoutRef<T>, "as" | "children">) => {
  const Component = (as || "p") as ElementType

  if (!data) return null

  const tagKey = typeof as === "string" ? as : "p"
  const baseClass = defaultClasses[tagKey] ?? "text-fluid-p text-muted-foreground"

  const items = Array.isArray(data) ? data : [data]

  return (
    <Component className={`${baseClass} ${className}`.trim()} {...props}>
      {items.map((item, index) => {
        if (typeof item === "string") {
          return <Fragment key={index}>{item}</Fragment>
        }

        return (
          <span
            key={index}
            className={[
              item.highlight ? "text-primary font-bold" : "",
              item.className ?? "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {item.text}
          </span>
        )
      })}
    </Component>
  )
}

export default DynamicContent