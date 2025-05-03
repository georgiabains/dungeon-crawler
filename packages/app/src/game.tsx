import { JSX, useEffect, useState } from 'react'
import { sum_test } from '@workspace/library'

type Encounter = {
  render: JSX.Element | undefined,
  name: string,
  type: string
}

type Entity = {
  isLive: boolean,
  name: string,
  weapon: Weapon
}

type Weapon = {
  attack: number,
  name: string,
}

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
  const [encounter, setEncounter] = useState({} as Encounter)

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

    setEncounter({
      render: setEncounterRender(formData.get('encounter' as string) as string),
      name: setEncounterName(formData.get('encounter' as string) as string),
      type: formData.get('encounter' as string) as string
    })
  })

  const setEncounterName = ((encounterType: string) => {
    let name: string = ''

    switch (encounterType) {
      case 'loot':
        name = 'Chest of Unknown Riches'
        break
      case 'combat':
        name = 'Combat vs Goblins'
        break
      case 'rest':
        name = 'Recuperate at Camp'
    }

    return name
  })

  const setEncounterRender = ((encounterType: string) => {
    let render

    switch (encounterType) {
      case 'combat':
        render = renderCombat()
        break
      case 'loot':
        render = renderLoot()
        break
      case 'rest':
        render = renderRest()
    }

    return render
  })

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

  const renderLoot = (() => {
    return (
      <>
        <h4>Chest contents</h4>
        <ul>
          <li>Worn Greaves</li>
          <li>Dented Shield</li>
          <li>Health potion</li>
        </ul>
      </>
    )
  })

  const renderRest = (() => {
    return (
      <>
        <p>You take a well needed moment to slake your thirst and nibble on bread and cheese from your pack.</p>
      </>
    )
  })

  return (
    <>
      { player.isLive 
        ? <div>
            <aside>
              <p>Player details:</p>
              <ul>
                <li>Name: {player.name}</li>
                <li>Weapon: {player.weapon.name}</li>
              </ul>
            </aside>

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
                encounter.name 
                ? <div>
                    <h3>{encounter.name}</h3>

                    {encounter.render}
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
