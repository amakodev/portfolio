import React, { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink, Lock, Github } from 'lucide-react'
import { useInView } from '../../hooks/useInView'
import portfolioStoryData from '../../data/portfolioStory.json'
import reposData from '../../data/repos.json'
import type { PortfolioLayer, Repo } from '../../types'
import Badge, { maturityVariant, visibilityVariant } from '../ui/Badge'
import { FEATURED_PROJECTS } from '../../data/featured'

const layers = portfolioStoryData as PortfolioLayer[]
const repos = reposData as Repo[]

export default function S10DeepDive() {
  const { inView, ref } = useInView()
  const [expanded, setExpanded] = useState<string | null>(null)

  const sorted = [...layers].sort((a, b) => b['Repo Count'] - a['Repo Count'])

  return (
    <section id="deep-dive" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <div className="section-label mb-3">Deep Dive</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Project <span className="grad-text">Layer Cards</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Expandable detail cards for every portfolio layer — story, signals, repos, evidence.
            </p>
          </div>

          <div className="space-y-2">
            {sorted.map((layer, i) => {
              const layerRepos = repos.filter(r => r.Category === layer['Portfolio Layer'])
              const fp = FEATURED_PROJECTS.find(p => p.category === layer['Portfolio Layer'])
              const isOpen = expanded === layer['Portfolio Layer']
              const repRepos = layer['Representative Repos'].split(',').map(r => r.trim()).filter(Boolean)

              return (
                <div
                  key={i}
                  className={`glass border transition-all duration-300 ${isOpen ? 'border-blue-500/25' : 'border-white/8 hover:border-white/15'}`}
                  style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(8px)', transition: `opacity 0.5s ${Math.min(i * 40, 500)}ms, transform 0.5s ${Math.min(i * 40, 500)}ms, border-color 0.3s` }}
                >
                  <button
                    className="w-full text-left p-4 sm:p-5 flex items-center gap-4"
                    onClick={() => setExpanded(isOpen ? null : layer['Portfolio Layer'])}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0"
                      style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}
                    >
                      {layer['Repo Count']}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-sm truncate">{layer['Portfolio Layer']}</div>
                      <div className="text-slate-500 text-xs truncate mt-0.5">{layer['Recruiter Interpretation']}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {fp?.demoLink && <Badge variant="green" className="hidden sm:inline-flex">Demo available</Badge>}
                      {fp?.screenshotFile && <Badge variant="blue" className="hidden sm:inline-flex">Screenshot</Badge>}
                      {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-white/8">
                      <div className="grid sm:grid-cols-2 gap-5 pt-4">
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-1.5">Story</div>
                            <p className="text-slate-300 text-sm leading-relaxed">{layer.Story}</p>
                          </div>
                          <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-1.5">Recruiter Interpretation</div>
                            <p className="text-slate-400 text-sm">{layer['Recruiter Interpretation']}</p>
                          </div>
                          {fp && (
                            <>
                              <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-1.5">Technical Signals</div>
                                <p className="text-slate-400 text-xs">{fp.technicalSignals}</p>
                              </div>
                              {fp.techStack && (
                                <div>
                                  <div className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-1.5">Tech Stack</div>
                                  <p className="text-blue-400 text-xs">{fp.techStack}</p>
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-2">Repositories ({layerRepos.length})</div>
                            <div className="space-y-1.5">
                              {layerRepos.slice(0, 6).map(r => (
                                <div key={r.Index} className="flex items-center gap-2">
                                  <Badge variant={visibilityVariant(r.Visibility)} className="text-[9px]">{r.Visibility}</Badge>
                                  <Badge variant={maturityVariant(r['Maturity Signal'])} className="text-[9px] max-w-[120px] truncate">{r['Maturity Signal']}</Badge>
                                  <span className="text-slate-400 text-xs truncate">{r.Repository}</span>
                                </div>
                              ))}
                              {layerRepos.length > 6 && (
                                <span className="text-slate-600 text-xs">+{layerRepos.length - 6} more</span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-2">
                            {fp?.demoLink && (
                              <a href={fp.demoLink} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-1.5 px-3">
                                <ExternalLink size={10} /> Demo
                              </a>
                            )}
                            {fp?.sourceURL && !fp.isPrivate && (
                              <a href={fp.sourceURL} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-1.5 px-3">
                                <Github size={10} /> Repository
                              </a>
                            )}
                            {repRepos.slice(0, 2).map(r => (
                              <a
                                key={r}
                                href={`https://github.com/${r}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary text-xs py-1.5 px-3"
                              >
                                <Github size={10} /> {r.split('/')[1]}
                              </a>
                            ))}
                          </div>

                          {fp?.isPrivate && !fp?.demoLink && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Lock size={10} /> Private evidence available on request
                            </div>
                          )}
                        </div>
                      </div>
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
