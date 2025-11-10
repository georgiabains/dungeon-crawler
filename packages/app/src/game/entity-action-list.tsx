import { useContext } from "react"
import TurnIndexContext from "./context-turn-index"
import { useGameStore } from "./game-store"
import { getComponent } from "../engine/components"
import Symbols from "../utils/symbols"
import { Entity } from "../types"
import TargetContext from "./context-target"

type EntityRenderProps = {
  isParty: boolean,
  isTurn: boolean
}

function EntityActionList({ isParty, isTurn }: EntityRenderProps) {
  const { turnIndex, setTurnIndex } = useContext(TurnIndexContext)
  const GameWorld = useGameStore((s) => s.world)
  const {setTarget} = useContext(TargetContext)

  function handleAction(action = '') {
    switch (action) {
      case 'attack':
        setTarget(Array.from((getComponent(Symbols.currentEncounter, GameWorld) as Map<Entity, boolean>)?.keys()))
        break
      default:
        console.log('no action')
    }
    
    // increaseTurnIndex()
  }

  /**
   * Increase contextual turn index after Entity turn has completed.
   */
  function increaseTurnIndex() {
    setTurnIndex(turnIndex + 1)
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