import { motion } from "framer-motion";
import BannerImg from "../../assets/banner.svg";
import heroContent from "../../data/heroContent.json";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { routeMap } from "../../config/routes.config"; 
import DynamicContent from "../dynamic-content";
import TechStackBanner from "./tech-stack-banner";

const classes = {
  container:
    " my-10 flex flex-col items-center justify-center",
  contentWrapper: "py-10 md:pt-20",
  heading:
    "relative z-10 mx-auto max-w-4xl py-4 text-center text-2xl font-bold md:text-4xl lg:text-7xl bg-gradient-to-r from-black to-gray-400 text-transparent bg-clip-text leading-tight tracking-tight",
  headingWord: " inline-block text-black",
  introContainer:
    "relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal",
  introText: "text-sm sm:text-base text-gray-600",
  statsContainer:
    "relative z-10 py-4 flex flex-wrap items-center justify-center gap-5",
  statsInner: "flex justify-center items-center gap-y-3",
  statItem: "sm:mx-4 text-center",
  statTitle: "text-xs sm:text-sm font-semibold text-gray-600",
  statNumber: "text-sm sm:text-base text-gray-600 font-medium",
  buttonsContainer:
    "flex flex-col sm:flex-row gap-4 justify-center items-center my-6",
  imageContainer:
    "relative z-10 mt-10 rounded-3xl border p-4 shadow-[0_-10px_15px_-3px_rgba(253,186,116,0.5)]",
  imageWrapper: "w-full overflow-hidden rounded-xl border",
  image: "aspect-video h-auto w-full object-cover",
};

export function HeroSection() {
  const { heading, introTexts, stats } = heroContent;

  return (
    <div className={classes.container}>
      <div className={classes.contentWrapper}>
        <h1 className={classes.heading}>
          {heading.split(" ").map((word: string, index: number) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className={classes.headingWord}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className={classes.introContainer}
        >
          {introTexts.map((text: string, index: number) => (
            <DynamicContent
              key={index}
              as="p"
              className={classes.introText}
              data={text}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className={classes.statsContainer}
        >
          <div className={classes.statsInner}>
            {stats.map((item, index: number) => (
              <div key={index} className={classes.statItem}>
                <DynamicContent
                  as="p"
                  className={classes.statTitle}
                  data={item.title}
                />
                <DynamicContent
                  as="h6"
                  className={classes.statNumber}
                  data={item.number}
                />
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.1 }}
          className={classes.buttonsContainer}
        >
          <Link to={routeMap.dashboard}>
            <Button variant="default" className="px-6 py-3 cursor-pointer">
              Get Started
            </Button>
          </Link>

          <Link to="https://github.com/BurhanChughtai20" target="_blank">
            <Button variant="ghost" className="px-6 py-3 cursor-pointer border border-gray-300">
              Github
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.3 }}
          className={classes.imageContainer}
        >
          <div className={classes.imageWrapper}>
            <img
              src={BannerImg}
              alt="Landing page preview"
              className={classes.image}
            />
          </div>
        </motion.div>
        <TechStackBanner/>
      </div>
    </div>
  );
}

export default HeroSection;
