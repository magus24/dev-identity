import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useI18n } from '../i18n/provider'

const EASE = [0.22, 1, 0.36, 1] as const

interface GuideProps {
  open: boolean
  onClose: () => void
}

export function Guide({ open, onClose }: GuideProps) {
  const { t, messages } = useI18n()

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={t('guide.aria')}>
          <motion.div
            className="overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={onClose}
          />
          <motion.div
            className="guide"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="guide-panel">
              <div className="guide-head">
                <span className="mono">
                  {t('guide.titlePre')}
                  <b style={{ color: 'var(--fg)' }}>{t('guide.titleEm')}</b>
                </span>
                <button type="button" className="header-status" onClick={onClose}>
                  {t('app.close')}
                  <X size={14} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>
              <div className="guide-body">
                {messages.guide.rows.map((row) => (
                  <div className="guide-row" key={row.value}>
                    <span className="k">
                      {row.keys.map((key) => (
                        <kbd key={key}>{key}</kbd>
                      ))}
                    </span>
                    <span className="v">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}