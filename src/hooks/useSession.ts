/**
 * Session-based authentication utility for protected content.
 * Uses sessionStorage (per-browser-session) with a unique session token.
 * Token expires when browser is closed or after the configured timeout.
 */

const SESSION_KEY = 'fieldwork_session'
const SESSION_TIMEOUT_MS = 30 * 60 * 1000 // 30 minutes

type SessionData = {
  token: string
  createdAt: number
  expiresAt: number
}

function generateSessionToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function getSession(): SessionData | null {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY)
    if (!stored) return null

    const session: SessionData = JSON.parse(stored)
    
    // Check if session has expired
    if (Date.now() > session.expiresAt) {
      sessionStorage.removeItem(SESSION_KEY)
      return null
    }

    return session
  } catch {
    sessionStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function isSessionValid(): boolean {
  const session = getSession()
  return session !== null
}

export function createSession(): void {
  const now = Date.now()
  const session: SessionData = {
    token: generateSessionToken(),
    createdAt: now,
    expiresAt: now + SESSION_TIMEOUT_MS,
  }
  
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function extendSession(): void {
  const session = getSession()
  if (session) {
    session.expiresAt = Date.now() + SESSION_TIMEOUT_MS
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY)
}

export function validateAccessCode(input: string): boolean {
  // Access code validation
  // In production, this would be a server-side check
  const accessCode = import.meta.env.VITE_CASE_STUDY_PASSWORD
  
  // If no password is configured, allow access (dev mode)
  if (!accessCode) {
    return true
  }
  
  return input === accessCode
}
