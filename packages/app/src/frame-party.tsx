import { Entity } from './types'

function FrameParty(player: Entity) {
  return (
    <aside>
      <p>Player details:</p>
      <ul>
        <li>Name: {player.name}</li>
        { player?.weapon ? <li>Weapon: {player.weapon.name}</li> : null }
      </ul>
    </aside>
  )
}

export default FrameParty