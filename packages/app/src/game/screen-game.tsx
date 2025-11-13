import FrameDungeon from "./frame-dungeon"
import FrameParty from "./frame-party"
import { useContext } from "react"
import MetadataContext from "./context-metadata"

function ScreenGame() {
  const { metadata } = useContext(MetadataContext)

  return (
    <>
      <p>Game ID: { metadata.id }</p>
      <FrameParty />
      <FrameDungeon />
    </>
  )
}

export default ScreenGame