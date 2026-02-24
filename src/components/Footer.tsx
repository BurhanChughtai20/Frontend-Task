import type { FooterLink, FooterSection } from "../types/footer";

const socialLinks: FooterLink[] = [
  { label: "Facebook", href: "#" },
  { label: "Discord", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Dribbble", href: "#" },
];

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
  wrapper: "w-full bg-white text-black mt-10",
  container: "max-w-screen-xl mx-auto px-1 py-8",
  logoWrapper: "flex flex-col md:flex-row md:justify-between md:items-center mb-8 text-center md:text-left",
  logoLink: "flex items-center justify-center md:justify-start mb-4 md:mb-0",
  logoImg: "h-8 mr-3",
  logoText: "text-2xl font-semibold",
  socialWrapper: "flex justify-center md:justify-end space-x-4",
  socialIcon: "w-5 h-5",
  sectionGrid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center md:text-left mb-6",
  sectionTitle: "font-semibold text-sm uppercase mb-3",
  linkItem: "hover:underline mb-2 block",
  hr: "my-6 border-gray-300",
  bottomText: "text-center text-sm text-gray-600",
};

const Footer = () => {
  return (
    <footer className={classes.wrapper}>
      <div className={classes.container}>
        {/* Logo + Social */}
        <div className={classes.logoWrapper}>
          <a href="/" className={classes.logoLink}>
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className={classes.logoImg}
              alt="Flowbite Logo"
            />
            <span className={classes.logoText}>Flowbite</span>
          </a>

          <div className={classes.socialWrapper}>
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">{link.label}</span>
                <svg className={classes.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Sections */}
        <div className={classes.sectionGrid}>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h2 className={classes.sectionTitle}>{section.title}</h2>
              <ul>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={classes.linkItem}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className={classes.hr} />

        {/* Bottom Text */}
        <div className={classes.bottomText}>
          © 2026 <a href="/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;