import * as wasm from '~/wasm/pkg'

export default function Test() {
  console.log(wasm)
  wasm.new_game()
  return (
    <>
      <p>test</p>
    </>
  )
}