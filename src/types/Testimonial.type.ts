export interface Testimonial {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  color: string;
  text: string;
}

export interface TestimonialCardProps {
  item: Testimonial;
}

export interface MarqueeRowProps {
  items: Testimonial[];
  direction: "left" | "right";
  speed?: number;
}