import { motion } from "framer-motion";
import featureData from "../../data/featureData.json";
import { ChefHat, TrendingUp, Users, Zap, BarChart3, Clock, ArrowRight } from "lucide-react";
import DynamicContent from "../DynamicContent"; 
import { Button } from "../ui/button";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Users,
  Zap,
  Clock,
  BarChart3,
  ChefHat,
};

const classes = {
  container: "relative w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden transition-colors duration-300",
  backgroundSvg: "absolute top-0 left-0 w-full h-full hidden md:block opacity-30",
  floatingOrb1: "absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-500 blur-3xl opacity-20",
  floatingOrb2: "absolute bottom-20 right-10 w-40 h-40 rounded-full bg-purple-500 blur-3xl opacity-20",
  mainContainer: "relative z-10 max-w-7xl flex flex-col items-center justify-center mx-auto px-4 sm:px-6 lg:px-8",
  headerContainer: "text-center mb-12 sm:mb-16 md:mb-20",
  titleBase: "text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight",
  descriptionContainer: "text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto",
  capabilitiesGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full",
  capabilityCard: "group relative p-6 sm:p-8 rounded-xl bg-gradient-to-br transition-all duration-300 overflow-hidden border hover:shadow-lg",
  cardBackground: "absolute inset-0 bg-gradient-to-br from-blue-800/0 to-purple-500/0 group-hover:from-gray-800/10 group-hover:to-white-700/10 transition-all duration-300",
  cardContent: "relative z-10",
  iconContainer: "mb-4 inline-flex p-3 rounded-lg transition-all duration-300",
  cardTitle: "text-lg sm:text-xl font-semibold mb-3 transition-colors duration-300",
  cardDescription: "text-sm sm:text-base transition-colors duration-300",
  hoverIndicator: "absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gray-800 to-black",
  ctaContainer: "mt-12 sm:mt-16 md:mt-20 text-center",
  ctaText: "text-gray-400 text-base sm:text-lg mb-6",
  ctaButtonWrapper: "inline-block",
  ctaButton: "text-base sm:text-xl font-semibold px-8 sm:px-10 py-3 sm:py-4 hover:shadow-lg transition-shadow duration-300 flex items-center space-x-2",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeatureCard: React.FC = () => {
  const { titles, descriptions, capabilities, cta } = featureData;

  return (
    <div className={classes.container}>
      <svg className={classes.backgroundSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="50%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q25,20 50,30 T100,25" stroke="url(#lineGradient)" strokeWidth="0.3" fill="transparent" />
      </svg>

      <motion.div
        className={classes.floatingOrb1}
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={classes.floatingOrb2}
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className={classes.mainContainer}>
        <motion.div
          className={classes.headerContainer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {titles.map((title, idx) => (
            <DynamicContent key={idx} as="h2" className={classes.titleBase} data={title} />
          ))}

          {descriptions.map((desc, idx) => (
            <DynamicContent key={idx} as="p" className={classes.descriptionContainer} data={desc} />
          ))}
        </motion.div>

        <motion.div
          className={classes.capabilitiesGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {capabilities.map((capability, idx) => {
            const IconComponent = iconMap[capability.icon];
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className={classes.capabilityCard}
              >
                <div className={classes.cardBackground} />
                <div className={classes.cardContent}>
                  <motion.div
                    initial={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={classes.iconContainer}
                  >
                    <IconComponent size={28} />
                  </motion.div>

                  <DynamicContent as="h3" className={classes.cardTitle} data={capability.title} />

                  <DynamicContent as="p" className={classes.cardDescription} data={capability.description} />

                  <motion.div initial={{ opacity: 0, width: 0 }} whileHover={{ opacity: 1, width: "100%" }} transition={{ duration: 0.3 }} className={classes.hoverIndicator} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div
          className={classes.ctaContainer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <DynamicContent as="p" className={classes.ctaText} data={cta.text} />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={classes.ctaButtonWrapper}>
             <Button size="default" variant="default" className={classes.ctaButton}>
      <span>{cta.buttonText}</span>
      <ArrowRight className="w-4 h-4" />
    </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeatureCard;