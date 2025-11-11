import { Entity } from "../types"
import { useGameStore } from './game-store'
import Symbols from "../utils/symbols"
import EntityActionList from "./entity-action-list"
import { useContext, useEffect } from "react"
import TurnIndexContext from "./context-turn-index"
import TargetContext from "./context-target"
import { useState } from "react"
import { updateTargetHealth } from "./system-health"
import { getRandomInt } from "../utils/utils"

type EntityRenderProps = {
  entity: Entity,
  canTarget?: boolean,
  isTurn?: boolean
}

function EntityRender({ entity, isTurn = false }: EntityRenderProps) {
  const getWorld = useGameStore((s) => s.getWorld)
  const updateWorld = useGameStore((s) => s.updateWorld)
  const getComponent = useGameStore((s) => s.getComponent)
  const { turnIndex, setTurnIndex } = useContext(TurnIndexContext)
  const { target, setTarget, payload, setPayload } = useContext(TargetContext)
  const [canTarget, setCanTarget] = useState(false)

  const entityData = {
    id: entity,
    name: (getComponent(Symbols.name) as Map<Entity, string>).get(entity),
    health: {
      current: (getComponent(Symbols.health.current) as Map<Entity, number>).get(entity) ?? 0,
      max: (getComponent(Symbols.health.max) as Map<Entity, number>).get(entity)
    },
    isParty: (getComponent(Symbols.party) as Map<Entity, boolean>).get(entity) ?? false
  }

  useEffect(() => {
    setCanTarget(target.includes(entity) && entityData.health.current > 0)
  }, [target])

  function handleTurn() {
    if (entityData.isParty) return

    const players = Array.from((getComponent(Symbols.party) as Map<Entity, boolean>)?.keys())
    const targetParty = players[getRandomInt(players.length)]
    
    const newWorld = updateTargetHealth(getWorld(), {entity: targetParty, healthDelta: -Math.abs(payload.damage.attack)}) // NOTE: I don't really need to use -Math.abs(number), I could rework all "damage" or "attack" values to be negative, and pass through one "update target health" value. Relies on me keeping track of this, however
    updateWorld(newWorld)

    // Simulate AI "thinking"
    setTimeout(() => {
      setTurnIndex(turnIndex + 1) // TODO: Needs to be helper function b/c it's also used in entity-action-list
    }, 500)
  }

  function handleTargetClick() {
    // TODO: Can I refactor these if statements? Could use contextual object keys?
    if (payload.damage) {
      const newWorld = updateTargetHealth(getWorld(), {entity, healthDelta: -Math.abs(payload.damage.attack)}) // NOTE: I don't really need to use -Math.abs(number), I could rework all "damage" or "attack" values to be negative, and pass through one "update target health" value. Relies on me keeping track of this, however
      updateWorld(newWorld)
    }

    if (payload.healing) {
      // TODO: Handle healing
    }

    // NOTE: This relies on a player only being able to make 1 action per turn
    setTarget([])
    setTurnIndex(turnIndex + 1)
  }

  useEffect(() => {
    if (!isTurn) return

    setPayload({
      damage: {
        attack: getComponent(Symbols.attack)?.get(entity) ?? 0
      }
    })

    handleTurn()
  }, [isTurn])

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