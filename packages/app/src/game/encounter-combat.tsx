import { useEffect, useState } from "react"
import { Encounter, Entity } from "../types"
import { useGameStore } from './game-store'
import { getComponent } from "../engine/components"
import Symbols from "../utils/symbols"
import EntityRender from "./entity-render"
import TurnOrderRender from "./turn-order-render"

function EncounterCombat(encounter: Encounter) {
  const GameWorld = useGameStore((s) => s.world)
  const addEntityWithComponents = useGameStore((s) => s.addEntityWithComponents)

  const partyComponent = getComponent(Symbols.party, GameWorld) as Map<Entity, boolean>
  const party = [...partyComponent.keys()] as Array<Entity>

  const [hasEnemyList, setHasEnemyList] = useState(false)
  const enemyNames = ['Goblin Swordsman', 'Goblin Healer', 'Goblin Wizard', 'Goblin Rogue']
  const [enemyList, setEnemyList] = useState([] as Array<Entity>)
  
  const [turnIndex, setTurnIndex] = useState(0)

  useEffect(() => {
    if (hasEnemyList) return

    enemyNames.forEach((name) => {
      addEntityWithComponents([
        { name: Symbols.name, data: name},
        { name: Symbols.health.current, data: 100 }, 
        { name: Symbols.health.max, data: 100 }, 
        { name: Symbols.attack, data: 5 },
        { name: Symbols.agility, data: Math.floor(Math.random() * 100)},
        { name: Symbols.currentEncounter, data: true}
      ])
      setHasEnemyList(true)
    })
  }, [hasEnemyList])

  // NOTE: Not 100% sure this is the best approach but it works for now
  // Does enemy creation/initialisation need to go in a System?
  const enemyComponent = getComponent(Symbols.currentEncounter, GameWorld) as Map<Entity, boolean>

  useEffect(() => {
    if (!enemyComponent) return

    setEnemyList([...enemyComponent.keys()])
  }, [enemyComponent])

  // TODO: Move into distinct system? Is that what a system is for/how it should be structured?
  function sortEntities() {
    const allEntities = [...party, ...enemyList]

    return allEntities.sort((a: Entity, b: Entity): number => {
      const aAgility = (getComponent(Symbols.agility, GameWorld) as Map<Entity, number>).get(a) ?? 0
      const bAgility = (getComponent(Symbols.agility, GameWorld) as Map<Entity, number>).get(b) ?? 0
      
      return bAgility - aAgility
    })
  }

  const sortedEntities = sortEntities()

  function getIsTurn(entity: Entity) {
    return entity === sortedEntities[turnIndex]
  }

  return (
    <>
      <p>{encounter.name}</p>

      <TurnOrderRender entities={sortedEntities} turnIndex={turnIndex} />

      <ul>
        {enemyList.map((enemy) => {
          return(
            <li key={enemy}><EntityRender entity={enemy} canTarget={true} isTurn={getIsTurn(enemy) as boolean} /></li>
          )
        })}
      </ul>

      <ul>
        {party.map((member) => {
          return(
            <li key={member}><EntityRender entity={member as Entity} isTurn={getIsTurn(member) as boolean} /></li>
          )
        })}
      </ul>
    </>
  )
}

export default EncounterCombat