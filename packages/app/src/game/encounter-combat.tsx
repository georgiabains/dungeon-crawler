import { useEffect, useState } from "react"
import { Encounter, Entity } from "../types"
import { useGameStore } from './game-store'
import { getComponent } from "../engine/components"
import Symbols from "../utils/symbols"
import EntityRender from "./entity-render"
import TurnOrderRender from "./turn-order-render"
import TurnIndexContext from "./context-turn-index"
import TargetContext from "./context-target"

type EncounterCombatProps = {
  encounter: Encounter,
  enemyList: Array<Entity>
}

function EncounterCombat({encounter, enemyList}: EncounterCombatProps) {
  const GameWorld = useGameStore((s) => s.world)

  const partyComponent = getComponent(Symbols.party, GameWorld) as Map<Entity, boolean>
  const party = [...partyComponent.keys()] as Array<Entity>
  const [turnIndex, setTurnIndex] = useState(0)
  const [target, setTarget] = useState([] as Array<string>)

  useEffect(() => {
    const currentEntity = sortedEntities[turnIndex % sortedEntities.length]

    if (!enemyList.includes(currentEntity)) {
      return
    }

    // NOTE: Seems weird to increase turn index here and in Entity Action list
    // Maybe I do just use a callback function????
    setTurnIndex(turnIndex + 1)
  }, [turnIndex])

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
    return entity === sortedEntities[turnIndex % sortedEntities.length]
  }

  return (
    <TurnIndexContext.Provider value={{ turnIndex, setTurnIndex }}>
      <p>{encounter.name}</p>

      <TurnOrderRender entities={sortedEntities} turnIndex={turnIndex} />

      <TargetContext.Provider value={{ target, setTarget }}>
        <p><strong>Board</strong></p>
        <ul>
          {enemyList.map((enemy) => {
            return (
              <li key={enemy}>
                <EntityRender entity={enemy} isTurn={getIsTurn(enemy) as boolean} />
              </li>
            )
          })}
        </ul>

        <ul>
          {party.map((member) => {
            return (
              <li key={member}>
                <EntityRender entity={member as Entity} isTurn={getIsTurn(member) as boolean} />
              </li>
            )
          })}
        </ul>
      </TargetContext.Provider>
    </TurnIndexContext.Provider>
  )
}

export default EncounterCombat