import { useState } from "react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import type { DesktopNavItemProps } from "../../types/navbar.types";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

interface DesktopNavItemWithTwProps extends DesktopNavItemProps {
  tw: Record<string, string>;
}

export default function DesktopNavItem({ item, tw }: DesktopNavItemWithTwProps) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  if (!item.dropdown) {
    return (
      <Link to={item.href ?? "#"} className={tw.navItemBase}>
        {Icon && <Icon size={16} />}
        {item.label}
      </Link>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
       <Button variant="ghost">
  {Icon && <Icon size={16} />}
  {item.label}
  <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
    <ChevronDown size={14} className="text-gray-400" />
  </motion.span>
</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={10}
        className="w-72 p-2 bg-white rounded-xl shadow-xl border border-gray-100"
        asChild
      >
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.18 }}
        >
          {item.dropdown.map((dropItem) => {
            const DropIcon = dropItem.icon;
            return (
              <div key={dropItem.label}>
                {dropItem.separator && <DropdownMenuSeparator className="my-2" />}
                <DropdownMenuItem asChild>
                  <Link
                    to={dropItem.href}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 transition-all duration-150"
                  >
                    {DropIcon && <DropIcon size={16} className="mt-1 text-gray-500" />}
                    <div className="flex flex-col">
                      <span className="text-[14px] font-semibold text-gray-900">{dropItem.label}</span>
                      {dropItem.description && (
                        <span className="text-[12px] text-gray-500 mt-0.5">{dropItem.description}</span>
                      )}
                    </div>
                  </Link>
                </DropdownMenuItem>
              </div>
            );
          })}
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}