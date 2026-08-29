import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const casesRoot = path.resolve('evals/cases')
const allowedDirections = new Set([
  'feature_creation',
  'feature_upgrade',
  'feature_optimization',
])

function requireNonEmptyString(value, field, caseId) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${caseId}: requirement.${field} must be a non-empty string`)
  }
}

const entries = await readdir(casesRoot)
let caseCount = 0

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

  caseCount += 1
  console.log(`[PASS] ${entry}: complete requirement brief`)
}

if (caseCount === 0) {
  throw new Error('No eval cases found under evals/cases')
}

console.log(`[PASS] validated ${caseCount} eval case(s)`)
