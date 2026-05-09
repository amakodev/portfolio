import React from 'react'
import { Code2, Layers, Rocket, Layout, Bot, Globe } from 'lucide-react'
import { useInView } from '../../hooks/useInView'

const ROLES = [
  {
    icon: Code2,
    title: 'Full-Stack Developer',
    fit: 'Strong Fit',
    interpretation: 'Evidence across UI, product flows, backend concepts, APIs, dashboards, and business-facing applications.',
    color: 'blue',
  },
  {
    icon: Layers,
    title: 'Product Engineer',
    fit: 'Strong Fit',
    interpretation: 'Strong fit where the role requires turning unclear ideas into usable software experiences.',
    color: 'violet',
  },
  {
    icon: Rocket,
    title: 'Founding Engineer / Technical Founder',
    fit: 'Excellent Fit',
    interpretation: 'Strong initiative, ownership, product exploration, and ability to build across multiple domains.',
    color: 'amber',
  },
  {
    icon: Layout,
    title: 'Frontend Engineer with Backend Capability',
    fit: 'Strong Fit',
    interpretation: 'Useful for teams needing strong interface execution with awareness of data, APIs, platform flows, and product structure.',
    color: 'cyan',
  },
  {
    icon: Bot,
    title: 'Automation / Internal Tools Developer',
    fit: 'Strong Fit',
    interpretation: 'Relevant evidence across business automation, sales funnels, dashboards, internal operations, and workflow systems.',
    color: 'emerald',
  },
  {
    icon: Globe,
    title: 'Platform-Minded Developer',
    fit: 'Good Fit',
    interpretation: 'Evidence of OS-style systems, cloud platform concepts, API routing, workspaces, and product ecosystems.',
    color: 'pink',
  },
]

const colorMap: Record<string, { border: string; icon: string; badge: string }> = {
  blue:    { border: 'border-blue-500/20 hover:border-blue-500/50',    icon: 'text-blue-400 bg-blue-500/10',    badge: 'bg-blue-500/10 text-blue-300 border-blue-500/25' },
  violet:  { border: 'border-violet-500/20 hover:border-violet-500/50', icon: 'text-violet-400 bg-violet-500/10', badge: 'bg-violet-500/10 text-violet-300 border-violet-500/25' },
  amber:   { border: 'border-amber-500/20 hover:border-amber-500/50',   icon: 'text-amber-400 bg-amber-500/10',   badge: 'bg-amber-500/10 text-amber-300 border-amber-500/25' },
  cyan:    { border: 'border-cyan-500/20 hover:border-cyan-500/50',     icon: 'text-cyan-400 bg-cyan-500/10',     badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25' },
  emerald: { border: 'border-emerald-500/20 hover:border-emerald-500/50', icon: 'text-emerald-400 bg-emerald-500/10', badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25' },
  pink:    { border: 'border-pink-500/20 hover:border-pink-500/50',     icon: 'text-pink-400 bg-pink-500/10',     badge: 'bg-pink-500/10 text-pink-300 border-pink-500/25' },
}

export default function S03Roles() {
  const { inView, ref } = useInView()

  return (
    <section id="roles" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(99,102,241,0.06), transparent)' }}
      />
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <div className="section-label mb-3">Best-Fit Roles</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Where this portfolio <span className="grad-text">fits best</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              The strongest role fit depends on which evidence path a recruiter explores.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROLES.map((role, i) => {
              const cls = colorMap[role.color]
              const Icon = role.icon
              return (
                <div
                  key={i}
                  className={`glass border ${cls.border} p-5 transition-all duration-700 group`}
                  style={{ transitionDelay: `${i * 80}ms`, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)' }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${cls.icon} flex-shrink-0`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm leading-tight">{role.title}</h3>
                      <span className={`badge border mt-1 ${cls.badge}`}>{role.fit}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{role.interpretation}</p>
                </div>
              )
            })}
          </div>

          <p className="text-center text-slate-500 text-xs mt-8 max-w-xl mx-auto">
            This portfolio is broad by design. The strongest role fit depends on which evidence path a recruiter explores.
          </p>
        </div>
      </div>
    </section>
  )
}
