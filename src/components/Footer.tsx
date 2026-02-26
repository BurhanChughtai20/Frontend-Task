import { motion, type Variants, type Transition } from "framer-motion";
import { Facebook, Send, Instagram, Figma } from "lucide-react";
import type { BrandInfo, FooterBottom, FooterColumn, SocialItem } from "../types/footer";
import DynamicContent from "./dynamic-content";

const BRAND_DATA: BrandInfo[] = [
  {
    logoBars: [
      { barClass: "w-1.5 h-5 rounded-full bg-orange-500" },
      { barClass: "w-1.5 h-3.5 rounded-full bg-orange-400" },
      { barClass: "w-1.5 h-2 rounded-full bg-orange-300" },
    ],
    logoText: "SiteLogo",
    tagline: "Professional Web Design",
    description:
      "Hi! My name is Dmitrii Rogoza and I'm an expert in web design and branding. I can help you make your website more attractive.",
  },
];

const NAV_COLUMNS: FooterColumn[] = [
  {
    id: 1,
    heading: "Product",
    links: [
      { label: "Landing Page",   href: "#" },
      { label: "Popup Builder",  href: "#" },
      { label: "Web-design",     href: "#" },
      { label: "Content",        href: "#" },
      { label: "Integrations",   href: "#" },
    ],
  },
  {
    id: 2,
    heading: "Use Cases",
    links: [
      { label: "Web-designers",    href: "#" },
      { label: "Marketers",        href: "#" },
      { label: "Small Business",   href: "#" },
      { label: "Website Builder",  href: "#" },
    ],
  },
  {
    id: 3,
    heading: "Company",
    links: [
      { label: "About Us",    href: "#" },
      { label: "Careers",     href: "#" },
      { label: "FAQs",        href: "#" },
      { label: "Teams",       href: "#" },
      { label: "Contact Us",  href: "#" },
    ],
  },
];

const SOCIAL_ITEMS: SocialItem[] = [
  { id: 1, icon: <Facebook size={15} />,  label: "Facebook",  href: "#" },
  { id: 2, icon: <Send size={15} />,      label: "Telegram",  href: "#" },
  { id: 3, icon: <Instagram size={15} />, label: "Instagram", href: "#" },
  { id: 4, icon: <Figma size={15} />,     label: "Figma",     href: "#" },
];

const FOOTER_BOTTOM: FooterBottom[] = [
  { copyright: "© 2021 All Rights Reserved" },
];

const EASE_OUT: Transition = {
  duration: 0.45,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: EASE_OUT },
};

const linkHover: Variants = {
  rest: { x: 0 },
  hover: { x: 3, transition: { duration: 0.18 } as Transition },
};

function Brand() {
  return (
    <>
      {BRAND_DATA.map((brand) => (
        <motion.div key={brand.logoText} variants={itemVariants} className="flex flex-col gap-4">

          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5 items-end">
              {brand.logoBars.map((bar, i) => (
                <span key={i} className={bar.barClass} />
              ))}
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">
              {brand.logoText}
            </span>
          </div>

          <div>
            <DynamicContent as="p" data={brand.tagline} className="text-sm font-semibold text-zinc-800 mb-1.5" />
            <DynamicContent as="p" data={brand.description} className="text-sm text-zinc-500 leading-relaxed max-w-xs"/>
          </div>

        </motion.div>
      ))}
    </>
  );
}

function NavCol({ heading, links }: Omit<FooterColumn, "id">) {
  return (
    <motion.div variants={itemVariants} className="flex flex-col gap-3">
      <span className="text-xs font-semibold text-zinc-900 uppercase tracking-widest mb-1">
        {heading}
      </span>
      {links.map((link) => (
        <motion.a
          key={link.label}
          href={link.href}
          initial="rest"
          whileHover="hover"
          variants={linkHover}
          className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-200 cursor-pointer w-fit"
        >
          {link.label}
        </motion.a>
      ))}
    </motion.div>
  );
}

function SocialCol() {
  return (
    <motion.div variants={itemVariants} className="flex flex-row lg:flex-col items-center gap-3">
      {SOCIAL_ITEMS.map(({ id, icon, label, href }) => (
        <motion.a
          key={id}
          href={href}
          aria-label={label}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="w-8 h-8 rounded-md border border-zinc-200 flex items-center justify-center
                     text-zinc-400 hover:text-zinc-900 hover:border-zinc-400
                     transition-all duration-200 cursor-pointer"
        >
          {icon}
        </motion.a>
      ))}
    </motion.div>
  );
}


export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 flex flex-col gap-10">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-10"
        >
          <Brand />

          {NAV_COLUMNS.map((col) => (
            <NavCol key={col.id} heading={col.heading} links={col.links} />
          ))}

          <SocialCol />
        </motion.div>

        {FOOTER_BOTTOM.map((bottom, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="border-t border-zinc-100 pt-6 flex flex-col sm:flex-row items-center justify-center gap-2"
          >
            <span className="text-xs text-zinc-400">{bottom.copyright}</span>
          </motion.div>
        ))}

      </div>
    </footer>
  );
}