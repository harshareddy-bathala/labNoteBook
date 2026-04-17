import { useMemo } from 'react'
import type { ComponentType } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import type { MDXComponents } from 'mdx/types'

type MDXModule = {
  default: ComponentType<{ components?: MDXComponents }>
}

export function useMDXComponent(code: string) {
  return useMemo(() => {
    if (!code) {
      return (() => null) as ComponentType<{ components?: MDXComponents }>
    }

    const fn = new Function(code)
    const module = fn(jsxRuntime) as MDXModule
    return module.default
  }, [code])
}