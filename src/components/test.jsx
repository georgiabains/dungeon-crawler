import * as wasm from '../../wasm/pkg'

export default function Test() {
  return (
    <>
      <p>{wasm.greet('test')}</p>
      <p>test</p>
    </>
  )
}