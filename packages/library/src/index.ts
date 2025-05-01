import { wasm_test, GameState } from '../wasm/index'

const test = () => {
  console.log(GameState)
  GameState.new()
}

export {
  GameState,
  wasm_test,
  test
}