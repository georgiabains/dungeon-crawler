import { useContext, useEffect, useRef } from "react"
import TurnIndexContext from "./context-turn-index"

type EntityRenderProps = {
  isParty: boolean,
  isTurn: boolean
}

function EntityActionList({ isParty, isTurn }: EntityRenderProps) {
  const { turnIndex, setTurnIndex } = useContext(TurnIndexContext)

  function handleAction(action = '') {
    switch (action) {
      case 'attack':
        console.log('action click')
        break
      default:
        console.log('no action')
    }
    
    increaseTurnIndex()
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