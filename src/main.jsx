import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { InventarioApp } from './inventarioApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InventarioApp />
  </StrictMode>,
)
