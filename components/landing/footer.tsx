import Link from 'next/link'
import { creatorProfile } from '@/lib/data'
import { Instagram, Twitter, Youtube, Linkedin } from 'lucide-react'

const footerLinks = {
  products: [
    { label: 'E-Books', href: '#products' },
    { label: 'Courses', href: '#products' },
    { label: 'Templates', href: '#products' },
    { label: 'Membership', href: '#products' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Help Center', href: '/help' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com' },
  { icon: Twitter, href: 'https://twitter.com' },
  { icon: Youtube, href: 'https://youtube.com' },
  { icon: Linkedin, href: 'https://linkedin.com' },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-foreground">
                {creatorProfile.name}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Premium digital products to help you build and scale your online business.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors"
                    aria-label={`Follow on ${link.icon.name}`}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground hover:text-primary" />
                  </a>
                )
              })}
            </div>
          </div>
          
          {/* Products */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {creatorProfile.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with care for creators everywhere.
          </p>
        </div>
      </div>
    </footer>
  )
}
