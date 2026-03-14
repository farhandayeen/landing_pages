import { features } from '@/lib/data'
import { Zap, Infinity, RefreshCw, ShieldCheck, Lock, Headphones } from 'lucide-react'

const featureIcons: Record<string, React.ElementType> = {
  'zap': Zap,
  'infinity': Infinity,
  'refresh-cw': RefreshCw,
  'shield-check': ShieldCheck,
  'lock': Lock,
  'headphones': Headphones,
}

export function FeaturesGrid() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We&apos;re committed to providing the best experience for our customers.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = featureIcons[feature.icon] || Zap
            return (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
