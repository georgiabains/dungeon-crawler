/**
 * Entity: Render
 * 
 * Render Entity tile.
 */
import { ReactElement, useContext, useEffect, useState } from "react"
import { useGameStore } from './game-store'
import { Entity } from "../types"

// Components
import EntityActionList from "./entity-action-list"

// Contexts
import TurnIndexContext from "./context-turn-index"
import TargetContext from "./context-target"

// Systems
import { updateTargetHealth } from "./system-health"

// Utils
import Symbols from "../utils/symbols"
import { getRandomInt } from "../utils/utils"


// Custom types
type EntityRenderProps = {
  entity: Entity,
  isTurn?: boolean
}

/**
 * Render entity tile.
 * @param {EntityRenderProps} data - Entity data.
 * @param {Entity} data.entity - Entity.
 * @param {boolean} [data.isTurn] - If it's the current entity's turn. 
 * @returns {ReactElement}
 */
function EntityRender({ 
  entity, 
  isTurn = false 
}: EntityRenderProps): ReactElement {
  const getWorld = useGameStore((s) => s.getWorld)
  const updateWorld = useGameStore((s) => s.updateWorld)
  const getComponent = useGameStore((s) => s.getComponent)

  // Contexts
  const { turnIndex, setTurnIndex } = useContext(TurnIndexContext)
  const { target, setTarget, payload, setPayload } = useContext(TargetContext)

  // States
  const [canTarget, setCanTarget] = useState(false)

  // Construct entityData as object to simplify rendering the tile
  const entityData = {
    id: entity,
    name: (getComponent(Symbols.name) as Map<Entity, string>).get(entity),
    health: {
      current: (getComponent(Symbols.health.current) as Map<Entity, number>).get(entity) ?? 0,
      max: (getComponent(Symbols.health.max) as Map<Entity, number>).get(entity)
    },
    isParty: (getComponent(Symbols.party) as Map<Entity, boolean>).get(entity) ?? false
  }

  /**
   * Determine if current entity can be targeted by the active entity.
   * - Broadly, entity can target their group for healing (enemy x enemy, party
   * x party), and their opposition for damage (enemy x party).
   */
  useEffect(() => {
    setCanTarget(target.includes(entity) && entityData.health.current > 0)
  }, [target])

  /**
   * Set payload based on current entity (damage, healing etc.).
   * Call AI logic.
   */
  useEffect(() => {
    if (!isTurn) return

    setPayload({
      damage: {
        attack: getComponent(Symbols.attack)?.get(entity) ?? 0
      }
    })

    if (entityData.isParty) return

    handleAITurn()
  }, [isTurn])

  /**
   * Handle AI entity's turn.
   * - Player-controlled choices live in `entity-action-list`
   */
  function handleAITurn():void {
    const players = Array.from((getComponent(Symbols.party) as Map<Entity, boolean>)?.keys())
    const targetParty = players[getRandomInt(players.length)]
  
    // Simulate AI "thinking"
    setTimeout(() => {
      const newWorld = updateTargetHealth(getWorld(), {entity: targetParty, healthDelta: -Math.abs(payload.damage.attack)}) // NOTE: I don't really need to use -Math.abs(number), I could rework all "damage" or "attack" values to be negative, and pass through one "update target health" value. Relies on me keeping track of this, however
      updateWorld(newWorld)
      setTurnIndex(turnIndex + 1) // TODO: Needs to be helper function b/c it's also used in entity-action-list
    }, 500)
  }

  /**
   * Handle adjusting current entity's stats based on payload data.
   * - Payload is a Context.
   */
  function handleTargetClick() {
    // TODO: Can I refactor these if statements? Could use contextual object keys?
    if (payload.damage) {
      const newWorld = updateTargetHealth(
        getWorld(), 
        { entity, healthDelta: -Math.abs(payload.damage.attack) }
      ) // NOTE: I don't really need to use -Math.abs(number), I could rework all "damage" or "attack" values to be negative, and pass through one "update target health" value. Relies on me keeping track of this, however
      updateWorld(newWorld)
    }

    if (payload.healing) {
      // TODO: Handle healing
    }

    // NOTE: This relies on a player only being able to make 1 action per turn
    setTarget([])
    setTurnIndex(turnIndex + 1)
  }

  return (
    <>
      {entityData.name} {entityData.health.current as number <= 0 ? 'Dead' : ''}
      <br />
      {entityData.health.current}/{entityData.health.max}
      <br />
      {canTarget ? <button type="button" onClick={handleTargetClick}>Target</button> : null}
      <br />
      <EntityActionList entity={entity} isParty={entityData.isParty} isTurn={isTurn} />
    </>
  )
}

export default EntityRender