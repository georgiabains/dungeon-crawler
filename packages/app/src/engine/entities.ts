/**
 * Engine: Entity
 * - Numerical representation for any distinct "item", "character" etc. in the
 *   game.
 */
import { Entity, GameWorld } from "../types"

/**
 * Return updated Game World with new entity.
 * @param world - Game World.
 * @returns Array<GameWorld, Entity>
 */
export function createEntity(currentWorld: GameWorld): { 
  world: GameWorld, 
  entity: Entity
} {
  const entity = currentWorld.newEntity
  const entities = [...currentWorld.entities, entity]

  return {
    world: {
      ...currentWorld,
      newEntity: crypto.randomUUID(),
      entities
    },
    entity
  }
}