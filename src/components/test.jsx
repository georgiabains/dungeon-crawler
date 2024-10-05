import * as wasm from '~/wasm/pkg'

export default function Test() {
  // console.log(wasm)
  const gameState = wasm.GameState.new()
  console.log(gameState)
  console.log(gameState.add_entity())
  console.log(gameState.add_name_to_entity(0, "test"))
  console.log(gameState.add_entity())
  console.log(gameState.add_name_to_entity(1, "goblin"))
  console.log(gameState.get_entities())
  return (
    <>
      <p>{wasm.greet('test')}</p>
      <p>test</p>
    </>
  )
}