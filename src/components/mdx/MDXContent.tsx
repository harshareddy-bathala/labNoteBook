import { createElement, type ComponentType } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import type { MDXComponents } from 'mdx/types'

type MDXModule = {
  default: ComponentType<{ components?: MDXComponents }>
}

// Compiled MDX is evaluated once per unique source and cached outside React, so the
// component identity is stable across renders. Content is compiled at build time by
// Velite from files in this repository, never from user input.
const cache = new Map<string, ComponentType<{ components?: MDXComponents }>>()

function evaluate(code: string) {
  let component = cache.get(code)
  if (!component) {
    const fn = new Function(code)
    component = (fn(jsxRuntime) as MDXModule).default
    cache.set(code, component)
  }
  return component
}

type MDXContentProps = {
  code: string
  components?: MDXComponents
}

export function MDXContent({ code, components }: MDXContentProps) {
  return createElement(evaluate(code), { components })
}
