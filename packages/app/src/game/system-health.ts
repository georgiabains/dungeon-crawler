import Symbols from "../utils/symbols"
import { Systems } from "../engine/engine"
import { Entity, GameWorld, System } from "../types"

type UpdateTargetHealthParams = {
  entity: Entity,
  healthDelta: number
}

/**
 * Update specific entitie's health value.
 * @param world - Game World.
 * @param params - Entity and healthDelta.
 * @returns {GameWorld}
 */
const updateTargetHealthSystem: System = (
  world: GameWorld, 
  params: UpdateTargetHealthParams
): GameWorld => {
  if (!params) return world

  const { entity, healthDelta } = params
  const targetHealth = world.components
    .get(Symbols.health.current)
    ?.get(entity) as number | undefined
  
  if (!targetHealth) {
    console.warn(`Entity: ${entity} doesn\'t have a health component`)
    return world
  }
  
  // TODO: Move copying to some helper function
  const components = new Map(world.components)
  const healthMap = new Map(world.components.get(Symbols.health.current))
  
  // Calculate new health
  const updatedTargetHealth = targetHealth + healthDelta

  healthMap.set(entity, updatedTargetHealth)
  components.set(Symbols.health.current, healthMap)

  return { 
    ...world, 
    components
  }
}

export const updateTargetHealth = Systems.createSystem(updateTargetHealthSystem)