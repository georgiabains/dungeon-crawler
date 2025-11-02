import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import Game from './game/game.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  //   <Game />
  // </StrictMode>,

  <Game />
)
