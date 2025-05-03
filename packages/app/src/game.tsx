import { useState } from 'react'
import { sum_test } from '../../library/dist'

type Entity  = {
  name: string
}

function Game() {
  // Test that confirms running WASM for calculations is possible
  console.log(sum_test(2, 2))
  const [player, setPlayer] = useState({} as Entity)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setPlayer({ name: formData.get('entity') as string })
  }

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="CreateEntity">Create character</label>
        <input id="CreateEntity" name="entity" />
        <button type="submit">Submit</button>
      </form>

      <p>{player.name}</p>
    </>
  )
}

export default Game
