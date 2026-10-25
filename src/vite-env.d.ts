/// <reference types="vite/client" />

interface Window {
  /** Exposed by the Preline bundle imported in main.tsx. */
  HSStaticMethods?: { autoInit: () => void }
}
