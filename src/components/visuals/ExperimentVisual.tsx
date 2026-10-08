import type { ReactElement } from 'react'
import type { ExperimentPattern } from '../../data/experiments'

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

function VisionViz() {
  const grid = Array.from({ length: 15 }, (_, i) => (i + 1) * 25)
  return (
    <g>
      {grid.map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" stroke="rgba(245,245,245,0.045)" />
      ))}
      {grid.map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="rgba(245,245,245,0.045)" />
      ))}

      <g stroke="#4d7cff" fill="none" strokeWidth="1.5">
        <rect x="58" y="64" width="132" height="96" />
        <path d="M58 78 V64 H72 M176 64 H190 V78 M190 146 V160 H176 M72 160 H58 V146" strokeWidth="3" />
      </g>
      <line x1="124" y1="96" x2="124" y2="128" stroke="#4d7cff" strokeWidth="1" opacity="0.7" />
      <line x1="108" y1="112" x2="140" y2="112" stroke="#4d7cff" strokeWidth="1" opacity="0.7" />
      <text x="58" y="54" fill="#4d7cff" fontSize="10" fontFamily={MONO} letterSpacing="1.5">
        OBJ_01 · 0.97
      </text>

      <g stroke="rgba(245,245,245,0.4)" fill="none">
        <rect x="236" y="158" width="98" height="74" strokeDasharray="5 5" />
      </g>
      <text x="236" y="150" fill="rgba(245,245,245,0.5)" fontSize="10" fontFamily={MONO} letterSpacing="1.5">
        OBJ_02 · 0.64
      </text>

      <text x="58" y="200" fill="rgba(245,245,245,0.35)" fontSize="9" fontFamily={MONO} letterSpacing="2">
        FRAME 0847 · 60 FPS
      </text>
      <text x="58" y="216" fill="rgba(245,245,245,0.35)" fontSize="9" fontFamily={MONO} letterSpacing="2">
        IoU 0.81 · TRACKING 02
      </text>
    </g>
  )
}

function SecurityViz() {
  return (
    <g>
      {[46, 78, 110, 142].map((r, i) => (
        <circle
          key={r}
          cx="200"
          cy="150"
          r={r}
          fill="none"
          stroke={i % 2 === 0 ? 'rgba(77,124,255,0.35)' : 'rgba(245,245,245,0.09)'}
          strokeDasharray={i % 2 === 0 ? 'none' : '4 6'}
        />
      ))}
      <g className="exp-scan">
        <line x1="200" y1="150" x2="200" y2="14" stroke="#4d7cff" strokeWidth="1.5" />
        <path d="M200 150 L200 22 A128 128 0 0 1 288 60 Z" fill="#4d7cff" opacity="0.07" />
      </g>
      <circle cx="200" cy="150" r="6" fill="#4d7cff" />
      <circle cx="200" cy="150" r="12" fill="none" stroke="#4d7cff" opacity="0.5" />

      <circle cx="268" cy="96" r="3.5" fill="#ffb454" />
      <circle cx="140" cy="212" r="3.5" fill="#7ddba8" />
      <circle cx="252" cy="208" r="3.5" fill="#ffb454" />

      <text x="24" y="34" fill="rgba(245,245,245,0.5)" fontSize="10" fontFamily={MONO} letterSpacing="2">
        THREAT RADAR
      </text>
      <text x="24" y="52" fill="#4d7cff" fontSize="9" fontFamily={MONO} letterSpacing="1.5">
        SCAN 00:12ms
      </text>
      <text x="24" y="272" fill="rgba(245,245,245,0.35)" fontSize="9" fontFamily={MONO} letterSpacing="1.5">
        2 HIGH · 1 MEDIUM · 0 CRITICAL
      </text>
    </g>
  )
}

function AgentsViz() {
  const center = { x: 200, y: 150 }
  const nodes = [
    { x: 84, y: 72, label: 'PLAN' },
    { x: 318, y: 92, label: 'TOOL' },
    { x: 96, y: 226, label: 'MEM' },
    { x: 306, y: 222, label: 'EVAL' },
    { x: 200, y: 46, label: 'GOAL' },
  ]

  return (
    <g>
      {nodes.map((node) => (
        <line
          key={node.label}
          x1={center.x}
          y1={center.y}
          x2={node.x}
          y2={node.y}
          stroke="rgba(245,245,245,0.16)"
          strokeWidth="1"
        />
      ))}

      {nodes.map((node, i) => (
        <circle key={`p${node.label}`} r="3.5" fill="#4d7cff">
          <animateMotion
            dur={`${2.4 + i * 0.35}s`}
            repeatCount="indefinite"
            path={`M${center.x} ${center.y} L${node.x} ${node.y}`}
          />
        </circle>
      ))}

      {nodes.map((node) => (
        <g key={node.label}>
          <rect
            x={node.x - 30}
            y={node.y - 14}
            width="60"
            height="28"
            fill="rgba(8,8,8,0.9)"
            stroke="rgba(245,245,245,0.22)"
          />
          <text
            x={node.x}
            y={node.y + 4}
            textAnchor="middle"
            fill="rgba(245,245,245,0.75)"
            fontSize="9"
            fontFamily={MONO}
            letterSpacing="1.5"
          >
            {node.label}
          </text>
        </g>
      ))}

      <circle cx={center.x} cy={center.y} r="34" fill="rgba(77,124,255,0.1)" stroke="#4d7cff" />
      <text
        x={center.x}
        y={center.y + 4}
        textAnchor="middle"
        fill="#9ab4ff"
        fontSize="11"
        fontFamily={MONO}
        letterSpacing="2"
      >
        AGENT
      </text>
      <text x="24" y="278" fill="rgba(245,245,245,0.35)" fontSize="9" fontFamily={MONO} letterSpacing="1.5">
        LOOP 04 · STEPS 17 · DONE
      </text>
    </g>
  )
}

function InterfacesViz() {
  return (
    <g fill="none">
      <path
        d="M150 96 H262 V188 H150 Z M192 60 H304 V152 H292 M304 60 L262 96"
        stroke="rgba(245,245,245,0.55)"
        strokeWidth="1.4"
      />
      <path d="M150 96 L192 60 M262 96 L304 60" stroke="rgba(77,124,255,0.8)" strokeWidth="1.4" />
      <path d="M262 188 L304 152" stroke="rgba(77,124,255,0.8)" strokeWidth="1.4" />
      <path d="M304 60 V152" stroke="rgba(77,124,255,0.8)" strokeWidth="1.4" />

      <g stroke="rgba(245,245,245,0.12)">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={30 + i * 45} y1="300" x2={140 + i * 22} y2="204" />
        ))}
        <line x1="0" y1="300" x2="400" y2="300" />
        <line x1="40" y1="272" x2="360" y2="272" />
        <line x1="76" y1="242" x2="330" y2="242" />
      </g>

      <text x="24" y="40" fill="rgba(245,245,245,0.5)" fontSize="10" fontFamily={MONO} letterSpacing="2">
        WEBGL / SCENE
      </text>
      <text x="24" y="58" fill="#4d7cff" fontSize="9" fontFamily={MONO} letterSpacing="1.5">
        60 FPS · DRAW 12
      </text>
      <text x="304" y="176" fill="rgba(245,245,245,0.4)" fontSize="9" fontFamily={MONO} letterSpacing="1.5">
        PICK
      </text>
    </g>
  )
}

const HEX_ROWS: Array<[string, string, boolean]> = [
  ['0040F2A0', 'MOV  EAX, DWORD PTR [EBP+08]', false],
  ['0040F2A3', 'TEST EAX, EAX', false],
  ['0040F2A5', 'JE   0040F2C1', true],
  ['0040F2A7', 'PUSH 00403020', false],
  ['0040F2AC', 'CALL 00401050', true],
  ['0040F2B1', 'ADD  ESP, 04', false],
  ['0040F2B4', 'CMP  EAX, FF', false],
  ['0040F2B7', 'JNE  0040F280', false],
]

function ReverseViz() {
  return (
    <g>
      <text x="24" y="36" fill="rgba(245,245,245,0.5)" fontSize="10" fontFamily={MONO} letterSpacing="2">
        DISASSEMBLY · .TEXT
      </text>
      <line x1="24" y1="46" x2="376" y2="46" stroke="rgba(245,245,245,0.12)" />
      {HEX_ROWS.map(([addr, op, hot], i) => {
        const y = 76 + i * 26
        return (
          <g key={addr}>
            {hot && <rect x="16" y={y - 15} width="368" height="22" fill="rgba(77,124,255,0.12)" />}
            <text x="26" y={y} fill={hot ? '#9ab4ff' : 'rgba(245,245,245,0.35)'} fontSize="11" fontFamily={MONO}>
              {addr}
            </text>
            <text x="126" y={y} fill={hot ? '#f5f5f5' : 'rgba(245,245,245,0.6)'} fontSize="11" fontFamily={MONO}>
              {op}
            </text>
          </g>
        )
      })}
      <text x="26" y="292" fill="rgba(245,245,245,0.3)" fontSize="9" fontFamily={MONO} letterSpacing="1.5">
        ENTRY 0x00401000 · ARCH x86
      </text>
    </g>
  )
}

function HardwareViz() {
  return (
    <g>
      <text x="24" y="36" fill="rgba(245,245,245,0.5)" fontSize="10" fontFamily={MONO} letterSpacing="2">
        BOARD REV. B
      </text>

      <g stroke="rgba(77,124,255,0.65)" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M64 96 H150 V150 H196" />
        <path d="M64 200 H120 V150" />
        <path d="M300 96 H340 V210 H244" />
        <path d="M244 180 H330" />
        <path d="M196 210 H244 V246 H140" />
      </g>

      <g fill="rgba(77,124,255,0.9)">
        <circle cx="64" cy="96" r="5" />
        <circle cx="64" cy="200" r="5" />
        <circle cx="340" cy="210" r="5" />
        <circle cx="330" cy="180" r="5" />
        <circle cx="140" cy="246" r="5" />
      </g>

      <g>
        <rect x="196" y="120" width="48" height="60" fill="#0c0d12" stroke="rgba(245,245,245,0.5)" />
        <circle cx="206" cy="130" r="3" fill="rgba(245,245,245,0.5)" />
        {Array.from({ length: 5 }, (_, i) => (
          <g key={i} stroke="rgba(245,245,245,0.4)" strokeWidth="2">
            <line x1="190" y1={130 + i * 10} x2="196" y2={130 + i * 10} />
            <line x1="244" y1={130 + i * 10} x2="250" y2={130 + i * 10} />
          </g>
        ))}
        <text x="220" y="154" textAnchor="middle" fill="rgba(245,245,245,0.65)" fontSize="9" fontFamily={MONO}>
          MCU
        </text>
      </g>

      <text x="26" y="284" fill="rgba(245,245,245,0.3)" fontSize="9" fontFamily={MONO} letterSpacing="1.5">
        3.3V · I2C · 400kHz
      </text>
    </g>
  )
}

const VIZ: Record<ExperimentPattern, () => ReactElement> = {
  vision: VisionViz,
  security: SecurityViz,
  agents: AgentsViz,
  interfaces: InterfacesViz,
  reverse: ReverseViz,
  hardware: HardwareViz,
}

export function ExperimentVisual({ pattern }: { pattern: ExperimentPattern }) {
  const Visual = VIZ[pattern]
  return (
    <div className="exp-viz" aria-hidden="true">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <Visual />
      </svg>
    </div>
  )
}
