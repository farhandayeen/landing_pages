'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, Download, ArrowLeft, Mail, Share2 } from 'lucide-react'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Success icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl" />
          <div className="relative w-24 h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>
        
        {/* Success message */}
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground mb-2">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        {orderId && (
          <p className="text-sm text-muted-foreground mb-8">
            Order ID: <span className="font-mono text-foreground">{orderId}</span>
          </p>
        )}
        
        {/* What happens next */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8 text-left">
          <h2 className="font-semibold text-foreground mb-4">What happens next?</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Check your email</p>
                <p className="text-sm text-muted-foreground">
                  We&apos;ve sent a confirmation email with your receipt and download links.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Download className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Download your product</p>
                <p className="text-sm text-muted-foreground">
                  Access your digital product instantly via the download link in your email.
                </p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Share2 className="h-4 w-4" />
            Share Purchase
          </Button>
        </div>
        
        {/* Support note */}
        <p className="text-sm text-muted-foreground mt-8">
          Need help? Contact us at{' '}
          <a href="mailto:support@example.com" className="text-primary hover:underline">
            support@example.com
          </a>
        </p>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
