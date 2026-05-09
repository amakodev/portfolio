import React from 'react'
import { User2, Zap, Briefcase, BarChart3, TrendingUp, ArrowRight } from 'lucide-react'
import { useInView } from '../../hooks/useInView'

const CARDS = [
  {
    icon: User2,
    label: 'Builder Type',
    color: 'blue',
    body: 'Product-minded technical builder with broad full-stack, platform, automation, and business systems exposure.',
  },
  {
    icon: Zap,
    label: 'Strongest Signal',
    color: 'violet',
    body: 'Ability to move from concept to working interfaces, product flows, dashboards, platforms, and internal systems.',
  },
  {
    icon: Briefcase,
    label: 'Best-Fit Roles',
    color: 'cyan',
    body: 'Full-stack developer, product engineer, founding engineer, technical founder, automation/internal tools developer, and platform-minded frontend/backend developer.',
  },
  {
    icon: BarChart3,
    label: 'Strongest Evidence Areas',
    color: 'emerald',
    body: 'Platform systems, business dashboards, marketplaces, recruiter/client portals, automation tools, cloud/platform concepts, commerce, and education products.',
  },
  {
    icon: TrendingUp,
    label: 'Why It Matters',
    color: 'amber',
    body: 'The portfolio shows initiative, execution speed, technical curiosity, and the ability to think beyond isolated code into connected product ecosystems.',
  },
]

const colorMap: Record<string, string> = {
  blue:   'from-blue-500/20 to-blue-500/5 border-blue-500/25 text-blue-400',
  violet: 'from-violet-500/20 to-violet-500/5 border-violet-500/25 text-violet-400',
  cyan:   'from-cyan-500/20 to-cyan-500/5 border-cyan-500/25 text-cyan-400',
  emerald:'from-emerald-500/20 to-emerald-500/5 border-emerald-500/25 text-emerald-400',
  amber:  'from-amber-500/20 to-amber-500/5 border-amber-500/25 text-amber-400',
}

export default function S02RecruiterView() {
  const { inView, ref } = useInView()

  return (
    <section id="recruiter-view" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <div className="section-label mb-3">Recruiter View</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Understand the Portfolio in{' '}
              <span className="grad-text">60 Seconds</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Five concise signals to help a recruiter quickly evaluate this builder.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {CARDS.slice(0, 3).map((card, i) => (
              <Card key={i} {...card} delay={i * 100} inView={inView} />
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {CARDS.slice(3).map((card, i) => (
              <Card key={i} {...card} delay={(i + 3) * 100} inView={inView} />
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => document.getElementById('top-evidence')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary inline-flex items-center gap-2"
            >
              Explore Strongest Evidence Projects <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Card({ icon: Icon, label, color, body, delay, inView }: {
  icon: React.ElementType; label: string; color: string; body: string; delay: number; inView: boolean
}) {
  const cls = colorMap[color]
  return (
    <div
      className={`glass bg-gradient-to-br ${cls.split(' ').slice(0, 2).join(' ')} border ${cls.split(' ')[2]} p-5 transition-all duration-700`}
      style={{ transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)' }}
    >
      <div className={`inline-flex items-center gap-2 mb-3 ${cls.split(' ')[3]}`}>
        <Icon size={16} />
        <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed">{body}</p>
    </div>
  )
}
