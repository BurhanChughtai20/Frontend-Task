import { motion, type Variants, type Transition } from "framer-motion";
import { Figma, Atom, FileCode2, Component, Wind } from "lucide-react";
import type { Tool } from "../../types/tech-stack-banner.type";

const classes = {
  wrapper:
    "relative z-10 w-full mt-10 md:pb-10",
  label:
    "text-center text-xs font-medium tracking-widest uppercase text-gray-400 mb-5",
  dividerRow:
    "flex items-center justify-center gap-3 mb-6",
  dividerLine:
    "h-px w-16 bg-gradient-to-r from-transparent to-gray-200",
  dividerLineMirror:
    "h-px w-16 bg-gradient-to-l from-transparent to-gray-200",
  dividerDot:
    "w-1 h-1 rounded-full bg-gray-300",
  grid:
    "flex flex-wrap items-center justify-center gap-x-5 gap-y-4 sm:gap-x-7 md:gap-x-9",
  item:
    "flex items-center gap-2 group cursor-default select-none",
  iconWrapper:
    "flex items-center justify-center w-6 h-6 flex-shrink-0",
  nameText:
    "text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-200",
  versionBadge:
    "text-xs font-medium text-gray-400 group-hover:text-gray-500 transition-colors duration-200",
  separator:
    "hidden sm:block w-px h-4 bg-gray-200",
} as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 1.5,
    } as Transition,
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    } as Transition,
  },
};

const tools: Tool[] = [
  {
    name: "Figma",
    version: null,
    icon: <Figma className="w-[18px] h-[18px]" />,
    iconColor: "text-[#F24E1E]",
  },
  {
    name: "React.js",
    version: "18.3.1",
    icon: <Atom className="w-[18px] h-[18px]" />,
    iconColor: "text-[#61DAFB]",
  },
  {
    name: "TypeScript",
    version: "5.6.2",
    icon: <FileCode2 className="w-[18px] h-[18px]" />,
    iconColor: "text-[#3178C6]",
  },
  {
    name: "Shadcn",
    version: "2.0.7",
    icon: <Component className="w-[18px] h-[18px]" />,
    iconColor: "text-[#18181B]",
  },
  {
    name: "Tailwind CSS",
    version: "3.4.11",
    icon: <Wind className="w-[18px] h-[18px]" />,
    iconColor: "text-[#38BDF8]",
  },
];

export function TechStackBanner() {
  return (
    <div className={classes.wrapper}>

      <motion.p
        className={classes.label}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.4 }}
      >
        Built with the best tools
      </motion.p>

      <motion.div
        className={classes.dividerRow}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 1.45 }}
      >
        <span className={classes.dividerLine} />
        <span className={classes.dividerDot} />
        <span className={classes.dividerLineMirror} />
      </motion.div>

      <motion.div
        className={classes.grid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tools.map((tool, index) => (
          <motion.div key={tool.name} className="contents">
            <motion.div
              className={classes.item}
              variants={itemVariants}
              whileHover={{ scale: 1.06, y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span className={`${classes.iconWrapper} ${tool.iconColor}`}>
                {tool.icon}
              </span>

              <span className={classes.nameText}>{tool.name}</span>

              {tool.version && (
                <span className={classes.versionBadge}>{tool.version}</span>
              )}
            </motion.div>

            {index < tools.length - 1 && (
              <motion.span
                className={classes.separator}
                variants={itemVariants}
                aria-hidden="true"
              />
            )}
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}

export default TechStackBanner;