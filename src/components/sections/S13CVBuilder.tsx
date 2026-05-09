import React, { useState } from 'react'
import { Copy, Check, Download, ChevronDown } from 'lucide-react'
import { useInView } from '../../hooks/useInView'
import cvHighlightsData from '../../data/cvHighlights.json'
import type { CVHighlight } from '../../types'

const highlights = cvHighlightsData as CVHighlight[]

const ROLE_SUMMARIES: Record<string, string> = {
  'Full-Stack Developer': `Full-stack developer with 4+ years building across React, TypeScript, Node.js, Firebase, and platform-level systems. Portfolio spans 130+ repositories across 24 product categories including marketplaces, client portals, booking platforms, academy systems, and OS-style workspaces. Strong evidence of end-to-end product execution from interface to backend to deployment.`,
  'Product Engineer': `Product-minded engineer with demonstrated ability to take unclear ideas into working software experiences. Delivered client-facing portals, recruiter platforms, marketplace flows, academy products, and internal operation tools. Thinks in connected product ecosystems rather than isolated features.`,
  'Founding Engineer': `Founder-builder with co-founding experience at Zyntrix Solutions (2025), delivering products across web, mobile, AI automation, and platform engineering. 130+ repositories demonstrate initiative, execution speed, domain breadth, and the ability to own technical direction across a growing product suite.`,
  'Automation Developer': `Automation-focused developer with evidence across business automation, sales funnel systems, AI workflow integration, and creator platform tooling. Applies automation-first thinking to reduce manual work and scale business operations through software.`,
  'Platform Developer': `Platform-minded developer with experience building OS-style workspace systems, API gateway infrastructure, cloud platform concepts, and connected product ecosystems. Demonstrates systems-level thinking that extends beyond single applications into reusable platform architecture.`,
  'Frontend Developer': `Frontend developer with deep React and TypeScript experience across 24+ product types. Delivered production-quality interfaces for marketplaces, portals, dashboards, booking systems, e-commerce stores, and OS-style browser applications. Strong design sensibility with evidence of mobile-responsive, accessible UI.`,
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handle = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handle} className="btn-secondary text-xs py-1 px-2.5 flex-shrink-0">
      {copied ? <><Check size={10} className="text-green-400" /> Copied</> : <><Copy size={10} /> Copy</>}
    </button>
  )
}

export default function S13CVBuilder() {
  const { inView, ref } = useInView()
  const [activeRole, setActiveRole] = useState('Full-Stack Developer')
  const [allCopied, setAllCopied] = useState(false)

  const copyAll = () => {
    const text = highlights.map(h => h['CV Bullet']).join('\n\n')
    navigator.clipboard.writeText(text)
    setAllCopied(true)
    setTimeout(() => setAllCopied(false), 2000)
  }

  const copyRoleSummary = () => {
    navigator.clipboard.writeText(ROLE_SUMMARIES[activeRole])
  }

  return (
    <section id="cv-builder" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 20% 50%, rgba(99,102,241,0.06), transparent)' }}
      />
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <div className="section-label mb-3">CV Tools</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Translate the Portfolio into <span className="grad-text">CV Language</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Recruiter-ready achievement bullets and role-specific summaries — copy directly into a CV or hiring brief.
            </p>
          </div>

          {/* CV Bullets */}
          <div className="glass p-5 sm:p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">Portfolio Achievement Bullets</h3>
              <button onClick={copyAll} className="btn-primary text-xs py-1.5 px-3">
                {allCopied ? <><Check size={10} className="text-green-200" /> Copied all</> : <><Copy size={10} /> Copy all bullets</>}
              </button>
            </div>
            <div className="space-y-3">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/3 border border-white/8 hover:border-white/15 transition-colors group"
                  style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(8px)', transition: `opacity 0.5s ${i * 60}ms, transform 0.5s ${i * 60}ms` }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(59,130,246,0.2)', color: '#60a5fa' }}
                  >
                    {h.Priority}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-blue-400 mb-1">{h['Project / Platform']}</div>
                    <p className="text-slate-300 text-sm leading-relaxed">{h['CV Bullet']}</p>
                    <div className="text-[10px] text-slate-600 mt-1 truncate">{h['Repos Included']}</div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <CopyButton text={h['CV Bullet']} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Role-specific summaries */}
          <div className="glass p-5 sm:p-6">
            <h3 className="text-white font-bold mb-4">Role-Specific Recruiter Summary</h3>
            <div className="flex flex-wrap gap-2 mb-5">
              {Object.keys(ROLE_SUMMARIES).map(role => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    activeRole === role
                      ? 'bg-gradient-to-r from-blue-500/30 to-violet-500/20 border-blue-500/40 text-white font-semibold'
                      : 'glass border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
            <div className="bg-white/3 border border-white/10 rounded-xl p-4 mb-3">
              <p className="text-slate-300 text-sm leading-relaxed">{ROLE_SUMMARIES[activeRole]}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={copyRoleSummary} className="btn-primary text-xs py-1.5 px-4">
                <Copy size={10} /> Copy {activeRole} Summary
              </button>
              <a href="/Adrin_Makombe_CV.pdf" download className="btn-secondary text-xs py-1.5 px-4">
                <Download size={10} /> Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
