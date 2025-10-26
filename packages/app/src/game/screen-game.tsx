import FrameDungeon from "./frame-dungeon"
import FrameParty from "./frame-party"

function ScreenGame({ game }: { game: string }) {
  return (
    <>
      <p>Game ID: {game}</p>
      <FrameParty />
      <FrameDungeon />
    </>
  )
}

export default ScreenGame