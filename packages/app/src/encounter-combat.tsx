import { useEffect, useState } from "react"
import { Action, Encounter, Entity, Weapon } from "./types"
import ConditionalElement from "./conditional-element"
import EntityRender from "./entity-render"

function EncounterCombat(encounter: Encounter) {
  const [isPlayerChoiceAttack, setIsPlayerChoiceAttack] = useState(false)
  const [target, setTarget] = useState({} as Entity)
  const [action, setAction] = useState({} as Action)
  const [activeEntity, setActiveEntity] = useState({} as Entity)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)

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

  const PartySwordsman: Entity = {
    health: 100,
    id: 193471049,
    name: 'Party Swordsman',
    isLive: true,
    isParty: true,
    isSelectable: !isPlayerChoiceAttack,
    weapon: weapons.sword
  }

  const PartyBarbarian: Entity = {
    health: 100,
    id: 4029752,
    name: 'Party Barbarian',
    isLive: true,
    isParty: true,
    isSelectable: !isPlayerChoiceAttack,
    weapon: weapons.sword
  }

  const PartyWizard: Entity = {
    health: 100,
    id: 310741,
    name: 'Party Wizard',
    isLive: true,
    isParty: true,
    isSelectable: !isPlayerChoiceAttack,
    weapon: weapons.staff
  }

  const PartyHealer: Entity = {
    health: 100,
    id: 9753781871,
    name: 'Party Healer',
    isLive: true,
    isParty: true,
    isSelectable: !isPlayerChoiceAttack,
    weapon: weapons.wand
  }

  const [enemies, setEnemies] = useState([GoblinArcher, GoblinHealer, GoblinMage, GoblinSwordsman])
  const [partyMembers, setPartyMembers] = useState([PartySwordsman, PartyBarbarian, PartyWizard, PartyHealer])

  useEffect(() => {
    const clonedEnemies = [...enemies]
    clonedEnemies.forEach((enemy) => {
      enemy.isSelectable = isPlayerChoiceAttack
    })
    setEnemies(clonedEnemies)
  }, [isPlayerChoiceAttack])

  useEffect(() => {
    if (target.isParty) {
      setIsPlayerChoiceAttack(true)
      return
    }

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
    setIsPlayerTurn(true)
  }, [target as Entity])

  function handleChoiceAttack() {
    setIsPlayerChoiceAttack(true)
    setAction({'type': "attack", "healthValue": -5 })
  }

  return (
    <>
      <p>{encounter.name}</p>
      <div className="encounter-combat__grid">
        <div className="encounter-combat__board">
          <ul className="encounter-combat__enemies">
            {enemies.map((enemy) =>
              <li key={enemy.id}><EntityRender entity={enemy} setTarget={setTarget} /></li>
            )}
          </ul>

          <p>Party group will be a loop based on a "party" variable.</p>
          <ul>
            {partyMembers.map((party) =>
              <li key={party.id}><EntityRender entity={party} setTarget={setTarget}/></li>
            )}
          </ul>
        </div>

        <div className="encounter-combat__choices">
          { isPlayerTurn && target.isParty 
            ? <>
                <p>Choices</p>
                <ul>
                  <button type="button" onClick={handleChoiceAttack}>Basic Attack (5 damage)</button>
                  <li><button>Drink potion</button></li>
                  <li><button>Pass</button></li>
                  <li><button>Retreat</button></li>
                </ul>
                
                <ConditionalElement isShow={isPlayerChoiceAttack} element={<p>Choose target</p>} />
                {target.name && !target.isParty ? <p>Target: {target.name}</p> : null}
              </>
            : null
          }
          
        </div>
      </div>
    </>
  )
}

export default EncounterCombat