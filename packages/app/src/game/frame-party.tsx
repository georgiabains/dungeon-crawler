/**
 * Fame: Party
 * - Renders party details.
 */
import { useEffect } from 'react'
import { useGameStore } from './game-store'
import Symbols from '../utils/symbols'

// NOTE: Extremely IPR. Return after more systems have been created so I know what
// components every party member needs.

function FrameParty() {
  const GameWorld = useGameStore((s) => s.world)
  const addEntityWithComponents = useGameStore((s) => s.addEntityWithComponents)

  // NOTE: Debugging only
  // TODO: Remove
  useEffect(() => {
    console.log('game world', GameWorld)
  }, [GameWorld])

  // TODO: Make dynamic and ECS friendly, this is just placeholder data
  const party = [
    {
      name: 'Morag',
      weapon: {
        name: 'Iron sword'
      }
    },
    {
      name: 'Boudicca',
      weapon: {
        name: 'Steel battleaxe'
      }
    },
    {
      name: 'Ares',
      weapon: {
        name: 'Dagger'
      }
    },
    {
      name: 'Alyss',
      weapon: {
        name: 'Hawthorne wand'
      }
    }
  ]

  /**
   * Add party member to game store.
   */
  function handleAddParty() {
    addEntityWithComponents([
      { name: Symbols.health, data: 100 }, 
      { name: Symbols.attack, data: 5 }
    ])
  }

  return (
    <aside>
      <button onClick={handleAddParty}>Add party member</button>
      <p>Party details:</p>
      <ul>
        {
          party.map((member, index) => {
            return (
              <li key={`${member.name}-${index}`}>Name: {member.name}
                <ul>
                  { member?.weapon ? <li>Weapon: {member.weapon.name}</li> : null }
                </ul>
              </li>
            )
          })
        }
      </ul>
    </aside>
  )
}

export default FrameParty