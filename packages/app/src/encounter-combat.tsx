import { Encounter } from "./types"

function EncounterCombat(encounter: Encounter) {

  // TODO: Go through & sort out states
  const renderCombat = (() => {
    let isPass: boolean = false
    let isAttack: boolean = false
    const handleCombatChoice = ((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      switch (formData.get('choice' as string)) {
        case 'pass':
          isPass = true
          isAttack = false
          break
        case 'attack':
          isAttack = true
          isPass = false
      }
    })

    const handleAttackChoice = ((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
    })

    const renderPass = (() => {
      return (<p>You pass your turn</p>)
    })

    const renderAttack = (() => {
      return (
        <form method="post" onSubmit={handleAttackChoice}>
          <fieldset>
            <legend>Choose target</legend>

            <div>
              <input id="TargetArcher" name="target" type="radio" value="archer" />
              <label htmlFor="TargetArcher">Goblin Archer</label>
            </div>

            <div>
              <input id="TargetSwordsman" name="target" type="radio" value="swordsman" />
              <label htmlFor="TargetSwordsman">Goblin Swordsman</label>
            </div>

            <div>
              <input id="TargetMage" name="target" type="radio" value="mage" />
              <label htmlFor="TargetMage">Goblin Mage</label>
            </div>
          </fieldset>

          <button type="submit">Attack</button>
        </form>
      )
    })

    return (
      <>
        <h3>Enemy list</h3>
        <ul>
          <li>Goblin Archer</li>
          <li>Goblin Swordsman</li>
          <li>Goblin Mage</li>
        </ul>

        <h3>Choose action</h3>
        <form method="post" onSubmit={handleCombatChoice}>
          <div>
            <input id="ChoiceAttack" name="choice" type="radio" value="attack" />
            <label htmlFor="ChoiceAttack">Attack</label> 
          </div>

          <div>
            <input id="ChoicePass" name="choice" type="radio" value="pass" />
            <label htmlFor="ChoicePass">Pass</label>
          </div>

          <button type="submit">Select</button>
        </form>

        {isAttack ? renderAttack() : ''}
        {isPass ? renderPass() : ''}
      </>
    )
  })

  return (
    <>
      <p>{encounter.name}</p>
    </>
  )
}

export default EncounterCombat