import React, { useState } from 'react'
import { Copy, Check, Github, Mail, ExternalLink, Layers, Cpu, Package, Compass, Network } from 'lucide-react'
import { useInView } from '../../hooks/useInView'

const CARDS = [
  {
    icon: Layers,
    title: 'Execution Volume',
    body: '130 repositories show repeated building activity, not isolated experimentation. Volume here is evidence of consistency, not noise.',
    color: '#3b82f6',
  },
  {
    icon: Cpu,
    title: 'Technical Range',
    body: 'The work spans frontend, backend, APIs, cloud concepts, marketplaces, automation, commerce, education, Web3, games, dashboards, and platform systems — including a custom Linux OS built with Buildroot.',
    color: '#8b5cf6',
  },
  {
    icon: Package,
    title: 'Product Thinking',
    body: 'Many repositories connect into broader ecosystems: client portals, recruiter systems, marketplaces, academy layers, boardrooms, stores, and OS-style workspaces. Not isolated code — connected product thinking.',
    color: '#10b981',
  },
  {
    icon: Compass,
    title: 'Founder-Builder Mindset',
    body: 'The portfolio demonstrates initiative, self-direction, technical curiosity, and the ability to identify a product need, prototype it, and package it into a usable experience.',
    color: '#f59e0b',
  },
  {
    icon: Network,
    title: 'Systems Thinking',
    body: 'The strongest projects show movement from individual apps toward connected product ecosystems and reusable platform concepts. Not just a developer — a systems builder.',
    color: '#ec4899',
  },
]

const RECRUITER_SUMMARY = `Adrin N Makombe — Builder Portfolio Summary

130+ repositories across 24 product categories demonstrating:
- Platform thinking (ZyntrixOS, OkamaOS, Humba Cloud, API Router)
- Product systems (Marketplace, Client Portal, Recruiter Platform, Academy)
- Business automation & growth tools
- Commerce, booking, and e-commerce platforms
- Content automation and creator tools
- Blockchain/Web3 and AI integration

17 live demos/screenshots available for verification.

Best-fit roles: Full-stack developer, Product engineer, Founding engineer, Platform-minded developer, Automation/internal tools developer.

Contact: amakodev@gmail.com | amakodev.github.io/portfolio | github.com/amakodev | linkedin.com/in/amakodevz`

export default function S16FinalPitch() {
  const { inView, ref } = useInView()
  const [summaryCopied, setSummaryCopied] = useState(false)

  const copySummary = () => {
    navigator.clipboard.writeText(RECRUITER_SUMMARY)
    setSummaryCopied(true)
    setTimeout(() => setSummaryCopied(false), 2500)
  }

  return (
    <section id="final-pitch" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(99,102,241,0.12), transparent 70%), radial-gradient(ellipse 50% 40% at 0% 50%, rgba(139,92,246,0.08), transparent)',
        }}
      />
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <div className="section-label mb-3">Final Pitch</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              What this portfolio <span className="grad-text">proves</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {CARDS.slice(0, 3).map((card, i) => (
              <PitchCard key={i} {...card} delay={i * 100} inView={inView} />
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-14">
            {CARDS.slice(3).map((card, i) => (
              <PitchCard key={i} {...card} delay={(i + 3) * 100} inView={inView} />
            ))}
          </div>

          {/* CTA Block */}
          <div
            className="glass-strong p-8 sm:p-12 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))', borderColor: 'rgba(99,102,241,0.2)' }}
          >
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Looking for a builder who can move from idea to working system?
            </h3>
            <p className="text-slate-400 text-sm mb-8 max-w-xl mx-auto">
              17 live demos. 130+ repositories. 24 product categories. Evidence-backed, systems-oriented, product-minded.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <a
                href="mailto:amakodev@gmail.com"
                className="btn-primary text-sm px-6 py-3"
              >
                <Mail size={14} /> Contact Adrin
              </a>
              <a
                href="https://github.com/amakodev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm px-6 py-3"
              >
                <Github size={14} /> View GitHub
              </a>
              <a
                href="https://linkedin.com/in/amakodevz"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm px-6 py-3"
              >
                <ExternalLink size={14} /> LinkedIn
              </a>
              <button
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary text-sm px-6 py-3"
              >
                View Demos
              </button>
              <button onClick={copySummary} className="btn-secondary text-sm px-6 py-3">
                {summaryCopied ? <><Check size={14} className="text-green-400" /> Copied</> : <><Copy size={14} /> Copy Recruiter Summary</>}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
              <span>amakodev@gmail.com</span>
              <span className="hidden sm:block">·</span>
              <a href="https://amakodev.github.io" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">amakodev.github.io</a>
              <span className="hidden sm:block">·</span>
              <span>+27 79 407 5794</span>
              <span className="hidden sm:block">·</span>
              <span>Cape Town, SA · Remote Available</span>
              <span className="hidden sm:block">·</span>
              <span>Contract / Full-time Open</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PitchCard({ icon: Icon, title, body, color, delay, inView }: {
  icon: React.ElementType; title: string; body: string; color: string; delay: number; inView: boolean
}) {
  return (
    <div
      className="glass border border-white/8 p-5 transition-all duration-700"
      style={{ transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)' }}
    >
      <div
        className="inline-flex p-2.5 rounded-xl mb-3"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <h3 className="text-white font-bold text-sm mb-2">{title}</h3>
      <p className="text-slate-400 text-xs leading-relaxed">{body}</p>
    </div>
  )
}
