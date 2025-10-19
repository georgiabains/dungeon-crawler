import { PropsScreenInitialisation } from '../types'

function ScreenInitialisation({setGame}: PropsScreenInitialisation) {
  function handleNewGame(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setGame(crypto.randomUUID())
  }

  return (
    <form method="post" onSubmit={handleNewGame}>
      <button type="submit">New game</button>
    </form>

    // Can expand with "Load game", "Settings", "Credits" buttons etc.
    // TODO: Consider renaming initialisation to game-menu
  )
}

export default ScreenInitialisation