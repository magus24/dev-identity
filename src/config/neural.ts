import type { Spec } from '../hooks/useScrollStory'

/**
 * How dense the neural net around the CORE should be.
 * A single source of truth so the DOM status readout and the 3D
 * scene always agree on the node count.
 */
export interface NetworkLayout {
  shell: number
  mid: number
  ring: number
  pulses: number
}

export function networkLayout(spec: Spec): NetworkLayout {
  const particles = spec.particles
  if (particles <= 0) return { shell: 8, mid: 4, ring: 2, pulses: 0 }
  if (particles <= 42) return { shell: 12, mid: 6, ring: 3, pulses: 3 }
  if (particles <= 72) return { shell: 16, mid: 8, ring: 4, pulses: 5 }
  return { shell: 24, mid: 12, ring: 6, pulses: 7 }
}

export function networkNodeCount(spec: Spec): number {
  const { shell, mid, ring } = networkLayout(spec)
  return shell + mid + ring
}