/**
 * React hook for responsive "mobile" layout detection.
 *
 * Uses `matchMedia` with a 768px breakpoint (Tailwind's `md` default).
 * Returns a boolean suitable for conditionally rendering mobile-only UI.
 */

import * as React from "react"

/** Viewport width below this value is considered "mobile". Matches Tailwind `md`. */
const MOBILE_BREAKPOINT = 768

/**
 * Tracks whether the viewport is narrower than the mobile breakpoint.
 *
 * Starts with a client-safe initial value so SSR and hydration stay stable.
 * The effect only subscribes to future viewport changes.
 *
 * @returns `true` when viewport width is less than 768px.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return window.innerWidth < MOBILE_BREAKPOINT
  })

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(mql.matches)

    mql.addEventListener("change", onChange)

    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}
