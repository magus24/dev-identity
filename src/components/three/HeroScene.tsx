import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Component,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from '../../hooks/useMediaQuery'
import { supportsWebGL } from '../../lib/webgl'
import { HeroFallback } from './HeroFallback'

/* ---------------------------------------------------------------
   shared pointer state (canvas has pointer-events: none)
--------------------------------------------------------------- */

const pointer = { x: 0, y: 0, active: false }

function bindPointer() {
  const onMove = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1
    pointer.active = true
  }
  const onLeave = () => {
    pointer.active = false
  }
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerleave', onLeave)
  return () => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerleave', onLeave)
  }
}

/* ---------------------------------------------------------------
   shaders
--------------------------------------------------------------- */

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`

const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uDistort;
uniform float uSize;
uniform float uDpr;
uniform float uMouseStrength;
uniform vec2 uMouse;

attribute float aScale;
attribute float aRand;

varying float vRand;
varying float vFade;

${NOISE}

void main() {
  vec3 pos = position;
  vec3 nrm = normalize(pos);

  float n1 = snoise(nrm * 1.45 + vec3(uTime * 0.13, uTime * 0.08, 0.0));
  float n2 = snoise(nrm * 3.3 - vec3(0.0, uTime * 0.06, uTime * 0.04));
  float displacement = n1 * 0.17 + n2 * 0.06;
  pos += nrm * displacement * uDistort;

  vec3 mouseDir = normalize(vec3(uMouse * 1.5, 0.75));
  float infl = pow(max(dot(nrm, mouseDir), 0.0), 5.0);
  pos += nrm * infl * uMouseStrength;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  float depth = -mv.z;
  gl_PointSize = aScale * uSize * uDpr * (18.0 / depth);

  vRand = aRand;
  vFade = smoothstep(7.5, 4.5, depth) * 0.75 + 0.25;
}
`

const FRAGMENT = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uOpacity;

varying float vRand;
varying float vFade;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;

  float alpha = smoothstep(0.5, 0.1, d);
  float mixFactor = vRand > 0.87 ? 1.0 : vRand * 0.14;
  vec3 color = mix(uColorA, uColorB, mixFactor);

  gl_FragColor = vec4(color, alpha * vFade * uOpacity);
}
`

/* ---------------------------------------------------------------
   geometry
--------------------------------------------------------------- */

function buildSphere(count: number) {
  const positions = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  const rands = new Float32Array(count)

  const golden = Math.PI * (3 - Math.sqrt(5))
  let seed = 1337

  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }

  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / Math.max(1, count - 1)) * 2
    const radius = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    const jitter = 1 + (random() - 0.5) * 0.07

    positions[i * 3] = Math.cos(theta) * radius * jitter
    positions[i * 3 + 1] = y * jitter
    positions[i * 3 + 2] = Math.sin(theta) * radius * jitter

    scales[i] = 0.55 + random() * 1.05
    rands[i] = random()
  }

  return { positions, scales, rands }
}

/* ---------------------------------------------------------------
   scene
--------------------------------------------------------------- */

interface SphereRigProps {
  count: number
  reduced: boolean
}

function SphereRig({ count, reduced }: SphereRigProps) {
  const rootRef = useRef<THREE.Group>(null)
  const tiltRef = useRef<THREE.Group>(null)
  const spinRef = useRef<THREE.Group>(null)
  const camera = useThree((state) => state.camera)

  const { positions, scales, rands } = useMemo(() => buildSphere(count), [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: 1 },
      uSize: { value: 1 },
      uDpr: { value: 1 },
      uMouseStrength: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color('#e8ecff') },
      uColorB: { value: new THREE.Color('#4d7cff') },
      uOpacity: { value: 1 },
    }),
    [],
  )

  useEffect(() => bindPointer(), [])

  const gl = useThree((state) => state.gl)

  useEffect(() => {
    uniforms.uDpr.value = gl.getPixelRatio()
  }, [gl, uniforms])

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.06)
    const time = state.clock.elapsedTime
    const root = rootRef.current
    const tilt = tiltRef.current
    const spin = spinRef.current
    if (!root || !tilt || !spin) return

    uniforms.uTime.value = reduced ? time * 0.2 : time

    const vh = Math.max(1, window.innerHeight)
    const progress = Math.min(1, Math.max(0, window.scrollY / vh))

    root.scale.setScalar(1 - progress * 0.32)
    root.position.y = progress * 0.55
    root.rotation.z = progress * 0.28
    uniforms.uDistort.value = 1 + progress * 1.7
    uniforms.uOpacity.value = 1 - progress * 0.55

    const targetX = pointer.active && !reduced ? -pointer.y * 0.34 : 0
    const targetY = pointer.active && !reduced ? pointer.x * 0.46 : 0
    tilt.rotation.x += (targetX - tilt.rotation.x) * 0.045
    tilt.rotation.y += (targetY - tilt.rotation.y) * 0.045

    const strength = pointer.active && !reduced ? 0.17 : 0
    uniforms.uMouseStrength.value += (strength - uniforms.uMouseStrength.value) * 0.05
    uniforms.uMouse.value.set(pointer.x, pointer.y)

    if (!reduced) spin.rotation.y += d * 0.085
    spin.rotation.x = Math.sin(time * 0.12) * 0.12

    const camX = pointer.active && !reduced ? pointer.x * 0.14 : 0
    const camY = pointer.active && !reduced ? -pointer.y * 0.1 : 0
    camera.position.x += (camX - camera.position.x) * 0.03
    camera.position.y += (camY - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={rootRef}>
      <group ref={tiltRef}>
        <group ref={spinRef}>
          <points frustumCulled={false}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[positions, 3]} />
              <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
              <bufferAttribute attach="attributes-aRand" args={[rands, 1]} />
            </bufferGeometry>
            <shaderMaterial
              uniforms={uniforms}
              vertexShader={VERTEX}
              fragmentShader={FRAGMENT}
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>

          <mesh>
            <icosahedronGeometry args={[1.16, 1]} />
            <meshBasicMaterial
              color="#4d7cff"
              wireframe
              transparent
              opacity={0.075}
              depthWrite={false}
            />
          </mesh>

          <mesh rotation={[Math.PI / 2.35, 0.35, 0]}>
            <torusGeometry args={[1.46, 0.0022, 6, 160]} />
            <meshBasicMaterial color="#9ab4ff" transparent opacity={0.45} />
          </mesh>

          <mesh rotation={[Math.PI / 1.7, -0.5, 0.6]}>
            <torusGeometry args={[1.62, 0.0016, 6, 160]} />
            <meshBasicMaterial color="#4d7cff" transparent opacity={0.28} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

/* ---------------------------------------------------------------
   guards
--------------------------------------------------------------- */

class GLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Silent fallback: the 2D sphere keeps the hero composition intact.
  }

  render() {
    if (this.state.failed) return <HeroFallback />
    return this.props.children
  }
}

/* ---------------------------------------------------------------
   hero scene
--------------------------------------------------------------- */

export function HeroScene({ active }: { active: boolean }) {
  const [webgl] = useState(supportsWebGL)
  const reduced = useMemo(() => prefersReducedMotion(), [])
  const isSmall = useMemo(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
    [],
  )

  if (!webgl) return <HeroFallback />

  return (
    <GLBoundary>
      <Canvas
        dpr={[1, isSmall ? 1.6 : 2]}
        camera={{ position: [0, 0, 4.4], fov: 45, near: 0.1, far: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        frameloop={active ? 'always' : 'never'}
        style={{ pointerEvents: 'none' }}
      >
        <SphereRig key={isSmall ? 'small' : 'large'} count={isSmall ? 2400 : 5600} reduced={reduced} />
      </Canvas>
    </GLBoundary>
  )
}
