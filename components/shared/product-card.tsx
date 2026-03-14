'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/data'
import { BookOpen, GraduationCap, FileText, Crown, Briefcase, Check, ShoppingCart } from 'lucide-react'
import type { Product, ProductType } from '@/types'

const productTypeIcons: Record<ProductType, React.ElementType> = {
  ebook: BookOpen,
  course: GraduationCap,
  template: FileText,
  membership: Crown,
  service: Briefcase,
}

const productTypeLabels: Record<ProductType, string> = {
  ebook: 'E-Book',
  course: 'Course',
  template: 'Template',
  membership: 'Membership',
  service: 'Service',
}

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const TypeIcon = productTypeIcons[product.type]
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  return (
    <div
      className={`group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 ${
        featured ? 'md:col-span-2 md:flex-row' : ''
      }`}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-primary text-primary-foreground font-medium">
            {product.badge}
          </Badge>
        </div>
      )}
      
      {/* Image */}
      <div className={`relative overflow-hidden bg-secondary ${featured ? 'md:w-1/2' : 'aspect-video'}`}>
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content */}
      <div className={`flex flex-col flex-1 p-6 ${featured ? 'md:p-8' : ''}`}>
        {/* Type badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground">
            <TypeIcon className="h-3.5 w-3.5" />
            <span>{productTypeLabels[product.type]}</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className={`font-bold text-foreground mb-2 line-clamp-2 ${featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>
          {product.name}
        </h3>
        
        {/* Description */}
        <p className={`text-muted-foreground mb-4 line-clamp-2 ${featured ? 'md:line-clamp-3' : ''}`}>
          {product.shortDescription}
        </p>
        
        {/* Features (only for featured) */}
        {featured && product.features && (
          <ul className="mb-6 space-y-2">
            {product.features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-foreground/80">
                <Check className="h-4 w-4 text-primary shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        {/* Spacer */}
        <div className="flex-1" />
        
        {/* Price & CTA */}
        <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-border">
          {/* Price container */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-2xl font-bold text-foreground font-mono whitespace-nowrap">
                {formatPrice(product.price, product.currency)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through whitespace-nowrap">
                  {formatPrice(product.originalPrice!, product.currency)}
                </span>
              )}
            </div>
            {hasDiscount && (
              <span className="text-xs text-primary font-medium">
                Save {discountPercentage}%
              </span>
            )}
          </div>
          
          {/* Button container */}
          <div className="w-full">
            <Link href={`/checkout/${product.id}`} className="block">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <ShoppingCart className="h-4 w-4 shrink-0" />
                <span>Buy Now</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
