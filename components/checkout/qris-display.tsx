'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { formatPrice } from '@/lib/data'
import { Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface QRISDisplayProps {
  qrString: string
  amount: number
  currency: string
  expiresAt: Date
  orderId: string
  onPaymentComplete: () => void
}

export function QRISDisplay({
  qrString,
  amount,
  currency,
  expiresAt,
  orderId,
  onPaymentComplete,
}: QRISDisplayProps) {
  const [timeLeft, setTimeLeft] = useState<string>('')
  const [isExpired, setIsExpired] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [status, setStatus] = useState<'pending' | 'paid' | 'expired'>('pending')
  
  // Countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()
      const diff = expiresAt.getTime() - now.getTime()
      
      if (diff <= 0) {
        setIsExpired(true)
        setStatus('expired')
        setTimeLeft('00:00:00')
        return
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      )
    }
    
    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    
    return () => clearInterval(interval)
  }, [expiresAt])
  
  // Auto-check payment status
  useEffect(() => {
    if (status !== 'pending') return
    
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/payments/qris/status?orderId=${orderId}`)
        const data = await response.json()
        
        if (data.status === 'paid') {
          setStatus('paid')
          onPaymentComplete()
        }
      } catch (error) {
        console.error('Failed to check payment status:', error)
      }
    }
    
    const interval = setInterval(checkStatus, 5000) // Check every 5 seconds
    
    return () => clearInterval(interval)
  }, [orderId, status, onPaymentComplete])
  
  const handleManualCheck = async () => {
    setIsChecking(true)
    try {
      const response = await fetch(`/api/payments/qris/status?orderId=${orderId}`)
      const data = await response.json()
      
      if (data.status === 'paid') {
        setStatus('paid')
        onPaymentComplete()
      }
    } catch (error) {
      console.error('Failed to check payment status:', error)
    } finally {
      setIsChecking(false)
    }
  }
  
  if (status === 'paid') {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Payment Successful
        </h3>
        <p className="text-muted-foreground">
          Your payment has been confirmed. Redirecting...
        </p>
      </div>
    )
  }
  
  if (isExpired) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mb-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Payment Expired
        </h3>
        <p className="text-muted-foreground mb-4">
          This QR code has expired. Please create a new payment.
        </p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col items-center p-6">
      {/* Amount */}
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground mb-1">Amount to pay</p>
        <p className="text-3xl font-bold text-foreground font-mono">
          {formatPrice(amount, currency)}
        </p>
      </div>
      
      {/* QR Code */}
      <div className="relative p-4 bg-white rounded-2xl mb-6">
        <Image
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrString)}`}
          alt="QRIS Payment Code"
          width={200}
          height={200}
          className="rounded-lg"
          unoptimized
        />
      </div>
      
      {/* Timer */}
      <div className="flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-secondary">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Expires in:</span>
        <span className="font-mono font-medium text-foreground">{timeLeft}</span>
      </div>
      
      {/* Instructions */}
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground">
          Scan this QR code with any e-wallet app that supports QRIS
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          (GoPay, OVO, DANA, ShopeePay, LinkAja, etc.)
        </p>
      </div>
      
      {/* Manual check button */}
      <Button
        variant="outline"
        onClick={handleManualCheck}
        disabled={isChecking}
        className="w-full"
      >
        {isChecking ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Checking...
          </>
        ) : (
          "I've completed payment"
        )}
      </Button>
    </div>
  )
}
