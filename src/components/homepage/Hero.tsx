import { motion } from "framer-motion";
import BannerImg from "../../assets/banner.svg";
import { UtensilsCrossed } from "lucide-react";
import heroContent from "../../data/heroContent.json";
import DynamicContent from "../DynamicContent";

const classes = {
  container: "relative mx-auto my-10 flex  max-w-7xl flex-col items-center justify-center",
 
  contentWrapper: "px-4 py-10 md:py-20",
  heading:
    "relative z-10 mx-auto max-w-4xl py-4 text-center text-2xl font-bold text-balance md:text-4xl lg:text-7xl",
  headingWord: "mr-2 inline-block",
  introContainer:
    "relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal",
  introText: "text-sm sm:text-base md:text-lg ",
  statsContainer:
    "relative z-10 py-4 flex flex-wrap items-center justify-center gap-5",
  statsInner: "flex justify-center items-center gap-y-3",
  statItem: "mx-4 text-center",
  statTitle: "text-xs sm:text-sm md:text-base font-semibold",
  statNumber: "text-sm sm:text-base md:text-lg font-medium",
  imageContainer: "relative z-10 mt-10 rounded-3xl border p-4 shadow-md",
  imageWrapper: "w-full overflow-hidden rounded-xl border",
  image: "aspect-video h-auto w-full object-cover",
  iconContainer: "flex items-center justify-center mt-10",
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
                  as="h5"
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
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

        <div className={classes.iconContainer}>
          <UtensilsCrossed className="w-6 h-6 text-black" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;