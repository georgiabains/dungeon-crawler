/**
 * Screen: Game
 * 
 * Render game screen.
 */
import { ReactElement, useContext, useState } from "react"
import { useGameStore } from "./game-store"

// Contexts
import MetadataContext from "./context-metadata"
import PartyContext from './context-party'

// Frames
import FrameDungeon from "./frame-dungeon"
import FrameParty from "./frame-party"

// Types
import { ComponentData, Entity } from "../types"

// Utils
import Symbols from "../utils/symbols"

/**
 * Render game screen.
 * - Essentially the entrypoint for all actual game functonality.
 * @returns {ReactElement}
 */

function ScreenGame(): ReactElement {
  const getComponent = useGameStore((s) => s.getComponent)

  const { metadata } = useContext(MetadataContext)
  const [party, setParty] = useState([...(getComponent(Symbols.party) as ComponentData).keys() ?? []] as Array<Entity>)
  const [showDungeon, setShowDungeon] = useState(false)
  
  const difficulty = ['Difficult', 'Very hard', 'Hard', 'Normal']

  /**
   * Handle enter dungeon button press.
   */
  function handleEnterDungeon() {
    setShowDungeon(true)
  }
  
  return (
    <>
      <p>Game ID: { metadata.id }</p>
      <PartyContext.Provider value={{ party, setParty }}>
        <FrameParty />

        {/* TODO: Move to it's own component? */}
        {
          party.length && !showDungeon
            ? <div>
                <div>
                  <strong>Difficulty:</strong> {difficulty[party.length - 1]}
                </div>
                <div>
                  <button type="button" onClick={handleEnterDungeon}>
                    Enter dungeon
                  </button>
                </div>
              </div>
            : null
        }

        <FrameDungeon showDungeon={showDungeon} />
      </PartyContext.Provider>
    </>
  )
}

export default ScreenGame