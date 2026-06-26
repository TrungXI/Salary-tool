import { MIN_WAGES, type Region } from './salary'

export interface SnapshotPayload {
  input: {
    grossSalary: number
    dependants: number
    region: Region
    allowances: number
    employeeType: 'full' | 'probation'
  }
  net: number   // hint for OG generation w/o recompute (cheap), not authoritative
}

// Slug format: base64url(JSON.stringify({g, d, r, a, e, n}))
// keys shortened to keep slug under ~80 chars
// g = grossSalary, d = dependants, r = region, a = allowances, e = empType (0=full,1=probation), n = net
export function encodeSnapshot(p: SnapshotPayload): string {
  const compact = {
    g: p.input.grossSalary,
    d: p.input.dependants,
    r: p.input.region,
    a: p.input.allowances,
    e: p.input.employeeType === 'full' ? 0 : 1,
    n: p.net,
  }
  const json = JSON.stringify(compact)
  const b64 = typeof Buffer !== 'undefined'
    ? Buffer.from(json, 'utf8').toString('base64')
    : btoa(unescape(encodeURIComponent(json)))
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodeSnapshot(slug: string): SnapshotPayload | null {
  try {
    let b64 = slug.replace(/-/g, '+').replace(/_/g, '/')
    while (b64.length % 4) b64 += '='
    const json = typeof Buffer !== 'undefined'
      ? Buffer.from(b64, 'base64').toString('utf8')
      : decodeURIComponent(escape(atob(b64)))
    const o = JSON.parse(json)
    if (typeof o.g !== 'number' || typeof o.r !== 'number') return null
    return {
      input: {
        grossSalary: o.g,
        dependants: o.d ?? 0,
        region: o.r as Region,
        allowances: o.a ?? 0,
        employeeType: o.e === 1 ? 'probation' : 'full',
      },
      net: o.n ?? 0,
    }
  } catch {
    return null
  }
}

export function regionFromMinWage(w: number): Region {
  const entry = (Object.entries(MIN_WAGES) as [string, number][]).find(([, v]) => v === w)
  return entry ? (Number(entry[0]) as Region) : 1
}
