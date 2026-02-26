import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import DesktopNavItem from "./DesktopNavItem";
import MobileSection from "./MobileSection";
import { navItems } from "../../config/routes.config";
import type { NavTw } from "../../types/navbar.types";

const tw: NavTw = {
  nav: "fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm",
  inner: "max-w-7xl mx-auto px-4 h-16 flex items-center justify-between",
  desktopNav: "hidden md:flex items-center gap-1",
  mobileMenuBtn: "md:hidden",
  authGroup: "hidden md:flex items-center gap-3",
  signInBtn:
    "flex flex-row items-center gap-2 text-[14px] font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2",
  getStartedBtn:
    "flex flex-row items-center gap-2 text-[14px] font-semibold bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors",
  mobilePanel:
    "md:hidden bg-white border-t border-gray-100 px-4 pb-5 pt-2 flex flex-col gap-0.5",
  mobileNavItem:
    "flex flex-row items-center gap-2.5 w-full px-3 py-2.5 rounded-md text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors",
  mobileDivider: "border-t border-gray-100 my-3",
  mobileAuthGroup: "flex flex-col gap-2",
  mobileSignIn:
    "flex flex-row items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md text-[14px] font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors",
  mobileGetStarted:
    "flex flex-row items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md text-[14px] font-semibold bg-black text-white hover:bg-gray-700 transition-colors",
  navItemBase:
    "flex flex-row items-center gap-1.5 px-3 py-2 rounded-md text-[14px] font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer select-none",
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const closeMobile = (): void => setMobileOpen(false);

  return (
    <header className={tw.nav}>
      <div className={tw.inner}>
        <BrandLogo />

        <nav className={tw.desktopNav} aria-label="Main navigation">
          {navItems.map((item) => (
            <DesktopNavItem key={item.label} item={item} tw={tw} />
          ))}
        </nav>

        <div className={tw.authGroup}>
          <Link to="/sign-in" className={tw.signInBtn}>
            <LogIn size={16} />
            Sign in
          </Link>
          <Link to="/get-started" className={tw.getStartedBtn}>
            <UserPlus size={16} />
            Get started
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className={tw.mobileMenuBtn}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={tw.mobilePanel}
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <MobileSection
                  key={item.label}
                  item={item}
                  tw={tw}
                  onClose={closeMobile}
                />
              ))}
            </nav>

            <div className={tw.mobileDivider} />

            <div className={tw.mobileAuthGroup}>
              <Link to="/sign-in" className={tw.mobileSignIn} onClick={closeMobile}>
                <LogIn size={16} />
                Sign in
              </Link>
              <Link to="/get-started" className={tw.mobileGetStarted} onClick={closeMobile}>
                <UserPlus size={16} />
                Get started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}