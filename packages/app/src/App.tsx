import { GameState } from '@workspace/library'

function App() {
  const game = new GameState

  console.log(GameState)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    game.add_entity

    // GameState.add_entity()
    GameState.prototype.add_name_to_entity(formData.get("entity"))
    // GameState.get_all_entities()
  }

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="CreateEntity">Create character</label>
        <input id="CreateEntity" name="entity" />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default App
