'use client'

import { useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { getProductById, formatPrice } from '@/lib/data'
import { PaymentMethodSelector } from '@/components/checkout/payment-method-selector'
import { QRISDisplay } from '@/components/checkout/qris-display'
import { OrderSummary } from '@/components/checkout/order-summary'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Loader2 } from 'lucide-react'
import type { PaymentMethod, EwalletType, BankCode, CreatePaymentResponse } from '@/types'

export default function CheckoutPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.productId as string
  const product = getProductById(productId)
  
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [selectedEwallet, setSelectedEwallet] = useState<EwalletType | null>(null)
  const [selectedBank, setSelectedBank] = useState<BankCode | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentData, setPaymentData] = useState<CreatePaymentResponse | null>(null)
  
  const handlePaymentComplete = useCallback(() => {
    router.push(`/success?order_id=${paymentData?.orderId}`)
  }, [router, paymentData])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedMethod) {
      setError('Please select a payment method')
      return
    }
    
    if (selectedMethod === 'ewallet' && !selectedEwallet) {
      setError('Please select an e-wallet provider')
      return
    }
    
    if (selectedMethod === 'bank_transfer' && !selectedBank) {
      setError('Please select a bank')
      return
    }
    
    if (!email) {
      setError('Please enter your email')
      return
    }
    
    setIsProcessing(true)
    setError(null)
    
    try {
      // For credit card, redirect to Stripe
      if (selectedMethod === 'credit_card') {
        const response = await fetch('/api/payments/stripe/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId,
            customerEmail: email,
            customerName: name,
            successUrl: `${window.location.origin}/success`,
            cancelUrl: window.location.href,
          }),
        })
        
        const data = await response.json()
        
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl
          return
        }
        
        throw new Error(data.error || 'Failed to create payment')
      }
      
      // For QRIS, e-wallet, bank transfer - use Xendit
      const response = await fetch('/api/payments/xendit/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          paymentMethod: selectedMethod,
          customerEmail: email,
          customerName: name,
          ewalletType: selectedEwallet,
          bankCode: selectedBank,
        }),
      })
      
      const data: CreatePaymentResponse = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to create payment')
      }
      
      // For QRIS, show QR code
      if (selectedMethod === 'qris' && data.qrisString) {
        setPaymentData(data)
        return
      }
      
      // For e-wallet, redirect to payment URL
      if (selectedMethod === 'ewallet' && data.paymentUrl) {
        window.location.href = data.paymentUrl
        return
      }
      
      // For bank transfer, show VA number (we'll implement this UI)
      if (selectedMethod === 'bank_transfer' && data.virtualAccountNumber) {
        setPaymentData(data)
        return
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsProcessing(false)
    }
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Product not found
          </h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }
  
  // Show QRIS payment screen
  if (paymentData?.qrisString) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-md mx-auto">
          <Link
            href={`/checkout/${productId}`}
            onClick={(e) => {
              e.preventDefault()
              setPaymentData(null)
            }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Change payment method
          </Link>
          
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <QRISDisplay
              qrString={paymentData.qrisString}
              amount={paymentData.amount}
              currency="IDR"
              expiresAt={new Date(paymentData.expiresAt || Date.now() + 48 * 60 * 60 * 1000)}
              orderId={paymentData.orderId}
              onPaymentComplete={handlePaymentComplete}
            />
          </div>
        </div>
      </div>
    )
  }
  
  // Show Virtual Account payment screen
  if (paymentData?.virtualAccountNumber) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-md mx-auto">
          <Link
            href={`/checkout/${productId}`}
            onClick={(e) => {
              e.preventDefault()
              setPaymentData(null)
            }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Change payment method
          </Link>
          
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
              Bank Transfer
            </h3>
            
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-1">Transfer to</p>
              <p className="text-lg font-medium text-foreground mb-1">
                Bank {paymentData.bankCode}
              </p>
              <p className="text-2xl font-mono font-bold text-primary">
                {paymentData.virtualAccountNumber}
              </p>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-1">Amount</p>
              <p className="text-3xl font-bold text-foreground font-mono">
                {formatPrice(paymentData.amount, 'IDR')}
              </p>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="mb-2">
                Transfer the exact amount to complete your payment.
              </p>
              <p>
                Payment will be automatically verified within a few minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main checkout form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit}>
              <div className="bg-card border border-border rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Checkout
                </h2>
                
                {/* Customer info */}
                <div className="space-y-4 mb-8">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="bg-secondary border-border"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Your purchase confirmation will be sent here
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name (Optional)
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>
                
                {/* Payment method selector */}
                <PaymentMethodSelector
                  selectedMethod={selectedMethod}
                  onSelectMethod={setSelectedMethod}
                  selectedEwallet={selectedEwallet}
                  onSelectEwallet={setSelectedEwallet}
                  selectedBank={selectedBank}
                  onSelectBank={setSelectedBank}
                />
              </div>
              
              {/* Error message */}
              {error && (
                <div className="bg-destructive/10 border border-destructive/50 text-destructive rounded-lg p-4 mb-6">
                  {error}
                </div>
              )}
              
              {/* Submit button */}
              <Button
                type="submit"
                size="lg"
                disabled={isProcessing || !selectedMethod}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-xl"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ${formatPrice(product.price, product.currency)}`
                )}
              </Button>
            </form>
          </div>
          
          {/* Order summary sidebar */}
          <div className="lg:col-span-2">
            <OrderSummary product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}
