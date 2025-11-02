/**
 * Fame: Party
 * - Renders party details.
 */
import { ReactElement, useEffect, useRef } from 'react'
import { useGameStore } from './game-store'
import Symbols from '../utils/symbols'
import { getComponent } from '../engine/components'
import { ComponentData } from '../types'

// NOTE: Extremely IPR. Return after more systems have been created so I know what
// components every party member needs.

function FrameParty() {
  const GameWorld = useGameStore((s) => s.world)
  const addEntityWithComponents = useGameStore((s) => s.addEntityWithComponents)
  const counter = useRef(0)

  // NOTE: Debugging only
  // TODO: Remove
  // useEffect(() => {
  //   console.log('game world', GameWorld)
  // }, [GameWorld])

  // Temporary until I add name inputs
  const names = ['Morag', 'Boudicca', 'Ares', 'Alyss']

  /**
   * Add party member to game store.
   */
  function handleAddParty() {
    addEntityWithComponents([
      { name: Symbols.name, data: names[counter.current]},
      { name: Symbols.health.current, data: 100 }, 
      { name: Symbols.health.max, data: 100 }, 
      { name: Symbols.attack, data: 5 },
      { name: Symbols.party, data: true }
    ])

    counter.current += 1
  }

  return (
    <aside>
      {counter.current < 4 ? <button onClick={handleAddParty}>Add party member</button> : null}
      
      <p>Party details:</p>
      <ul>
        {/* NOTE: I hate this */}
        {
          getComponent(Symbols.party, GameWorld) 
            ? [...(getComponent(Symbols.party, GameWorld) as ComponentData).keys()].map((entity): ReactElement => {
                return (
                  <li key={entity}>Name: {(getComponent(Symbols.name, GameWorld) as ComponentData).get(entity) as string}
                </li>
                )
              })
            : null
        }
      </ul>
    </aside>
  )
}

export default FrameParty