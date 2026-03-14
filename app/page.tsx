import { HeroSection } from '@/components/landing/hero-section'
import { CreatorProfile } from '@/components/landing/creator-profile'
import { ProductShowcase } from '@/components/landing/product-showcase'
import { FeaturesGrid } from '@/components/landing/features-grid'
import { Testimonials } from '@/components/landing/testimonials'
import { TrustBadges } from '@/components/landing/trust-badges'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CreatorProfile />
      <ProductShowcase />
      <FeaturesGrid />
      <Testimonials />
      <TrustBadges />
      <Footer />
    </main>
  )
}
