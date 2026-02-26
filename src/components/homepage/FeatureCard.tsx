import { motion, type Variants, AnimatePresence } from "framer-motion"
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react"
import type { CardProps, CarouselProps, FeatureCardProps, FeatureItem, GridProps } from "../../types/featureCard.type"
import DynamicContent from "../DynamicContent"

const classes = {
  section: "my-4 md:my-10 w-full",
  headingWrapper: "flex items-center justify-center md:justify-start mb-6",

  carouselRoot: "flex flex-col gap-3",
  carouselWindow: "relative overflow-hidden rounded-2xl",
  dotsWrapper: "flex items-center justify-center gap-2 pt-1",
  dotBase: "relative h-1.5 overflow-hidden rounded-full transition-all duration-300 cursor-pointer",
  dotProgress: "absolute inset-0 bg-gray-900 origin-left",

  desktopGrid: "hidden md:flex flex-col gap-3 w-full",
  desktopRow: "flex gap-3 w-full",

  cardShell: "flex flex-col", 

  cardInner: "relative flex flex-col h-full p-5 rounded-2xl border border-gray-200/80 overflow-hidden group transition-shadow duration-300 hover:shadow-md",

  cardTextBlock: "flex flex-col gap-0.5 shrink-0",
  cardTitle: "text-[13px] font-semibold text-gray-900 leading-snug",
  cardDesc: "text-[11.5px] text-gray-500 leading-relaxed",

  cardImageWrap: "flex-1 min-h-0 flex items-center justify-center mt-3 overflow-hidden",
  cardImage: "w-full h-full object-contain select-none",

  accentDot: "",

  mobileCardShell: "h-72",
}

const ROW_HEIGHTS = ["290px", "310px"]

const FEATURES: FeatureItem[] = [
  {
    id: "sections",
    title: "100+ sections and components",
    description: [
      "Modern, responsive, and accessible landing page elements.",
      "Reusable for any project.",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    ],
    imageSrc: "/src/assets/illustration-nd.svg",
    imageAlt: "Sections illustration",
    desktopFlex: "2",
  },
  {
    id: "control",
    title: "You're in control",
    description: [
      "Not a component library, fully copy-paste ready.",
      "Adjust layout and styles as needed.",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, amet!",
    ],
    imageSrc: "/src/assets/illustration-st.svg",
    imageAlt: "Control illustration",
    desktopFlex: "3",
  },
  {
    id: "customize",
    title: "Fully customizable",
    description: [
      "Easily adjust styles, layouts, and content.",
      "Compatible with your brand design system.",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    ],
    imageSrc: "/src/assets/illustration-rd.svg",
    imageAlt: "Customization illustration",
    desktopFlex: "2",
  },
  {
    id: "support",
    title: "Premium support",
    description: [
      "Expert help whenever you need it.",
      "Quick responses and solutions.",
      "Lorem ipsum dolor sit, amet consectetur.",
    ],
    imageSrc: "/src/assets/Chart.svg",
    imageAlt: "Support illustration",
    desktopFlex: "2",
  },
]

const AUTO_SLIDE_INTERVAL_MS = 3200
const DRAG_THRESHOLD_PX = 50

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: "easeOut", delay: i * 0.09 },
  }),
}

const imageHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.05, y: -5, transition: { duration: 0.32, ease: "easeOut" } },
}

const slideVariants = (direction: 1 | -1): Variants => ({
  enter: { x: direction * 260, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { x: direction * -260, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
})


const CardContent = ({ item }: { item: FeatureItem }) => (
  <div className={classes.cardInner}>
    <span className={classes.accentDot} />

    <div className={classes.cardTextBlock}>
      <DynamicContent as="h6" data={item.title} /> 
      {Array.isArray(item.description)
        ? item.description.map((line, i) => <p key={i} className={classes.cardDesc}>{line}</p>)
        : <p className={classes.cardDesc}>{item.description as string}</p>}
    </div>

    <motion.div
      className={classes.cardImageWrap}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={imageHover}
    >
      <img src={item.imageSrc} alt={item.imageAlt} className={classes.cardImage} draggable={false} />
    </motion.div>
  </div>
)


const FeatureSingleCard = ({
  item,
  index,
  plain = false,
  rowIndex = 0,
}: CardProps & { rowIndex?: number }) => {
  if (plain) {
    return (
      <div className={classes.mobileCardShell}>
        <CardContent item={item} />
      </div>
    )
  }

  return (
    <motion.div
      className={classes.cardShell}
      style={{
        flex: item.desktopFlex ?? "1",
        height: ROW_HEIGHTS[rowIndex] ?? ROW_HEIGHTS[0],
      }}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <CardContent item={item} />
    </motion.div>
  )
}


const MobileCarousel = ({ items }: CarouselProps) => {
  const total = items.length
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const currentRef = useRef(current)
  const totalRef = useRef(total)
  const pauseRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useLayoutEffect(() => { currentRef.current = current; totalRef.current = total })

  const navigateRef = useRef((rawNext: number, forceDir?: 1 | -1) => {
    const t = totalRef.current
    const next = ((rawNext % t) + t) % t
    const dir = forceDir ?? (next > currentRef.current ? 1 : -1)
    setDirection(dir); setCurrent(next); currentRef.current = next
  })

  const navigate = useCallback((rawNext: number) => {
    navigateRef.current(rawNext); pauseRef.current = true
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
  const onDragEnd = (_: unknown, info: { point: { x: number } }) => {
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
            style={{ width: i === current ? "1.75rem" : "0.4rem", background: i === current ? "#111" : "#e5e7eb" }}
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
      {rows.map((row, ri) => (
        <div key={ri} className={classes.desktopRow}>
          {row.map((item) => (
            <FeatureSingleCard key={item.id} item={item} index={globalIndex++} rowIndex={ri} />
          ))}
        </div>
      ))}
    </div>
  )
}


const FeatureCard = ({
  items = FEATURES,
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