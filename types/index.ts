// Product Types
export type ProductType = 'ebook' | 'course' | 'template' | 'membership' | 'service'

export interface Product {
  id: string
  name: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  currency: string
  type: ProductType
  thumbnail: string
  features: string[]
  downloadUrl?: string
  isFeatured?: boolean
  badge?: string
}

// Creator Profile
export interface SocialLink {
  platform: 'instagram' | 'twitter' | 'youtube' | 'tiktok' | 'linkedin' | 'website' | 'github'
  url: string
  label?: string
}

export interface CreatorProfile {
  name: string
  title: string
  bio: string
  avatar: string
  verified: boolean
  socialLinks: SocialLink[]
  achievements: Achievement[]
  stats: CreatorStats
}

export interface Achievement {
  icon: string
  label: string
}

export interface CreatorStats {
  customers: number
  products: number
  rating: number
  reviews: number
}

// Testimonials
export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  rating: number
  content: string
  productPurchased?: string
}

// Payment Types
export type PaymentMethod = 'qris' | 'ewallet' | 'bank_transfer' | 'credit_card'
export type PaymentProvider = 'xendit' | 'stripe'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'expired' | 'refunded'

export type EwalletType = 'OVO' | 'DANA' | 'SHOPEEPAY' | 'GOPAY' | 'LINKAJA'
export type BankCode = 'BCA' | 'BNI' | 'BRI' | 'MANDIRI' | 'PERMATA' | 'CIMB'

export interface Order {
  id: string
  productId: string
  customerEmail: string
  customerName?: string
  amount: number
  currency: string
  paymentMethod: PaymentMethod
  paymentProvider: PaymentProvider
  externalId: string
  status: PaymentStatus
  createdAt: Date
  paidAt?: Date
  expiresAt?: Date
  qrisString?: string
  virtualAccountNumber?: string
  bankCode?: BankCode
}

// API Response Types
export interface CreatePaymentRequest {
  productId: string
  paymentMethod: PaymentMethod
  customerEmail: string
  customerName?: string
  ewalletType?: EwalletType
  bankCode?: BankCode
}

export interface CreatePaymentResponse {
  success: boolean
  orderId: string
  paymentUrl?: string
  qrisString?: string
  virtualAccountNumber?: string
  bankCode?: string
  expiresAt?: string
  amount: number
  error?: string
}

export interface PaymentStatusResponse {
  orderId: string
  status: PaymentStatus
  paidAt?: string
}

// QRIS Types
export interface QRISData {
  qrString: string
  amount: number
  expiresAt: Date
  referenceId: string
}
