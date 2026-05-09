import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useInView } from '../../hooks/useInView'

const FAQS = [
  {
    q: 'Is the portfolio too broad?',
    a: 'The work is grouped into four execution themes: Product Systems, Platform & Infrastructure, Automation & Growth, and Experiments & R&D. This turns a broad repository set into a clear technical story rather than a scattered list.',
  },
  {
    q: 'Are all projects complete?',
    a: 'No — and that is intentional transparency. Each project is labelled by maturity: prototype, MVP, active build, production-ready, archived, private evidence, or public repo. Recruiters can see exactly where each piece of work sits on the maturity scale.',
  },
  {
    q: 'What roles does this portfolio support?',
    a: 'The strongest fit is for roles requiring product-minded technical execution: full-stack developer, product engineer, founding engineer, platform-minded developer, frontend developer, or automation/internal tools developer. The Recruiter Journey Selector above filters the portfolio by hiring context.',
  },
  {
    q: 'What can be verified?',
    a: 'Public repositories, available demo links (17 live demos), screenshots (17 visual proofs), and walkthroughs are clearly separated from private evidence. The Gallery section is the fastest verification path.',
  },
  {
    q: 'What did the builder personally do?',
    a: 'Featured project cards include contribution notes explaining the builder\'s role in concept, design, frontend, backend, architecture, workflow, or product direction. Language is evidence-based — not overclaimed.',
  },
  {
    q: 'Why should a recruiter care about repository volume?',
    a: 'The volume matters because it shows repeated execution across domains — not a single university project or one employer\'s codebase. The portfolio then curates the strongest evidence so recruiters can focus on quality, not just quantity.',
  },
]

export default function S15FAQ() {
  const { inView, ref } = useInView()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 30% at 80% 80%, rgba(99,102,241,0.05), transparent)' }}
      />
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <div className="section-label mb-3">Common Questions</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Common <span className="grad-text">Recruiter Questions</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Answers to the questions recruiters and hiring managers typically ask about this kind of portfolio.
            </p>
          </div>

          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`glass border transition-all duration-300 ${open === i ? 'border-blue-500/25' : 'border-white/8 hover:border-white/15'}`}
                style={{ opacity: inView ? 1 : 0, transition: `opacity 0.5s ${i * 80}ms, border-color 0.3s` }}
              >
                <button
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="text-white font-semibold text-sm">{faq.q}</span>
                  {open === i
                    ? <ChevronUp size={16} className="text-blue-400 flex-shrink-0" />
                    : <ChevronDown size={16} className="text-slate-500 flex-shrink-0" />
                  }
                </button>
                {open === i && (
                  <div className="px-4 sm:px-5 pb-4 pt-0">
                    <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
