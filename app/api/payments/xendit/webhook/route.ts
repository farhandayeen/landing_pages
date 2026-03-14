import { NextResponse } from 'next/server'
import { verifyWebhookSignature } from '@/lib/xendit'

// Xendit webhook payload types
interface QRISCallback {
  event: 'qr.payment'
  id: string
  qr_code: {
    id: string
    external_id: string
    amount: number
    status: 'COMPLETED'
  }
  amount: number
  created: string
}

interface EwalletCallback {
  event: 'ewallet.capture'
  id: string
  business_id: string
  reference_id: string
  status: 'SUCCEEDED' | 'FAILED' | 'PENDING'
  currency: string
  charge_amount: number
  capture_amount: number
  channel_code: string
  created: string
  updated: string
  metadata?: Record<string, unknown>
}

interface VirtualAccountCallback {
  id: string
  payment_id: string
  callback_virtual_account_id: string
  owner_id: string
  external_id: string
  bank_code: string
  merchant_code: string
  account_number: string
  amount: number
  transaction_timestamp: string
  currency: string
}

type WebhookPayload = QRISCallback | EwalletCallback | VirtualAccountCallback

export async function POST(request: Request) {
  try {
    // Get webhook verification token from header
    const callbackToken = request.headers.get('x-callback-token')
    const webhookToken = process.env.XENDIT_WEBHOOK_VERIFICATION_TOKEN
    
    // Verify webhook signature
    if (webhookToken && callbackToken) {
      if (!verifyWebhookSignature('', callbackToken, webhookToken)) {
        console.error('Invalid webhook signature')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }
    
    const payload = await request.json() as WebhookPayload
    
    console.log('Xendit webhook received:', JSON.stringify(payload, null, 2))
    
    // Handle QRIS payment callback
    if ('event' in payload && payload.event === 'qr.payment') {
      const orderId = payload.qr_code.external_id
      const amount = payload.amount
      
      // TODO: Update order status in database
      // await updateOrderStatus(orderId, 'paid', { paidAt: new Date() })
      
      console.log(`QRIS Payment completed for order ${orderId}, amount: ${amount}`)
      
      return NextResponse.json({ success: true })
    }
    
    // Handle e-wallet callback
    if ('event' in payload && payload.event === 'ewallet.capture') {
      const orderId = payload.reference_id
      const status = payload.status
      
      if (status === 'SUCCEEDED') {
        // TODO: Update order status in database
        // await updateOrderStatus(orderId, 'paid', { paidAt: new Date() })
        console.log(`E-wallet payment succeeded for order ${orderId}`)
      } else if (status === 'FAILED') {
        // TODO: Update order status in database
        // await updateOrderStatus(orderId, 'failed')
        console.log(`E-wallet payment failed for order ${orderId}`)
      }
      
      return NextResponse.json({ success: true })
    }
    
    // Handle Virtual Account callback (no 'event' field, check by structure)
    if ('callback_virtual_account_id' in payload) {
      const orderId = payload.external_id
      const amount = payload.amount
      
      // TODO: Update order status in database
      // await updateOrderStatus(orderId, 'paid', { paidAt: new Date() })
      
      console.log(`VA Payment completed for order ${orderId}, amount: ${amount}`)
      
      return NextResponse.json({ success: true })
    }
    
    // Unknown webhook type
    console.log('Unknown webhook type:', payload)
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Xendit may send GET requests for webhook validation
export async function GET() {
  return NextResponse.json({ status: 'ok' })
}
