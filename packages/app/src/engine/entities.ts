/**
 * Engine: Entity
 * - Numerical representation for any distinct "item", "character" etc. in the
 *   game.
 */
import { GameWorld } from "../types"

type Entity = string // TODO: move to types.ts

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