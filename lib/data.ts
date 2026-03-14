import type { Product, CreatorProfile, Testimonial } from '@/types'

export const creatorProfile: CreatorProfile = {
  name: 'Alex Digital',
  title: 'Digital Product Creator & Educator',
  bio: 'Helping creators build and sell digital products. I\'ve helped 5,000+ students launch their own profitable digital businesses through comprehensive guides and templates.',
  avatar: '/creator-avatar.jpg',
  verified: true,
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/alexdigital', label: '@alexdigital' },
    { platform: 'twitter', url: 'https://twitter.com/alexdigital', label: '@alexdigital' },
    { platform: 'youtube', url: 'https://youtube.com/@alexdigital', label: 'Alex Digital' },
    { platform: 'tiktok', url: 'https://tiktok.com/@alexdigital', label: '@alexdigital' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/alexdigital', label: 'Alex Digital' },
  ],
  achievements: [
    { icon: 'award', label: 'Top Creator 2024' },
    { icon: 'users', label: '5K+ Students' },
    { icon: 'star', label: '4.9 Rating' },
  ],
  stats: {
    customers: 5247,
    products: 12,
    rating: 4.9,
    reviews: 847,
  },
}

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'The Ultimate Digital Product Blueprint',
    description: 'A comprehensive 120-page guide covering everything you need to know about creating, launching, and scaling digital products. Includes market research templates, pricing strategies, and marketing playbooks.',
    shortDescription: 'Complete guide to creating and selling digital products',
    price: 299000,
    originalPrice: 499000,
    currency: 'IDR',
    type: 'ebook',
    thumbnail: '/products/blueprint-ebook.jpg',
    features: [
      '120+ pages of actionable content',
      '15 ready-to-use templates',
      'Market research framework',
      'Pricing calculator spreadsheet',
      'Lifetime updates included',
    ],
    isFeatured: true,
    badge: 'Best Seller',
  },
  {
    id: 'prod_002',
    name: 'Notion Business Dashboard',
    description: 'A complete business management system built in Notion. Track projects, clients, finances, and goals all in one place. Includes automated workflows and beautiful dashboards.',
    shortDescription: 'All-in-one Notion template for digital entrepreneurs',
    price: 149000,
    originalPrice: 249000,
    currency: 'IDR',
    type: 'template',
    thumbnail: '/products/notion-template.jpg',
    features: [
      'Project management system',
      'Client CRM database',
      'Financial tracker',
      'Goal setting framework',
      'Video tutorial included',
    ],
    badge: 'Popular',
  },
  {
    id: 'prod_003',
    name: 'Social Media Content Mastery',
    description: 'Learn how to create engaging content that grows your audience. 8 modules covering content strategy, video editing, copywriting, and analytics.',
    shortDescription: '8-module course on content creation',
    price: 599000,
    originalPrice: 899000,
    currency: 'IDR',
    type: 'course',
    thumbnail: '/products/social-course.jpg',
    features: [
      '8 comprehensive modules',
      '40+ video lessons',
      'Private community access',
      'Monthly Q&A sessions',
      'Certificate of completion',
    ],
    isFeatured: true,
    badge: 'New',
  },
  {
    id: 'prod_004',
    name: 'Canva Design Templates Bundle',
    description: '100+ professionally designed Canva templates for social media, presentations, and marketing materials. Fully customizable and brand-ready.',
    shortDescription: '100+ premium Canva templates',
    price: 199000,
    currency: 'IDR',
    type: 'template',
    thumbnail: '/products/canva-bundle.jpg',
    features: [
      '100+ unique templates',
      'Instagram, TikTok, YouTube',
      'Presentation templates',
      'Brand kit included',
      'Regular updates',
    ],
  },
  {
    id: 'prod_005',
    name: 'Email Marketing Playbook',
    description: 'Build an email list that converts. This playbook covers lead magnets, email sequences, and automation strategies that have generated millions in revenue.',
    shortDescription: 'Complete email marketing strategy guide',
    price: 249000,
    currency: 'IDR',
    type: 'ebook',
    thumbnail: '/products/email-playbook.jpg',
    features: [
      '80+ page guide',
      '10 email sequence templates',
      'Lead magnet ideas',
      'Automation workflows',
      'Case studies included',
    ],
  },
  {
    id: 'prod_006',
    name: 'Creator Membership',
    description: 'Get access to all current and future products, exclusive workshops, and our private community. New content added every month.',
    shortDescription: 'All-access pass to everything',
    price: 199000,
    currency: 'IDR',
    type: 'membership',
    thumbnail: '/products/membership.jpg',
    features: [
      'Access to all products',
      'Monthly workshops',
      'Private Discord community',
      '1-on-1 support',
      'Early access to new releases',
    ],
    badge: 'Best Value',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 'test_001',
    name: 'Sarah Chen',
    role: 'Digital Product Creator',
    avatar: '/testimonials/sarah.jpg',
    rating: 5,
    content: 'The Blueprint completely changed how I approach digital products. I launched my first course within 30 days and made back 10x my investment in the first month!',
    productPurchased: 'The Ultimate Digital Product Blueprint',
  },
  {
    id: 'test_002',
    name: 'Budi Santoso',
    role: 'Content Creator',
    avatar: '/testimonials/budi.jpg',
    rating: 5,
    content: 'Best investment I\'ve made for my business. The Notion template alone saves me hours every week. Everything is so well organized and easy to customize.',
    productPurchased: 'Notion Business Dashboard',
  },
  {
    id: 'test_003',
    name: 'Amanda Liu',
    role: 'Marketing Consultant',
    avatar: '/testimonials/amanda.jpg',
    rating: 5,
    content: 'The Social Media course is incredibly comprehensive. I\'ve taken many courses before, but this one actually provides actionable strategies that work.',
    productPurchased: 'Social Media Content Mastery',
  },
  {
    id: 'test_004',
    name: 'Reza Pratama',
    role: 'Freelance Designer',
    avatar: '/testimonials/reza.jpg',
    rating: 5,
    content: 'The Canva templates are gorgeous! My clients are always impressed with my social media designs now. Worth every rupiah.',
    productPurchased: 'Canva Design Templates Bundle',
  },
  {
    id: 'test_005',
    name: 'Jessica Tan',
    role: 'Online Business Owner',
    avatar: '/testimonials/jessica.jpg',
    rating: 5,
    content: 'The membership is an absolute no-brainer. I get access to everything plus the community support is incredible. Highly recommend!',
    productPurchased: 'Creator Membership',
  },
]

export const features = [
  {
    icon: 'zap',
    title: 'Instant Download',
    description: 'Get access to your products immediately after purchase. No waiting required.',
  },
  {
    icon: 'infinity',
    title: 'Lifetime Access',
    description: 'Buy once, own forever. Your products never expire and you get all future updates.',
  },
  {
    icon: 'refresh-cw',
    title: 'Regular Updates',
    description: 'All products are regularly updated with new content and improvements.',
  },
  {
    icon: 'shield-check',
    title: '30-Day Guarantee',
    description: 'Not satisfied? Get a full refund within 30 days, no questions asked.',
  },
  {
    icon: 'lock',
    title: 'Secure Payment',
    description: 'Your transactions are protected with bank-level SSL encryption.',
  },
  {
    icon: 'headphones',
    title: '24/7 Support',
    description: 'Get help anytime via email or our community Discord server.',
  },
]

export const paymentMethods = {
  qris: {
    name: 'QRIS',
    description: 'Scan with any e-wallet app',
    icon: 'qr-code',
  },
  ewallet: {
    name: 'E-Wallet',
    description: 'OVO, DANA, ShopeePay, GoPay',
    icon: 'wallet',
    options: ['OVO', 'DANA', 'SHOPEEPAY', 'GOPAY', 'LINKAJA'],
  },
  bank_transfer: {
    name: 'Bank Transfer',
    description: 'Virtual Account',
    icon: 'building',
    options: ['BCA', 'BNI', 'BRI', 'MANDIRI', 'PERMATA'],
  },
  credit_card: {
    name: 'Credit Card',
    description: 'Visa, Mastercard',
    icon: 'credit-card',
  },
}

export function formatPrice(amount: number, currency: string = 'IDR'): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}
