import type { Spec } from '../hooks/useScrollStory'

/**
 * Single source of truth for the NEURAL FIELD that surrounds the CORE.
 * Every density/size/timing knob lives here so the scene can be tuned
 * without touching the renderers.
 */

export type NeuralTier = 1 | 2 | 3

export interface NeuralTierBudget {
  nodes: number
  /** soft cap — the generator stops adding connections once reached */
  edges: number
  signals: number
  stars: number
}

export interface NeuralConfig {
  tiers: Record<NeuralTier, NeuralTierBudget>
  /** how many separate organic clusters aggregate around the core */
  clusters: number
  /** nodes within this radius "reach the core" when a signal arrives */
  coreRadius: number
  /** below this radius nodes get a filament wired straight into the core */
  innerCutoff: number
  /** outer envelope radius in field units */
  outerR: number
  /** field "breathing" — amplitude + period of the slow expansion */
  breathing: { amp: number; period: number }
  /** radius of the leaves: use a rare sync event triggered periodically */
  syncInterval: [number, number]
  /** per-edge traversal speed in field units / second */
  signalSpeed: [number, number]
  /** idle movement: how fast the field slowly drifts and reorganizes */
  drift: number
  /** how strongly the pointer tilts the whole field */
  interactionTilt: number
  /** base small point size (world units) */
  nodeSize: number
  /** size multiplier for the brighter / active nodes */
  nodeActiveSize: number
  /** traveling signal particle size (world units) */
  signalSize: number
  /** how fast spark energy fades from nodes */
  sparkDecay: number
  /** how many nodes are "active-capable" (subtle blue by default) */
  accentRatio: number
  /** per internal link: how many nodes of a cluster are woven together */
  weave: number
  /** max distance (field units) for a local weave link */
  weaveDist: number
}

export const NEURAL_CONFIG: NeuralConfig = {
  tiers: {
    1: { nodes: 64, edges: 58, signals: 3, stars: 90 },
    2: { nodes: 118, edges: 110, signals: 5, stars: 150 },
    3: { nodes: 200, edges: 192, signals: 7, stars: 210 },
  },
  clusters: 4,
  coreRadius: 0.55,
  innerCutoff: 0.4,
  outerR: 2.12,
  breathing: { amp: 0.035, period: 12.5 },
  syncInterval: [9, 16],
  signalSpeed: [0.8, 1.4],
  drift: 0.09,
  interactionTilt: 0.06,
  nodeSize: 0.034,
  nodeActiveSize: 1.4,
  signalSize: 0.05,
  sparkDecay: 2.3,
  accentRatio: 0.2,
  weave: 2,
  weaveDist: 1.05,
}

export function tierFor(spec: Spec): NeuralTier {
  if (spec.particles <= 42) return 1
  if (spec.particles <= 72) return 2
  return 3
}

export function neuralBudget(spec: Spec): NeuralTierBudget {
  return NEURAL_CONFIG.tiers[tierFor(spec)]
}

/** Total neural nodes rendered — used by the CoreStatus readout. */
export function networkNodeCount(spec: Spec): number {
  return neuralBudget(spec).nodes
}

/**
 * Per-chapter feel of the field. The portfolio is a machine: at the hero
 * the net stays whisper-quiet so the typography reads; deeper chapters
 * "wake it up". `r` expands the envelope, `op/edgeOp` brighten it.
 */
export interface FieldState {
  r: number
  op: number
  edgeOp: number
}

export const FIELD_STATES: Record<string, FieldState> = {
  seed: { r: 1.0, op: 0.5, edgeOp: 0.34 },
  open: { r: 1.12, op: 0.78, edgeOp: 0.5 },
  systems: { r: 1.2, op: 0.95, edgeOp: 0.62 },
  network: { r: 1.32, op: 1.05, edgeOp: 0.8 },
  reassemble: { r: 0.94, op: 1.0, edgeOp: 0.66 },
}