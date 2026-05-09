import React, { useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { PORTFOLIO_THEMES } from '../../data/featured'
import reposData from '../../data/repos.json'
import type { Repo } from '../../types'

const repos = reposData as Repo[]

export default function S06Themes() {
  const { inView, ref } = useInView()
  const [active, setActive] = useState('product')
  const theme = PORTFOLIO_THEMES.find(t => t.id === active)!

  const themeRepos = repos.filter(r => theme.categories.includes(r.Category))
  const uniqueSignals = Array.from(
    new Set(themeRepos.flatMap(r => r['Technical Signals'].split(',').map(s => s.trim()).filter(Boolean)))
  ).slice(0, 16)

  return (
    <section id="themes" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 10% 50%, rgba(99,102,241,0.05), transparent)' }}
      />
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <div className="section-label mb-3">Portfolio Themes</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Four <span className="grad-text">Execution Themes</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              A broad repository set mapped into a clear technical story. This turns range into coherence.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {PORTFOLIO_THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  active === t.id
                    ? 'text-white border-transparent shadow-lg'
                    : 'glass border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
                style={active === t.id ? { background: `linear-gradient(135deg, ${t.gradFrom}, ${t.gradTo})` } : {}}
              >
                {t.title}
              </button>
            ))}
          </div>

          <div className="glass border border-white/10 p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-1 h-14 rounded-full flex-shrink-0"
                style={{ background: `linear-gradient(to bottom, ${theme.gradFrom}, ${theme.gradTo})` }}
              />
              <div>
                <h3 className="text-white text-xl font-bold mb-1">{theme.title}</h3>
                <p className="text-slate-400 text-sm">{theme.message}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.gradFrom }}>
                  Categories ({theme.categories.length})
                </div>
                <ul className="space-y-1.5">
                  {theme.categories.map(cat => (
                    <li key={cat} className="text-slate-400 text-xs flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: theme.gradFrom }} />
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.gradFrom }}>
                  Repo Count
                </div>
                <div className="text-5xl font-black text-white mb-2">{themeRepos.length}</div>
                <div className="text-slate-500 text-xs">repositories in this theme</div>
                <div className="mt-4 text-xs font-bold uppercase tracking-widest mb-2" style={{ color: theme.gradFrom }}>
                  Public / Private
                </div>
                <div className="text-slate-400 text-sm">
                  {themeRepos.filter(r => r.Visibility === 'public').length} public &nbsp;·&nbsp;{' '}
                  {themeRepos.filter(r => r.Visibility === 'private').length} private
                </div>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.gradFrom }}>
                  Technical Signals
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {uniqueSignals.map(s => (
                    <span
                      key={s}
                      className="text-xs px-2 py-0.5 rounded-full border"
                      style={{ borderColor: `${theme.gradFrom}30`, color: `${theme.gradFrom}cc`, background: `${theme.gradFrom}0d` }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
