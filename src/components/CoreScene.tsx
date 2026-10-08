import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect, useMemo, useRef } from 'react'
import type { RefObject } from 'react'
import type { Spec } from '../hooks/useScrollStory'
import { CORE_TARGETS, type CoreTarget } from './coreStates'
import { CoreFallback } from './CoreFallback'
import { NeuralCore } from './NeuralCore'

interface DragState {
  sx: number
  sy: number
}

interface CoreSceneProps {
  spec: Spec
  section: string
  velocity: RefObject<number>
  projectId: RefObject<string | null>
  reducedMotion: boolean
}

function ringGeometry(radius: number, segments = 96) {
  const positions = new Float32Array(segments * 3)
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2
    positions[i * 3] = Math.cos(a) * radius
    positions[i * 3 + 1] = Math.sin(a) * radius
    positions[i * 3 + 2] = 0
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  return geo
}

function particleGeometry(count: number) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const accent = new THREE.Color('#4d7cff')
  const plain = new THREE.Color('#f5f5f5')
  const rand = (min: number, max: number) => min + Math.random() * (max - min)

  for (let i = 0; i < count; i++) {
    const bucket = i % 10
    const radius =
      bucket < 4 ? rand(0.9, 1.28) : bucket < 8 ? rand(0.4, 0.85) : rand(1.3, 1.7)
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(rand(-1, 1))
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)

    const c = i % 5 === 0 ? accent : plain
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  return geo
}

function Core({
  spec,
  section,
  velocity,
  drag,
  reducedMotion,
}: { spec: Spec; section: string; velocity: RefObject<number>; drag: DragState; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Group>(null)
  const octa = useRef<THREE.Group>(null)
  const rings = useRef<THREE.Group>(null)
  const parts = useRef<THREE.Points>(null)
  const outerMat = useRef<THREE.LineBasicMaterial>(null)
  const innerMat = useRef<THREE.LineBasicMaterial>(null)
  const octaMat = useRef<THREE.LineBasicMaterial>(null)
  const ballMat = useRef<THREE.MeshBasicMaterial>(null)
  const ringMat = useRef<THREE.LineBasicMaterial>(null)
  const partsMat = useRef<THREE.PointsMaterial>(null)

  const pointer = useMemo(() => ({ x: 0, y: 0 }), [])
  const spin = useRef(0)
  const lastT = useRef(0)
  const cur = useRef<CoreTarget>({ ...CORE_TARGETS.seed })

  const geometries = useMemo(
    () => ({
      outer: new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1, 1)),
      inner: new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1, 1)),
      octa: new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.42)),
      ring: ringGeometry(1.32),
      parts: particleGeometry(spec.particles),
    }),
    [spec.particles],
  )

  const materials = useMemo(
    () => ({
      outer: new THREE.LineBasicMaterial({ color: 0xf5f5f5, transparent: true, opacity: 0.5 }),
      inner: new THREE.LineBasicMaterial({ color: 0x4d7cff, transparent: true, opacity: 0.2 }),
      octa: new THREE.LineBasicMaterial({ color: 0x4d7cff, transparent: true, opacity: 0.85 }),
      ball: new THREE.MeshBasicMaterial({
        color: 0x4d7cff,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      ring: new THREE.LineBasicMaterial({ color: 0xf5f5f5, transparent: true, opacity: 0.3 }),
      parts: new THREE.PointsMaterial({
        size: 0.022,
        vertexColors: true,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    }),
    [],
  )

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [pointer])

  useFrame(({ clock, camera, size }) => {
    const t = clock.getElapsedTime()
    const dt = lastT.current === 0 ? 0.016 : Math.min(t - lastT.current, 0.05)
    lastT.current = t

    const target = CORE_TARGETS[section] ?? CORE_TARGETS.seed
    const c = cur.current
    const damp = (k: keyof CoreTarget) =>
      (c[k] = THREE.MathUtils.damp(c[k] as number, target[k] as number, 3.2, dt))

    damp('x')
    damp('yk')
    damp('z')
    damp('scale')
    damp('outer')
    damp('inner')
    damp('octa')
    damp('ball')
    damp('ringScale')
    damp('ringOp')
    damp('tilt')
    damp('pScale')
    damp('pFlatten')
    damp('pOp')
    damp('speed')

    if (!reducedMotion) {
      spin.current += c.speed * (1 + (velocity.current ?? 0) * 1.4) * dt
    }

    const aspect = size.width / Math.max(size.height, 1)
    const fov =
      camera instanceof THREE.PerspectiveCamera ? camera.fov : 34
    const halfH = Math.tan((fov * Math.PI) / 360) * 4.6

    if (group.current) {
      const g = group.current
      g.position.x = dampValue(g.position.x, c.x * halfH * aspect, dt)
      g.position.y = dampValue(g.position.y, c.yk * halfH, dt)
      g.position.z = dampValue(g.position.z, c.z, dt)
      g.scale.setScalar(c.scale)
      g.rotation.y = spin.current + pointer.x * 0.22
      g.rotation.x = dampValue(g.rotation.x, pointer.y * 0.2 + drag.sy * 0.5, dt)
      g.rotation.z = dampValue(g.rotation.z, drag.sx * 0.3, dt)
    }

    if (inner.current) {
      const g = inner.current
      g.rotation.y = dampValue(g.rotation.y, -spin.current * 1.7, dt)
      g.rotation.x = 0.7
      g.scale.setScalar(0.66)
    }
    if (octa.current) {
      const g = octa.current
      g.rotation.y = dampValue(g.rotation.y, spin.current * 2.4, dt)
      g.rotation.z = dampValue(g.rotation.z, reducedMotion ? 0 : t * 0.35, dt)
      g.scale.setScalar(c.octa)
    }
    if (rings.current) {
      const g = rings.current
      g.rotation.x = dampValue(g.rotation.x, c.tilt, dt)
      g.rotation.y = dampValue(g.rotation.y, spin.current * 0.8, dt)
      g.rotation.z = dampValue(g.rotation.z, reducedMotion ? 0 : t * 0.14, dt)
      g.scale.setScalar(c.ringScale)
    }
    if (parts.current) {
      const p = parts.current
      p.rotation.y = dampValue(p.rotation.y, spin.current * 0.5, dt)
      p.scale.set(c.pScale, c.pScale, c.pScale * c.pFlatten)
    }

    if (outerMat.current) outerMat.current.opacity = c.outer
    if (innerMat.current) innerMat.current.opacity = c.inner
    if (octaMat.current) octaMat.current.opacity = 0.4 + c.octa * 0.55
    if (ballMat.current) ballMat.current.opacity = c.ball * 0.9
    if (ringMat.current) ringMat.current.opacity = c.ringOp
    if (partsMat.current) partsMat.current.opacity = c.pOp

    if (spec.parallax && !reducedMotion) {
      camera.position.x = dampValue(camera.position.x, pointer.x * 0.55, dt)
      camera.position.y = dampValue(camera.position.y, -pointer.y * 0.35, dt)
      camera.lookAt(0, 0, 0)
    }
  })

  return (
    <group>
      <group ref={group}>
        <lineSegments geometry={geometries.outer} material={materials.outer} />
        <group ref={inner}>
          <lineSegments geometry={geometries.inner} material={materials.inner} />
        </group>
        <group ref={octa}>
          <lineSegments geometry={geometries.octa} material={materials.octa} />
          <mesh material={materials.ball}>
            <octahedronGeometry args={[0.16, 0]} />
          </mesh>
        </group>
        <group ref={rings}>
          <lineLoop geometry={geometries.ring} material={materials.ring} rotation={[0, 0, 0]} />
          <lineLoop geometry={geometries.ring} material={materials.ring} rotation={[0, 0, Math.PI / 3]} />
          <lineLoop geometry={geometries.ring} material={materials.ring} rotation={[0, 0, Math.PI / 1.5]} />
        </group>
        <points ref={parts} geometry={geometries.parts} material={materials.parts} />
      </group>
    </group>
  )
}

function dampValue(current: number, target: number, dt: number) {
  return THREE.MathUtils.damp(current, target, 3, dt)
}

export function CoreScene({
  spec,
  section,
  velocity,
  projectId,
  reducedMotion,
}: CoreSceneProps) {
  const drag = useMemo<DragState>(() => ({ sx: 0, sy: 0 }), [])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.dataset.dragging = 'true'
  }
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.dataset.dragging !== 'true') return
    drag.sx = (drag.sx + event.movementX * 0.004) % (Math.PI * 2)
    drag.sy = (drag.sy + event.movementY * 0.003) % (Math.PI * 2)
  }
  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = event.currentTarget
    if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId)
    delete el.dataset.dragging
  }

  return (
    <div className="core-stage" aria-hidden="true">
      {spec.enabled ? (
        <Canvas
          dpr={spec.dpr}
          frameloop={reducedMotion ? 'demand' : 'always'}
          camera={{ position: [0, 0, 4.6], fov: 34, near: 0.1, far: 24 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        >
          <Core
            spec={spec}
            section={section}
            velocity={velocity}
            drag={drag}
            reducedMotion={reducedMotion}
          />
          {spec.particles > 0 && (
            <NeuralCore
              spec={spec}
              section={section}
              projectId={projectId}
              velocity={velocity}
              reducedMotion={reducedMotion}
            />
          )}
        </Canvas>
      ) : (
        <div className="core-fallback">
          <CoreFallback />
        </div>
      )}
      {spec.dragRotate && !reducedMotion && (
        <div
          className="core-grab"
          style={{ right: 'calc(var(--pad) + 2vw)', top: '24vh' }}
          data-cursor="rotate"
          role="presentation"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />
      )}
    </div>
  )
}