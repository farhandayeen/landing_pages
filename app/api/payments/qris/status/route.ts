import { NextResponse } from 'next/server'

// In a real application, you would query your database to check the order status
// For now, we'll return a mock response

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get('orderId')
  
  if (!orderId) {
    return NextResponse.json(
      { error: 'Missing orderId parameter' },
      { status: 400 }
    )
  }
  
  // TODO: In production, query your database for the actual order status
  // const order = await db.orders.findUnique({ where: { id: orderId } })
  
  // For demo purposes, return pending status
  // The actual status would be updated by the webhook
  return NextResponse.json({
    orderId,
    status: 'pending',
    // paidAt: null,
  })
}
