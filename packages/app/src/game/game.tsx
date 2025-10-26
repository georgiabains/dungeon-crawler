import { useEffect, useState } from 'react'
import { sum_test } from '@workspace/library'
import ScreenGame from './screen-game'
import ScreenInitialisation from './screen-initialisation'
import { loadFromSessionStorage } from '../utils/utils'

import Symbols from '../utils/symbols'
import { Entities, Components } from '../engine/engine'
import { updateTargetHealth } from './system-health'
import { useGameStore } from './game-store'

function Game() {
  // Test that confirms running WASM for calculations is possible
  // console.log(sum_test(2, 2))
  const [game, setGame] = useState(() => loadFromSessionStorage('game'))
  const addEntityWithComponents = useGameStore((s) => s.addEntityWithComponents)

  useEffect(() => {
    window.sessionStorage.setItem('game', JSON.stringify(game))
  }, [game])

  const GameWorld = useGameStore((s) => s.world)

  useEffect(() => {
    addEntityWithComponents([{name: Symbols.health, data: 100}, {name: Symbols.attack, data: 5}])
  }, [addEntityWithComponents])

  console.log(GameWorld)

  /**
   * NOTE: Setting individual components will get messy - need to have a way to
   * bulk update components for entities.
   * 
   * Need to save Entity IDs even though they're UUIDs.
   */
  
  // The following changes an entitie's health value by the specified delta
  // GameWorld = updateTargetHealth(GameWorld, {entity: GameWorld.entities[0], healthDelta: -10})
  
  return game
    ? <ScreenGame game={game} />    
    : <ScreenInitialisation setGame={setGame} />
}

export default Game
