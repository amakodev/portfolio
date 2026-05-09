import React, { useState } from 'react'
import { ExternalLink, Image, Lock, Github, ChevronDown, ChevronUp, Star } from 'lucide-react'
import Badge, { maturityVariant } from '../ui/Badge'
import Modal from '../ui/Modal'
import { FEATURED_PROJECTS } from '../../data/featured'
import { useInView } from '../../hooks/useInView'

const BASE = import.meta.env.BASE_URL

export default function S04TopEvidence() {
  const { inView, ref } = useInView()
  const [expanded, setExpanded] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const featured = FEATURED_PROJECTS.filter(p => p.isFeatured || p.isHighSignal)

  return (
    <section id="top-evidence" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 80% 30%, rgba(139,92,246,0.07), transparent)' }}
      />
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <div className="section-label mb-3">Top Evidence Projects</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Start Here: <span className="grad-text">Strongest Evidence</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
              Curated from 130 repositories. Projects ranked by demo availability, screenshots, public visibility, technical signal, and evidence quality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {featured.map((proj, i) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                delay={i * 80}
                inView={inView}
                expanded={expanded === proj.id}
                onToggle={() => setExpanded(expanded === proj.id ? null : proj.id)}
                onScreenshot={() => proj.screenshotFile && setLightbox(proj.screenshotFile)}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal open={!!lightbox} onClose={() => setLightbox(null)} size="full">
        {lightbox && (
          <img
            src={`${BASE}screenshots/${lightbox}`}
            alt="Project screenshot"
            className="w-full h-auto rounded-lg"
          />
        )}
      </Modal>
    </section>
  )
}

function ProjectCard({ project: p, delay, inView, expanded, onToggle, onScreenshot }: {
  project: typeof FEATURED_PROJECTS[0]
  delay: number
  inView: boolean
  expanded: boolean
  onToggle: () => void
  onScreenshot: () => void
}) {
  const BASE = import.meta.env.BASE_URL
  const hasDemo = !!p.demoLink
  const hasScreenshot = !!p.screenshotFile
  const isHighVerification = hasDemo && hasScreenshot

  return (
    <div
      className="glass border border-white/8 hover:border-white/15 transition-all duration-700 overflow-hidden"
      style={{ transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' }}
    >
      {hasScreenshot && (
        <div className="relative h-44 overflow-hidden cursor-pointer group" onClick={onScreenshot}>
          <img
            src={`${BASE}screenshots/${p.screenshotFile}`}
            alt={p.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent" />
          <div className="absolute bottom-2 right-2 glass px-2 py-1 text-xs text-slate-300 flex items-center gap-1">
            <Image size={10} /> View screenshot
          </div>
          {p.isHighSignal && (
            <div className="absolute top-2 left-2 badge bg-amber-500/80 text-amber-100 border-amber-400/50 flex items-center gap-1">
              <Star size={9} fill="currentColor" /> High-signal
            </div>
          )}
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-white font-bold text-base leading-tight">{p.title}</h3>
            <p className="text-slate-500 text-xs mt-0.5">{p.category}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-end flex-shrink-0">
            <Badge variant={maturityVariant(p.maturityBadge)}>{p.maturityBadge}</Badge>
            {isHighVerification && <Badge variant="green">High-verification</Badge>}
            {p.isPrivate && <Badge variant="grey"><Lock size={8} className="inline mr-1" />Private</Badge>}
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.whatItProves}</p>

        <div className="text-xs text-slate-500 mb-4 leading-relaxed">
          <span className="text-blue-400 font-medium">Technical signals: </span>{p.technicalSignals}
        </div>

        {expanded && (
          <div className="space-y-3 mb-4 pt-3 border-t border-white/8">
            {p.techStack && (
              <div className="text-xs">
                <span className="text-violet-400 font-medium">Stack: </span>
                <span className="text-slate-400">{p.techStack}</span>
              </div>
            )}
            <div className="text-xs">
              <span className="text-emerald-400 font-medium">Contribution: </span>
              <span className="text-slate-400">{p.contribution}</span>
            </div>
            <div className="glass p-3 text-xs text-slate-300 leading-relaxed">
              <span className="text-amber-400 font-medium block mb-1">Recruiter takeaway</span>
              {p.recruiterTakeaway}
            </div>
            {p.representativeRepos.length > 0 && (
              <div className="text-xs text-slate-500">
                <span className="text-slate-400 font-medium">Repos: </span>
                {p.representativeRepos.slice(0, 4).join(', ')}
                {p.representativeRepos.length > 4 && ` +${p.representativeRepos.length - 4} more`}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {hasDemo && (
            <a href={p.demoLink} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-1.5 px-3">
              <ExternalLink size={11} /> View Demo
            </a>
          )}
          {hasScreenshot && !hasDemo && (
            <button onClick={onScreenshot} className="btn-secondary text-xs py-1.5 px-3">
              <Image size={11} /> View Screenshot
            </button>
          )}
          {p.sourceURL && !p.isPrivate && (
            <a href={p.sourceURL} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-1.5 px-3">
              <Github size={11} /> Repository
            </a>
          )}
          {p.isPrivate && !hasDemo && (
            <span className="text-xs text-slate-500 flex items-center gap-1"><Lock size={10} /> Private evidence available</span>
          )}
          <button
            onClick={onToggle}
            className="ml-auto text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
          >
            {expanded ? <><ChevronUp size={12} /> Less</> : <><ChevronDown size={12} /> More details</>}
          </button>
        </div>
      </div>
    </div>
  )
}
