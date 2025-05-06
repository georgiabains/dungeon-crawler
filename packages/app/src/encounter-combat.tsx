import { useState } from "react"
import { Encounter, Entity, Weapon } from "./types"
import ConditionalElement from "./conditional-element"
import EntityRender from "./entity-render"

function EncounterCombat(encounter: Encounter) {
  const [isPlayerChoiceAttack, setIsPlayerChoiceAttack] = useState(false)
  const [target, setTarget] = useState({} as Entity)

  function handleChoiceAttack() {
    setIsPlayerChoiceAttack(true)
  }

  function handleAttackTarget() {
    setIsPlayerChoiceAttack(false)
  }

  const bow: Weapon = {
    attack: 5,
    name: 'Bow'
  }

  const wand: Weapon = {
    attack: 5,
    name: 'Wand'
  }
  
  const sword: Weapon = {
    attack: 5,
    name: 'Sword'
  }
  
  const staff: Weapon = {
    attack: 5,
    name: 'Staff'
  }
  
  const weapons = { bow, sword, staff, wand }

  const GoblinArcher: Entity = {
    health: 100,
    name: 'Goblin Archer',
    isLive: true,
    isSelectable: isPlayerChoiceAttack,
    weapon: weapons.bow
  }

  const GoblinMage: Entity = {
    health: 100,
    name: 'Goblin Mage',
    isLive: true,
    isSelectable: isPlayerChoiceAttack,
    weapon: weapons.staff
  }

  const GoblinSwordsman: Entity = {
    health: 100,
    name: 'Goblin Swordsman',
    isLive: true,
    isSelectable: isPlayerChoiceAttack,
    weapon: weapons.sword
  }

  const GoblinHealer: Entity = {
    health: 100,
    name: 'Goblin Healer',
    isLive: true,
    isSelectable: isPlayerChoiceAttack,
    weapon: weapons.wand
  }

  return (
    <>
      <p>{encounter.name}</p>
      <div className="encounter-combat__grid">
        <ul className="encounter-combat__enemies">
          <li>
            <EntityRender entity={GoblinArcher} setTarget={setTarget} />
          </li>
          <li>
            <EntityRender entity={GoblinSwordsman} setTarget={setTarget} />
          </li>
          <li>
            <EntityRender entity={GoblinMage} setTarget={setTarget} />
          </li>
          <li>
            <EntityRender entity={GoblinHealer} setTarget={setTarget} />
          </li>
        </ul>

        <p>Party group will be a loop based on a "party" variable.</p>
        <ul>
          <li>Party 1</li>
          <li>Party 2</li>
          <li>Party 3</li>
          <li>Party 4</li>
        </ul>
      </div>

      <div>
        <p>Choices</p>
        <button type="button" onClick={handleChoiceAttack}>Basic Attack (5 damage)</button>
        <ConditionalElement isShow={isPlayerChoiceAttack} element={<p>Choose target</p>} />
        {target.name ? <p>Target: {target.name}</p> : null}
      </div>
    </>
  )
}

export default EncounterCombat