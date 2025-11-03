import { Entity } from "../types"
import { useGameStore } from './game-store'
import { getComponent } from "../engine/components"
import Symbols from "../utils/symbols"
import EntityActionList from "./entity-action-list"
import { useEffect } from "react"

type EntityRenderProps = {
  entity: Entity,
  canTarget?: boolean,
  isTurn?: boolean
}

function EntityRender({ entity, canTarget, isTurn = false }: EntityRenderProps) {
  const GameWorld = useGameStore((s) => s.world)

  const entityData = {
    id: entity,
    name: (getComponent(Symbols.name, GameWorld) as Map<Entity, string>).get(entity),
    health: {
      current: (getComponent(Symbols.health.current, GameWorld) as Map<Entity, string>).get(entity),
      max: (getComponent(Symbols.health.max, GameWorld) as Map<Entity, string>).get(entity)
    },
    isParty: (getComponent(Symbols.party, GameWorld) as Map<Entity, boolean>).get(entity) ?? false
  }

  function handleTurn() {
    if (!entityData.isParty) {
      console.log('ai turn')
      return
    }

    console.log('player turn')
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
      {canTarget ? <button type="button">Target</button> : null}
      <br />
      <EntityActionList isParty={entityData.isParty} isTurn={isTurn} />
    </>
  )
}

export default EntityRender