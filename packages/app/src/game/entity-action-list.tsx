import { useContext } from "react"
import TurnIndexContext from "./context-turn-index"
import { useGameStore } from "./game-store"
import Symbols from "../utils/symbols"
import { Entity } from "../types"
import TargetContext from "./context-target"

type EntityRenderProps = {
  entity: Entity,
  isParty: boolean,
  isTurn: boolean
}

function EntityActionList({ entity, isParty, isTurn }: EntityRenderProps) {
  const { turnIndex, setTurnIndex } = useContext(TurnIndexContext)
  const { setTarget, setPayload } = useContext(TargetContext)
  const getComponent = useGameStore((s) => s.getComponent)

  function handleAction(action = '') {
    switch (action) {
      case 'attack':
        setTarget(Array.from((getComponent(Symbols.currentEncounter) as Map<Entity, boolean>)?.keys()))
        
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
        console.log('no action')
    }
  }

  if (!isTurn || !isParty) {
    return null
  }

  return (
    <menu>
      <li><button onClick={() => handleAction('attack')} type="button">Attack</button></li>
      <li><button onClick={() => handleAction()} type="button">Pass</button></li>
    </menu>
  )
}

export default EntityActionList