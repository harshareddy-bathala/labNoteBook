import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type PageWrapperProps = {
  children: ReactNode
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
