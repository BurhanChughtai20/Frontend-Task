import React from "react"
import { Search, User, Bell, LogOut, Moon } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { motion, type Transition } from "framer-motion"
import { useNavigate } from "react-router-dom"
import type { DashboardHeaderProps } from "../../types/dashboard.types"

const classes = {
  headerWrapper: "w-full px-4 py-3 border-b bg-background",
  headerContainer:
    "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",

  leftSection: "flex items-center gap-3 min-w-0",
  title: "text-xl font-bold truncate",
  username: "hidden sm:inline text-muted-foreground text-sm",

  desktopRight: "hidden sm:flex items-center gap-3",
  searchWrapper: "relative w-64",
  searchIcon:
    "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none",

  mobileSearchWrapper: "sm:hidden relative",
  mobileBottomBar:
    "fixed bottom-0 left-0 right-0 border-t bg-background flex justify-around items-center py-2 sm:hidden z-50",

  badge:
    "absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full px-1",
}

const iconMotion = {
  whileHover: { scale: 1.15, rotate: 5 },
  whileTap: { scale: 0.9 },
  transition: { type: "spring" as const, stiffness: 300 } as Transition,
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  const navigate = useNavigate()
  const handleLogout = () => { 
    navigate("/")
  }

  return (
    <>
      <div className={classes.headerWrapper}>
        <div className={classes.headerContainer}>
          <div className={classes.leftSection}>
            <h1 className={classes.title}>{title}</h1>
            <span className={classes.username}>User</span>
          </div>

          <div className={classes.desktopRight}>
            <div className={classes.searchWrapper}>
              <Search className={classes.searchIcon} />
              <Input placeholder="Search Users..." className="pl-8" />
            </div>

            <motion.div {...iconMotion}>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div {...iconMotion} className="relative">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <span className={classes.badge}>3</span>
            </motion.div>

            <motion.div {...iconMotion}>
              <Button variant="ghost" size="icon">
                <Moon className="h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div {...iconMotion}>
              <Button variant="outline" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5 text-red-500" />
              </Button>
            </motion.div>
          </div>

          <div className={classes.mobileSearchWrapper}>
            <Search className={classes.searchIcon} />
            <Input placeholder="Search..." className="pl-8" />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className={classes.mobileBottomBar}
      >
        {[User, Bell, Moon, LogOut].map((Icon, index) => (
          <motion.div key={index} {...iconMotion}>
            <Icon
              className={`h-6 w-6 ${Icon === LogOut ? "text-red-500" : ""}`}
              onClick={Icon === LogOut ? handleLogout : undefined}
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}

export default DashboardHeader