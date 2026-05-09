import React from 'react'
import { ArrowDown, Sparkles } from 'lucide-react'
import { useCounter } from '../../hooks/useCounter'

function Counter({ end, label }: { end: number; label: string }) {
  const { count, ref } = useCounter(end, 1800)
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
      <div className="text-3xl sm:text-4xl font-black grad-text tabular-nums">{count}<span className="text-xl">+</span></div>
      <div className="text-xs text-slate-500 mt-1 font-medium">{label}</div>
    </div>
  )
}

export default function S01Hero() {
  const scroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-hero-bg">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.22), transparent 70%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(139,92,246,0.12), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-28 pb-16 text-center">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 mb-8 text-xs font-medium text-blue-300">
          <Sparkles size={12} />
          <span>130+ repositories · 24+ product categories · 4 execution themes</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
          <span className="text-white">Not just projects.</span>
          <br />
          <span className="grad-text">Evidence of how</span>
          <br />
          <span className="text-white">I build systems.</span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
          This interactive portfolio turns 130 GitHub repositories into a recruiter-friendly journey through product execution, platform thinking, automation, business systems, cloud concepts, dashboards, marketplaces, and technical experiments.
        </p>

        <p className="text-blue-400/80 text-sm font-medium italic mb-10">
          "Before reading the CV, explore the evidence."
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <button onClick={() => scroll('recruiter-view')} className="btn-primary text-sm px-6 py-3 w-full sm:w-auto">
            Start the 60-Second Recruiter View
          </button>
          <button onClick={() => scroll('gallery')} className="btn-secondary text-sm px-6 py-3 w-full sm:w-auto">
            View Demos & Screenshots
          </button>
          <button onClick={() => scroll('top-evidence')} className="btn-secondary text-sm px-6 py-3 w-full sm:w-auto">
            Explore Strongest Evidence
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 max-w-2xl mx-auto mb-12">
          <Counter end={130} label="repositories" />
          <Counter end={24} label="product categories" />
          <Counter end={30} label="public repos" />
          <Counter end={4} label="execution themes" />
        </div>

        <div className="glass max-w-xl mx-auto px-5 py-4 text-xs text-slate-400 leading-relaxed">
          Not every repository represents a finished commercial product. Some are prototypes, experiments, internal tools, early-stage concepts, or archived work. This portfolio highlights the strongest evidence first and labels maturity clearly.
        </div>
      </div>

      <button
        onClick={() => scroll('recruiter-view')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-slate-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </button>
    </section>
  )
}
