import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getProductById } from '@/lib/data'

interface CreateStripePaymentRequest {
  productId: string
  customerEmail: string
  customerName?: string
  successUrl: string
  cancelUrl: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as CreateStripePaymentRequest
    const { productId, customerEmail, successUrl, cancelUrl } = body
    
    // Validate product exists and get price from server (never trust client)
    const product = getProductById(productId)
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }
    
    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    
    // Convert IDR to smallest unit (Stripe uses cents/smallest currency unit)
    // IDR doesn't have decimal places, so we use the amount as-is
    const amountInSmallestUnit = product.price
    
    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'idr',
            product_data: {
              name: product.name,
              description: product.shortDescription,
            },
            unit_amount: amountInSmallestUnit,
          },
          quantity: 1,
        },
      ],
      success_url: `${successUrl}?order_id=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      metadata: {
        orderId,
        productId,
      },
    })
    
    return NextResponse.json({
      success: true,
      orderId,
      paymentUrl: session.url,
      sessionId: session.id,
    })
    
  } catch (error) {
    console.error('Stripe payment creation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create payment' 
      },
      { status: 500 }
    )
  }
}
