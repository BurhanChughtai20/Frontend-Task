import { type ElementType, type ComponentPropsWithoutRef } from "react";
import type { TextData } from "../types/DynamicText";

interface DynamicContentProps<T extends ElementType> {
  as?: T;
  data: TextData | TextData[];
  className?: string;
}

export const DynamicContent = <T extends ElementType = "p">({
  as,
  data,
  className = "",
  ...props 
}: DynamicContentProps<T> & ComponentPropsWithoutRef<T>) => {
  
  const Component = (as || "p") as ElementType;

  const defaultClasses: Record<string, string> = {
    h1: "text-4xl font-bold leading-tight text-heading md:text-5xl lg:text-6xl",
    h2: "text-3xl font-semibold leading-snug text-heading md:text-4xl",
    h3: "text-2xl font-semibold text-heading md:text-3xl",
    h4: "text-xl font-medium text-heading md:text-2xl",
    h5: "text-lg font-medium text-heading",
    h6: "text-base font-medium text-heading",
    p: "text-base text-body md:text-lg",
    span: "inline text-body",
  };

  const tagKey = typeof as === "string" ? as : "p";
  const baseClass = defaultClasses[tagKey] || "text-base text-body";

  const items: TextData[] = Array.isArray(data) ? data : [data];

  return (
    <Component className={`${baseClass} ${className}`} {...props}>
      {items.map((item, index) => {
        if (typeof item === "string") return <span key={index}>{item}</span>;
        
        return (
          <span
            key={index}
            className={`${item.highlight ? "text-primary font-bold" : ""} ${
              item.className ?? ""
            }`}
          >
            {item.text}
          </span>
        );
      })}
    </Component>
  );
};

export default DynamicContent;