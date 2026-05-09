import React, { useState } from 'react'
import { User, Camera, Award, Globe, Mail, Github, Linkedin, X, ZoomIn } from 'lucide-react'
import { useInView } from '../../hooks/useInView'

const GALLERY_IMAGES = [
  {
    id: 1,
    src: '/gallery/amakodev-headshot.png',
    alt: 'Adrin N Makombe - Professional Headshot',
    caption: 'Professional Headshot'
  }
]

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/amakodev', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/amakodevz', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:amakodev@gmail.com', label: 'Email' },
  { icon: Globe, href: 'https://amakodev.github.io', label: 'Portfolio' }
]

export default function S17PersonalGallery() {
  const { inView, ref } = useInView()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <section id="personal-gallery" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 30% at 30% 80%, rgba(139,92,246,0.06), transparent)' }}
      />
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <div className="section-label mb-3">Personal Gallery</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Beyond the <span className="grad-text">Code</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              A glimpse into the person behind the portfolio. Professional presence and direct connections.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Gallery Images */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <Camera size={18} className="text-blue-400" />
                Professional Gallery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {GALLERY_IMAGES.map((img, i) => (
                  <div
                    key={img.id}
                    className="group relative glass border border-white/8 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/20"
                    onClick={() => setSelectedImage(img.id)}
                    style={{ 
                      opacity: inView ? 1 : 0, 
                      transform: inView ? 'none' : 'translateY(16px)',
                      transition: `opacity 0.5s ${i * 150}ms, transform 0.5s ${i * 150}ms`
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white text-xs font-medium">{img.caption}</p>
                      </div>
                      <div className="absolute top-3 right-3">
                        <div className="bg-black/50 rounded-full p-1.5">
                          <ZoomIn size={14} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Profile */}
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <User size={18} className="text-violet-400" />
                  Professional Profile
                </h3>
                <div className="glass border border-white/8 rounded-xl p-6 space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-1">Adrin N Makombe</h4>
                    <p className="text-slate-400 text-sm">Full-Stack Developer & AI Automation Engineer</p>
                    <p className="text-slate-500 text-xs mt-2">Cape Town, South Africa · Remote Available</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Award size={14} className="text-amber-400" />
                      <span className="text-slate-300">4+ years software development experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Globe size={14} className="text-blue-400" />
                      <span className="text-slate-300">130+ repositories across 24+ categories</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/8">
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Passionate about building production-ready systems from web applications to Linux platforms. 
                      Combining technical depth with product intuition to deliver solutions that matter.
                    </p>
                  </div>
                </div>
              </div>

              {/* Connect */}
              <div>
                <h3 className="text-white font-bold mb-4">Connect Directly</h3>
                <div className="grid grid-cols-2 gap-3">
                  {SOCIAL_LINKS.map((link, i) => {
                    const Icon = link.icon
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.label !== 'Email' ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="glass border border-white/8 rounded-lg p-3 flex items-center gap-3 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-all duration-200"
                        style={{ 
                          opacity: inView ? 1 : 0, 
                          transform: inView ? 'none' : 'translateY(8px)',
                          transition: `opacity 0.5s ${i * 100 + 600}ms, transform 0.5s ${i * 100 + 600}ms`
                        }}
                      >
                        <Icon size={16} className="text-blue-400" />
                        <span className="font-medium">{link.label}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
          >
            <X size={24} />
          </button>
          {GALLERY_IMAGES.find(img => img.id === selectedImage) && (
            <img
              src={GALLERY_IMAGES.find(img => img.id === selectedImage)!.src}
              alt={GALLERY_IMAGES.find(img => img.id === selectedImage)!.alt}
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </section>
  )
}
