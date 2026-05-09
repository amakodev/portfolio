import React, { useState } from 'react'
import { ExternalLink, Image, Lock, ChevronLeft, ChevronRight, X } from 'lucide-react'
import Badge, { maturityVariant } from '../ui/Badge'
import { FEATURED_PROJECTS } from '../../data/featured'
import { useInView } from '../../hooks/useInView'

const BASE = import.meta.env.BASE_URL

const GALLERY_ITEMS = [
  { name: 'ZyntrixOS Workspace', file: 'thisiszyntrixos.web.app.png', demo: 'https://thisiszyntrixos.web.app', category: 'OS-style Platform', maturity: 'Platform R&D' },
  { name: 'OkamaOS Platform', file: 'okamaos.zyntrix.solutions.png', demo: 'https://okamaos.zyntrix.solutions', category: 'OS-style Platform', maturity: 'Platform R&D' },
  { name: 'Zyntrix OS Web App', file: 'zyntrix-os.web.app.png', demo: 'https://zyntrix-os.web.app', category: 'OS-style Platform', maturity: 'Platform R&D' },
  { name: 'OkamaOS (GitHub)', file: 'zyntrixsolutions.github.io_okamaos.png', demo: 'https://zyntrixsolutions.github.io/okamaos', category: 'OS-style Platform', maturity: 'Platform R&D' },
  { name: 'Zyntrix Marketplace', file: 'app.zyntrix.solutions_(marketplace).png', demo: 'https://app.zyntrix.solutions', category: 'Marketplace', maturity: 'MVP' },
  { name: 'Client Portal', file: 'client.zyntrix.solutions.png', demo: 'https://client.zyntrix.solutions', category: 'Client Portal', maturity: 'Production-ready' },
  { name: 'Recruiter Platform', file: 'recruiter.zyntrix.solutions.png', demo: 'https://recruiter.zyntrix.solutions', category: 'Recruitment Platform', maturity: 'Active Build' },
  { name: 'Academy Platform', file: 'academy.zyntrix.solutions.png', demo: 'https://academy.zyntrix.solutions', category: 'Academy Platform', maturity: 'Active Build' },
  { name: 'ViralFlow App', file: 'app.viralflow.ink.png', demo: 'https://app.viralflow.ink', category: 'Creator Platform', maturity: 'MVP' },
  { name: 'ViralFlow Landing', file: 'viralflow.ink.png', demo: 'https://viralflow.ink', category: 'Creator Platform', maturity: 'Production-ready' },
  { name: 'Zyntrix Store', file: 'store.zyntrix.solutions.png', demo: 'https://store.zyntrix.solutions', category: 'Commerce Platform', maturity: 'Production-ready' },
  { name: 'SkyBook Dashboard', file: 'skybook.web.app_dashboard.png', demo: 'https://skybook.web.app', category: 'Booking Platform', maturity: 'Working prototype' },
  { name: 'Boardroom Dashboard', file: 'board.zyntrix.solutions_dashboard.png', demo: 'https://board.zyntrix.solutions', category: 'Internal Operations', maturity: 'Active Build' },
  { name: 'Zyntrix Solutions', file: 'zyntrix.solutions.png', demo: 'https://zyntrix.solutions', category: 'Ecosystem Site', maturity: 'Production-ready' },
  { name: 'CapeBeauty Store', file: 'capebeauty-demo.zyntrix.solutions.png', demo: 'https://capebeauty-demo.zyntrix.solutions', category: 'E-commerce', maturity: 'Client-facing' },
  { name: 'Delicate Society', file: 'delicate-society.zyntrix.solutions.png', demo: 'https://delicate-society.zyntrix.solutions', category: 'E-commerce', maturity: 'Client-facing' },
  { name: 'GrindCity App', file: 'grindcity.web.app.png', demo: 'https://grindcity.web.app', category: 'General Software', maturity: 'Working prototype' },
]

export default function S05Gallery() {
  const { inView, ref } = useInView()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const prev = () => setLightboxIndex(i => (i !== null ? (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null))
  const next = () => setLightboxIndex(i => (i !== null ? (i + 1) % GALLERY_ITEMS.length : null))

  return (
    <section id="gallery" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 100%, rgba(99,102,241,0.08), transparent)' }}
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <div className="section-label mb-3">Visual Proof</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Demos, Screenshots <span className="grad-text">&amp; Walkthroughs</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Visual evidence helps recruiters move beyond repository names and see actual product thinking, interface quality, and execution depth.
            </p>
            <div className="inline-flex items-center gap-2 mt-4 glass px-3 py-1.5 text-xs text-emerald-400">
              <Image size={12} /> {GALLERY_ITEMS.length} visual proofs available
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                className="glass border border-white/8 hover:border-white/20 overflow-hidden group cursor-pointer transition-all duration-300"
                style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)', transition: `opacity 0.6s ${i * 50}ms, transform 0.6s ${i * 50}ms, border-color 0.3s` }}
                onClick={() => setLightboxIndex(i)}
              >
                <div className="relative h-36 overflow-hidden bg-slate-900/50">
                  <img
                    src={`${BASE}screenshots/${item.file}`}
                    alt={item.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="glass px-3 py-1.5 text-xs text-white font-medium">View full</div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="font-medium text-sm text-white truncate mb-1">{item.name}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{item.category}</span>
                    <Badge variant={maturityVariant(item.maturity)} className="text-[10px]">{item.maturity}</Badge>
                  </div>
                  {item.demo && (
                    <a
                      href={item.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="mt-2 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink size={10} /> Live demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white"
            onClick={() => setLightboxIndex(null)}
          ><X size={24} /></button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 glass p-2 text-white/60 hover:text-white"
            onClick={prev}
          ><ChevronLeft size={24} /></button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 glass p-2 text-white/60 hover:text-white"
            onClick={next}
          ><ChevronRight size={24} /></button>
          <div className="max-w-4xl w-full">
            <img
              src={`${BASE}screenshots/${GALLERY_ITEMS[lightboxIndex].file}`}
              alt={GALLERY_ITEMS[lightboxIndex].name}
              className="w-full h-auto rounded-xl shadow-2xl"
            />
            <div className="text-center mt-4">
              <p className="text-white font-semibold">{GALLERY_ITEMS[lightboxIndex].name}</p>
              <p className="text-slate-400 text-sm">{GALLERY_ITEMS[lightboxIndex].category}</p>
              {GALLERY_ITEMS[lightboxIndex].demo && (
                <a href={GALLERY_ITEMS[lightboxIndex].demo} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-blue-400 text-sm hover:text-blue-300"
                >
                  <ExternalLink size={12} /> Open demo
                </a>
              )}
            </div>
            <div className="text-center mt-2 text-slate-500 text-xs">
              {lightboxIndex + 1} / {GALLERY_ITEMS.length}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
