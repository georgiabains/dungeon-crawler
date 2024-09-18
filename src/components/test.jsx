import * as wasm from '../../wasm/pkg'

export default function Test() {
  const player = wasm.Entity.new(30, 30, 5, 'player')
  console.log(player)
  return (
    <>
      <p>{wasm.greet('test')}</p>
      <p>test</p>
    </>
  )
}