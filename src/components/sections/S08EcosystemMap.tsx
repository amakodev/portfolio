import React, { useState } from 'react'
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { useInView } from '../../hooks/useInView'
import portfolioStoryData from '../../data/portfolioStory.json'
import type { PortfolioLayer } from '../../types'

const layers = portfolioStoryData as PortfolioLayer[]

const THEME_COLORS: Record<string, string> = {
  'OS-style Platform / Workspace R&D': '#8b5cf6',
  'Cloud Platform / Infrastructure': '#6366f1',
  'API Gateway / Integration Infrastructure': '#3b82f6',
  'Backend / Infrastructure': '#0ea5e9',
  'Zyntrix Ecosystem': '#8b5cf6',
  'Marketplace / Multi-sided Platform': '#3b82f6',
  'Client Portal': '#06b6d4',
  'Recruitment Platform': '#14b8a6',
  'Learning / Academy Platform': '#10b981',
  'Internal Operations / Boardroom': '#22c55e',
  'Commerce Platform': '#22c55e',
  'E-commerce / Commerce': '#84cc16',
  'Booking / Travel / Reservations': '#a3e635',
  'Business Systems / POS': '#eab308',
  'Business Automation / Sales Funnels': '#f59e0b',
  'Content Automation / Creator Platform': '#f97316',
  'Affiliate / Growth Platform': '#ef4444',
  'AI / Decision Support': '#ec4899',
  'General Software / Prototype': '#94a3b8',
  'Games / Interactive Systems': '#a78bfa',
  'Blockchain / Web3 / Client Systems': '#818cf8',
  'Education / AI Learning': '#60a5fa',
  'Web / Marketing Site': '#7dd3fc',
}

export default function S08EcosystemMap() {
  const { inView, ref } = useInView()
  const [expanded, setExpanded] = useState<string | null>(null)

  const sorted = [...layers].sort((a, b) => b['Repo Count'] - a['Repo Count'])

  return (
    <section id="ecosystem" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(99,102,241,0.05), transparent)' }}
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <div className="section-label mb-3">Portfolio Ecosystem</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Portfolio <span className="grad-text">Ecosystem Map</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              23 distinct portfolio layers built across 130 repositories. Each node represents a product area with real execution evidence behind it.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {sorted.map((layer, i) => {
              const color = THEME_COLORS[layer['Portfolio Layer']] ?? '#64748b'
              const isOpen = expanded === layer['Portfolio Layer']
              const repRepos = layer['Representative Repos']
                .split(',')
                .map(r => r.trim())
                .filter(Boolean)

              return (
                <div
                  key={i}
                  className="glass border transition-all duration-500"
                  style={{
                    borderColor: isOpen ? `${color}50` : 'rgba(255,255,255,0.07)',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'none' : 'translateY(12px)',
                    transitionDelay: `${Math.min(i * 30, 600)}ms`,
                  }}
                >
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => setExpanded(isOpen ? null : layer['Portfolio Layer'])}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-2xl font-black"
                        style={{ color }}
                      >
                        {layer['Repo Count']}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-slate-500">repos</span>
                        {isOpen ? <ChevronUp size={12} className="text-slate-500" /> : <ChevronDown size={12} className="text-slate-500" />}
                      </div>
                    </div>
                    <h3 className="text-white text-xs font-semibold leading-tight">{layer['Portfolio Layer']}</h3>
                  </div>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-0 border-t space-y-3" style={{ borderColor: `${color}20` }}>
                      <p className="text-slate-400 text-xs leading-relaxed pt-3">{layer.Story}</p>
                      <div className="text-xs">
                        <span className="font-medium" style={{ color }}>Recruiter view: </span>
                        <span className="text-slate-400">{layer['Recruiter Interpretation']}</span>
                      </div>
                      {repRepos.length > 0 && (
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-1.5">Representative repos</div>
                          <div className="space-y-1">
                            {repRepos.slice(0, 4).map(r => (
                              <a
                                key={r}
                                href={`https://github.com/${r}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 transition-colors"
                              >
                                <ArrowRight size={8} /> {r}
                              </a>
                            ))}
                            {repRepos.length > 4 && (
                              <span className="text-[10px] text-slate-600">+{repRepos.length - 4} more</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
