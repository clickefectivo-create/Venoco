import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ToonhubVenocoHero from './components/ToonhubVenocoHero'

createRoot(document.getElementById('toonhub-venoco-root')!).render(
  <StrictMode>
    <ToonhubVenocoHero />
  </StrictMode>,
)
