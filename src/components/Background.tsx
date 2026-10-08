import { motion } from 'framer-motion'

export function Background() {
  return (
    <div className="bg-layer" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-vignette" />
      <div className="bg-coords bg-coords--left">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.2, duration: 1.4 }}
        />
      </div>
      <div className="bg-coords bg-coords--right">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.4, duration: 1.4 }}
        />
      </div>
    </div>
  )
}