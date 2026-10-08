import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import type { NeuralSystem } from './system'
import { glowTexture } from './glow'

/**
 * Signal flow — small fast light particles travelling along the filaments.
 * They are the "information" moving through the net: outer → cluster → core.
 */
export function SignalFlow({
  sys,
  size,
}: {
  sys: NeuralSystem
  size: number
}) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const mat = useRef<THREE.MeshBasicMaterial>(null)
  const tmpObj = useMemo(() => new THREE.Object3D(), [])
  const tmpQuat = useMemo(() => new THREE.Quaternion(), [])

  useFrame(({ camera }) => {
    const m = mesh.current
    if (!m) return
    if (mat.current) mat.current.opacity = Math.max(0.1, sys.op * 0.85)
    const signals = sys.signals
    const pos = sys.positions
    const edges = sys.edges
    const sentinel = sys.sentinel
    const sLen = signals.length

    tmpQuat.copy(camera.quaternion)
    for (let si = 0; si < sLen; si++) {
      const sig = signals[si]
      const e = edges[sig.edge]

      const ax = e.a === sentinel ? 0 : pos[e.a * 3]
      const ay = e.a === sentinel ? 0 : pos[e.a * 3 + 1]
      const az = e.a === sentinel ? 0 : pos[e.a * 3 + 2]
      const bx = e.b === sentinel ? 0 : pos[e.b * 3]
      const by = e.b === sentinel ? 0 : pos[e.b * 3 + 1]
      const bz = e.b === sentinel ? 0 : pos[e.b * 3 + 2]

      tmpObj.position.set(
        ax + (bx - ax) * sig.t,
        ay + (by - ay) * sig.t,
        az + (bz - az) * sig.t,
      )
      tmpObj.quaternion.copy(tmpQuat)
      const sigSize = size * (1 + (1 - Math.abs(sig.t - 0.5) * 2) * 0.4)
      tmpObj.scale.set(sigSize, sigSize, sigSize)
      tmpObj.updateMatrix()
      m.setMatrixAt(si, tmpObj.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, sys.signals.length]} frustumCulled={false}>
      <planeGeometry args={[0.09, 0.09]} />
      <meshBasicMaterial
        ref={mat}
        color={0x87a9ff}
        map={glowTexture()}
        transparent
        alphaTest={0.01}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </instancedMesh>
  )
}