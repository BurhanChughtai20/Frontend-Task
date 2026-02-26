
export interface FeatureItem {
  id: string
  title: string
   description: string[];
  imageSrc: string
  imageAlt: string
  desktopFlex?: string
}

export interface CardProps {
  item: FeatureItem
  index: number
  plain?: boolean
}


export interface CarouselProps {
  items: FeatureItem[]
}

export interface GridProps {
  items: FeatureItem[]
}

export interface FeatureCardProps {
  items?: FeatureItem[]
  heading?: string
}