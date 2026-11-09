import { Hero } from "@/components/Hero"
import { ProductPreview } from "@/components/ProductPreview"
import { Features } from "@/components/Features"
import { HowItWorks } from "@/components/HowItWorks"


export default function homePage() {
  return (
    <>
        <Hero />
              <ProductPreview />
              <Features />
              <HowItWorks />
    </>
  )


}