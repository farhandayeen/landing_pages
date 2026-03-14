import 'server-only'

// Xendit API Base URL
const XENDIT_API_URL = 'https://api.xendit.co'

// Helper to make authenticated requests to Xendit
async function xenditRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const apiKey = process.env.XENDIT_SECRET_KEY
  
  if (!apiKey) {
    throw new Error('XENDIT_SECRET_KEY is not set')
  }
  
  const response = await fetch(`${XENDIT_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Xendit API error: ${response.status}`)
  }
  
  return response.json()
}

// Types for Xendit API responses
export interface XenditQRCode {
  id: string
  external_id: string
  amount: number
  qr_string: string
  status: 'ACTIVE' | 'INACTIVE' | 'COMPLETED' | 'EXPIRED'
  created: string
  updated: string
  metadata?: Record<string, unknown>
  expires_at?: string
}

export interface XenditInvoice {
  id: string
  external_id: string
  user_id: string
  status: 'PENDING' | 'PAID' | 'SETTLED' | 'EXPIRED'
  merchant_name: string
  merchant_profile_picture_url: string
  amount: number
  payer_email: string
  description: string
  invoice_url: string
  expiry_date: string
  available_banks: Array<{
    bank_code: string
    collection_type: string
    bank_account_number: string
  }>
  available_retail_outlets: Array<{
    retail_outlet_name: string
  }>
  available_ewallets: Array<{
    ewallet_type: string
  }>
  should_exclude_credit_card: boolean
  should_send_email: boolean
  created: string
  updated: string
  currency: string
}

export interface XenditEwalletCharge {
  id: string
  business_id: string
  reference_id: string
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'VOIDED'
  currency: string
  charge_amount: number
  capture_amount: number
  payer_charged_currency: string
  payer_charged_amount: number
  channel_code: string
  channel_properties: {
    mobile_number?: string
    success_redirect_url?: string
    failure_redirect_url?: string
  }
  actions: {
    desktop_web_checkout_url?: string
    mobile_web_checkout_url?: string
    mobile_deeplink_checkout_url?: string
    qr_checkout_string?: string
  }
  is_redirect_required: boolean
  callback_url: string
  created: string
  updated: string
  voided_at?: string
  capture_now: boolean
  customer_id?: string
  payment_method_id?: string
  metadata?: Record<string, unknown>
}

export interface XenditVirtualAccount {
  id: string
  external_id: string
  owner_id: string
  bank_code: string
  merchant_code: string
  name: string
  account_number: string
  suggested_amount: number
  is_closed: boolean
  expiration_date: string
  is_single_use: boolean
  status: 'PENDING' | 'ACTIVE' | 'INACTIVE'
  currency: string
}

// Create a dynamic QRIS code
export async function createQRISCode(params: {
  externalId: string
  amount: number
  callbackUrl?: string
  metadata?: Record<string, unknown>
}): Promise<XenditQRCode> {
  return xenditRequest<XenditQRCode>('/qr_codes', {
    method: 'POST',
    body: JSON.stringify({
      external_id: params.externalId,
      type: 'DYNAMIC',
      currency: 'IDR',
      amount: params.amount,
      callback_url: params.callbackUrl,
      metadata: params.metadata,
    }),
  })
}

// Get QRIS code status
export async function getQRISCodeStatus(qrCodeId: string): Promise<XenditQRCode> {
  return xenditRequest<XenditQRCode>(`/qr_codes/${qrCodeId}`)
}

// Create an e-wallet charge
export async function createEwalletCharge(params: {
  referenceId: string
  amount: number
  currency?: string
  channelCode: 'ID_OVO' | 'ID_DANA' | 'ID_SHOPEEPAY' | 'ID_GOPAY' | 'ID_LINKAJA'
  mobileNumber?: string
  successRedirectUrl: string
  failureRedirectUrl: string
  callbackUrl?: string
  metadata?: Record<string, unknown>
}): Promise<XenditEwalletCharge> {
  return xenditRequest<XenditEwalletCharge>('/ewallets/charges', {
    method: 'POST',
    body: JSON.stringify({
      reference_id: params.referenceId,
      currency: params.currency || 'IDR',
      amount: params.amount,
      checkout_method: 'ONE_TIME_PAYMENT',
      channel_code: params.channelCode,
      channel_properties: {
        mobile_number: params.mobileNumber,
        success_redirect_url: params.successRedirectUrl,
        failure_redirect_url: params.failureRedirectUrl,
      },
      callback_url: params.callbackUrl,
      metadata: params.metadata,
    }),
  })
}

// Create a Virtual Account
export async function createVirtualAccount(params: {
  externalId: string
  bankCode: 'BCA' | 'BNI' | 'BRI' | 'MANDIRI' | 'PERMATA' | 'CIMB'
  name: string
  amount: number
  isClosed?: boolean
  isSingleUse?: boolean
  expirationDate?: string
  callbackUrl?: string
}): Promise<XenditVirtualAccount> {
  return xenditRequest<XenditVirtualAccount>('/callback_virtual_accounts', {
    method: 'POST',
    body: JSON.stringify({
      external_id: params.externalId,
      bank_code: params.bankCode,
      name: params.name,
      suggested_amount: params.amount,
      is_closed: params.isClosed ?? true,
      is_single_use: params.isSingleUse ?? true,
      expiration_date: params.expirationDate,
    }),
  })
}

// Get Virtual Account status
export async function getVirtualAccountStatus(vaId: string): Promise<XenditVirtualAccount> {
  return xenditRequest<XenditVirtualAccount>(`/callback_virtual_accounts/${vaId}`)
}

// Create an Invoice (alternative unified payment)
export async function createInvoice(params: {
  externalId: string
  amount: number
  payerEmail: string
  description: string
  successRedirectUrl?: string
  failureRedirectUrl?: string
  currency?: string
  invoiceDuration?: number // in seconds
}): Promise<XenditInvoice> {
  return xenditRequest<XenditInvoice>('/v2/invoices', {
    method: 'POST',
    body: JSON.stringify({
      external_id: params.externalId,
      amount: params.amount,
      payer_email: params.payerEmail,
      description: params.description,
      success_redirect_url: params.successRedirectUrl,
      failure_redirect_url: params.failureRedirectUrl,
      currency: params.currency || 'IDR',
      invoice_duration: params.invoiceDuration || 172800, // 48 hours default
    }),
  })
}

// Get Invoice status
export async function getInvoiceStatus(invoiceId: string): Promise<XenditInvoice> {
  return xenditRequest<XenditInvoice>(`/v2/invoices/${invoiceId}`)
}

// Verify Xendit webhook signature
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  webhookToken: string
): boolean {
  // Xendit uses x-callback-token header for verification
  return signature === webhookToken
}
