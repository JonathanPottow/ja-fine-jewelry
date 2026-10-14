/**
 * Client-side "saved designs" shortlist. No account needed — stored in the
 * visitor's own browser via localStorage, so it's private to them and
 * persists across visits on the same device.
 *
 * Any component that needs to react to changes (a count badge, a filter
 * toggle) should listen for the `jafj:favorites-changed` window event,
 * which fires on every add/remove, including across tabs via `storage`.
 */

const STORAGE_KEY = 'jafj_saved_designs'
const EVENT_NAME = 'jafj:favorites-changed'

function readAll(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === 'string') : []
  } catch {
    return []
  }
}

function writeAll(slugs: string[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs))
    window.dispatchEvent(new CustomEvent(EVENT_NAME))
  } catch {
    // Private browsing / storage disabled — fail silently, nothing to save.
  }
}

export function getSavedDesigns(): string[] {
  return readAll()
}

export function isSaved(slug: string): boolean {
  return readAll().includes(slug)
}

export function toggleSaved(slug: string): boolean {
  const current = readAll()
  const already = current.includes(slug)
  const next = already ? current.filter((s) => s !== slug) : [...current, slug]
  writeAll(next)
  return !already
}

export function onFavoritesChanged(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const handler = () => callback()
  window.addEventListener(EVENT_NAME, handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener(EVENT_NAME, handler)
    window.removeEventListener('storage', handler)
  }
}
