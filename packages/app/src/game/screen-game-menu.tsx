/**
 * Screen: Game Menu
 * 
 * Render the game menu.
 */
import { ReactElement } from 'react'
import { PropsScreenGameMenu } from '../types'

/**
 * Render game menu.
 * @param {Function} data.setGame - Callback function to set game info. 
 * @returns {ReactElement}
 */
function ScreenGameMenu({ setGame }: PropsScreenGameMenu): ReactElement {
  
  /**
   * Handle creating a new game.
   * @param {React.FormEvent<HTMLFormElement>} event - Submit event.
   */
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