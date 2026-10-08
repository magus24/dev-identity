import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect, useMemo, useRef } from 'react'
import type { RefObject } from 'react'
import type { Spec } from '../hooks/useScrollStory'
import { networkLayout } from '../config/neural'
import { CORE_TARGETS } from './coreStates'

interface NeuralCoreProps {
  spec: Spec
  section: string
  projectId: RefObject<string | null>
  velocity: RefObject<number>
  reducedMotion: boolean
}

interface Edge {
  a: number
  b: number
  inward: boolean
}

interface Pulse {
  edge: number
  t: number
  speed: number
}

interface Topology {
  shellR: number
  midR: number
  ringR: number
  yF: number
  spread: number
  op: number
  edgeOp: number
}

const TOPOLOGY: Record<string, Topology> = {
  seed: { shellR: 2.1, midR: 1.5, ringR: 1.05, yF: 1, spread: 0.8, op: 0.2, edgeOp: 0.1 },
  open: { shellR: 2.45, midR: 1.75, ringR: 1.12, yF: 0.95, spread: 1, op: 0.4, edgeOp: 0.2 },
  systems: { shellR: 2.6, midR: 1.9, ringR: 1.18, yF: 0.8, spread: 1.08, op: 0.5, edgeOp: 0.24 },
  network: { shellR: 2.95, midR: 2.15, ringR: 1.32, yF: 0.3, spread: 1.32, op: 0.62, edgeOp: 0.34 },
  reassemble: { shellR: 1.62, midR: 1.12, ringR: 0.7, yF: 1.02, spread: 0.5, op: 0.6, edgeOp: 0.3 },
}

const WHITE = new THREE.Color('#ffffff')
const SHELL_COLOR = new THREE.Color('#8f8f9a')
const MID_COLOR = new THREE.Color('#5d7cff')
const RING_COLOR = new THREE.Color('#4d7cff')

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function fibUnit(count: number, seed: number) {
  const rnd = mulberry32(seed)
  const out: THREE.Vector3[] = []
  const GA = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (2 * i + 1) / count
    const r = Math.sqrt(1 - y * y)
    const theta = GA * i
    const v = new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r)
    v.x += (rnd() - 0.5) * 0.06
    v.y += (rnd() - 0.5) * 0.06
    v.z += (rnd() - 0.5) * 0.06
    v.normalize()
    out.push(v)
  }
  return out
}

function dampValue(current: number, target: number, dt: number) {
  return THREE.MathUtils.damp(current, target, 3, dt)
}

function neural(opts: { spec: Spec }) {
  const { shell, mid, ring, pulses } = networkLayout(opts.spec)
  const count = shell + mid + ring
  const rnd0 = mulberry32(7)
  const layer = new Uint8Array(count)
  const dirs: THREE.Vector3[] = []
  const baseScale = new Float32Array(count)
  const accent = new Float32Array(count)
  const dither = new Float32Array(count)

  const shellDirs = fibUnit(shell, 11)
  const midDirs = fibUnit(mid, 29).map((v) => v.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.6))
  const ringDirs = fibUnit(ring, 47).map((v) => v.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), 1.3))

  let i = 0
  for (let k = 0; k < shell; k++) {
    layer[i] = 0
    dirs.push(shellDirs[k])
    baseScale[i] = 0.8 + rnd0() * 0.4
    accent[i] = k % 5 === 4 ? 1 : 0
    dither[i] = rnd0()
    i++
  }
  for (let k = 0; k < mid; k++) {
    layer[i] = 1
    dirs.push(midDirs[k])
    baseScale[i] = 1 + rnd0() * 0.4
    accent[i] = k % 3 === 2 ? 0.7 : 0.2
    dither[i] = rnd0()
    i++
  }
  for (let k = 0; k < ring; k++) {
    layer[i] = 2
    dirs.push(ringDirs[k])
    baseScale[i] = 1.35 + rnd0() * 0.3
    accent[i] = 1
    dither[i] = rnd0()
    i++
  }

  const edges: Edge[] = []
  const adj: number[][] = Array.from({ length: count }, () => [])
  const link = (a: number, b: number) => {
    const inward = layer[b] > layer[a]
    edges.push({ a, b, inward })
    adj[a].push(edges.length - 1)
    adj[b].push(edges.length - 1)
  }
  for (let k = 0; k < shell; k++) link(k, (k + 1) % shell)
  for (let k = 0; k < mid; k++) link(shell + k, shell + ((k + 1) % mid))
  for (let k = 0; k < ring; k++) link(shell + mid + k, shell + mid + ((k + 1) % ring))

  for (let s = 0; s < shell; s++) {
    const target = dirs[s]
    let bi = shell
    let bd = Infinity
    for (let m = 0; m < mid; m++) {
      const d = dirs[shell + m].distanceToSquared(target)
      if (d < bd) {
        bd = d
        bi = shell + m
      }
    }
    link(s, bi)
  }
  for (let m = 0; m < mid; m++) {
    const target = dirs[shell + m]
    let bi = shell + mid
    let bd = Infinity
    for (let r = 0; r < ring; r++) {
      const d = dirs[shell + mid + r].distanceToSquared(target)
      if (d < bd) {
        bd = d
        bi = shell + mid + r
      }
    }
    link(shell + m, bi)
  }

  const startEdges: number[] = edges
    .map((e, idx) => (layer[e.a] === 0 && e.inward ? idx : -1))
    .filter((x): x is number => x !== -1)

  const pulseList: Pulse[] = []
  const rnd1 = mulberry32(101)
  for (let p = 0; p < pulses; p++) {
    const edge = startEdges[Math.floor(rnd1() * startEdges.length)] ?? 0
    pulseList.push({ edge, t: rnd1(), speed: 0.34 + rnd1() * 0.22 })
  }

  return {
    count,
    layer,
    dirs,
    baseScale,
    accent,
    dither,
    edges,
    adj,
    startEdges,
    pulses,
    pulseList,
    shell,
    mid,
    ring,
  }
}

function themePosition(
  pid: string | null | undefined,
  p: THREE.Vector3,
  dither: number,
  out: THREE.Vector3,
) {
  out.copy(p)
  if (!pid || pid === 'net') return out
  if (pid === 'yotoqhonam') {
    const g = 0.17
    const x = Math.round(p.x / g) * g
    const z = Math.round(p.z / g) * g
    out.set(x, p.y * 1.25, z)
    return out
  }
  if (pid === 'antifake') {
    const c = 0.22
    const x = Math.round(p.x / c) * c
    const y = Math.round(p.y / c) * c
    const z = Math.round(p.z / c) * c
    out.set(x, y, z)
    return out
  }
  out.set(
    p.x * 1.3 + Math.sin(p.y * 2) * 0.18 * (dither - 0.5),
    p.y * 0.72,
    p.z * 1.3 + Math.cos(p.x * 2) * 0.18 * (dither - 0.5),
  )
  return out
}

export function NeuralCore({
  spec,
  section,
  projectId,
  velocity,
  reducedMotion,
}: NeuralCoreProps) {
  const groupRef = useRef<THREE.Group>(null)
  const nodesRef = useRef<THREE.InstancedMesh>(null)
  const pulsesRef = useRef<THREE.InstancedMesh>(null)
  const edgesRef = useRef<THREE.LineSegments>(null)
  const nodesMat = useRef<THREE.MeshBasicMaterial>(null)
  const edgesMat = useRef<THREE.LineBasicMaterial>(null)
  const pulsesMat = useRef<THREE.MeshBasicMaterial>(null)

  const layout = useMemo(() => neural({ spec }), [spec])
  const pointer = useMemo(() => ({ x: 0, y: 0 }), [])
  const lastT = useRef(0)
  const flash = useRef(new Float32Array(layout.count))

  const state = useRef({
    shellR: TOPOLOGY.seed.shellR,
    midR: TOPOLOGY.seed.midR,
    ringR: TOPOLOGY.seed.ringR,
    yF: TOPOLOGY.seed.yF,
    spread: TOPOLOGY.seed.spread,
    op: TOPOLOGY.seed.op,
    edgeOp: TOPOLOGY.seed.edgeOp,
    hover: 0,
    themeT: 0,
    rotY: 0,
  })

  const nodePos = useMemo(() => {
    const arr: THREE.Vector3[] = []
    for (let i = 0; i < layout.count; i++) arr.push(new THREE.Vector3())
    return arr
  }, [layout.count])

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [pointer])

  const edgeCount = layout.edges.length
  const edgesGeo = useMemo(
    () => {
      const positions = new Float32Array(edgeCount * 2 * 3)
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      return geo
    },
    [edgeCount],
  )

  const themePos = useMemo(() => new THREE.Vector3(), [])
  const tmpObj = useMemo(() => new THREE.Object3D(), [])
  const tmpColor = useMemo(() => new THREE.Color(), [])

  useFrame(({ clock, camera, size }) => {
    const t = clock.getElapsedTime()
    const dt = lastT.current === 0 ? 0.016 : Math.min(t - lastT.current, 0.05)
    lastT.current = t

    const topo = TOPOLOGY[section] ?? TOPOLOGY.seed
    const core = CORE_TARGETS[section] ?? CORE_TARGETS.seed
    const s = state.current
    const damp = (k: keyof typeof s, v: number) => (s[k] = dampValue(s[k], v, dt))

    damp('shellR', topo.shellR)
    damp('midR', topo.midR)
    damp('ringR', topo.ringR)
    damp('yF', topo.yF)
    damp('spread', topo.spread)
    damp('op', topo.op)
    damp('edgeOp', topo.edgeOp)

    const projectIdCur = projectId.current
    const projectTheme =
      projectIdCur === 'yotoqhonam' || projectIdCur === 'antifake' || projectIdCur === 'shieldx'
        ? projectIdCur
        : null
    damp('themeT', projectTheme ? 1 : 0)
    damp('hover', Math.abs(pointer.x) < 0.2 && Math.abs(pointer.y) < 0.2 ? 1 : 0)
    damp('rotY', reducedMotion ? 0 : -t * 0.05)

    const nodeR = (l: number) => (l === 0 ? s.shellR : l === 1 ? s.midR : s.ringR)
    const themeT = s.themeT
    const hover = s.hover

    for (let i = 0; i < layout.count; i++) {
      const d = layout.dirs[i]
      const r = nodeR(layout.layer[i]) * s.spread
      const p = nodePos[i]
      p.set(d.x * r, d.y * r * s.yF, d.z * r)
      if (themeT > 0.001) {
        themePosition(projectTheme, p, layout.dither[i], themePos)
        p.lerp(themePos, themeT)
      }
    }

    /* nodes */
    if (nodesRef.current) {
      const mesh = nodesRef.current
      const f = flash.current
      for (let i = 0; i < layout.count; i++) {
        const base = layout.layer[i] === 0 ? SHELL_COLOR : layout.layer[i] === 1 ? MID_COLOR : RING_COLOR
        const glow = f[i] * 0.85 + accentBias(layout.layer[i]) + hover * (layout.layer[i] === 2 ? 0.4 : 0.12)
        tmpColor.copy(base).lerp(WHITE, Math.min(glow, 1))
        mesh.setColorAt(i, tmpColor)

        const scale = layout.baseScale[i] * (1 + f[i] * 0.5)
        tmpObj.position.copy(nodePos[i])
        tmpObj.scale.setScalar(scale)
        tmpObj.rotation.set(0, 0, 0)
        tmpObj.updateMatrix()
        mesh.setMatrixAt(i, tmpObj.matrix)
        if (glow > 1) f[i] = Math.max(0, f[i])
      }
      mesh.instanceMatrix.needsUpdate = true
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true

      /* pulses */
      if (pulsesRef.current && !reducedMotion) {
        const list = layout.pulseList
        const speedBoost = 1 + (velocity.current ?? 0) * 0.7
        for (let p = 0; p < list.length; p++) {
          const pulse = list[p]
          const e = layout.edges[pulse.edge]
          pulse.t += pulse.speed * speedBoost * dt * (1 + s.op * 0.4)
          while (pulse.t >= 1) {
            pulse.t -= 1
            f[e.a] = 1
            if (layout.layer[e.b] === 2) {
              pulse.edge = layout.startEdges[
                Math.floor(Math.random() * layout.startEdges.length)
              ] ?? pulse.edge
            } else {
              const candidates = layout.adj[e.b].filter((ix) => layout.edges[ix].inward)
              const pool = candidates.length > 0 ? candidates : layout.adj[e.b]
              pulse.edge = pool[Math.floor(Math.random() * pool.length)] ?? 0
              f[e.b] = 0.9
            }
          }
          const pe = layout.edges[pulse.edge]
          tmpObj.position.lerpVectors(nodePos[pe.a], nodePos[pe.b], pulse.t)
          tmpObj.scale.setScalar(1 + (1 - Math.abs(pulse.t - 0.5) * 2) * 0.5)
          tmpObj.rotation.set(0, 0, 0)
          tmpObj.updateMatrix()
          pulsesRef.current.setMatrixAt(p, tmpObj.matrix)
        }
        pulsesRef.current.instanceMatrix.needsUpdate = true
      }

      /* edges */
      if (edgesRef.current) {
        const attr = edgesGeo.getAttribute('position') as THREE.BufferAttribute
        const pos = attr.array as Float32Array
        for (let eIdx = 0; eIdx < layout.edges.length; eIdx++) {
          const e = layout.edges[eIdx]
          const a = nodePos[e.a]
          const b = nodePos[e.b]
          pos[eIdx * 6] = a.x
          pos[eIdx * 6 + 1] = a.y
          pos[eIdx * 6 + 2] = a.z
          pos[eIdx * 6 + 3] = b.x
          pos[eIdx * 6 + 4] = b.y
          pos[eIdx * 6 + 5] = b.z
        }
        attr.needsUpdate = true
      }

      /* decay flashes */
      const decay = Math.exp(-dt * 3.2)
      for (let i = 0; i < layout.count; i++) f[i] *= decay
    }

    /* fade per chapter */
    if (nodesMat.current) nodesMat.current.opacity = s.op
    if (edgesMat.current) edgesMat.current.opacity = s.edgeOp
    if (pulsesMat.current) pulsesMat.current.opacity = Math.max(0, s.op * 0.9 - 0.1)

    /* anchor to the same chapter position as the cube */
    const group = groupRef.current
    if (group) {
      const aspect = size.width / Math.max(size.height, 1)
      const fov = camera instanceof THREE.PerspectiveCamera ? camera.fov : 34
      const halfH = Math.tan((fov * Math.PI) / 360) * 4.6
      group.position.x = dampValue(group.position.x, core.x * halfH * aspect, dt)
      group.position.y = dampValue(group.position.y, core.yk * halfH, dt)
      group.position.z = dampValue(group.position.z, core.z, dt)
      group.scale.setScalar(core.scale)
      group.rotation.y = dampValue(group.rotation.y, s.rotY, dt)
      group.rotation.x = dampValue(group.rotation.x, pointer.y * 0.08, dt)
      group.rotation.z = dampValue(group.rotation.z, -pointer.x * 0.08, dt)
    }
  })

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, layout.count]}
        frustumCulled={false}
      >
        <icosahedronGeometry args={[0.05, 0]} />
        <meshBasicMaterial
          ref={nodesMat}
          color="#aab4c8"
          transparent
          opacity={TOPOLOGY.seed.op}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
      <instancedMesh
        ref={pulsesRef}
        args={[undefined, undefined, layout.pulses]}
        frustumCulled={false}
      >
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial
          ref={pulsesMat}
          color="#8fb0ff"
          transparent
          opacity={0.4}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
      <lineSegments ref={edgesRef} geometry={edgesGeo} frustumCulled={false}>
        <lineBasicMaterial
          ref={edgesMat}
          color="#4d7cff"
          transparent
          opacity={TOPOLOGY.seed.edgeOp}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}

function accentBias(layerIndex: number) {
  return layerIndex === 0 ? 0.04 : layerIndex === 1 ? 0.22 : 0.55
}