import React from 'react'
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts'
import { useInView } from '../../hooks/useInView'
import reposData from '../../data/repos.json'
import type { Repo } from '../../types'

const repos = reposData as Repo[]

function getCategoryCounts() {
  const map: Record<string, number> = {}
  repos.forEach(r => { map[r.Category] = (map[r.Category] || 0) + 1 })
  return Object.entries(map)
    .map(([name, count]) => ({ name: name.length > 30 ? name.substring(0, 28) + '…' : name, count }))
    .sort((a, b) => b.count - a.count)
}

function getMaturityCounts() {
  const map: Record<string, number> = {}
  repos.forEach(r => {
    const key = r['Maturity Signal'] || 'Unknown'
    map[key] = (map[key] || 0) + 1
  })
  return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
}

function getEvidenceCounts() {
  const map: Record<string, number> = {}
  repos.forEach(r => {
    const key = r['Evidence Level'] || 'Unknown'
    map[key] = (map[key] || 0) + 1
  })
  return Object.entries(map).map(([name, value]) => ({ name, value }))
}

const VISIBILITY_DATA = [
  { name: 'Private', value: repos.filter(r => r.Visibility === 'private').length, color: '#64748b' },
  { name: 'Public', value: repos.filter(r => r.Visibility === 'public').length, color: '#3b82f6' },
]

const ARCHIVED_DATA = [
  { name: 'Active', value: repos.filter(r => r.Archived === 'No').length, color: '#10b981' },
  { name: 'Archived', value: repos.filter(r => r.Archived !== 'No').length, color: '#ef4444' },
]

const PIE_COLORS = ['#3b82f6','#8b5cf6','#10b981','#f59e0b','#ef4444','#06b6d4','#ec4899','#a78bfa']

const CATEGORY_COLORS = ['#3b82f6','#8b5cf6','#10b981','#f59e0b','#06b6d4','#ec4899','#a78bfa','#60a5fa','#34d399','#fbbf24']

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
  if (active && payload?.length) {
    return (
      <div className="glass px-3 py-2 text-xs text-slate-200">
        <p>{payload[0].name}: <strong>{payload[0].value}</strong></p>
      </div>
    )
  }
  return null
}

function StatCard({ label, value, sub, color }: { label: string; value: number | string; sub: string; color: string }) {
  return (
    <div className="glass p-4">
      <div className="text-3xl font-black mb-1" style={{ color }}>{value}</div>
      <div className="text-white text-sm font-semibold mb-0.5">{label}</div>
      <div className="text-slate-500 text-xs">{sub}</div>
    </div>
  )
}

export default function S11Dashboard() {
  const { inView, ref } = useInView()
  const catData = getCategoryCounts()
  const maturityData = getMaturityCounts()
  const evidenceData = getEvidenceCounts()

  const allSignals = repos.flatMap(r =>
    r['Technical Signals'].split(',').map(s => s.trim()).filter(Boolean)
  )
  const signalFreq: Record<string, number> = {}
  allSignals.forEach(s => { signalFreq[s] = (signalFreq[s] || 0) + 1 })
  const topSignals = Object.entries(signalFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)

  return (
    <section id="dashboard" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(99,102,241,0.06), transparent)' }}
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <div className="section-label mb-3">Signal Dashboard</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Technical <span className="grad-text">Signal Dashboard</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Data-driven portfolio metrics. Each chart answers: what does this tell a recruiter?
            </p>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Repos" value={repos.length} sub="across 2 GitHub owners" color="#3b82f6" />
            <StatCard label="Public Repos" value={repos.filter(r => r.Visibility === 'public').length} sub="open & verifiable" color="#10b981" />
            <StatCard label="Categories" value={new Set(repos.map(r => r.Category)).size} sub="distinct product areas" color="#8b5cf6" />
            <StatCard label="Active" value={repos.filter(r => r.Archived === 'No').length} sub="non-archived repos" color="#f59e0b" />
          </div>

          {/* Main charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Category distribution */}
            <div className="glass p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Category Distribution</div>
              <p className="text-slate-500 text-xs mb-4">Portfolio weighted toward product experimentation, business systems, platform concepts, and web/software builds.</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={catData.slice(0, 10)} layout="vertical" margin={{ left: 0, right: 20 }}>
                  <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} width={160} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.08)' }} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {catData.slice(0, 10).map((_, i) => (
                      <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Public vs Private */}
            <div className="grid grid-rows-2 gap-4">
              <div className="glass p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Public / Private Split</div>
                <p className="text-slate-500 text-xs mb-3">Private repos indicate commercial or client-sensitive work. Public repos are directly verifiable.</p>
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width={100} height={100}>
                    <PieChart>
                      <Pie data={VISIBILITY_DATA} cx="50%" cy="50%" innerRadius={28} outerRadius={45} dataKey="value" strokeWidth={0}>
                        {VISIBILITY_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {VISIBILITY_DATA.map(d => (
                      <div key={d.name} className="flex items-center gap-2 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                        <span className="text-slate-300">{d.name}</span>
                        <span className="font-bold ml-auto" style={{ color: d.color }}>{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1">Active vs Archived</div>
                <p className="text-slate-500 text-xs mb-3">Most repositories are active — showing a builder who revisits and maintains work.</p>
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width={100} height={100}>
                    <PieChart>
                      <Pie data={ARCHIVED_DATA} cx="50%" cy="50%" innerRadius={28} outerRadius={45} dataKey="value" strokeWidth={0}>
                        {ARCHIVED_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {ARCHIVED_DATA.map(d => (
                      <div key={d.name} className="flex items-center gap-2 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                        <span className="text-slate-300">{d.name}</span>
                        <span className="font-bold ml-auto" style={{ color: d.color }}>{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Maturity + Evidence */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="glass p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-1">Maturity Signal Breakdown</div>
              <p className="text-slate-500 text-xs mb-4">Range of work maturity — from early experiments to production-ready and client-facing projects.</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={maturityData.slice(0, 6)} layout="vertical" margin={{ left: 0, right: 20 }}>
                  <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} width={170} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139,92,246,0.08)' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {maturityData.slice(0, 6).map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">Evidence Level Breakdown</div>
              <p className="text-slate-500 text-xs mb-4">Most evidence is written and structural — stronger visual proof is highlighted in the Gallery.</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={evidenceData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name, value }) => `${value}`} labelLine={false} strokeWidth={0}>
                    {evidenceData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend formatter={(value) => <span className="text-xs text-slate-400">{value}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Technical signal cloud */}
          <div className="glass p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">Technical Signal Cloud</div>
            <p className="text-slate-500 text-xs mb-4">Most-referenced technical signals across all 130 repositories — sized by frequency.</p>
            <div className="flex flex-wrap gap-2">
              {topSignals.map(([signal, freq]) => {
                const size = freq > 15 ? 'text-base' : freq > 10 ? 'text-sm' : freq > 5 ? 'text-xs' : 'text-[11px]'
                const opacity = Math.max(0.4, Math.min(1, freq / 20))
                return (
                  <span
                    key={signal}
                    className={`${size} font-semibold px-2 py-0.5 rounded-lg`}
                    style={{
                      background: 'rgba(99,102,241,0.08)',
                      border: '1px solid rgba(99,102,241,0.15)',
                      color: `rgba(147,197,253,${opacity})`,
                    }}
                  >
                    {signal}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
