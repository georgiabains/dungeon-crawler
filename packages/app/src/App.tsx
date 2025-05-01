import { sum_test } from '../../library'

function App() {

  console.log(sum_test(2, 2))

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
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
