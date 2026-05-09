import React from 'react'
import { useInView } from '../../hooks/useInView'
import { TIMELINE_STAGES } from '../../data/featured'
import reposData from '../../data/repos.json'
import type { Repo } from '../../types'

const repos = reposData as Repo[]

export default function S09Timeline() {
  const { inView, ref } = useInView()

  return (
    <section id="timeline" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 30% at 50% 0%, rgba(99,102,241,0.07), transparent)' }}
      />
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <div className="section-label mb-3">Builder Journey</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              From experiments <span className="grad-text">to ecosystems</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              The portfolio reveals a clear progression — each stage building on the last.
            </p>
          </div>

          <div className="relative">
            <div
              className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-1/2"
              style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,0.4), rgba(139,92,246,0.4), rgba(59,130,246,0.4), rgba(99,102,241,0.1))' }}
            />

            {TIMELINE_STAGES.map((stage, i) => {
              const stageRepos = repos.filter(r => stage.categories.includes(r.Category))
              const isRight = i % 2 === 1

              return (
                <div
                  key={stage.stage}
                  className={`relative flex items-start gap-6 sm:gap-12 mb-12 ${isRight ? 'sm:flex-row-reverse' : 'sm:flex-row'} flex-row pl-14 sm:pl-0`}
                  style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: `opacity 0.7s ${i * 150}ms, transform 0.7s ${i * 150}ms` }}
                >
                  <div
                    className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 w-5 h-5 rounded-full border-2 border-[#050810] flex-shrink-0 z-10 mt-1"
                    style={{ background: stage.color }}
                  />

                  <div className={`sm:w-1/2 ${isRight ? 'sm:pl-8' : 'sm:pr-8 sm:text-right'}`}>
                    <div className="flex items-center gap-2 mb-2" style={{ justifyContent: isRight ? undefined : 'flex-end', flexDirection: isRight ? 'row' : 'row-reverse' }}>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${stage.color}20`, color: stage.color, border: `1px solid ${stage.color}40` }}
                      >
                        Stage {stage.stage}
                      </span>
                    </div>
                    <h3 className="text-white font-black text-xl mb-0.5">{stage.title}</h3>
                    <div className="text-xs font-medium mb-3" style={{ color: stage.color }}>{stage.subtitle}</div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-3">{stage.message}</p>
                    <div className="text-xs text-slate-600">
                      {stageRepos.length} repos · {stageRepos.filter(r => r.Visibility === 'public').length} public
                    </div>
                  </div>

                  <div className={`hidden sm:block sm:w-1/2 ${isRight ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'}`}>
                    <div className="glass p-4 border border-white/8">
                      <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: stage.color }}>
                        Categories
                      </div>
                      <div className="space-y-1">
                        {stage.categories.map(cat => {
                          const count = repos.filter(r => r.Category === cat).length
                          return (
                            <div key={cat} className={`flex items-center gap-2 text-xs ${isRight ? '' : 'flex-row-reverse'}`}>
                              <span className="text-slate-400 flex-1 truncate">{cat}</span>
                              <span
                                className="font-bold text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                                style={{ background: `${stage.color}20`, color: stage.color }}
                              >
                                {count}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
