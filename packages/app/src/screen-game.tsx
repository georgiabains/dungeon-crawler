import FrameDungeon from "./frame-dungeon"
import FrameParty from "./frame-party"
import { PropsPlayer } from "./types"

function ScreenGame({player}: PropsPlayer) {
  return (
    <>
      <FrameParty {...player} />
      <FrameDungeon />
    </>
  )
}

export default ScreenGame