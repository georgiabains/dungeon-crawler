/**
 * Encounter: Combat.
 * 
 * Base combat encounter render.
 */
import { ReactElement, useMemo, useEffect, useRef, useState } from "react"
import { Encounter, Entity } from "../types"
import { useGameStore } from './game-store'

// Components
import EntityRender from "./entity-render"
import TurnOrderRender from "./turn-order-render"

// Contexts
import TargetContext from "./context-target"
import TurnIndexContext from "./context-turn-index"

// Utils
import Symbols from "../utils/symbols"

// Custom types
type EncounterCombatProps = {
  encounter: Encounter,
  enemyList: Array<Entity>
}

/**
 * Render combat encounter.
 * @param {object} data - Encounter data.
 * @param {Encounter} data.encounter - Encounter information.
 * @param {Array<Entity>} data.enemyList - List of enemy IDs.
 * @returns {ReactElement}
 */
function EncounterCombat({ 
  encounter, 
  enemyList 
}: EncounterCombatProps): ReactElement {
  const getComponent = useGameStore((s) => s.getComponent)
  const partyComponent = getComponent(Symbols.party) as Map<Entity, boolean>
  const party = [...partyComponent.keys()] as Array<Entity>
  const encounterID = useRef(crypto.randomUUID())
  const sortedEntities = useMemo(() => sortEntities(), [encounterID.current])
  
  // States
  const [turnIndex, setTurnIndex] = useState(0)
  const [target, setTarget] = useState([] as Array<string>)
  const [payload, setPayload] = useState({})

  // Update encounter ID when enemy list changes
  useEffect(() => {
    encounterID.current = crypto.randomUUID()
  }, [enemyList])

  // TODO: Move into distinct system? Is that what a system is for/how it should be structured?
  function sortEntities() {
    const allEntities = [...party, ...enemyList]

    return allEntities.sort((a: Entity, b: Entity): number => {
      const aAgility = (getComponent(Symbols.agility) as Map<Entity, number>).get(a) ?? 0
      const bAgility = (getComponent(Symbols.agility) as Map<Entity, number>).get(b) ?? 0
      
      return bAgility - aAgility
    })
  }

  /**
   * Return if it's this entity's turn.
   * @param {Entity} entity - Entity.
   * @returns {boolean}
   */
  function getIsTurn(entity: Entity): boolean {
    return entity === sortedEntities[turnIndex % sortedEntities.length]
  }

  return (
    <TurnIndexContext.Provider value={{ turnIndex, setTurnIndex }}>
      <p>{encounter.name}</p>

      <TurnOrderRender 
        entities={sortedEntities} 
        id={encounterID.current} 
        turnIndex={turnIndex} 
      />

      <TargetContext.Provider value={{ target, setTarget, payload, setPayload }}>
        <p><strong>Board</strong></p>
        {/* TODO: Create a board component, or like entity-tile-render component */}
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