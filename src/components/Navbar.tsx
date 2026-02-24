import { Link } from "react-router-dom"
import { navigationRoutes } from "../config/routes.config"

const Navbar = () => {
  const styles = {
    navWrapper: "fixed top-0 w-full z-50 bg-background border-b",
    container: "max-w-7xl mx-auto flex items-center justify-between px-4 xl:px-1 py-4",
    logo: "text-xl font-bold",
    menu: "flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4",
    ctaButton:
      "bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition",
  }

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          LOGO
        </Link>

        <div className={styles.menu}>
          {navigationRoutes.map((item) => (
            <Link key={item.path} to={item.path} className={styles.ctaButton}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar