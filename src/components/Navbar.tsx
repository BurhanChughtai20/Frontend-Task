import { Link } from "react-router-dom";
import { navigationRoutes } from "../config/routes.config";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const styles = {
    navWrapper: "fixed top-0 w-full z-50 bg-background border-b",
    container: "max-w-7xl mx-auto flex items-center justify-between px-4 xl:px-1 py-4",
    logo: "text-xl font-bold",
    menu: "flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4",
    ctaButton: `
      flex items-center space-x-2
      bg-black text-white
      rounded-lg border border-gray-900
      px-4 py-2
      hover:bg-gray-900 hover:border-gray-900
      transition-all duration-200
    `,
  };

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          LOGO
        </Link>

        <div className={styles.menu}>
          {navigationRoutes.map((item) =>
            item.name === "Get Started" ? (
              <Button asChild className={`${styles.ctaButton} flex items-center space-x-2`}>
  <Link to={item.path}>
    <span>{item.name}</span>
    <ArrowRight className="w-4 h-4 text-white" />
  </Link>
</Button>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium hover:underline"
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;