import { Entity } from "../types"
import { useGameStore } from './game-store'
import Symbols from "../utils/symbols"
import EntityActionList from "./entity-action-list"
import { useContext, useEffect } from "react"
import TurnIndexContext from "./context-turn-index"
import TargetContext from "./context-target"
import { useState } from "react"
import { updateTargetHealth } from "./system-health"

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
  const { target, payload } = useContext(TargetContext)
  const [canTarget, setCanTarget] = useState(false)

  useEffect(() => {
    if (target.includes(entity)) {
      setCanTarget(true)
    }
  }, [target])

  const entityData = {
    id: entity,
    name: (getComponent(Symbols.name) as Map<Entity, string>).get(entity),
    health: {
      current: (getComponent(Symbols.health.current) as Map<Entity, string>).get(entity),
      max: (getComponent(Symbols.health.max) as Map<Entity, string>).get(entity)
    },
    isParty: (getComponent(Symbols.party) as Map<Entity, boolean>).get(entity) ?? false
  }

  function handleTurn() {
    if (!entityData.isParty) {
      setTurnIndex(turnIndex + 1) // TODO: Needs to be helper function b/c it's also used in entity-action-list
      console.log('ai turn')
      return
    }

    console.log('player turn')
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
    setTurnIndex(turnIndex + 1)
  }

  useEffect(() => {
    if (!isTurn) return

    handleTurn()
  }, [isTurn])

  return (
    <>
      {entityData.name}
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