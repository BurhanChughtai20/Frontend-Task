import { motion, type Variants, AnimatePresence } from "framer-motion"
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react"
import type { CardProps, CarouselProps, FeatureCardProps, FeatureItem, GridProps } from "../../types/feature-card.type"
import DynamicContent from "../dynamic-content"

const classes = {
  section:        "my-4 md:my-10 w-full",
  headingWrapper: "flex items-center justify-center md:justify-start mb-8",

  carouselRoot:   "flex flex-col gap-3",
  carouselWindow: "relative overflow-hidden rounded-2xl",
  dotsWrapper:    "flex items-center justify-center gap-2 pt-2",
  dotBase:        "relative h-1.5 overflow-hidden rounded-full transition-all duration-300 cursor-pointer",
  dotProgress:    "absolute inset-0 bg-gray-900 origin-left",
  desktopGrid:    "hidden md:grid md:grid-cols-2 gap-3 w-full",
  cardShell:
  "relative flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden group shadow-[0_-10px_15px_-3px_rgba(253,186,116,0.5)]",
  cardTextBlock:  "flex flex-col gap-1 px-5 pt-5 pb-4 shrink-0",
  cardTitle:      "text-[13.5px] font-semibold text-gray-900 leading-snug",
  cardDesc:       "text-[11.5px] text-gray-400 leading-relaxed",

  cardImageWrap:  "w-full h-[200px] overflow-hidden flex items-center justify-center px-6 pb-5",
  cardImage:      "w-full h-full object-contain select-none",
  mobileCardShell: "flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden",
}

const FEATURES: FeatureItem[] = [
  {
    id: "sections",
    title: "100+ sections and components",
    description: [
      "Modern, responsive, and accessible landing page elements.",
      "Reusable for any project.",
    ],
    imageSrc: "/assets/illustration-nd.svg",
    imageAlt: "Sections illustration",
    desktopFlex: "1",
  },
  {
    id: "control",
    title: "You're in control",
    description: [
      "Not a component library, fully copy-paste ready.",
      "Adjust layout and styles as needed.",
    ],
    imageSrc: "/assets/illustration-st.svg",
    imageAlt: "Control illustration",
    desktopFlex: "1",
  },
  {
    id: "customize",
    title: "Fits right into your stack",
    description: [
      "Easily adjust styles, layouts, and content.",
      "Compatible with your brand design system.",
    ],
    imageSrc: "/assets/illustration-rd.svg",
    imageAlt: "Customization illustration",
    desktopFlex: "1",
  },
  {
    id: "support",
    title: "Data-agnostic",
    description: [
      "Expert help whenever you need it.",
      "Quick responses and solutions.",
    ],
    imageSrc: "/assets/Chart.svg",
    imageAlt: "Support illustration",
    desktopFlex: "1",
  },
]

const AUTO_SLIDE_INTERVAL_MS = 3200
const DRAG_THRESHOLD_PX      = 50

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, ease: "easeOut", delay: i * 0.09 },
  }),
}

const imageHover: Variants = {
  rest:  { scale: 1,    y: 0  },
  hover: { scale: 1.04, y: -4, transition: { duration: 0.32, ease: "easeOut" } },
}

const slideVariants = (direction: 1 | -1): Variants => ({
  enter:  { x: direction * 260, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   { x: direction * -260, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
})

const CardBody = ({ item }: { item: FeatureItem }) => (
  <>
    <div className={classes.cardTextBlock}>
      <DynamicContent as="h6" className={classes.cardTitle} data={item.title} />
      {Array.isArray(item.description)
        ? item.description.map((line, i) => (
            <DynamicContent key={i} as="p" className={classes.cardDesc} data={line} />
          ))
        : <DynamicContent as="p" className={classes.cardDesc} data={item.description} />}
    </div>

    <motion.div
      className={classes.cardImageWrap}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={imageHover}
    >
      <img
        src={item.imageSrc}
        alt={item.imageAlt}
        className={classes.cardImage}
        draggable={false}
      />
    </motion.div>
  </>
)

const FeatureSingleCard = ({
  item,
  index,
  plain = false,
}: CardProps & { rowIndex?: number }) => {
  if (plain) {
    return (
      <div className={classes.mobileCardShell}>
        <CardBody item={item} />
      </div>
    )
  }

  return (
    <motion.div
      className={classes.cardShell}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <CardBody item={item} />
    </motion.div>
  )
}

const MobileCarousel = ({ items }: CarouselProps) => {
  const total                       = items.length
  const [current, setCurrent]       = useState(0)
  const [direction, setDirection]   = useState<1 | -1>(1)
  const currentRef                  = useRef(current)
  const totalRef                    = useRef(total)
  const pauseRef                    = useRef(false)
  const timerRef                    = useRef<ReturnType<typeof setInterval> | null>(null)

  useLayoutEffect(() => {
    currentRef.current = current
    totalRef.current   = total
  })

  const navigateRef = useRef((rawNext: number, forceDir?: 1 | -1) => {
    const t    = totalRef.current
    const next = ((rawNext % t) + t) % t
    const dir  = forceDir ?? (next > currentRef.current ? 1 : -1)
    setDirection(dir)
    setCurrent(next)
    currentRef.current = next
  })

  const navigate = useCallback((rawNext: number) => {
    navigateRef.current(rawNext)
    pauseRef.current = true
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (pauseRef.current) { pauseRef.current = false; return }
      navigateRef.current(currentRef.current + 1, 1)
    }, AUTO_SLIDE_INTERVAL_MS)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const dragStartX = useRef(0)
  const onDragStart = (_: unknown, info: { point: { x: number } }) => { dragStartX.current = info.point.x }
  const onDragEnd   = (_: unknown, info: { point: { x: number } }) => {
    const delta = dragStartX.current - info.point.x
    if (Math.abs(delta) > DRAG_THRESHOLD_PX) navigate(delta > 0 ? current + 1 : current - 1)
  }

  return (
    <div className={classes.carouselRoot}>
      <div className={classes.carouselWindow}>
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={items[current].id}
            custom={direction}
            variants={slideVariants(direction)}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <FeatureSingleCard item={items[current]} index={0} plain />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={classes.dotsWrapper}>
        {items.map((item, i) => (
          <button
            key={item.id}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => navigate(i)}
            className={classes.dotBase}
            style={{
              width:      i === current ? "1.75rem" : "0.4rem",
              background: i === current ? "#111"    : "#e5e7eb",
            }}
          >
            {i === current && (
              <motion.span
                key={current}
                className={classes.dotProgress}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTO_SLIDE_INTERVAL_MS / 1000, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

const DesktopGrid = ({ items }: GridProps) => {
  const rows: FeatureItem[][] = []
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2))
  let globalIndex = 0

  return (
    <div className={classes.desktopGrid}>
      {rows.map((row, ri) =>
        row.map((item) => (
          <FeatureSingleCard
            key={item.id}
            item={item}
            index={globalIndex++}
            rowIndex={ri}
          />
        ))
      )}
    </div>
  )
}

const FeatureCard = ({
  items   = FEATURES,
  heading = "Build a better website, faster.",
}: FeatureCardProps) => (
  <section className={classes.section}>
    <div className={classes.headingWrapper}>
      <DynamicContent as="h2" data={heading} />
    </div>
    <div className="md:hidden">
      <MobileCarousel items={items} />
    </div>
    <DesktopGrid items={items} />
  </section>
)

export default FeatureCard