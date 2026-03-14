'use client'

import { useState } from 'react'
import { products } from '@/lib/data'
import { ProductCard } from '@/components/shared/product-card'
import type { ProductType } from '@/types'

const categories: { value: ProductType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'ebook', label: 'E-Books' },
  { value: 'course', label: 'Courses' },
  { value: 'template', label: 'Templates' },
  { value: 'membership', label: 'Membership' },
]

export function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState<ProductType | 'all'>('all')
  
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.type === activeCategory)
  
  const featuredProduct = products.find(p => p.isFeatured)
  const regularProducts = filteredProducts.filter(p => p.id !== featuredProduct?.id)

  return (
    <section id="products" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Digital Products
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to launch and grow your digital business. 
            Instant access after purchase.
          </p>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Featured product */}
        {/*{activeCategory === 'all' && featuredProduct && (
          <div className="mb-8">
            <ProductCard product={featuredProduct} featured />
          </div>
        )} */}
        
        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
