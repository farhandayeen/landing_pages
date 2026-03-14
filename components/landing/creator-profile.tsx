'use client'

import Image from 'next/image'
import { creatorProfile } from '@/lib/data'
import { BadgeCheck, Instagram, Twitter, Youtube, Linkedin, Globe, Award, Users, Star } from 'lucide-react'
import type { SocialLink } from '@/types'

const socialIcons: Record<SocialLink['platform'], React.ElementType> = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  tiktok: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  ),
  linkedin: Linkedin,
  website: Globe,
  github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
}

const achievementIcons: Record<string, React.ElementType> = {
  award: Award,
  users: Users,
  star: Star,
}

export function CreatorProfile() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Glass card */}
        <div className="relative backdrop-blur-xl bg-card/50 border border-border rounded-3xl p-8 sm:p-12 overflow-hidden">
          {/* Gradient accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-primary to-accent p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-card">
                  <Image
                    src={creatorProfile.avatar}
                    alt={creatorProfile.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              {/* Verified badge */}
              {creatorProfile.verified && (
                <div className="absolute -bottom-1 -right-1 p-2 rounded-full bg-primary">
                  <BadgeCheck className="h-5 w-5 text-primary-foreground" />
                </div>
              )}
            </div>
            
            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              {/* Name & Title */}
              <div className="mb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center justify-center md:justify-start gap-2">
                  {creatorProfile.name}
                  {creatorProfile.verified && (
                    <BadgeCheck className="h-6 w-6 text-primary" />
                  )}
                </h2>
                <p className="text-muted-foreground mt-1">{creatorProfile.title}</p>
              </div>
              
              {/* Bio */}
              <p className="text-foreground/80 mb-6 max-w-xl text-pretty">
                {creatorProfile.bio}
              </p>
              
              {/* Achievements */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                {creatorProfile.achievements.map((achievement, index) => {
                  const Icon = achievementIcons[achievement.icon] || Award
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-sm"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-foreground">{achievement.label}</span>
                    </div>
                  )
                })}
              </div>
              
              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                {creatorProfile.socialLinks.map((link) => {
                  const Icon = socialIcons[link.platform]
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-secondary hover:bg-primary/20 border border-border hover:border-primary/50 transition-all duration-200 group"
                      aria-label={`Follow on ${link.platform}`}
                    >
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
