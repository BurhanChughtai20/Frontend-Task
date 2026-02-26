import { useRef, useEffect, type FC } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Twitter } from "lucide-react";
import type { MarqueeRowProps, Testimonial, TestimonialCardProps } from "../../types/Testimonial.type";
import DynamicContent from "../DynamicContent";

const classes = {
  section:
    "relative w-full overflow-hidden bg-white py-10",
  dotGrid:
    "absolute inset-0 pointer-events-none",
  fadeLeft:
    "absolute inset-y-0 left-0 w-24 sm:w-40 z-10 pointer-events-none",
  fadeRight:
    "absolute inset-y-0 right-0 w-20 sm:w-40 z-10 pointer-events-none",
  headingWrapper:
    "relative z-10 text-center mb-12",
  heading:
    "text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight tracking-tight",
  subheading:
    "mt-4 text-sm sm:text-base text-gray-400",
  rowsWrapper:
    "relative z-10 flex flex-col gap-4",
  marqueeTrack:
    "flex will-change-transform",
  card:
    "mx-2 flex shrink-0 w-[280px] sm:w-[300px] rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.09)] transition-shadow duration-300 cursor-default select-none",
  cardContent:
    "p-5",
  cardHeader:
    "flex items-start justify-between mb-3",
  cardLeft:
    "flex items-center gap-2.5",
  cardName:
    "text-sm font-semibold text-gray-900 leading-none",
  cardHandle:
    "text-xs text-gray-400 mt-0.5",
  cardText:
    "text-[13px] text-gray-500 leading-relaxed",
  twitterIcon:
    "text-gray-300 mt-0.5 shrink-0",
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Fabrizio Fernandez",
    handle: "@fab2200",
    avatar: "FF",
    color: "#6366f1",
    text: "Testing out @launchUI's responsive design. The template serves as an all-time waiting list — my mobile-first team is doing a happy dance.",
  },
  {
    id: 2,
    name: "Felix Beaumont",
    handle: "@felixb",
    avatar: "FB",
    color: "#0ea5e9",
    text: "Digging into @launchui. These shadows are giving the serious design area.",
  },
  {
    id: 3,
    name: "Fiona Rothschild",
    handle: "@fionar",
    avatar: "FR",
    color: "#ec4899",
    text: "This is that pulse graphic though. It feels like I'm building websites for a living now.",
  },
  {
    id: 4,
    name: "Darius Flynn",
    handle: "@dariusf",
    avatar: "DF",
    color: "#f59e0b",
    text: "Exploring @launchUI's sleek UI. It's like a spec made enthusiast's playground.",
  },
  {
    id: 5,
    name: "Kai Nakamura",
    handle: "@kainakamura",
    avatar: "KN",
    color: "#10b981",
    text: "Just made my first website with @launchUI. Scalability is speaking my language. What a seamless integration.",
  },
  {
    id: 6,
    name: "Sara Mitchell",
    handle: "@saramitch",
    avatar: "SM",
    color: "#8b5cf6",
    text: "The component library is outstanding. Every piece fits together perfectly. My workflow has never been smoother.",
  },
  {
    id: 7,
    name: "James Okafor",
    handle: "@jamesokafor",
    avatar: "JO",
    color: "#ef4444",
    text: "Absolutely love the dark mode support. Clean, consistent, and beautifully designed from the ground up.",
  },
  {
    id: 8,
    name: "Priya Sharma",
    handle: "@priyasharma",
    avatar: "PS",
    color: "#14b8a6",
    text: "Ship faster, design better. That's the promise @launchUI delivers on every single time I use it.",
  },
  {
    id: 9,
    name: "Marcus Lee",
    handle: "@marcuslee",
    avatar: "ML",
    color: "#f97316",
    text: "From zero to production in a weekend. The templates are plug-and-play perfection.",
  },
  {
    id: 10,
    name: "Elena Costa",
    handle: "@elenacosta",
    avatar: "EC",
    color: "#a855f7",
    text: "Finally a UI library that doesn't fight against my design vision. It enhances it.",
  },
];

const ROW_1: Testimonial[] = [
  ...TESTIMONIALS.slice(0, 5),
  ...TESTIMONIALS.slice(0, 5),
  ...TESTIMONIALS.slice(0, 5),
];

const ROW_2: Testimonial[] = [
  ...TESTIMONIALS.slice(5),
  ...TESTIMONIALS.slice(5),
  ...TESTIMONIALS.slice(5),
];

const CARD_W = 316;

const TestimonialCard: FC<TestimonialCardProps> = ({ item }) => (
  <Card className={classes.card}>
    <CardContent className={classes.cardContent}>
      <div className={classes.cardHeader}>
        <div className={classes.cardLeft}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
            style={{ backgroundColor: `${item.color}1a`, color: item.color }}
            aria-hidden="true"
          >
            {item.avatar}
          </div>
          <div>
            <p className={classes.cardName}>{item.name}</p>
            <p className={classes.cardHandle}>{item.handle}</p>
          </div>
        </div>
        <Twitter size={15} className={classes.twitterIcon} aria-hidden="true" />
      </div>
      <p className={classes.cardText}>{item.text}</p>
    </CardContent>
  </Card>
);

const MarqueeRow: FC<MarqueeRowProps> = ({ items, direction, speed = 38 }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef<number>(0);
  const pausedRef = useRef<boolean>(false);
  const lastTsRef = useRef<number | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const loopWidth: number = CARD_W * (items.length / 3);
    posRef.current = direction === "right" ? -loopWidth : 0;

    const step = (ts: number): void => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt: number = Math.min((ts - lastTsRef.current) / 1000, 0.05);
      lastTsRef.current = ts;

      if (!pausedRef.current) {
        if (direction === "left") {
          posRef.current -= speed * dt;
          if (posRef.current <= -loopWidth) posRef.current += loopWidth;
        } else {
          posRef.current += speed * dt;
          if (posRef.current >= 0) posRef.current -= loopWidth;
        }
        track.style.transform = `translateX(${posRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return (): void => {
      cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [direction, speed, items.length]);

  const handleMouseEnter = (): void => {
    pausedRef.current = true;
    void controls.start({ scale: 1.01, transition: { duration: 0.2 } });
  };

  const handleMouseLeave = (): void => {
    pausedRef.current = false;
    lastTsRef.current = null;
    void controls.start({ scale: 1, transition: { duration: 0.2 } });
  };

  return (
    <motion.div
      className="overflow-hidden w-full"
      animate={controls}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className={classes.marqueeTrack}>
        {items.map((item: Testimonial, i: number) => (
          <TestimonialCard key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </motion.div>
  );
};

const TestimonialsSection: FC = () => (
  <section className={classes.section}>
    <div
      aria-hidden="true"
      className={classes.dotGrid}
      style={{
        backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        opacity: 0.55,
      }}
    />
    <div
      aria-hidden="true"
      className={classes.fadeLeft}
      style={{ background: "linear-gradient(to right, white 10%, transparent)" }}
    />
    <div
      aria-hidden="true"
      className={classes.fadeRight}
      style={{ background: "linear-gradient(to left, white 10%, transparent)" }}
    />
    <motion.div
      className={classes.headingWrapper}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <h2
        className={classes.heading}
      >
        Loved by designers and
        <br className="hidden sm:block" />
        {" "}developers across the planet
      </h2>
      <DynamicContent as="p" className={classes.subheading} data={"Here&rsquo;s what people are saying about Launch UI"} />
    </motion.div>
    <div className={classes.rowsWrapper}>
      <MarqueeRow items={ROW_1} direction="left" speed={40} />
      <MarqueeRow items={ROW_2} direction="right" speed={34} />
    </div>
  </section>
);

export default TestimonialsSection;