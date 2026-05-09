import React from 'react'

type BadgeVariant = 'blue' | 'violet' | 'green' | 'amber' | 'red' | 'grey' | 'cyan' | 'pink'

const variantStyles: Record<BadgeVariant, string> = {
  blue:   'bg-blue-500/10 border border-blue-500/25 text-blue-300',
  violet: 'bg-violet-500/10 border border-violet-500/25 text-violet-300',
  green:  'bg-emerald-500/10 border border-emerald-500/25 text-emerald-300',
  amber:  'bg-amber-500/10 border border-amber-500/25 text-amber-300',
  red:    'bg-red-500/10 border border-red-500/25 text-red-300',
  grey:   'bg-slate-500/10 border border-slate-500/25 text-slate-300',
  cyan:   'bg-cyan-500/10 border border-cyan-500/25 text-cyan-300',
  pink:   'bg-pink-500/10 border border-pink-500/25 text-pink-300',
}

export function maturityVariant(maturity: string): BadgeVariant {
  const m = maturity.toLowerCase()
  if (m.includes('production')) return 'green'
  if (m.includes('mvp')) return 'cyan'
  if (m.includes('active')) return 'blue'
  if (m.includes('prototype') || m.includes('working')) return 'amber'
  if (m.includes('archived')) return 'grey'
  if (m.includes('platform')) return 'violet'
  if (m.includes('r&d')) return 'violet'
  if (m.includes('client')) return 'pink'
  return 'grey'
}

export function visibilityVariant(visibility: string): BadgeVariant {
  return visibility.toLowerCase() === 'public' ? 'green' : 'grey'
}

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export default function Badge({ children, variant = 'blue', className = '' }: BadgeProps) {
  return (
    <span className={`badge ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  )
}
