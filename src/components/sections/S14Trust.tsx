import React from 'react'
import { ShieldCheck, Lock, Eye, Target, Camera } from 'lucide-react'
import { useInView } from '../../hooks/useInView'

const NOTES = [
  {
    icon: ShieldCheck,
    title: 'Repository Maturity',
    body: 'Not all repositories are production-grade. Some represent prototypes, experiments, internal tools, learning projects, archived work, or early-stage product concepts. Each is labelled with a maturity signal throughout this portfolio.',
    color: 'blue',
  },
  {
    icon: Lock,
    title: 'Private Repositories',
    body: 'Private repositories are shown as evidence categories but are not publicly accessible unless access is granted or walkthrough evidence is provided. Private evidence is available on request.',
    color: 'violet',
  },
  {
    icon: Eye,
    title: 'Public Evidence',
    body: 'Public repositories, demo links, screenshots, live links, and available URLs are highlighted where possible. The Gallery section contains 17 verified visual proofs.',
    color: 'green',
  },
  {
    icon: Target,
    title: 'Recruiter Interpretation',
    body: 'This portfolio is designed to show patterns of execution, product thinking, and technical direction. It does not imply that every repository is a finished commercial product.',
    color: 'amber',
  },
  {
    icon: Camera,
    title: 'Visual Proof',
    body: 'Projects with screenshots, demos, or walkthroughs are highlighted as stronger verification evidence and marked as "High-verification" throughout the portfolio.',
    color: 'cyan',
  },
]

const colorMap: Record<string, string> = {
  blue:   'text-blue-400 bg-blue-500/10',
  violet: 'text-violet-400 bg-violet-500/10',
  green:  'text-emerald-400 bg-emerald-500/10',
  amber:  'text-amber-400 bg-amber-500/10',
  cyan:   'text-cyan-400 bg-cyan-500/10',
}

export default function S14Trust() {
  const { inView, ref } = useInView()

  return (
    <section id="transparency" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <div className="section-label mb-3">Transparency</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Transparency <span className="grad-text">Notes</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Honest context helps recruiters make better decisions. This section increases trust — not doubt.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NOTES.map((note, i) => {
              const Icon = note.icon
              const cls = colorMap[note.color]
              return (
                <div
                  key={i}
                  className="glass border border-white/8 p-5 transition-all duration-700"
                  style={{ transitionDelay: `${i * 80}ms`, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(12px)' }}
                >
                  <div className={`inline-flex p-2 rounded-lg mb-3 ${cls}`}>
                    <Icon size={18} />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{note.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{note.body}</p>
                </div>
              )
            })}

            {/* Connector gaps note */}
            <div
              className="glass border border-white/5 p-5 sm:col-span-2 lg:col-span-3 transition-all duration-700"
              style={{ transitionDelay: '400ms', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(12px)' }}
            >
              <div className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-2">Portfolio Connector Note</div>
              <p className="text-slate-500 text-xs leading-relaxed">
                4 repositories are counted as connector placeholders in the GitHub data — these represent items captured in the portfolio map that may have limited metadata. They are not presented as primary evidence. The core portfolio evidence rests on the 126 repositories with full metadata, plus the 17 visual proofs in the Gallery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
