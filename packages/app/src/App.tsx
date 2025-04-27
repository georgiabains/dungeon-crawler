import { test, wasm_test } from '@workspace/library'

function App() {
  console.log(test())
  console.log(wasm_test())

  return (
    <>
      {test()}
      {wasm_test()}
    </>
  )
}

export default App
