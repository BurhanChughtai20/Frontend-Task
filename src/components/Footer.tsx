import React from "react"
import { Link } from "react-router-dom"
import { Github, MessageCircle, Twitter, Facebook } from "lucide-react";
import type { FooterSection } from "../types/footer";

const footerSections: FooterSection[] = [
  {
    title: "Resources",
    links: [{ label: "Tailwind CSS", href: "https://tailwindcss.com/" }],
  },
  {
    title: "Follow us",
    links: [
      { label: "Github", href: "https://github.com/", icon: Github },
      { label: "Discord", href: "https://discord.com/", icon: MessageCircle },
      { label: "Twitter", href: "https://twitter.com/", icon: Twitter },
      { label: "Facebook", href: "https://facebook.com/", icon: Facebook },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
]

const classes = {
  wrapper: "w-full bg-white text-gray-800 mt-10",
  container: "max-w-screen-xl mx-auto px-4 py-3 sm:py-5",
  sectionGrid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left mb-8",
  sectionTitle: "font-semibold text-sm uppercase mb-4 tracking-wider text-gray-700",
  linkItem: "hover:underline hover:text-blue-600 mb-2 flex items-center gap-2 transition-colors duration-200",
  icon: "w-4 h-4 text-gray-700 hover:text-blue-600",
  hr: "my-8 border-gray-300",
  bottomText: "text-center text-sm text-gray-500",
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.sectionGrid}>
          {footerSections.map((section) => (
            <nav key={section.title} aria-labelledby={`footer-${section.title}`}>
              <h2 id={`footer-${section.title}`} className={classes.sectionTitle}>
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={classes.linkItem}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.icon && <link.icon className={classes.icon} />}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <hr className={classes.hr} />

        <div className={classes.bottomText}>
          © {currentYear}{" "}
          <Link to="/" className="hover:underline font-medium">
            LOGO
          </Link>
          . All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer