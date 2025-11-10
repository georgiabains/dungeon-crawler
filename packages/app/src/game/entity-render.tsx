import { Entity } from "../types"
import { useGameStore } from './game-store'
import { getComponent } from "../engine/components"
import Symbols from "../utils/symbols"
import EntityActionList from "./entity-action-list"
import { useContext, useEffect } from "react"
import TurnIndexContext from "./context-turn-index"
import TargetContext from "./context-target"
import { useState } from "react"

type EntityRenderProps = {
  entity: Entity,
  canTarget?: boolean,
  isTurn?: boolean
}

function EntityRender({ entity, isTurn = false }: EntityRenderProps) {
  const GameWorld = useGameStore((s) => s.world)
  const { turnIndex, setTurnIndex } = useContext(TurnIndexContext)
  const {target} = useContext(TargetContext)
  const [canTarget, setCanTarget] = useState(false)

  useEffect(() => {
    if (target.includes(entity)) {
      setCanTarget(true)
    }
  }, [target])

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
      setTurnIndex(turnIndex + 1) // TODO: Needs to be helper function b/c it's also used in entity-action-list
      console.log('ai turn')
      return
    }

    console.log('player turn')
  }

  function handleTargetClick() {
    console.log(entity)
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
      <EntityActionList isParty={entityData.isParty} isTurn={isTurn} />
    </>
  )
}

export default EntityRender