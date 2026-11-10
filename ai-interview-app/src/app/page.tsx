import { Hero } from "@/components/Hero"
import { ProductPreview } from "@/components/ProductPreview"
import { Features } from "@/components/Features"
import { HowItWorks } from "@/components/HowItWorks"
import VerticalMarqueeDemo from "@/components/ui/marquee-03"

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductPreview />
      <Features />
      <HowItWorks />
      <VerticalMarqueeDemo />
    </>
  )
}