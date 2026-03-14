import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist-sans',
})
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Alex Digital - Digital Products & Courses',
  description: 'Premium digital products, courses, and templates to help you build and scale your online business. Join 5,000+ successful creators.',
  keywords: ['digital products', 'online courses', 'templates', 'creator economy', 'passive income'],
  authors: [{ name: 'Alex Digital' }],
  openGraph: {
    title: 'Alex Digital - Digital Products & Courses',
    description: 'Premium digital products, courses, and templates to help you build and scale your online business.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
