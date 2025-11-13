/**
 * Fame: Party
 * - Renders party details.
 */
import { ReactElement, useRef, useState } from 'react'
import { useGameStore } from './game-store'

// Types
import { ComponentData, Entity } from '../types'

// Utils
import Symbols from '../utils/symbols'

// NOTE: Extremely IPR. Return after more systems have been created so I know what
// components every party member needs.

/**
 * Render party frame.
 * @returns {ReactElement}
 */
function FrameParty(): ReactElement {
  const addEntityWithComponents = useGameStore((s) => s.addEntityWithComponents)
  const getComponent = useGameStore((s) => s.getComponent)
  
  const [party, setParty] = useState([] as Array<Entity>)
  const counter = useRef(0)

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
      { name: Symbols.agility, data: Math.floor(Math.random() * 100)},
      { name: Symbols.party, data: true }
    ])

    counter.current += 1
    setParty([...(getComponent(Symbols.party) as ComponentData).keys()])
  }

  return (
    <aside>
      {
        counter.current < 4 
          ? <button onClick={handleAddParty}>Add party member</button> 
          : null
      }
      
      <p>Party details:</p>
      <ul>
        {
          party 
            ? party.map((entity): ReactElement => {
                return (
                  <li key={entity}>
                    Name: {(getComponent(Symbols.name) as ComponentData).get(entity) as string}
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