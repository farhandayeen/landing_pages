import { ShieldCheck, Lock, CreditCard, RefreshCw } from 'lucide-react'

const badges = [
  {
    icon: ShieldCheck,
    title: 'Secure Checkout',
    description: 'SSL Encrypted',
  },
  {
    icon: Lock,
    title: 'Privacy Protected',
    description: 'Your data is safe',
  },
  {
    icon: CreditCard,
    title: 'Multiple Payment Options',
    description: 'QRIS, E-Wallet, Bank, Card',
  },
  {
    icon: RefreshCw,
    title: '30-Day Guarantee',
    description: 'Full refund if not satisfied',
  },
]

const paymentLogos = [
  { name: 'QRIS', src: '/payments/qris.svg' },
  { name: 'OVO', src: '/payments/ovo.svg' },
  { name: 'DANA', src: '/payments/dana.svg' },
  { name: 'GoPay', src: '/payments/gopay.svg' },
  { name: 'Stripe', src: '/payments/stripe.svg' },
  { name: 'Visa', src: '/payments/visa.svg' },
  { name: 'Mastercard', src: '/payments/mastercard.svg' },
]

export function TrustBadges() {
  return (
    <section className="py-16 px-4 bg-secondary/30 border-y border-border">
      <div className="max-w-6xl mx-auto">
        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium text-foreground text-sm mb-1">
                  {badge.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            )
          })}
        </div>
        
        {/* Payment methods */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Secure payments powered by
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {paymentLogos.map((logo) => (
              <div
                key={logo.name}
                className="h-8 px-4 py-1 bg-card rounded-md border border-border flex items-center justify-center text-sm font-medium text-muted-foreground"
                title={logo.name}
              >
                {logo.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
