import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const casesRoot = path.resolve('evals/cases')
const allowedDirections = new Set([
  'feature_creation',
  'feature_upgrade',
  'feature_optimization',
])
const manifestFlagIndex = process.argv.indexOf('--manifest')
const manifestPath = manifestFlagIndex >= 0 ? process.argv[manifestFlagIndex + 1] : null

if (manifestFlagIndex >= 0 && !manifestPath) {
  throw new Error('--manifest requires an output path')
}

function requireNonEmptyString(value, field, caseId) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${caseId}: requirement.${field} must be a non-empty string`)
  }
}

const entries = await readdir(casesRoot)
const caseIds = []

for (const entry of entries.sort()) {
  const caseDir = path.join(casesRoot, entry)
  if (!(await stat(caseDir)).isDirectory()) continue

  const casePath = path.join(caseDir, 'case.json')
  const raw = await readFile(casePath, 'utf8')
  const data = JSON.parse(raw)
  const requirement = data.requirement

  if (!requirement || typeof requirement !== 'object' || Array.isArray(requirement)) {
    throw new Error(`${entry}: case.json must contain a requirement object`)
  }

  requireNonEmptyString(requirement.requirement_goal, 'requirement_goal', entry)
  requireNonEmptyString(requirement.background, 'background', entry)
  requireNonEmptyString(requirement.current_state, 'current_state', entry)

  if (!allowedDirections.has(requirement.optimization_direction)) {
    throw new Error(
      `${entry}: requirement.optimization_direction must be one of ${[
        ...allowedDirections,
      ].join(', ')}`
    )
  }

  if (data.id !== entry) {
    throw new Error(`${entry}: case.json id must match its directory name`)
  }

  caseIds.push(entry)
  console.log(`[PASS] ${entry}: complete requirement brief`)
}

if (caseIds.length === 0) {
  throw new Error('No eval cases found under evals/cases')
}

if (manifestPath) {
  const absoluteManifestPath = path.resolve(manifestPath)
  await mkdir(path.dirname(absoluteManifestPath), { recursive: true })
  await writeFile(
    absoluteManifestPath,
    `${JSON.stringify({ cases: caseIds }, null, 2)}\n`,
    'utf8'
  )
  console.log(`[PASS] generated eval manifest: ${manifestPath}`)
}

console.log(`[PASS] validated ${caseIds.length} eval case(s)`)
