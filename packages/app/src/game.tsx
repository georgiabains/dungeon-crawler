import { useEffect, useState } from 'react'
import { sum_test } from '@workspace/library'
import { Entity } from './types'
import ScreenGame from './screen-game'
import ScreenInitialisation from './screen-initialisation'
import { loadFromSessionStorage } from './utils'

function Game() {
  // Test that confirms running WASM for calculations is possible
  // console.log(sum_test(2, 2))
  const [player, setPlayer] = useState(() => loadFromSessionStorage('player'))

  useEffect(() => {
    window.sessionStorage.setItem('player', JSON.stringify(player))
  }, [player as Entity])

  return player
    ? <ScreenGame player={player} />    
    : <ScreenInitialisation setPlayer={setPlayer} />
}

export default Game
