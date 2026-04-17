import { useEffect, useState, type RefObject } from 'react'
import { useReducedMotion } from 'framer-motion'

type UseRevealOnceOptions = {
  rootMargin?: string
  threshold?: number
  disableOnCoarsePointer?: boolean
}

// Shared observer instances by config key
const observerMap = new Map<string, IntersectionObserver>()
const callbackMap = new Map<Element, (isIntersecting: boolean) => void>()

function getObserverKey(rootMargin: string, threshold: number): string {
  return `${rootMargin}|${threshold}`
}

function getSharedObserver(
  rootMargin: string,
  threshold: number
): IntersectionObserver {
  const key = getObserverKey(rootMargin, threshold)
  
  let observer = observerMap.get(key)
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const callback = callbackMap.get(entry.target)
          if (callback && entry.isIntersecting) {
            callback(true)
            // Unobserve after first intersection (once behavior)
            observer?.unobserve(entry.target)
            callbackMap.delete(entry.target)
          }
        }
      },
      { rootMargin, threshold }
    )
    observerMap.set(key, observer)
  }
  
  return observer
}

export function useRevealOnce<T extends Element>(
  elementRef: RefObject<T | null>,
  {
    rootMargin = '0px 0px -12% 0px',
    threshold = 0.1,
    disableOnCoarsePointer = true,
  }: UseRevealOnceOptions = {}
): boolean {
  const prefersReducedMotion = useReducedMotion()
  const [hasRevealed, setHasRevealed] = useState(() => {
    if (prefersReducedMotion) {
      return true
    }

    if (typeof window === 'undefined') {
      return false
    }

    return disableOnCoarsePointer && window.matchMedia('(pointer: coarse)').matches
  })

  useEffect(() => {
    const element = elementRef.current
    if (!element || hasRevealed) {
      return
    }

    const coarsePointer =
      disableOnCoarsePointer && window.matchMedia('(pointer: coarse)').matches

    if (prefersReducedMotion || coarsePointer) {
      setHasRevealed(true)
      return
    }

    const observer = getSharedObserver(rootMargin, threshold)
    
    callbackMap.set(element, () => {
      setHasRevealed(true)
    })
    
    observer.observe(element)

    return () => {
      observer.unobserve(element)
      callbackMap.delete(element)
    }
  }, [disableOnCoarsePointer, elementRef, hasRevealed, prefersReducedMotion, rootMargin, threshold])

  return hasRevealed
}