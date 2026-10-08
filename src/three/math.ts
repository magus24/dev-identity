import * as THREE from 'three'

/** Frame-rate independent damping toward a target. */
export function dampValue(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt)
}

export function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

/** Small deterministic PRNG so the field is identical on every load. */
export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function randUnit(rnd: () => number, out: THREE.Vector3) {
  const th = rnd() * Math.PI * 2
  const ph = Math.acos(2 * rnd() - 1)
  return out.set(Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th))
}