import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useInView } from '../../hooks/useInView'
import { RECRUITER_PATHS } from '../../data/featured'
import reposData from '../../data/repos.json'
import type { Repo } from '../../types'
import Badge, { maturityVariant } from '../ui/Badge'

const repos = reposData as Repo[]

export default function S07Journey() {
  const { inView, ref } = useInView()
  const [activePath, setActivePath] = useState<string | null>(null)
  const path = RECRUITER_PATHS.find(p => p.id === activePath)

  const filteredRepos = path
    ? repos
        .filter(r => path.priorityCategories.includes(r.Category))
        .sort((a, b) => {
          const rank = (r: Repo) =>
            (r['Evidence Level'].includes('High') ? 3 : 0) +
            (r.Visibility === 'public' ? 2 : 0) +
            (r.Archived === 'No' ? 1 : 0)
          return rank(b) - rank(a)
        })
        .slice(0, 12)
    : []

  return (
    <section id="journey" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 90% 50%, rgba(139,92,246,0.06), transparent)' }}
      />
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <div className="section-label mb-3">Recruiter Journey</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Choose Your <span className="grad-text">Evidence Path</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Select what you're hiring for — the portfolio reorders itself around your priority.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {RECRUITER_PATHS.map(p => (
              <button
                key={p.id}
                onClick={() => setActivePath(activePath === p.id ? null : p.id)}
                className={`text-left p-5 rounded-xl border transition-all duration-200 ${
                  activePath === p.id
                    ? 'bg-gradient-to-br from-blue-500/20 to-violet-500/10 border-blue-500/40 shadow-lg shadow-blue-500/10'
                    : 'glass border-white/10 hover:border-white/20'
                }`}
              >
                <div className="text-2xl mb-2">{p.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1">{p.label}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{p.description}</p>
                {activePath === p.id && (
                  <div className="mt-3 flex items-center gap-1 text-blue-400 text-xs font-medium">
                    <ArrowRight size={12} /> Path active
                  </div>
                )}
              </button>
            ))}
          </div>

          {path && (
            <div className="glass border border-blue-500/20 p-5 sm:p-6">
              <div className="flex items-start gap-3 mb-5">
                <span className="text-2xl">{path.icon}</span>
                <div>
                  <h3 className="text-white font-bold">{path.label} Path</h3>
                  <p className="text-slate-400 text-sm">{path.message}</p>
                </div>
              </div>

              <div className="text-xs text-slate-500 mb-4">
                Showing {filteredRepos.length} highest-signal repositories for this path:
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredRepos.map(repo => (
                  <RepoMini key={repo.Index} repo={repo} />
                ))}
              </div>
            </div>
          )}

          {!path && (
            <div className="text-center text-slate-600 text-sm py-8 glass rounded-xl border border-white/5">
              Select a path above to see the portfolio filtered for that hiring context.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function RepoMini({ repo }: { repo: Repo }) {
  return (
    <div className="glass-strong p-3 hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <span className="text-white font-medium text-xs truncate">{repo.Repository}</span>
        <Badge variant={repo.Visibility === 'public' ? 'green' : 'grey'} className="text-[10px] flex-shrink-0">
          {repo.Visibility}
        </Badge>
      </div>
      <div className="text-slate-500 text-xs mb-2 truncate">{repo.Category}</div>
      <Badge variant={maturityVariant(repo['Maturity Signal'])} className="text-[10px]">
        {repo['Maturity Signal'].substring(0, 30)}
      </Badge>
      {repo['Source URL'] && repo.Visibility === 'public' && (
        <a
          href={repo['Source URL']}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
        >
          <ArrowRight size={9} /> View repo
        </a>
      )}
    </div>
  )
}
