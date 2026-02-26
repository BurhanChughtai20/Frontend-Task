import { useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import type { MobileSectionProps } from "../../types/navbar.types";
import { Button } from "../ui/button";

const MobileSection: FC<MobileSectionProps> = ({ item, tw, onClose }) => {
  const [open, setOpen] = useState<boolean>(false);
  const Icon = item.icon;

  if (!item.dropdown) {
    return (
      <NavLink
        to={item.href ?? "/"}
        onClick={onClose}
        className={({ isActive }) =>
          `${tw.mobileNavItem} ${isActive ? "text-gray-900 bg-gray-100" : ""}`
        }
      >
        {Icon && <Icon size={16} className="shrink-0 text-gray-400" />}
        <span>{item.label}</span>
      </NavLink>
    );
  }

  return (
    <div>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setOpen((v) => !v)}
        className={`${tw.mobileNavItem} w-full justify-between`}
        aria-expanded={open}
      >
        <span className="flex flex-row items-center gap-2">
          {Icon && <Icon size={16} className="shrink-0 text-gray-400" />}
          <span>{item.label}</span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={14} className="text-gray-400" />
        </motion.span>
      </Button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-sub"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-6 border-l border-gray-100 pl-3 py-1 flex flex-col gap-0.5">
              {item.dropdown.map((child) => {
                const ChildIcon = child.icon;
                return (
                  <div key={child.label}>
                    {child.separator && (
                      <div className="border-t border-gray-100 my-1" />
                    )}
                    <NavLink
                      to={child.href}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex flex-row items-center gap-2 px-2 py-1.5 rounded-md text-[13px] transition-colors ${
                          isActive
                            ? "text-gray-900 bg-gray-100"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                    >
                      {ChildIcon && (
                        <ChildIcon size={14} className="shrink-0 text-gray-400" />
                      )}
                      <span className="flex flex-col">
                        <span className="font-medium leading-none">{child.label}</span>
                        {child.description && (
                          <span className="text-[11px] text-gray-400 mt-0.5">
                            {child.description}
                          </span>
                        )}
                      </span>
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileSection;