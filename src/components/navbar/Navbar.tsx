import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import BrandLogo from "./BrandLogo";
import DesktopNavItem from "./DesktopNavItem";
import MobileSection from "./MobileSection";
import { navItems } from "./navData";
import { Link } from "react-router-dom";

const tw = {
  nav: "fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm",
  inner: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between",
  logo: "flex items-center gap-3 font-semibold text-gray-900 text-[15px] tracking-tight select-none",
  logoBarsWrapper: "flex items-end gap-1",
  desktopNav: "hidden md:flex items-center gap-1",
  mobileMenuBtn: "md:hidden p-2 rounded-md text-gray-100 hover:bg-gray-100 transition-colors",
  navItemBase:
    "flex items-center gap-1 px-3 py-2 rounded-md text-[14px] font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer select-none",
  authGroup: "hidden md:flex items-center gap-3",
  signInBtn:
    "flex items-center gap-2 text-[14px] font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2",
  getStartedBtn:
    "flex items-center gap-2 text-[14px] font-semibold bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors",
  mobilePanel: "md:hidden bg-white border-t border-gray-100 px-4 pb-4",
  mobileNavItem:
    "flex items-center gap-2 px-3 py-2.5 rounded-md text-[14px] font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer",
  mobileDivider: "border-t border-gray-100 my-3",
  mobileAuthGroup: "flex flex-col gap-2 pt-2 md:hidden",
  mobileSignIn:
    "flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md text-[14px] font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors",
  mobileGetStarted:
    "flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md text-[14px] font-semibold bg-black text-white hover:bg-gray-700 transition-colors",
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={tw.nav}>
      <div className={tw.inner}>
        <BrandLogo />

        <nav className={tw.desktopNav}>
          {navItems.map((item) => (
            <DesktopNavItem key={item.label} item={item} tw={tw} />
          ))}
        </nav>

        <div className={tw.authGroup}>
          <Link to={"/"} className={tw.signInBtn}>
            <LogIn size={16} /> Sign in
          </Link>
          <Link to={"/"} className={tw.getStartedBtn}>
            <UserPlus size={16} /> Get started
          </Link>
        </div>

        <Button
          className={tw.mobileMenuBtn}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={tw.mobilePanel}
          >
            {navItems.map((item) => (
              <MobileSection key={item.label} item={item} tw={tw} />
            ))}

            <div className={tw.mobileDivider} />

            <div className={tw.mobileAuthGroup}>
              <Link to={"/"} className={tw.mobileSignIn}>
                <LogIn size={16} /> Sign in
              </Link>
              <Link to={"/"} className={tw.mobileGetStarted}>
                <UserPlus size={16} /> Get started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}