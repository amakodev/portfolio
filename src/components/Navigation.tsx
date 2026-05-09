import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '#recruiter-view', label: '60-Sec View' },
  { href: '#top-evidence', label: 'Top Projects' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#ecosystem', label: 'Ecosystem' },
  { href: '#explorer', label: 'Repos' },
  { href: '#cv-builder', label: 'CV Tools' },
  { href: '#final-pitch', label: 'Pitch' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(scrollY > 40)
      setProgress(docH > 0 ? (scrollY / docH) * 100 : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050810]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm font-bold grad-text"
          >
            amakodev
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-150"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://github.com/amakodev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs py-1.5 px-3"
            >
              GitHub
            </a>
            <a
              href="mailto:adrin@amsoftwarezw.space"
              className="btn-primary text-xs py-1.5 px-3"
            >
              Contact
            </a>
          </div>

          <button
            className="md:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div
          className={`absolute top-0 inset-0 -z-10 transition-opacity duration-300 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
          style={{ background: 'linear-gradient(to bottom, rgba(5,8,16,0.6), transparent)', pointerEvents: 'none' }}
        />

        {menuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#050810]/95 backdrop-blur-xl">
            {NAV_LINKS.map(l => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="block w-full text-left px-5 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                {l.label}
              </button>
            ))}
            <div className="flex gap-2 p-4 border-t border-white/10">
              <a href="https://github.com/amakodev" target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs flex-1 justify-center">GitHub</a>
              <a href="mailto:adrin@amsoftwarezw.space" className="btn-primary text-xs flex-1 justify-center">Contact</a>
            </div>
          </div>
        )}
      </nav>

      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent pointer-events-none">
        <div
          className="h-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
          }}
        />
      </div>
    </>
  )
}
