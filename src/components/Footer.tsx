import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Dribbble, Github, MessageCircle } from "lucide-react";
import type {  FooterSection } from "../types/footer";
const SOCIAL_ICON_MAP: Record<string, React.ElementType> = {
  Facebook: Facebook,
  Twitter: Twitter,
  Dribbble: Dribbble,
  GitHub: Github,
  Discord: MessageCircle,
};

const footerSections: FooterSection[] = [
  {
    title: "Resources",
    links: [
      { label: "Flowbite", href: "https://flowbite.com/" },
      { label: "Tailwind CSS", href: "https://tailwindcss.com/" },
    ],
  },
  {
    title: "Follow us",
    links: [
      { label: "Github", href: "https://github.com/themesberg/flowbite" },
      { label: "Discord", href: "https://discord.gg/4eeurUVvTy" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
];

const classes = {
  wrapper: "w-full bg-white text-gray-800 mt-10",
  container: "max-w-screen-xl mx-auto px-4 py-12 sm:py-16",
  logoWrapper: "flex flex-col md:flex-row md:justify-between md:items-center mb-10 text-center md:text-left",
  logoLink: "flex items-center justify-center md:justify-start mb-6 md:mb-0",
  logoImg: "h-10 mr-3",
  logoText: "text-2xl font-bold tracking-wide text-gray-900",
  socialWrapper: "flex justify-center md:justify-end space-x-5",
  socialIcon: "text-gray-800 hover:text-blue-600 transition-transform duration-300 hover:scale-125",
  sectionGrid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left mb-8",
  sectionTitle: "font-semibold text-sm uppercase mb-4 tracking-wider text-gray-700",
  linkItem: "hover:underline hover:text-blue-600 mb-2 block transition-colors duration-200",
  hr: "my-8 border-gray-300",
  bottomText: "text-center text-sm text-gray-500",
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.logoWrapper}>
          <Link to="/" className={classes.logoLink}>
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className={classes.logoImg}
              alt="Flowbite Logo"
            />
            <span className={classes.logoText}>LOGO</span>
          </Link>

          <div className={classes.socialWrapper}>
            {Object.entries(SOCIAL_ICON_MAP).map(([label, Icon]) => (
              <a
                key={label}
                href="#" 
                className={classes.socialIcon}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        <div className={classes.sectionGrid}>
          {footerSections.map((section) => (
            <nav key={section.title} aria-labelledby={`footer-${section.title}`}>
              <h2 id={`footer-${section.title}`} className={classes.sectionTitle}>
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={classes.linkItem}>
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
          <a href="/" className="hover:underline text-gray-700 font-medium">
            Flowbite™
          </a>
          . All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;