import { useEffect, useState } from "react"
import { Action, Encounter, Entity, Weapon } from "../types"
import ConditionalElement from "../conditional-element"
import EntityRender from "./entity-render"
import TurnOrderRender from "./turn-order-render"

function EncounterCombat(encounter: Encounter) {
  const [canSelectPlayer, setCanSelectPlayer] = useState(false)
  const [target, setTarget] = useState({} as Entity)
  const [action, setAction] = useState({} as Action)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [turnIndex, setTurnIndex] = useState(0)

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
    isSelectable: false,
    weapon: weapons.bow,
    agility: 18,
  }

  const GoblinMage: Entity = {
    health: 100,
    id: 7583171,
    name: 'Goblin Mage',
    isLive: true,
    isSelectable: false,
    weapon: weapons.staff,
    agility: 13,
  }

  const GoblinSwordsman: Entity = {
    health: 100,
    id: 9137541097,
    name: 'Goblin Swordsman',
    isLive: true,
    isSelectable: false,
    weapon: weapons.sword,
    agility: 9,
  }

  const GoblinHealer: Entity = {
    health: 100,
    id: 91741071,
    name: 'Goblin Healer',
    isLive: true,
    isSelectable: false,
    weapon: weapons.wand,
    agility: 16,
  }

  const PartySwordsman: Entity = {
    health: 100,
    id: 193471049,
    name: 'Party Swordsman',
    isLive: true,
    isParty: true,
    isSelectable: false,
    weapon: weapons.sword,
    agility: 8,
  }

  const PartyBarbarian: Entity = {
    health: 100,
    id: 4029752,
    name: 'Party Barbarian',
    isLive: true,
    isParty: true,
    isSelectable: false,
    weapon: weapons.sword,
    agility: 10,
  }

  const PartyWizard: Entity = {
    health: 100,
    id: 310741,
    name: 'Party Wizard',
    isLive: true,
    isParty: true,
    isSelectable: false,
    weapon: weapons.staff,
    agility: 12,
  }

  const PartyHealer: Entity = {
    health: 100,
    id: 9753781871,
    name: 'Party Healer',
    isLive: true,
    isParty: true,
    isSelectable: false,
    weapon: weapons.wand,
    agility: 20,
  }

  const [enemies, setEnemies] = useState([GoblinArcher, GoblinHealer, GoblinMage, GoblinSwordsman])
  const partyMembers = [PartySwordsman, PartyBarbarian, PartyWizard, PartyHealer]

  const allEntites = [...enemies, ...partyMembers]

  useEffect(() => {
    const clonedEnemies = [...enemies]
    clonedEnemies.forEach((enemy) => {
      enemy.isSelectable = canSelectPlayer
    })
    setEnemies(clonedEnemies)
  }, [canSelectPlayer])

  useEffect(() => {
    if (Object.keys(target).length === 0) return
    if (target.isParty) {
      setIsPlayerTurn(true)
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
    setCanSelectPlayer(false)
    setIsPlayerTurn(false)
    setTurnIndex(turnIndex + 1)
  }, [target as Entity])

  useEffect(() => {
    if (isPlayerTurn) return

    // need to check if it's the player's turn

    // setTimeout(() => {
    //   setTurnIndex(turnIndex + 1)
    //   console.log(turnIndex)
    // }, 1000)    
  }, [turnIndex])

  function handleChoiceAttack() {
    setCanSelectPlayer(true)
    setAction({'type': "attack", "healthValue": -5 })
  }

  return (
    <>
      <p>{encounter.name}</p>

      <TurnOrderRender entities={allEntites} turnIndex={turnIndex} />

      <div className="encounter-combat__grid">
        <div className="encounter-combat__board">
          <ul className="encounter-combat__entities">
            {enemies.map((enemy) =>
              <li key={enemy.id}><EntityRender entity={enemy} setTarget={setTarget} /></li>
            )}
          </ul>

          <ul className="encounter-combat__entities">
            {partyMembers.map((party) =>
              <li key={party.id}><EntityRender entity={party} setTarget={setTarget}/></li>
            )}
          </ul>
        </div>

        <div className="encounter-combat__choices">
          { isPlayerTurn
            ? <>
                <p>Choices</p>
                <ul>
                  <button type="button" onClick={handleChoiceAttack}>Basic Attack (5 damage)</button>
                  <li><button>Drink potion</button></li>
                  <li><button>Pass</button></li>
                  <li><button>Retreat</button></li>
                </ul>
                
                <ConditionalElement isShow={canSelectPlayer} element={<p>Choose target</p>} />
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