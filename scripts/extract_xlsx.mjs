import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

let XLSX
try {
  XLSX = (await import('xlsx')).default
} catch {
  console.error('xlsx not installed. Run: npm install')
  process.exit(1)
}

const xlsxPath = resolve(root, 'references/github_repo_portfolio_130_repos.xlsx')
const workbook = XLSX.readFile(xlsxPath)

function sheetToJson(sheetName) {
  const sheet = workbook.Sheets[sheetName]
  if (!sheet) { console.warn(`Sheet not found: ${sheetName}`); return [] }
  return XLSX.utils.sheet_to_json(sheet, { defval: '' })
}

function sanitize(rows) {
  return rows.map(row => {
    const out = {}
    for (const [k, v] of Object.entries(row)) {
      out[k.trim()] = typeof v === 'string' ? v.trim() : v
    }
    return out
  })
}

const sheets = workbook.SheetNames
console.log('Sheets found:', sheets)

const allRepos = sanitize(sheetToJson('All Repos'))
const portfolioStory = sanitize(sheetToJson('Portfolio Story'))
const cvHighlights = sanitize(sheetToJson('CV Highlights'))
const byOwner = sanitize(sheetToJson('By Owner'))
const glossary = sanitize(sheetToJson('Glossary'))
const connectorGaps = sanitize(sheetToJson('Connector Gaps'))

const dataDir = resolve(root, 'src/data')
writeFileSync(`${dataDir}/repos.json`, JSON.stringify(allRepos, null, 2))
writeFileSync(`${dataDir}/portfolioStory.json`, JSON.stringify(portfolioStory, null, 2))
writeFileSync(`${dataDir}/cvHighlights.json`, JSON.stringify(cvHighlights, null, 2))
writeFileSync(`${dataDir}/byOwner.json`, JSON.stringify(byOwner, null, 2))
writeFileSync(`${dataDir}/glossary.json`, JSON.stringify(glossary, null, 2))
writeFileSync(`${dataDir}/connectorGaps.json`, JSON.stringify(connectorGaps, null, 2))

console.log(`✓ repos.json          (${allRepos.length} rows)`)
console.log(`✓ portfolioStory.json (${portfolioStory.length} rows)`)
console.log(`✓ cvHighlights.json   (${cvHighlights.length} rows)`)
console.log(`✓ byOwner.json        (${byOwner.length} rows)`)
console.log(`✓ glossary.json       (${glossary.length} rows)`)
console.log(`✓ connectorGaps.json  (${connectorGaps.length} rows)`)
console.log('\nData extraction complete.')
