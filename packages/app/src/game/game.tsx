/**
 * Game.
 * 
 * Renders the game proper.
 */
import { ReactElement, useEffect, useState } from 'react'

// Components
import ScreenGame from './screen-game'
import ScreenGameMenu from './screen-game-menu'

// Utils
import { loadFromSessionStorage } from '../utils/utils'
import { sum_test } from '@workspace/library'

/**
 * Render Game element.
 * @returns {ReactElement}
 */
function Game(): ReactElement {
  const [game, setGame] = useState(() => loadFromSessionStorage('game'))

  useEffect(() => {
    window.sessionStorage.setItem('game', JSON.stringify(game))
  }, [game])

  // Test that confirms running WASM for calculations is possible
  // console.log(sum_test(2, 2))
  
  return game
    ? <ScreenGame game={game} />    
    : <ScreenGameMenu setGame={setGame} />
}

export default Game
