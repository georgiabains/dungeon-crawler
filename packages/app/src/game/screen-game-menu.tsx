import { PropsScreenGameMenu } from '../types'

function ScreenGameMenu({setGame}: PropsScreenGameMenu) {
  function handleNewGame(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setGame(crypto.randomUUID())
  }

  return (
    <form method="post" onSubmit={handleNewGame}>
      <button type="submit">New game</button>
    </form>
  )
}

export default ScreenGameMenu