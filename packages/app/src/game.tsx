import { useEffect, useState } from 'react'
import { sum_test } from '@workspace/library'
import { GameState } from './types'
import ScreenGame from './screen-game'
import ScreenInitialisation from './screen-initialisation'
import { loadFromSessionStorage } from './utils/utils'

import Symbols from './utils/symbols'
import { Entities, Components, Systems } from './engine/engine'

function Game() {
  // Test that confirms running WASM for calculations is possible
  // console.log(sum_test(2, 2))
  const [player, setPlayer] = useState(() => loadFromSessionStorage('player'))

  // useEffect(() => {
  //   window.sessionStorage.setItem('player', JSON.stringify(player))
  // }, [player as Entity])

  let GameState: GameState = {
    newEntityId: crypto.randomUUID(),
    entities: new Set(),
    components: new Map(),
  }

  // create entity
  const update = Entities.createEntity(GameState)
  GameState = update.state
  const newEntity = update.entity

  // trial adding 100 health to my entity
  const healthComponent = 100
  const newComponent = Components.setComponent(Symbols.health, healthComponent, newEntity, GameState)  

  GameState = newComponent

  // trial adding attack
  const attackComponent = 5
  const newComponentAttack = Components.setComponent(Symbols.attack, attackComponent, newEntity, GameState)

  GameState = newComponentAttack

  // trial adding health and attack to new Entity
  const secondUpdate = Entities.createEntity(GameState)
  GameState = secondUpdate.state
  const differentEntity = secondUpdate.entity

  let differentEntityComponents = Components.setComponent(Symbols.health, healthComponent, differentEntity, GameState)
  GameState = differentEntityComponents

  differentEntityComponents = Components.setComponent(Symbols.attack, attackComponent, differentEntity, GameState)
  GameState = differentEntityComponents

  /**
   * NOTE: Setting individual components will get messy - need to have a way to
   * bulk update components for entities.
   * 
   * Need to save Entity IDs even though they're UUIDs.
   */
  
  console.log(GameState)
  Systems.test()
  console.log(Components.getComponent(Symbols.attack, GameState))

  return player
    ? <ScreenGame player={player} />    
    : <ScreenInitialisation setPlayer={setPlayer} />
}

export default Game
