import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import type { MobileSectionProps } from "../../types/navbar.types";
import { ChevronDown } from "lucide-react";


export default function MobileSection({ item, tw }: MobileSectionProps & { tw: Record<string, string> }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  if (!item.dropdown) {
    return (
      <Link to={item.href ?? "#"} className={tw.mobileNavItem}>
        {Icon && <Icon size={16} />}
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button onClick={() => setOpen((v) => !v)} className={`${tw.mobileNavItem} w-full justify-between`}>
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} />}
          <span>{item.label}</span>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} className="text-gray-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-6 border-l border-gray-100 pl-3 py-1 flex flex-col gap-0.5">
              {item.dropdown.map((d) => {
                const DropIcon = d.icon;
                return (
                  <Link
                    key={d.label}
                    to={d.href}
                    className="flex items-center gap-2 px-2 py-1.5 rounded text-[13px] text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {DropIcon && <DropIcon size={14} />}
                    {d.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}