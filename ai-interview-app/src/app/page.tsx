import { Hero } from "@/components/Hero"
import { ProductPreview } from "@/components/ProductPreview"
import { Features } from "@/components/Features"
import { HowItWorks } from "@/components/HowItWorks"
import { FAQ } from "@/components/FAQ/FAQ"
import VerticalMarqueeDemo from "@/components/ui/marquee-03"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export default function HomePage() {
  return (
    <main className="landing-page">
      <Navbar />
      <Hero />
      <ProductPreview />
      <Features />
      <HowItWorks />
      <FAQ />
      <VerticalMarqueeDemo />
      <Footer />
    </main>
  )
}