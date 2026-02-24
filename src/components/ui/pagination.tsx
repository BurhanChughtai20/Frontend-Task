"use client"

import * as React from "react"
import { motion, type HTMLMotionProps,  } from "framer-motion"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"
import { buttonVariants } from "../ui/button"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("flex flex-row items-center gap-1", className)} {...props} />
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
  asChild?: boolean
  disabled?: boolean
} & React.ComponentProps<"a"> & Pick<React.ComponentProps<typeof Slot>, "children">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  asChild = false,
  disabled,
  children,
  ...props
}: PaginationLinkProps & { size?: "default" | "sm" | "lg" | "icon" }) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      aria-current={isActive ? "page" : undefined}
      aria-disabled={disabled}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        "transition-colors duration-200",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

// ---------- Previous / Next buttons with motion ----------
function PaginationPrevious({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1"
      >
        <ChevronLeftIcon className="size-4" />
        {children ?? <span className="hidden sm:block">Previous</span>}
      </motion.div>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1"
      >
        {children ?? <span className="hidden sm:block">Next</span>}
        <ChevronRightIcon className="size-4" />
      </motion.div>
    </PaginationLink>
  )
}

function PaginationEllipsis({ 
  className, 
  ...props 
}: HTMLMotionProps<"span">) {
  return (
    <motion.span
      aria-hidden
      whileHover={{ scale: 1.2 }}
      className={cn("flex size-9 items-center justify-center", className)}
      {...props} // No error here because types now match perfectly
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </motion.span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}