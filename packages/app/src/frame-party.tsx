import { Entity } from './types'

function FrameParty(player: Entity) {
  return (
    <aside>
      <p>Player details:</p>
      <ul>
        <li>Name: {player.name}</li>
        <li>Weapon: {player.weapon.name}</li>
      </ul>
    </aside>
  )
}

export default FrameParty