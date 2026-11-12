import { Hero } from "@/components/Hero"
import { ProductPreview } from "@/components/ProductPreview"
import { Features } from "@/components/Features"
import { HowItWorks } from "@/components/HowItWorks"
import VerticalMarqueeDemo from "@/components/ui/marquee-03"
import { Navbar } from "@/components/Navbar"

export default function HomePage() {
  return (
    <main className="landing-page">
      <Navbar />
      <Hero />
      <ProductPreview />
      <Features />
      <HowItWorks />
      <VerticalMarqueeDemo />
    </main>
  )
}