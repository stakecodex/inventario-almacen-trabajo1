import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { InventarioApp } from './inventarioApp'
import { ErrorBoundary } from './errorBoundary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <InventarioApp />
    </ErrorBoundary>
  </StrictMode>,
)
