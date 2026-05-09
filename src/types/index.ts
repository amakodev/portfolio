export interface Repo {
  Index: number
  Owner: string
  Repository: string
  'Full Name': string
  Visibility: string
  'Default Branch': string
  'Size KB': number
  'Maturity Signal': string
  Category: string
  'Technical Signals': string
  'Bigger Story': string
  'Recruiter CV Angle': string
  'Suggested Resume Label': string
  'Best Use': string
  Archived: string
  'Evidence Level': string
  'Source URL': string
}

export interface PortfolioLayer {
  'Portfolio Layer': string
  'Repo Count': number
  'Representative Repos': string
  Story: string
  'Recruiter Interpretation': string
}

export interface CVHighlight {
  Priority: number
  'Project / Platform': string
  'Repos Included': string
  'CV Bullet': string
}

export interface FeaturedProject {
  id: string
  title: string
  category: string
  theme: 'product' | 'platform' | 'automation' | 'experiments'
  status: string
  maturityBadge: string
  evidenceLevel: string
  whatItProves: string
  contribution: string
  technicalSignals: string
  techStack?: string
  recruiterTakeaway: string
  demoLink?: string
  liveLink?: string
  screenshotFile?: string
  screenshotFiles?: string[]
  sourceURL?: string
  isPrivate: boolean
  representativeRepos: string[]
  isHighSignal?: boolean
  isFeatured?: boolean
}

export interface RecruiterPath {
  id: string
  label: string
  icon: string
  description: string
  priorityCategories: string[]
  message: string
}

export interface Theme {
  id: string
  title: string
  message: string
  categories: string[]
  color: string
  gradFrom: string
  gradTo: string
}

export interface TimelineStage {
  stage: number
  title: string
  subtitle: string
  categories: string[]
  message: string
  color: string
}
