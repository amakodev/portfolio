import React, { useState, useMemo } from 'react'
import { Search, Filter, X, ExternalLink, Lock, Star, ChevronDown } from 'lucide-react'
import { useInView } from '../../hooks/useInView'
import reposData from '../../data/repos_filtered.json'
import type { Repo } from '../../types'
import Badge, { maturityVariant, visibilityVariant } from '../ui/Badge'

const repos = reposData as Repo[]
const HIGH_SIGNAL_CATEGORIES = [
  'OS-style Platform / Workspace R&D', 'Marketplace / Multi-sided Platform', 'Client Portal',
  'Recruitment Platform', 'Learning / Academy Platform', 'Cloud Platform / Infrastructure',
  'API Gateway / Integration Infrastructure', 'Content Automation / Creator Platform',
  'Booking / Travel / Reservations', 'Commerce Platform', 'Internal Operations / Boardroom',
]
const ALL_CATEGORIES = Array.from(new Set(repos.map(r => r.Category))).sort()
const ALL_OWNERS = Array.from(new Set(repos.map(r => r.Owner))).sort()
const ALL_MATURITY = Array.from(new Set(repos.map(r => r['Maturity Signal']))).sort()

export default function S12RepoExplorer() {
  const { inView, ref } = useInView()
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [filterCat, setFilterCat] = useState('')
  const [filterOwner, setFilterOwner] = useState('')
  const [filterVisibility, setFilterVisibility] = useState('')
  const [filterArchived, setFilterArchived] = useState('active')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [shortlist, setShortlist] = useState<number[]>([])

  const baseRepos = useMemo(() => {
    return showAll
      ? repos
      : repos.filter(r => HIGH_SIGNAL_CATEGORIES.includes(r.Category))
  }, [showAll])

  const filtered = useMemo(() => {
    return baseRepos.filter(r => {
      const q = query.toLowerCase()
      const matchQuery = !q || [
        r.Repository, r['Full Name'], r.Category, r['Technical Signals'],
        r['Bigger Story'], r['Recruiter CV Angle'], r['Suggested Resume Label'], r['Best Use'],
      ].some(v => v.toLowerCase().includes(q))
      const matchCat = !filterCat || r.Category === filterCat
      const matchOwner = !filterOwner || r.Owner === filterOwner
      const matchVis = !filterVisibility || r.Visibility === filterVisibility
      const matchArchived = filterArchived === 'all' || (filterArchived === 'active' ? r.Archived === 'No' : r.Archived !== 'No')
      return matchQuery && matchCat && matchOwner && matchVis && matchArchived
    })
  }, [baseRepos, query, filterCat, filterOwner, filterVisibility, filterArchived])

  const toggleShortlist = (idx: number) =>
    setShortlist(s => s.includes(idx) ? s.filter(i => i !== idx) : [...s, idx])

  const clearFilters = () => {
    setQuery(''); setFilterCat(''); setFilterOwner(''); setFilterVisibility(''); setFilterArchived('active')
  }
  const hasFilters = query || filterCat || filterOwner || filterVisibility || filterArchived !== 'active'

  return (
    <section id="explorer" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <div className="section-label mb-3">Repository Explorer</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Explore All <span className="grad-text">130 Repositories</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Searchable, filterable explorer. High-signal repos shown by default — toggle to see all.
            </p>
          </div>

          {/* Controls */}
          <div className="glass p-4 mb-4 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search repos, categories, signals, CV angles…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                    <X size={12} />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className={`btn-secondary text-xs py-2 px-3 ${filtersOpen ? 'border-blue-500/40 text-blue-300' : ''}`}
                >
                  <Filter size={12} /> Filters {filtersOpen ? '▲' : '▼'}
                </button>
                {hasFilters && (
                  <button onClick={clearFilters} className="btn-secondary text-xs py-2 px-3 text-red-400 border-red-500/25">
                    <X size={12} /> Clear
                  </button>
                )}
              </div>
            </div>

            {filtersOpen && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-white/8">
                <FilterSelect label="Category" value={filterCat} onChange={setFilterCat} options={ALL_CATEGORIES} />
                <FilterSelect label="Owner" value={filterOwner} onChange={setFilterOwner} options={ALL_OWNERS} />
                <FilterSelect label="Visibility" value={filterVisibility} onChange={setFilterVisibility} options={['public','private']} />
                <FilterSelect label="Status" value={filterArchived} onChange={setFilterArchived} options={[{value:'all',label:'All'},{value:'active',label:'Active only'},{value:'archived',label:'Archived only'}]} />
              </div>
            )}
          </div>

          {/* Toggle + stats row */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="text-sm text-slate-400">
              Showing <span className="text-white font-bold">{filtered.length}</span>
              {' '}of <span className="text-white font-bold">{baseRepos.length}</span>
              {' '}repos{!showAll && <span className="text-slate-600"> (high-signal subset)</span>}
            </div>
            <div className="flex items-center gap-3">
              {shortlist.length > 0 && (
                <span className="text-xs text-amber-400"><Star size={10} className="inline mr-1" />{shortlist.length} shortlisted</span>
              )}
              <button
                onClick={() => setShowAll(!showAll)}
                className="btn-secondary text-xs py-1.5 px-3"
              >
                {showAll ? 'Show high-signal only' : `Show all ${repos.length} repositories`}
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.slice(0, 80).map(repo => (
              <RepoCard
                key={repo.Index}
                repo={repo}
                shortlisted={shortlist.includes(repo.Index)}
                onToggleShortlist={() => toggleShortlist(repo.Index)}
              />
            ))}
          </div>

          {filtered.length > 80 && (
            <div className="text-center mt-6 text-slate-500 text-sm">
              Showing 80 of {filtered.length} results — refine search to narrow further.
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-600">
              No repositories match the current filters.
              <button onClick={clearFilters} className="block mx-auto mt-3 btn-secondary text-xs">Clear filters</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function FilterSelect({ label, value, onChange, options }: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[] | Array<{value: string; label: string}>
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-1">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
        >
          <option value="">All {label}s</option>
          {options.map(opt => {
            const v = typeof opt === 'string' ? opt : opt.value
            const l = typeof opt === 'string' ? opt : opt.label
            return <option key={v} value={v}>{l}</option>
          })}
        </select>
        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
      </div>
    </div>
  )
}

function RepoCard({ repo: r, shortlisted, onToggleShortlist }: {
  repo: Repo; shortlisted: boolean; onToggleShortlist: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`glass border transition-all duration-200 ${shortlisted ? 'border-amber-500/30' : 'border-white/8 hover:border-white/15'}`}>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <div className="text-white text-xs font-semibold truncate">{r.Repository}</div>
            <div className="text-slate-600 text-[10px]">{r.Owner}</div>
          </div>
          <button onClick={onToggleShortlist} className={`flex-shrink-0 transition-colors ${shortlisted ? 'text-amber-400' : 'text-slate-700 hover:text-slate-500'}`}>
            <Star size={12} fill={shortlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          <Badge variant={visibilityVariant(r.Visibility)} className="text-[9px]">{r.Visibility}</Badge>
          <Badge variant={maturityVariant(r['Maturity Signal'])} className="text-[9px] max-w-[100px] truncate">{r['Maturity Signal']}</Badge>
          {r.Archived !== 'No' && <Badge variant="red" className="text-[9px]">archived</Badge>}
        </div>

        <div className="text-[10px] text-slate-500 truncate mb-2">{r.Category}</div>

        {open && (
          <div className="space-y-2 pt-2 border-t border-white/8">
            <div className="text-[10px] text-slate-400 leading-relaxed">
              <span className="text-blue-400 font-medium">Signal: </span>{r['Technical Signals']}
            </div>
            <div className="text-[10px] text-slate-400 leading-relaxed">
              <span className="text-violet-400 font-medium">CV angle: </span>{r['Recruiter CV Angle']}
            </div>
            {r['Source URL'] && r.Visibility === 'public' && (
              <a
                href={r['Source URL']}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 mt-1"
              >
                <ExternalLink size={9} /> GitHub
              </a>
            )}
            {r.Visibility === 'private' && (
              <span className="text-[10px] text-slate-600 flex items-center gap-1">
                <Lock size={8} /> Private
              </span>
            )}
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="mt-1.5 text-[10px] text-slate-600 hover:text-slate-400 transition-colors"
        >
          {open ? '▲ less' : '▼ details'}
        </button>
      </div>
    </div>
  )
}
