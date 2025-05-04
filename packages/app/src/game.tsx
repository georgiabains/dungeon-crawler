import { useEffect, useState } from 'react'
import { sum_test } from '@workspace/library'
import { Entity } from './types'
import EncounterRender from './encounter'
import FrameParty from './frame-party'
import ScreenInitialisation from './screen-initialisation'

function load(key: string) {
  const item = window.sessionStorage.getItem(key);
  return item != null ? JSON.parse(item) : '';
}

function Game() {
  // Test that confirms running WASM for calculations is possible
  // console.log(sum_test(2, 2))
  const [player, setPlayer] = useState(() => load('player'))
  const [showDungeon, setShowDungeon] = useState(false)
  const [encounterType, setEncounterType] = useState('' as string)

  useEffect(() => {
    window.sessionStorage.setItem('player', JSON.stringify(player))
  }, [player as Entity])

  const handleEnterDungeon = (() => setShowDungeon(true))

  const handleChooseEncounter = ((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)

    setEncounterType(formData.get('encounter' as string) as string)
  })

  if (player) {
    return (
      <>
        <FrameParty {...player} />

        { showDungeon ? '' : <button onClick={handleEnterDungeon} type="button">Enter dungeon</button>}

        {
        showDungeon
          ? <>
              <h2>Dungeon</h2>

              {
                encounterType
                ? <div>
                    <EncounterRender type={encounterType} />
                  </div>
                : <form method="post" onSubmit={handleChooseEncounter}>
                    <fieldset>
                      <legend>Choose Encounter</legend>

                      {/* Idea will be that encounters are part of a "generation" or randomisation function, and 3 will be chosen based on probability (i.e. higher chance to get combat or rest over loot or a special event) */}
                      <div>
                        <input id="EncounterLoot" name="encounter" value="loot" type="radio" />
                        <label htmlFor="EncounterLoot">Loot chest</label>
                      </div>

                      <div>
                        <input id="EncounterCombat" name="encounter" value="combat" type="radio" />
                        <label htmlFor="EncounterCombat">Combat</label>
                      </div>

                      <div>
                        <input id="EncounterRest" name="encounter" value="rest" type="radio" />
                        <label htmlFor="EncounterRest">Rest</label>
                      </div>
                    </fieldset>

                    <button type="submit">Select</button>
                  </form>
              }
            </>
          : ''
      }
      </>
    )
  }

  return (
    <ScreenInitialisation setPlayer={setPlayer} />
  )
}

export default Game
