/**
 * Shared destination values for the CORE object. Both the cube scene and
 * the surrounding neural net target the same chapter values so they always
 * stay anchored to each other.
 */
export interface CoreTarget {
  x: number
  yk: number
  z: number
  scale: number
  outer: number
  inner: number
  octa: number
  ball: number
  ringScale: number
  ringOp: number
  tilt: number
  pScale: number
  pFlatten: number
  pOp: number
  speed: number
}

export const CORE_TARGETS: Record<string, CoreTarget> = {
  seed: {
    x: 0.66, yk: 0.12, z: 0, scale: 0.85, outer: 0.5, inner: 0.2, octa: 0.85, ball: 1,
    ringScale: 0.62, ringOp: 0.3, tilt: 1.25, pScale: 1, pFlatten: 0.85, pOp: 0.5, speed: 0.1,
  },
  open: {
    x: 0.58, yk: -0.04, z: 0, scale: 0.95, outer: 0.72, inner: 0.5, octa: 1.1, ball: 1,
    ringScale: 1.05, ringOp: 0.5, tilt: 0.85, pScale: 1.12, pFlatten: 0.7, pOp: 0.7, speed: 0.14,
  },
  systems: {
    x: 0.5, yk: 0.16, z: -0.25, scale: 1.02, outer: 0.8, inner: 0.65, octa: 0.7, ball: 1,
    ringScale: 1.28, ringOp: 0.55, tilt: 0.5, pScale: 1.32, pFlatten: 0.5, pOp: 0.8, speed: 0.19,
  },
  network: {
    x: 0.34, yk: 0.55, z: 0.4, scale: 0.5, outer: 0.28, inner: 0.14, octa: 0.5, ball: 1,
    ringScale: 2, ringOp: 0.75, tilt: 0.1, pScale: 1.7, pFlatten: 0.05, pOp: 0.9, speed: 0.24,
  },
  reassemble: {
    x: 0, yk: 0, z: 0.65, scale: 1.18, outer: 0.95, inner: 0.85, octa: 1.5, ball: 1,
    ringScale: 0.5, ringOp: 0.8, tilt: 1.45, pScale: 0.8, pFlatten: 0.95, pOp: 0.9, speed: 0.06,
  },
}