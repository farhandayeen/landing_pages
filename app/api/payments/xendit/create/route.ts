import { NextResponse } from 'next/server'
import { getProductById } from '@/lib/data'
import { createQRISCode, createEwalletCharge, createVirtualAccount } from '@/lib/xendit'
import type { CreatePaymentRequest, CreatePaymentResponse, EwalletType, BankCode } from '@/types'

// Map e-wallet types to Xendit channel codes
const ewalletChannelMap: Record<EwalletType, 'ID_OVO' | 'ID_DANA' | 'ID_SHOPEEPAY' | 'ID_GOPAY' | 'ID_LINKAJA'> = {
  OVO: 'ID_OVO',
  DANA: 'ID_DANA',
  SHOPEEPAY: 'ID_SHOPEEPAY',
  GOPAY: 'ID_GOPAY',
  LINKAJA: 'ID_LINKAJA',
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as CreatePaymentRequest
    const { productId, paymentMethod, customerEmail, customerName, ewalletType, bankCode } = body
    
    // Validate product exists and get price from server (never trust client)
    const product = getProductById(productId)
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' } as CreatePaymentResponse,
        { status: 404 }
      )
    }
    
    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    
    // Handle QRIS payment
    if (paymentMethod === 'qris') {
      const qrCode = await createQRISCode({
        externalId: orderId,
        amount: product.price,
        callbackUrl: `${baseUrl}/api/payments/xendit/webhook`,
        metadata: {
          productId,
          customerEmail,
          customerName,
        },
      })
      
      // QRIS expires in 48 hours by default
      const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
      
      return NextResponse.json({
        success: true,
        orderId,
        qrisString: qrCode.qr_string,
        amount: product.price,
        expiresAt,
      } as CreatePaymentResponse)
    }
    
    // Handle e-wallet payment
    if (paymentMethod === 'ewallet' && ewalletType) {
      const channelCode = ewalletChannelMap[ewalletType]
      if (!channelCode) {
        return NextResponse.json(
          { success: false, error: 'Invalid e-wallet type' } as CreatePaymentResponse,
          { status: 400 }
        )
      }
      
      const charge = await createEwalletCharge({
        referenceId: orderId,
        amount: product.price,
        channelCode,
        successRedirectUrl: `${baseUrl}/success?order_id=${orderId}`,
        failureRedirectUrl: `${baseUrl}/checkout/${productId}?error=payment_failed`,
        callbackUrl: `${baseUrl}/api/payments/xendit/webhook`,
        metadata: {
          productId,
          customerEmail,
          customerName,
        },
      })
      
      // Get the appropriate checkout URL
      const paymentUrl = charge.actions.mobile_web_checkout_url 
        || charge.actions.desktop_web_checkout_url
        || charge.actions.mobile_deeplink_checkout_url
      
      return NextResponse.json({
        success: true,
        orderId,
        paymentUrl,
        amount: product.price,
      } as CreatePaymentResponse)
    }
    
    // Handle bank transfer (Virtual Account)
    if (paymentMethod === 'bank_transfer' && bankCode) {
      const validBanks: BankCode[] = ['BCA', 'BNI', 'BRI', 'MANDIRI', 'PERMATA', 'CIMB']
      if (!validBanks.includes(bankCode)) {
        return NextResponse.json(
          { success: false, error: 'Invalid bank code' } as CreatePaymentResponse,
          { status: 400 }
        )
      }
      
      // VA expires in 24 hours
      const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      
      const va = await createVirtualAccount({
        externalId: orderId,
        bankCode: bankCode,
        name: customerName || 'Customer',
        amount: product.price,
        isClosed: true,
        isSingleUse: true,
        expirationDate,
      })
      
      return NextResponse.json({
        success: true,
        orderId,
        virtualAccountNumber: va.account_number,
        bankCode: va.bank_code,
        amount: product.price,
        expiresAt: expirationDate,
      } as CreatePaymentResponse)
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid payment method or missing required fields' } as CreatePaymentResponse,
      { status: 400 }
    )
    
  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create payment' 
      } as CreatePaymentResponse,
      { status: 500 }
    )
  }
}
