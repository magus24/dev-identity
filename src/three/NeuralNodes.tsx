import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import type { NeuralSystem } from './system'
import { glowTexture } from './glow'

/**
 * The field's nodes — tiny white/light-grey light points, a few subtle blue
 * among them. Rendered as instanced billboards so per-node size + brightness
 * (depth-cued) stay GPU-cheap.
 */
export function NeuralNodes({ sys }: { sys: NeuralSystem }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const mat = useRef<THREE.MeshBasicMaterial>(null)
  const tmpObj = useMemo(() => new THREE.Object3D(), [])
  const tmpColor = useMemo(() => new THREE.Color(), [])
  const tmpQuat = useMemo(() => new THREE.Quaternion(), [])

  useFrame(({ camera }) => {
    const m = mesh.current
    if (!m) return
    const n = sys.count
    const pos = sys.positions
    const size = sys.nodeSizeArr
    const col = sys.nodeColorArr

    tmpQuat.copy(camera.quaternion)
    for (let i = 0; i < n; i++) {
      tmpObj.position.set(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2])
      tmpObj.quaternion.copy(tmpQuat)
      const s = size[i]
      tmpObj.scale.set(s, s, s)
      tmpObj.updateMatrix()
      m.setMatrixAt(i, tmpObj.matrix)
      tmpColor.setRGB(col[i * 3], col[i * 3 + 1], col[i * 3 + 2])
      m.setColorAt(i, tmpColor)
    }
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
    if (mat.current) mat.current.opacity = 1
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, sys.count]} frustumCulled={false}>
      <planeGeometry args={[0.06, 0.06]} />
      <meshBasicMaterial
        ref={mat}
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