import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

function starField(count: number, rMin: number, rMax: number) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const white = new THREE.Color('#e6e8f0')
  for (let i = 0; i < count; i++) {
    const r = rMin + Math.random() * (rMax - rMin)
    const th = Math.random() * Math.PI * 2
    const ph = Math.acos(2 * Math.random() - 1)
    positions[i * 3] = r * Math.sin(ph) * Math.cos(th)
    positions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7
    positions[i * 3 + 2] = r * Math.cos(ph)
    const dim = 0.25 + Math.random() * 0.6
    colors[i * 3] = white.r * dim
    colors[i * 3 + 1] = white.g * dim
    colors[i * 3 + 2] = white.b * dim
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  return geo
}

/**
 * The outer visual layer: a whisper of far stars + faint dust drifting near
 * the field envelope. Extremely low key so it never competes with the net.
 */
export function FieldBackdrop({
  count,
  reducedMotion,
}: {
  count: number
  reducedMotion: boolean
}) {
  const stars = useRef<THREE.Points>(null)
  const dust = useRef<THREE.Points>(null)
  const starsGeo = useMemo(() => starField(count, 5, 16), [count])
  const dustGeo = useMemo(() => starField(Math.max(40, Math.floor(count * 0.3)), 1.9, 3.4), [count])

  useFrame(({ clock }) => {
    if (reducedMotion) return
    const t = clock.getElapsedTime()
    if (stars.current) {
      stars.current.rotation.y = t * 0.004
      stars.current.rotation.z = Math.sin(t * 0.01) * 0.02
    }
    if (dust.current) {
      dust.current.rotation.y = -t * 0.008
    }
  })

  return (
    <group>
      <points ref={stars} geometry={starsGeo} frustumCulled={false}>
        <pointsMaterial
          size={0.024}
          vertexColors
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          toneMapped={false}
        />
      </points>
      <points ref={dust} geometry={dustGeo} frustumCulled={false}>
        <pointsMaterial
          size={0.016}
          vertexColors
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          toneMapped={false}
        />
      </points>
    </group>
  )
}