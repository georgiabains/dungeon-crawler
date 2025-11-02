import { Entity } from "../types"
import { useGameStore } from './game-store'
import { getComponent } from "../engine/components"
import Symbols from "../utils/symbols"

type EntityRenderProps = {
  entity: Entity,
  canTarget?: boolean,
}

function EntityRender({ entity, canTarget }: EntityRenderProps) {
  const GameWorld = useGameStore((s) => s.world)

  const entityData = {
    id: entity,
    name: (getComponent(Symbols.name, GameWorld) as Map<Entity, string>).get(entity),
    health: {
      current: (getComponent(Symbols.health.current, GameWorld) as Map<Entity, string>).get(entity),
      max: (getComponent(Symbols.health.max, GameWorld) as Map<Entity, string>).get(entity)
    }
  }

  return (
    <>
      {entityData.name}
      <br />
      {entityData.health.current}/{entityData.health.max}
      <br />
      {canTarget ? <button type="button">Target</button> : null}
    </>
  )
}

export default EntityRender