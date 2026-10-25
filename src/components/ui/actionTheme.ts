/**
 * Re-points Preline's primary tokens to the Alpine pink for interactive
 * controls (buttons and form fields) only. The rest of the UI keeps the blue
 * primary. Black foreground keeps text readable on the light pink.
 */
export const PINK_ACTION_VARS = [
  '[--primary:var(--color-alpine-pink)]',
  '[--primary-hover:color-mix(in_oklab,var(--color-alpine-pink)_82%,black)]',
  '[--primary-focus:var(--color-alpine-pink)]',
  '[--primary-foreground:#000000]',
].join(' ')
