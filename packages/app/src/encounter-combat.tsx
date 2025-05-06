import { useEffect, useState } from "react"
import { Action, Encounter, Entity, Weapon } from "./types"
import ConditionalElement from "./conditional-element"
import EntityRender from "./entity-render"

function EncounterCombat(encounter: Encounter) {
  const [isPlayerChoiceAttack, setIsPlayerChoiceAttack] = useState(false)
  const [target, setTarget] = useState({} as Entity)
  const [action, setAction] = useState({} as Action)

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
    id: 1412412,
    name: 'Goblin Archer',
    isLive: true,
    isSelectable: isPlayerChoiceAttack,
    weapon: weapons.bow
  }

  const GoblinMage: Entity = {
    health: 100,
    id: 7583171,
    name: 'Goblin Mage',
    isLive: true,
    isSelectable: isPlayerChoiceAttack,
    weapon: weapons.staff
  }

  const GoblinSwordsman: Entity = {
    health: 100,
    id: 9137541097,
    name: 'Goblin Swordsman',
    isLive: true,
    isSelectable: isPlayerChoiceAttack,
    weapon: weapons.sword
  }

  const GoblinHealer: Entity = {
    health: 100,
    id: 91741071,
    name: 'Goblin Healer',
    isLive: true,
    isSelectable: isPlayerChoiceAttack,
    weapon: weapons.wand
  }

  const [enemies, setEnemies] = useState([GoblinArcher, GoblinHealer, GoblinMage, GoblinSwordsman])

  useEffect(() => {
    const clonedEnemies = [...enemies]
    clonedEnemies.forEach((enemy) => {
      enemy.isSelectable = isPlayerChoiceAttack
    })
    setEnemies(clonedEnemies)
  }, [isPlayerChoiceAttack])

  useEffect(() => {
    if (!action) return
    const targetIndex = enemies.findIndex((enemy) => enemy.id === target.id)
    const clonedEnemy = {...enemies[targetIndex]}
  
    switch (action.type) {
      case 'attack':
        if (!clonedEnemy.health) {
          console.error("Enemy does not have health")
          return
        }

        if (!action.healthValue) {
          console.error("Action did not provide a health value")
          return
        }

        clonedEnemy.health = clonedEnemy.health += action.healthValue
        break
    }
  
    const clonedState = [...enemies];
    clonedState[targetIndex] = clonedEnemy
  
    setEnemies(clonedState);
    setIsPlayerChoiceAttack(false)
  }, [target as Entity])

  function handleChoiceAttack() {
    setIsPlayerChoiceAttack(true)
    setAction({'type': "attack", "healthValue": -5 })
  }

  return (
    <>
      <p>{encounter.name}</p>
      <div className="encounter-combat__grid">
        <ul className="encounter-combat__enemies">
          {enemies.map((enemy) =>
            <li key={enemy.id}><EntityRender entity={enemy} setTarget={setTarget} /></li>
          )}
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