/**
 * Entity: Action List
 * 
 * Render player-controlled actions in a list.
 */
import { ReactElement, useContext } from "react"
import { useGameStore } from "./game-store"
import { Entity } from "../types"

// Contexts
import TargetContext from "./context-target"
import TurnIndexContext from "./context-turn-index"

// Utils
import Symbols from "../utils/symbols"

// Custom types
type EntityRenderProps = {
  entity: Entity,
  isParty: boolean,
  isTurn: boolean
}

/**
 * Render entity action list (attack, pass etc.).
 * @param {object} data - Data to render. 
 * @param {Entity} data.entity - Entity.
 * @param {boolean} data.isParty - If the entity is part of the player party.
 * @param {boolean} data.isTurn - If it's this entity's turn.
 * @returns 
 */
function EntityActionList({ 
  entity, 
  isParty, 
  isTurn,
}: EntityRenderProps): ReactElement | null {
  if (!isTurn || !isParty) {
    return null
  }

  const { turnIndex, setTurnIndex } = useContext(TurnIndexContext)
  const { setTarget, setPayload } = useContext(TargetContext)
  const getComponent = useGameStore((s) => s.getComponent)

  /**
   * Handle player action choice.
   * @param {string} action - Action type.
   */
  function handleAction(action: string = ''): void {
    switch (action) {
      case 'attack':
        setTarget(
          Array.from(
            (getComponent(Symbols.currentEncounter) as Map<Entity, boolean>)
              ?.keys()
          )
        )
        
        // TODO: This needs work, the language is confusing
        // I could use objects with contextual keys for damage/healing
        // I could also use a "newHealthValue" property that's positive for healing and negative for damage
        setPayload({
          damage: {
            attack: getComponent(Symbols.attack)?.get(entity) ?? 0
          }
        })

        break

      default:
        setTarget([])
        setTurnIndex(turnIndex + 1)
    }
  }

  return (
    <ul>
      <li>
        <button onClick={() => handleAction('attack')} type="button">
          Attack
        </button>
      </li>

      <li>
        <button onClick={() => handleAction()} type="button">
          Pass
        </button>
      </li>
    </ul>
  )
}

export default EntityActionList