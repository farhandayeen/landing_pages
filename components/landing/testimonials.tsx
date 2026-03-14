'use client'

import Image from 'next/image'
import { testimonials } from '@/lib/data'
import { Star, Quote } from 'lucide-react'

export function Testimonials() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Customers Say
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join thousands of satisfied customers who have transformed their businesses.
          </p>
        </div>
        
        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative flex flex-col p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
              
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-foreground/90 mb-6 flex-1 text-pretty">
                &quot;{testimonial.content}&quot;
              </p>
              
              {/* Product purchased */}
              {testimonial.productPurchased && (
                <p className="text-xs text-muted-foreground mb-4 px-2 py-1 bg-secondary rounded-md inline-block w-fit">
                  Purchased: {testimonial.productPurchased}
                </p>
              )}
              
              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
