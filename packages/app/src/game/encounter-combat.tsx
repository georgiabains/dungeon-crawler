import { useEffect, useState } from "react"
import { Encounter, Entity } from "../types"
import { useGameStore } from './game-store'
import { getComponent } from "../engine/components"
import Symbols from "../utils/symbols"
import EntityRender from "./entity-render"

function EncounterCombat(encounter: Encounter) {
  const GameWorld = useGameStore((s) => s.world)
  const addEntityWithComponents = useGameStore((s) => s.addEntityWithComponents)

  const partyComponent = getComponent(Symbols.party, GameWorld) as Map<Entity, boolean>
  const party = [...partyComponent.keys()] as Array<Entity>

  const enemyNames = ['Goblin Swordsman', 'Goblin Healer', 'Goblin Wizard', 'Goblin Rogue']
  const [enemyList, setEnemyList] = useState([] as Array<Entity>)

  useEffect(() => {
    enemyNames.forEach((name) => {
      addEntityWithComponents([
        { name: Symbols.name, data: name},
        { name: Symbols.health.current, data: 100 }, 
        { name: Symbols.health.max, data: 100 }, 
        { name: Symbols.attack, data: 5 },
        { name: Symbols.currentEncounter, data: true}
      ])
    })
  }, [])

  // NOTE: Not 100% sure this is the best approach but it works for now
  // Does enemy creation/initialisation need to go in a System?
  const enemyComponent = getComponent(Symbols.currentEncounter, GameWorld) as Map<Entity, boolean>

  useEffect(() => {
    if (!enemyComponent) return

    setEnemyList([...enemyComponent.keys()])
  }, [enemyComponent])

  return (
    <>
      <p>{encounter.name}</p>

      <ul>
        {enemyList.map((enemy) => {
          return(
            <li key={enemy}><EntityRender entity={enemy} canTarget={true} /></li>
          )
        })}
      </ul>

      <ul>
        {party.map((member) => {
          return(
            <li key={member}><EntityRender entity={member} /></li>
          )
        })}
      </ul>
    </>
  )
}

export default EncounterCombat