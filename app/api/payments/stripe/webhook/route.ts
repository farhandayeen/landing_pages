import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }
  
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }
  
  let event: Stripe.Event
  
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }
  
  console.log('Stripe webhook received:', event.type)
  
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const orderId = session.metadata?.orderId
      const productId = session.metadata?.productId
      
      console.log(`Payment completed for order ${orderId}, product: ${productId}`)
      
      // TODO: Update order status in database
      // await updateOrderStatus(orderId, 'paid', { 
      //   paidAt: new Date(),
      //   stripeSessionId: session.id,
      // })
      
      // TODO: Send confirmation email
      // await sendConfirmationEmail(session.customer_email, productId)
      
      break
    }
    
    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session
      const orderId = session.metadata?.orderId
      
      console.log(`Checkout session expired for order ${orderId}`)
      
      // TODO: Update order status in database
      // await updateOrderStatus(orderId, 'expired')
      
      break
    }
    
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      
      console.log(`Payment failed: ${paymentIntent.last_payment_error?.message}`)
      
      break
    }
    
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }
  
  return NextResponse.json({ received: true })
}
