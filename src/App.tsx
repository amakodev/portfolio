import React from 'react'
import Navigation from './components/Navigation'
import S01Hero from './components/sections/S01Hero'
import S02RecruiterView from './components/sections/S02RecruiterView'
import S03Roles from './components/sections/S03Roles'
import S04TopEvidence from './components/sections/S04TopEvidence'
import S05Gallery from './components/sections/S05Gallery'
import S06Themes from './components/sections/S06Themes'
import S07Journey from './components/sections/S07Journey'
import S08EcosystemMap from './components/sections/S08EcosystemMap'
import S09Timeline from './components/sections/S09Timeline'
import S10DeepDive from './components/sections/S10DeepDive'
import S11Dashboard from './components/sections/S11Dashboard'
import S12RepoExplorer from './components/sections/S12RepoExplorer'
import S13CVBuilder from './components/sections/S13CVBuilder'
import S14Trust from './components/sections/S14Trust'
import S15FAQ from './components/sections/S15FAQ'
import S16FinalPitch from './components/sections/S16FinalPitch'
import S17PersonalGallery from './components/sections/S17PersonalGallery'

function Divider() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-100">
      <Navigation />

      <main>
        <S01Hero />
        <Divider />
        <S02RecruiterView />
        <Divider />
        <S03Roles />
        <Divider />
        <S04TopEvidence />
        <Divider />
        <S05Gallery />
        <Divider />
        <S06Themes />
        <Divider />
        <S07Journey />
        <Divider />
        <S08EcosystemMap />
        <Divider />
        <S09Timeline />
        <Divider />
        <S10DeepDive />
        <Divider />
        <S11Dashboard />
        <Divider />
        <S12RepoExplorer />
        <Divider />
        <S13CVBuilder />
        <Divider />
        <S14Trust />
        <Divider />
        <S15FAQ />
        <Divider />
        <S16FinalPitch />
        <Divider />
        <S17PersonalGallery />
      </main>

      <footer className="py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>© 2025 Adrin N Makombe · amakodev · Zyntrix Solutions</span>
          <div className="flex items-center gap-4">
            <a href="https://github.com/amakodev" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/amakodevz" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">LinkedIn</a>
            <a href="https://amakodev.github.io" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">Portfolio</a>
            <a href="mailto:amakodev@gmail.com" className="hover:text-slate-400 transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
