import * as wasm from '~/wasm/pkg'

export default function Player() {
  const player = wasm.Entity.new(30, 30, 5, 'Ares')
  return (
    <>
      <h2>Player</h2>
      <ul>
        <li>Name: {player.get_name()}</li>
        <li>Current Health: {player.get_current_hp()}</li>
        <li>Max Health: {player.get_total_hp()}</li>
        <li>Attack: {player.get_attack()}</li>
      </ul>
    </>
  )
}