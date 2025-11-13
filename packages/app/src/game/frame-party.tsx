/**
 * Fame: Party
 * - Renders party details.
 */
import { ReactElement, useContext } from 'react'
import { useGameStore } from './game-store'

// Types
import { ComponentData } from '../types'

// Utils
import Symbols from '../utils/symbols'
import PartyContext from './context-party'

// NOTE: Extremely IPR. Return after more systems have been created so I know what
// components every party member needs.

/**
 * Render party frame.
 * @returns {ReactElement}
 */
function FrameParty(): ReactElement {
  const addEntityWithComponents = useGameStore((s) => s.addEntityWithComponents)
  const getComponent = useGameStore((s) => s.getComponent)
  const { party, setParty } = useContext(PartyContext)

  // Temporary until I add name inputs
  const names = ['Morag', 'Boudicca', 'Ares', 'Alyss']

  /**
   * Add party member to game store.
   */
  function handleAddParty() {
    addEntityWithComponents([
      { name: Symbols.name, data: names[party.length]},
      { name: Symbols.health.current, data: 100 }, 
      { name: Symbols.health.max, data: 100 }, 
      { name: Symbols.attack, data: 5 },
      { name: Symbols.agility, data: Math.floor(Math.random() * 100)},
      { name: Symbols.party, data: true }
    ])

    setParty([...(getComponent(Symbols.party) as ComponentData).keys()])
  }

  return (
    <aside>
      {
        party.length < 4
          ? <button onClick={handleAddParty}>Add party member</button> 
          : null
      }
      
      {
        party.length >= 1
          ? <div>
              <p>Party details:</p>
              <ul>
                {party.map((entity): ReactElement => {
                  return (
                    <li key={entity}>
                      Name: {(getComponent(Symbols.name) as ComponentData).get(entity) as string}
                    </li>
                  )
                })}
              </ul>
            </div>
          : null
        }
    </aside>
  )
}

export default FrameParty