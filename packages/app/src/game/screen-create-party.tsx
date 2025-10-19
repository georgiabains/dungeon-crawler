/**
 * Screen: Create Party
 * - Inputs for the user to build their party.
 */

import { Weapon } from "../types"

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

function CreateParty() {
  function handleCreateCharacter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
  }

  function selectWeapon(weaponName: string) {
    return weapons[weaponName as keyof typeof weapons]
  }

  return (
    <form method="post" onSubmit={handleCreateCharacter}>
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
  )
}

export default CreateParty