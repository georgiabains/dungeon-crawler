/**
 * Game.
 * 
 * Renders the game proper.
 */
import { ReactElement, useEffect, useState } from 'react'

// Components
import ScreenGame from './screen-game'
import ScreenGameMenu from './screen-game-menu'

// Contexts
import MetadataContext from './context-metadata'

// Types
import { GameMetadata } from '../types'

// Utils
import { loadFromSessionStorage } from '../utils/utils'
import { sum_test } from '@workspace/library'

/**
 * Render Game element.
 * @returns {ReactElement}
 */
function Game(): ReactElement {
  const [metadata, setMetadata] = useState(() => (loadFromSessionStorage('game') as GameMetadata))

  useEffect(() => {
    window.sessionStorage.setItem('game', JSON.stringify(metadata))
  }, [metadata])

  // Test that confirms running WASM for calculations is possible
  // console.log(sum_test(2, 2))

  return (
    <MetadataContext.Provider value={{ metadata, setMetadata }}>
      {metadata
        ? <ScreenGame />    
        : <ScreenGameMenu />}
    </MetadataContext.Provider>
  )
}

export default Game
