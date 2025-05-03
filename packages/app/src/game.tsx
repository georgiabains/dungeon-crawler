import { useEffect, useState } from 'react'
import { sum_test } from '@workspace/library'

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

console.log(weapons)

function load(key: string) {
  const item = window.sessionStorage.getItem(key);
  return item != null ? JSON.parse(item) : [];
}

function Game() {
  // Test that confirms running WASM for calculations is possible
  // console.log(sum_test(2, 2))
  const [player, setPlayer] = useState(() => load('player'))

  useEffect(() => {
    window.sessionStorage.setItem('player', JSON.stringify(player))
  }, [player])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setPlayer({ 
      isLive: true, 
      name: formData.get('entity') as string,
      weapon: selectWeapon(formData.get('weapon' as string) as string)
    })
  }

  const selectWeapon = (weaponName: string) => {
    return weapons[weaponName as keyof typeof weapons]
  }

  return (
    <>
      { player.isLive 
        ? <>
            <aside>
              <p>Player details:</p>
              <ul>
                <li>Name: {player.name}</li>
                <li>Weapon: {player.weapon.name}</li>
              </ul>
            </aside>

            <button type="button">Enter dungeon</button>
          </>
        : <form method="post" onSubmit={handleSubmit}>
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
    </>
  )
}

export default Game
