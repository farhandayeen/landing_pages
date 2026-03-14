import Image from 'next/image'
import { formatPrice } from '@/lib/data'
import { Lock, ShieldCheck, Check } from 'lucide-react'
import type { Product } from '@/types'

interface OrderSummaryProps {
  product: Product
}

export function OrderSummary({ product }: OrderSummaryProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const savings = hasDiscount ? product.originalPrice! - product.price : 0

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sticky top-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Order Summary
      </h3>
      
      {/* Product */}
      <div className="flex gap-4 mb-6 pb-6 border-b border-border">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-secondary shrink-0">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground line-clamp-2 mb-1">
            {product.name}
          </h4>
          <p className="text-sm text-muted-foreground">
            {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
          </p>
        </div>
      </div>
      
      {/* Features preview */}
      {product.features && (
        <div className="mb-6 pb-6 border-b border-border">
          <p className="text-sm text-muted-foreground mb-3">Includes:</p>
          <ul className="space-y-2">
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-foreground/80">
                <Check className="h-4 w-4 text-primary shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Pricing breakdown */}
      <div className="space-y-3 mb-6 pb-6 border-b border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">
            {formatPrice(hasDiscount ? product.originalPrice! : product.price, product.currency)}
          </span>
        </div>
        
        {hasDiscount && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-primary">Discount</span>
            <span className="text-primary">
              -{formatPrice(savings, product.currency)}
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between font-medium">
          <span className="text-foreground">Total</span>
          <span className="text-xl text-foreground font-mono">
            {formatPrice(product.price, product.currency)}
          </span>
        </div>
      </div>
      
      {/* Trust indicators */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-4 w-4 text-primary" />
          <span>Secure SSL encrypted checkout</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </div>
  )
}
