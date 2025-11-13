/**
 * Frame: Dungeon
 * 
 * Entry frame for all dungeon renders.
 */
import { ReactElement, useState } from 'react'

// Components
import EncounterRender from './encounter'

/**
 * Render dungeon frame.
 * @param {boolean} data.showDungeon - Whether the dungeon should render.
 * @returns {ReactElement|null}
 */
function FrameDungeon({ 
  showDungeon = false 
}: { showDungeon: boolean }): ReactElement | null {
  const [encounterType, setEncounterType] = useState('' as string)
  const title = <h2>Dungeon</h2>

  if (!showDungeon) { return null }

  /**
   * Handle encounter choice.
   * @param {React.FormEvent<HTMLFormElement>} event - Form submit event.
   */
  function handleChooseEncounter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)

    setEncounterType(formData.get('encounter' as string) as string)
  }

  if (encounterType) {
    return (
      <div>
        {title}
        <EncounterRender type={encounterType} />
      </div>
    )
  }

  return (
    <div>
      {title}

      <form method="post" onSubmit={handleChooseEncounter}>
        <fieldset>
          <legend>Choose Encounter</legend>

          {/* Idea will be that encounters are part of a "generation" or randomisation function, and 3 will be chosen based on probability (i.e. higher chance to get combat or rest over loot or a special event) */}
          <div>
            <input id="EncounterCombat" name="encounter" value="combat" type="radio" />
            <label htmlFor="EncounterCombat">Combat</label>
          </div>

          <div>
            <input id="EncounterLoot" name="encounter" value="loot" type="radio" />
            <label htmlFor="EncounterLoot">Loot chest</label>
          </div>

          <div>
            <input id="EncounterRest" name="encounter" value="rest" type="radio" />
            <label htmlFor="EncounterRest">Rest</label>
          </div>
        </fieldset>

        <button type="submit">Select</button>
      </form>
    </div>
  )
}

export default FrameDungeon