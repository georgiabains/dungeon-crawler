import { useEffect, useState } from 'react'
import { sum_test } from '@workspace/library'
import { Entity, Weapon } from './types'
import EncounterRender from './encounter'
import FrameParty from './frame-party'

const dagger: Weapon = {
  attack: 5,
  name: 'Dagger'
}

const sword: Weapon = {
  attack: 5,
  name: 'Sword'
}

const staff: Weapon = {
  attack: 5,
  name: 'Staff'
}

const weapons = { dagger, sword, staff }

function load(key: string) {
  const item = window.sessionStorage.getItem(key);
  return item != null ? JSON.parse(item) : [];
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

  const handleCreateCharacter = ((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)

    setPlayer({ 
      isLive: true, 
      name: formData.get('entity') as string,
      weapon: selectWeapon(formData.get('weapon' as string) as string)
    })
  })

  const selectWeapon = ((weaponName: string) => {
    return weapons[weaponName as keyof typeof weapons]
  })

  const handleEnterDungeon = (() => setShowDungeon(true))

  const handleChooseEncounter = ((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)

    setEncounterType(formData.get('encounter' as string) as string)
  })

  return (
    <>
      { player.isLive 
        ? <div>
            <FrameParty {...player} />

            { showDungeon ? '' : <button onClick={handleEnterDungeon} type="button">Enter dungeon</button>}
          </div>
        : <form method="post" onSubmit={handleCreateCharacter}>
            <div>
              <label htmlFor="EntityName">Enter character name</label>
              <input id="EntityName" name="entity" required />
            </div>

            <fieldset>
              <legend>Choose starting weapon</legend>
              
              <div>
                <input id="WeaponDagger" name="weapon" type="radio" value="dagger" required />
                <label htmlFor="WeaponDagger">Dagger</label>
              </div>
              
              <div>
                <input id="WeaponSword" name="weapon" type="radio" value="sword" required />
                <label htmlFor="WeaponSword">Sword</label>
              </div>
              
              <div>
                <input id="WeaponStaff" name="weapon" type="radio" value="staff" required />
                <label htmlFor="WeaponStaff">Staff</label>
              </div>
            </fieldset>

            <button type="submit">Finalise character</button>
          </form>
      }

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

export default Game
