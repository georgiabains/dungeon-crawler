/**
 * Screen: Game Menu
 * 
 * Render the game menu.
 */
import { ReactElement, useContext } from 'react'
import MetadataContext from './context-metadata'

/**
 * Render game menu.
 * @param {Function} data.setGame - Callback function to set game info. 
 * @returns {ReactElement}
 */
function ScreenGameMenu(): ReactElement {
  const { setMetadata } = useContext(MetadataContext)
  
  /**
   * Handle creating a new game.
   * @param {React.FormEvent<HTMLFormElement>} event - Submit event.
   */
  function handleNewGame(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMetadata({ id: crypto.randomUUID() })
  }

  return (
    <form method="post" onSubmit={handleNewGame}>
      <button type="submit">New game</button>
    </form>
  )
}

export default ScreenGameMenu