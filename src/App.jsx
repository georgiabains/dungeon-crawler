import { useState } from 'react'
import Test from './components/test'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Dungeon Crawler</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Test />
    </>
  )
}

export default App
