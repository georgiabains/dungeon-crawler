import FrameDungeon from "./frame-dungeon"
import FrameParty from "./frame-party"
import { useContext, useState } from "react"
import MetadataContext from "./context-metadata"
import { useGameStore } from "./game-store"
import Symbols from "../utils/symbols"
import PartyContext from './context-party'
import { ComponentData, Entity } from "../types"

function ScreenGame() {
  const getComponent = useGameStore((s) => s.getComponent)

  const { metadata } = useContext(MetadataContext)
  const [party, setParty] = useState([...(getComponent(Symbols.party) as ComponentData).keys()] as Array<Entity>)
  
  return (
    <>
      <p>Game ID: { metadata.id }</p>
      <PartyContext.Provider value={{ party, setParty }}>
        <FrameParty />
        <FrameDungeon />
      </PartyContext.Provider>
    </>
  )
}

export default ScreenGame