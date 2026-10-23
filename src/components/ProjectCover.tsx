import type { Project } from '../data/portfolio'

/**
 * Monochrome illustrative covers for projects without a supplied screenshot.
 * They are drawings, not screenshots, and are labelled that way in the project modal.
 */
export default function ProjectCover({ kind, className = '' }: { kind: Project['cover']; className?: string }) {
  const common = {
    viewBox: '0 0 640 420',
    className: `h-full w-full ${className}`,
    preserveAspectRatio: 'xMidYMid slice' as const,
    role: 'img' as const,
  }

  if (kind === 'deepfake') {
    const pts: [number, number][] = [
      [320, 82], [262, 108], [378, 108], [236, 168], [404, 168], [248, 238], [392, 238],
      [290, 150], [350, 150], [320, 196], [292, 232], [348, 232], [320, 268], [286, 292], [354, 292], [320, 326],
    ]
    const edges: [number, number][] = [
      [0, 1], [0, 2], [1, 3], [2, 4], [1, 7], [2, 8], [7, 8], [3, 7], [4, 8], [7, 9], [8, 9], [3, 5], [4, 6],
      [5, 10], [6, 11], [9, 10], [9, 11], [10, 11], [10, 12], [11, 12], [5, 13], [6, 14], [12, 13], [12, 14], [13, 15], [14, 15],
    ]
    return (
      <svg {...common} aria-label="Illustrative cover: a face wireframe with a scan line, representing media analysis">
        <rect width="640" height="420" fill="#0d0d0d" />
        <g stroke="#2a2a2a" strokeWidth="1">
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 54} y1="0" x2={i * 54} y2="420" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 54} x2="640" y2={i * 54} />
          ))}
        </g>
        <g fill="none" stroke="#4d4d4d" strokeWidth="1.5">
          <rect x="70" y="70" width="170" height="280" rx="6" />
          <rect x="400" y="70" width="170" height="280" rx="6" />
        </g>
        <ellipse cx="320" cy="210" rx="110" ry="148" fill="#141414" stroke="#9a9a9a" strokeWidth="1.5" />
        <g stroke="#bdbdbd" strokeWidth="1">
          {edges.map(([a, b], i) => (
            <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} />
          ))}
        </g>
        <g fill="#f2f2f2">
          {pts.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" />
          ))}
        </g>
        <rect x="190" y="176" width="260" height="2" fill="#f2f2f2" opacity="0.85" />
        <rect x="190" y="150" width="260" height="26" fill="url(#scan)" opacity="0.5" />
        <defs>
          <linearGradient id="scan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <g stroke="#f2f2f2" strokeWidth="2.5" fill="none">
          <path d="M176 70v-22h22M464 70v-22h-22M176 372v22h22M464 372v22h-22" transform="translate(0,0)" />
        </g>
      </svg>
    )
  }

  if (kind === 'motion') {
    return (
      <svg {...common} aria-label="Illustrative cover: a small electric vehicle with a sensor cone detecting an obstacle">
        <rect width="640" height="420" fill="#0d0d0d" />
        <g stroke="#2a2a2a" strokeWidth="1.5" fill="none">
          <path d="M0 80h120l20 24h140l16-24h344" />
          <path d="M0 120h90l24 30h96" />
          <path d="M640 150H470l-20 26h-80" />
        </g>
        <g fill="#4d4d4d">
          <circle cx="120" cy="80" r="4" />
          <circle cx="210" cy="150" r="4" />
          <circle cx="370" cy="176" r="4" />
        </g>
        <line x1="0" y1="330" x2="640" y2="330" stroke="#4d4d4d" strokeWidth="2" />
        <g>
          <path d="M120 296c0-18 12-30 30-30h70c14 0 22 6 30 18l16 12v0c10 2 14 6 14 14v10H120z" fill="#171717" stroke="#d6d6d6" strokeWidth="2" />
          <path d="M162 270h52l16 16h-68z" fill="none" stroke="#9a9a9a" strokeWidth="1.5" />
          <circle cx="160" cy="330" r="26" fill="#000" stroke="#f2f2f2" strokeWidth="3" />
          <circle cx="160" cy="330" r="9" fill="#9a9a9a" />
          <circle cx="262" cy="330" r="26" fill="#000" stroke="#f2f2f2" strokeWidth="3" />
          <circle cx="262" cy="330" r="9" fill="#9a9a9a" />
        </g>
        <g fill="none" stroke="#9a9a9a" strokeWidth="1.5" strokeDasharray="6 6">
          <path d="M296 292 L470 230" />
          <path d="M296 292 L470 292" />
          <path d="M296 292 L470 354" />
          <path d="M470 230 Q 490 292 470 354" />
          <path d="M430 246 Q 446 292 430 338" />
        </g>
        <rect x="486" y="258" width="62" height="72" rx="3" fill="#2a2a2a" stroke="#f2f2f2" strokeWidth="2" />
        <path d="M498 330v-34M517 330v-48M536 330v-26" stroke="#4d4d4d" strokeWidth="3" />
      </svg>
    )
  }

  return (
    <svg {...common} aria-label="Illustrative cover: a shopping list with search and cart elements">
      <rect width="640" height="420" fill="#0d0d0d" />
      <rect x="110" y="56" width="420" height="44" rx="22" fill="none" stroke="#9a9a9a" strokeWidth="2" />
      <circle cx="144" cy="78" r="9" fill="none" stroke="#d6d6d6" strokeWidth="2" />
      <path d="M151 85l8 8" stroke="#d6d6d6" strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${110 + i * 108},132)`}>
          <rect width="96" height="170" rx="10" fill="#171717" stroke="#4d4d4d" strokeWidth="1.5" />
          <circle cx="48" cy="52" r="24" fill="none" stroke="#f2f2f2" strokeWidth="2" />
          <rect x="16" y="100" width="64" height="8" rx="4" fill="#9a9a9a" />
          <rect x="30" y="118" width="36" height="6" rx="3" fill="#4d4d4d" />
          <rect x="16" y="138" width="64" height="20" rx="10" fill="#f2f2f2" />
        </g>
      ))}
      <rect x="110" y="326" width="420" height="44" rx="10" fill="#171717" stroke="#4d4d4d" strokeWidth="1.5" />
      <rect x="426" y="336" width="92" height="24" rx="12" fill="#f2f2f2" />
    </svg>
  )
}
