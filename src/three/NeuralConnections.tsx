import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import type { NeuralSystem } from './system'

const ORIGIN = new THREE.Vector3(0, 0, 0)

/**
 * The synaptic filaments. Thin, faint, deliberately sparse — a few dozen
 * quality threads instead of a thick web. Per-vertex colour carries the
 * intensity, and an edge briefly cools toward blue while a signal travels it.
 */
export function NeuralConnections({ sys }: { sys: NeuralSystem }) {
  const segments = useRef<THREE.LineSegments>(null)
  const mat = useRef<THREE.LineBasicMaterial>(null)

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(sys.edgePositions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(sys.edgeColor, 3))
    return g
  }, [sys])

  const a = useMemo(() => new THREE.Vector3(), [])
  const b = useMemo(() => new THREE.Vector3(), [])

  useFrame(function updateEdges({ clock }) {
    const pos = sys.positions
    const edgePos = sys.edgePositions
    const edgeCol = sys.edgeColor
    const active = sys.edgeActive
    const throb = 0.5 + 0.5 * Math.sin(clock.getElapsedTime() * 0.22)

    for (let e = 0; e < sys.edges.length; e++) {
      const { a: ai, b: bi, intensity } = sys.edges[e]
      if (ai === sys.sentinel) a.copy(ORIGIN)
      else a.set(pos[ai * 3], pos[ai * 3 + 1], pos[ai * 3 + 2])
      if (bi === sys.sentinel) b.copy(ORIGIN)
      else b.set(pos[bi * 3], pos[bi * 3 + 1], pos[bi * 3 + 2])

      const o = e * 6
      edgePos[o] = a.x
      edgePos[o + 1] = a.y
      edgePos[o + 2] = a.z
      edgePos[o + 3] = b.x
      edgePos[o + 4] = b.y
      edgePos[o + 5] = b.z

      const hot = active[e]
      const heat = intensity * (0.9 + hot * 3.2) * (0.9 + throb * 0.1) * sys.edgeOp
      const blu = Math.min(hot * 1.4, 1)
      const r = heat * (0.72 - blu * 0.16)
      const g = heat * (0.78 - blu * 0.1)
      const bB = heat * (0.85 + blu * 0.75)
      edgeCol[o] = r
      edgeCol[o + 1] = g
      edgeCol[o + 2] = bB
      edgeCol[o + 3] = r
      edgeCol[o + 4] = g
      edgeCol[o + 5] = bB
    }

    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute
    const colAttr = geo.getAttribute('color') as THREE.BufferAttribute
    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
    if (mat.current) mat.current.opacity = Math.max(0.12, sys.edgeOp * 1.1)
  })

  return (
    <lineSegments ref={segments} geometry={geo} frustumCulled={false}>
      <lineBasicMaterial
        ref={mat}
        vertexColors
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  )
}